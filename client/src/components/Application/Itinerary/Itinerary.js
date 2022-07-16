import React, {Component} from 'react';
import {
  Button,
  Col,
  Container,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import Pane from '../Pane';
import {sendServerRequestWithBody} from '../../../api/restfulAPI';
import './react-table.css';
import L from 'leaflet';
import Legs from './Legs';
import Map from './Map';
import Search from './Search';
import validate from '../Validator/Validator.js';

export default class Itinerary extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.updateJson = this.updateJson.bind(this);
    this.getDistancesFromServer = this.getDistancesFromServer.bind(this);
    this.saveToFile = this.saveToFile.bind(this);
    this.buildData = this.buildData.bind(this);
    this.buildLeg = this.buildLeg.bind(this);
    this.buildLegR = this.buildLegR.bind(this);
    this.shortRequest = this.shortRequest.bind(this);
    this.shorterRequest = this.shorterRequest.bind(this);
    this.add = this.add.bind(this);
    this.newUnit = this.newUnit.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.map = React.createRef();
    this.itineraryRequest = this.itineraryRequest.bind(this);

    this.state = {
      name: '',
      latitude: 0,
      longitude: 0,
      activeTab: '2',
    };
  }

  updateJson(text) {
    let obj = JSON.parse(text);

    if (!validate(obj, 'itineraryFile')) {
      console.log('bad upload');
      return; //bad upload
    }
    this.props.updateSave('requestType', obj.requestType);
    this.props.updateSave('requestVersion', obj.requestVersion);
    this.props.updateSave('options', obj.options);
    this.props.updateSave('places', obj.places);
    this.props.updateSave('copyPlaces', obj.places);

    this.getDistancesFromServer();
    this.map.current.updateMap();

  }

  itineraryRequest(tipRequest) {
    console.log(tipRequest);
    sendServerRequestWithBody('itinerary', tipRequest,
        this.props.settings.serverPort).then((response) => {
      if (!validate(response.body, 'itineraryResponse')) {
        console.log('itinerary response');
        return;
      }
      if (response.statusCode >= 200 && response.statusCode <= 299) {
        this.props.updateSave('distances', response.body.distances);
        this.props.updateSave('places', response.body.places);
      }
    });
    this.buildLeg();
  }

  getDistancesFromServer() {
    let newOptions = Object.assign({}, this.props.itinerarySave.options);
    newOptions['earthRadius'] = this.props.options.units[this.props.options.activeUnit].toString();
    this.props.updateSave('options', newOptions);

    const tipRequest = {
      'requestType': 'itinerary',
      'requestVersion': 5,
      'options': newOptions,
      'places': this.props.itinerarySave.places,
      'distances': [],
    };
    this.itineraryRequest(tipRequest);
  }

  saveToFile() {
    console.log('Saving JSON');
    let saveContents = {
      'requestType': this.props.itinerarySave.requestType,
      'requestVersion': this.props.itinerarySave.requestVersion,
      'options': this.props.itinerarySave.options,
      'places': this.props.itinerarySave.places,
      //not including distances because they're optional and we can easily recalculate them
    };
    let fileContents = JSON.stringify(saveContents, null, 2);
    let fileName = 'Itinerary.json';

    let p = document.createElement('a');
    p.setAttribute('href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContents));
    p.setAttribute('download', fileName);
    p.click();
  }

  // componentWillMount() {
  //     this.updateMap();
  //
  // }

  componentDidMount() {
    // this.createMap();
    // this.updateMap();

    this.renderTabs();
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props.itinerarySave) {
      this.renderTabs();
      this.map.current.updateMap();
    }
    if (this.props.options.activeUnit !== prevProps.options.activeUnit) {
      this.getDistancesFromServer();
      this.buildLeg();
    }
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
      setTimeout(() => {
        this.map.current.invalidate();
      }, 100);
    }

  }

  renderTabs() {
    return (
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                    onClick={() => {
                      this.toggleTab('1');
                    }}
                >Legs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                    onClick={() => {
                      this.toggleTab('2');
                    }}
                >Map</NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                    onClick={() => {
                      this.toggleTab('3');
                    }}
                >Search</NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                    onClick={() => {
                      this.toggleTab('4');
                    }}
                >Add Place</NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <Legs options={this.props.options}
                          itinerarySave={this.props.itinerarySave}
                          updateSave={this.props.updateSave}/>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col>
                    <Map options={this.props.options}
                         itinerarySave={this.props.itinerarySave}
                         updateSave={this.props.updateSave}
                         settings={this.props.settings}
                         ref={this.map}/>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="12">
                    <Search options={this.props.options}
                            itinerarySave={this.props.itinerarySave}
                            updateSave={this.props.updateSave}
                            settings={this.props.settings}/>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col sm="12">
                    {this.newUnit()}
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
    );
  }

  render() {
    return (
        <Container>
          <Row>
            <Col xs={12} sm={10} md={8} lg={6}>
              {this.renderOptions()}
            </Col>
            <Col xs={12} sm={10} md={8} lg={6}>
              {this.renderButtons()}
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} style={{padding: "40px"}}>
              {this.renderTabs()}
            </Col>
          </Row>
        </Container>
    );
  }

  newUnit() {
    let updateStatenameOnChange = (event) => {
      this.setState({'name': event.target.value});
    };
    let updateStatelatitudeOnChange = (event) => {
      this.setState({'latitude': event.target.value});
    };
    let updateStatelongitudeOnChange = (event) => {
      this.setState({'longitude': event.target.value});
    };

    return (
          <div>
            <Input type="name" name="name" id="exname" placeholder="Name"
                   onChange={updateStatenameOnChange}/>
            <Input type="latitude" name="latitude" id="exlatitude"
                   placeholder="Latitude"
                   onChange={updateStatelatitudeOnChange}/>
            <Input type="longitude" name="longitude" id="exlongitude"
                   placeholder="Longitude"
                   onChange={updateStatelongitudeOnChange}/>
            <Button onClick={this.add}>Add new place</Button>
          </div>
    );
  }

  add() {
    const obj = {
      'name': this.state.name,
      'latitude': this.state.latitude,
      'longitude': this.state.longitude,
    };
    const newArray = this.props.itinerarySave.places.slice(); // Create a copy
    newArray.push(obj);
    this.props.updateSave('places', newArray);
    //this.getDistancesFromServer();
    //this.buildLeg();
  }

  renderButtons() {
    return (
        <Pane header={'Buttons'}>
          <div>
            <Button onClick={this.buildLeg}>Get Distances</Button> &nbsp;
            <Button onClick={this.shortRequest}>Short</Button> &nbsp;
            <Button onClick={this.shorterRequest}>Shorter</Button> &nbsp;
            <Button onClick={this.buildLegR}>Reverse</Button>
          </div>
        </Pane>

    );
  }

  shortRequest() {
    let newOptions = Object.assign({}, this.props.itinerarySave.options);
    newOptions['optimization'] = 'short';
    this.props.updateSave('options', newOptions);

    const tipRequest = {
      'requestType': 'itinerary',
      'requestVersion': 5,
      'options': newOptions,
      'places': this.props.itinerarySave.places,
      'distances': [],
    };

    this.itineraryRequest(tipRequest);
  }

  shorterRequest() {
    let newOptions = Object.assign({}, this.props.itinerarySave.options);
    newOptions['optimization'] = 'shorter';
    this.props.updateSave('options', newOptions);

    const tipRequest = {
      'requestType': 'itinerary',
      'requestVersion': 5,
      'options': newOptions,
      'places': this.props.itinerarySave.places,
      'distances': [],
    };
    this.itineraryRequest(tipRequest);
  }

  getTotal() {
    var total = 0;
    for (let i = 0; i < this.props.itinerarySave.distances.length; i++) {
      total = total + this.props.itinerarySave.distances[i];
    }
    this.props.updateSave('total', total);
    // this.setState({'total': total})
  }

  renderOptions() {

    return (

        <Pane header={'Load/Save'}>
          <div>
            {<input
                type="file"
                id='fileInput'
                // value={id="fileInput"}
                onClick={this.handleClick}/>}
            <Button onClick={this.saveToFile}>Save</Button>
          </div>
        </Pane>

    );
  }

  buildLeg() {
    this.map.current.updateMap();
    this.getDistancesFromServer;
    this.buildData();
    this.getTotal();

  }

  buildLegR() {
    this.buildReverse();
    this.getDistancesFromServer;
    this.calDist();
    this.buildLeg();
    this.getTotal();
    this.map.current.updateMap();
  }

  buildData() {
    // console.log(this.props.itinerarySave.distances)
    this.props.itinerarySave.places[0]['distance'] = 0;
    this.props.itinerarySave.places[0]['cdistance'] = 0;
    this.props.itinerarySave.places[0]['marker'] = false;
    var total = 0;
    for (let i = 1; i < this.props.itinerarySave.distances.length; i++) {
      let children = this.props.itinerarySave.places[i];
      children['distance'] = this.props.itinerarySave.distances[i - 1];
      total = total + this.props.itinerarySave.distances[i - 1];
      children['cdistance'] = total;
      children['marker'] = false;

    }
  }

  buildReverse() {
    let counter = this.props.itinerarySave.places.length - 1;
    for (let i = 1; i < (this.props.itinerarySave.places.length - 1) / 2; i++) {
      let children = this.props.itinerarySave.places[i];
      this.props.itinerarySave.places[i] = this.props.itinerarySave.places[counter];
      this.props.itinerarySave.places[counter] = children;
      counter = counter - 1;
    }
    this.getDistancesFromServer();
    this.props.updateSave('places', this.props.itinerarySave.places);
  }

  calDist() {
    var total = 0;
    this.props.itinerarySave.places[0]['distance'] = 0;
    this.props.itinerarySave.places[0]['cdistance'] = 0;
    for (let i = 1; i < this.props.itinerarySave.places.length; i++) {
      let children = this.props.itinerarySave.places[i];
      children['distance'] = this.props.itinerarySave.distances[i - 1];
      total = total + this.props.itinerarySave.distances[i - 1];
      children['cdistance'] = total;
    }
  }

//Credit given to https://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api and Mason on piazza
  handleClick(e) {
    let updateJsonState = (str) => {
      this.updateJson(str);
    };

    let setFile = (filename) => {
      this.props.updateSave('fileInput', filename);
    };

    var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function(e) {
      var file = fileInput.files[0];
      var reader = new FileReader();
      setFile(file);
      reader.onload = function(e) {
        updateJsonState(reader.result);
      };
      reader.readAsText(file);

    });
  }

}