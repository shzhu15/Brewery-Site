import React, {Component} from 'react';
import {Button, Col, Container, Input, Row} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import {sendServerRequestWithBody} from '../../../api/restfulAPI';
import './react-table.css';
import ReactTable from 'react-table';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.addAllRow = this.addAllRow.bind(this);

    this.state = {
      limit: 0,
      search: '',
      narrow: [],
      value: '',
      region: '',
      country: '',
      continent: '',
      findPlaces: [],
    };
  }

  render() {
    return (
        <Container>
          <Row>
            <Col>
              {this.renderSearch()}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.createRTable()}
            </Col>
          </Row>
        </Container>
    );
  }

  renderSearch() {
    let updateSearchOnChange = (event) => {
      this.setState({'search': event.target.value});
    };
    let updateLimitOnChange = (event) => {
      this.setState({'limit': event.target.value});
    };
    let updateNarrowOnChange = (event) => {
      this.setState({'value': event.target.value});
    };
    let updateRegionOnChange = (event) => {
      this.setState({'region': event.target.value});
    };
    let updateCountryOnChange = (event) => {
      this.setState({'country': event.target.value});
    };
    let updateContinentOnChange = (event) => {
      this.setState({'continent': event.target.value});
    };
    return (
        <div>
          <Input type="find" name="find" id="exfind" placeholder="Search ex: Denver, fort"
                 onChange={updateSearchOnChange}/>
          <Input type="findNarrow" name="narrow" id="exNarrow"
                 placeholder="Type ex: airport, heliport" onChange={updateNarrowOnChange}/>
          <Input type="findRegion" name="region" id="exRegion"
                 placeholder="Region" onChange={updateRegionOnChange}/>
          <Input type="findCountry" name="country" id="exCountry"
                 placeholder="Country" onChange={updateCountryOnChange}/>
          <Input type="findContinent" name="continent" id="exContinent"
                 placeholder="Continent" onChange={updateContinentOnChange}/>

          <Button onClick={this.search}>Search</Button> &nbsp;
          <Button onClick={this.addAllRow}>Add All</Button>

        </div>
    );
  }

  search() {
    this.setState({'findPlaces': []});
    let narr = this.state.narrow;
    if (this.state.value != '') {
      narr.push({name: 'type', values: [this.state.value]});
      // narr.push(this.state.value);
      this.setState({'narrow': narr});
    }
    if (this.state.region != '') {
      narr.push({name: 'region', values: [this.state.region]});
      // narr.push(this.state.value);
      this.setState({'narrow': narr});
    }
    if (this.state.country != '') {
      narr.push({name: 'country', values: [this.state.country]});
      // narr.push(this.state.value);
      this.setState({'narrow': narr});
    }
    if (this.state.continent != '') {
      narr.push({name: 'continent', values: [this.state.continent]});
      // narr.push(this.state.value);
      this.setState({'narrow': narr});
    }
    if (this.state.country == '' && this.state.region == ''
        && this.state.continent == '') {
      this.setState({'narrow': []});
    }
    if (this.state.value == '') {
      console.log(this.state.value);
      this.setState({'narrow': []});
    }

    const tipFindRequest = {
      'requestType': 'find',
      'requestVersion': 4,
      'match': this.state.search,
      'limit': this.state.limit,
      'narrow': this.state.narrow,
      'found': 0,
      'places': this.state.findPlaces,
    };
    sendServerRequestWithBody('find', tipFindRequest,
        this.props.settings.serverPort).then((response) => {
      if (response.statusCode >= 200 && response.statusCode <= 299) {
        this.setState({findPlaces: response.body.places});
      }
    });
  }

  addAllRow() {
    let data = this.props.itinerarySave.places.slice();
    for (let i = 0; i < this.state.findPlaces.length; i++) {
      data.push(this.state.findPlaces[i]);
    }
    this.props.updateSave('places', data);
  };

  // Credit given to https://codesandbox.io/s/03x3r0vx1l for the react table
  createRTable() {
    return (<div>
          <ReactTable
              data={this.state.findPlaces}
              columns={[
              {
                  Header: 'Add',
                  id: 'add',
                  accessor: str => 'add',
                  Cell: (row) => (
                      <span style={{
                          cursor: 'pointer',
                          color: 'blue',
                          textDecoration: 'underline',
                      }}
                            onClick={() => {
                                let data = this.props.itinerarySave.places.slice();
                                data.push(row.original);
                                this.props.updateSave('places', data);
                            }}>
                            Add
                            </span>
                  ),
              },
                {
                  Header: 'Name',
                  accessor: 'name',
                  minWidth: 250,
                },
                {
                  Header: 'Latitude',
                  accessor: 'latitude',
                  minWidth: 100,
                },
                {
                  Header: 'Longitude',
                  accessor: 'longitude',
                  minWidth: 100,
                }
              ]}
              defaultPageSize={10}
          />
        </div>
    );
  }

}