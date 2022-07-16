import React, {Component} from 'react';
import {Button, Col, Container, Form, Input, Row} from 'reactstrap';
import {sendServerRequestWithBody} from '../../../api/restfulAPI';
import Pane from '../Pane';
import 'magellan-coords';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import validate from '../Validator/Validator.js';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const magellan = require('magellan-coords');

export default class Calculator extends Component {
  constructor(props) {
    super(props);

    this.calculateDistance = this.calculateDistance.bind(this);
    this.createInputField = this.createInputField.bind(this);
    this.configRequest = this.configRequest.bind(this);

    this.state = {
      map: 'undefined',
      markersLayer: '',
    };
  }

  componentDidMount() {
    this.createMap();
  }

  componentDidUpdate(prevProps) {
    if (this.props.options.activeUnit !== prevProps.options.activeUnit) {
      this.calculateDistance();
    }
  }

  render() {
    return (
        <Container>
          {this.props.calcsave.errorMessage}
          <Col xs={12} sm={12} md={7} lg={8} xl={9}>
            {this.createHeader()}
          </Col>
          <Row>
            <Col xs={12} sm={6} md={4} lg={3}>
              {this.createForm('origin')}
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              {this.createForm('destination')}
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              {this.createDistance()}
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={7} lg={8} xl={9}>
              {this.renderMap()}
            </Col>
          </Row>
        </Container>
    );
  }

  createHeader() {
    return (
        <Pane header={'Calculator'}>
          <div>
            <div>Determine the distance between the origin and
              destination.
              Change the units on the <b>Options</b> page.
            </div>
          </div>
        </Pane>
    );
  }

  renderMap() {
    return (
        <Pane header={'Where do you want to go?'}>
          <div id="calculator-map" style={{height: 500, maxwidth: 700}}>
          </div>
        </Pane>
    );
  }

  createMap() {
    let map = L.map('calculator-map').setView([40.576179, -105.080773], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
    }).addTo(map);
    this.state.map = map;
  }

  updateMap() {

    if (this.state.map == 'undefined') {
      return;
    }

    var lat = new RegExp(/^([-+]?)([\d]{1,2})(((\.)(\d+))?)/);
    var long = new RegExp(/^([-+]?)([\d]{1,3})(((\.)(\d+))?)/);

    if (lat.exec(this.props.calcsave.origin.latitude) == null){
      return;
    }

    if (lat.exec(this.props.calcsave.destination.latitude) == null){
      return;
    }

    if (long.exec(this.props.calcsave.origin.longitude) == null){
      return;
    }

    if (long.exec(this.props.calcsave.destination.longitude) == null){
      return;
    }



    var map = this.state.map;

    if (typeof (this.state.markerLayer) != 'undefined') {
      map.removeLayer(this.state.markerLayer);
    }

    var marker1 = L.marker([
      this.props.calcsave.origin.latitude,
      this.props.calcsave.origin.longitude], {icon: this.markerIcon()});
    var marker2 = L.marker([
      this.props.calcsave.destination.latitude,
      this.props.calcsave.destination.longitude], {icon: this.markerIcon()});

    var line = L.polygon([
      [
        this.props.calcsave.origin.latitude,
        this.props.calcsave.origin.longitude],
      [
        this.props.calcsave.destination.latitude,
        this.props.calcsave.destination.longitude]]);

    let markers = [];

    markers.push(marker1);
    markers.push(marker2);
    marker1.addTo(map);
    marker2.addTo(map);
    line.addTo(map);
    markers.push(line);

    var markerLayer = L.layerGroup(markers);
    map.addLayer(markerLayer);
    this.state.markerLayer = markerLayer;
    let group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds());

  }

  markerIcon() {
    return L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconAnchor: [12, 40],
    });
  }

  createInputField(stateVar, coordinate) {
    let updateStateVarOnChange = (event) => {
      this.props.updateLocation(stateVar, event.target.name,
          event.target.value);
    };

    let capitalizedCoordinate = coordinate.charAt(0).toUpperCase()
        + coordinate.slice(1);
    return (
        <Input name={coordinate} placeholder={capitalizedCoordinate}
               id={`${stateVar}${capitalizedCoordinate}`}
               value={this.props.calcsave[stateVar][coordinate]}
               onChange={updateStateVarOnChange}
               style={{width: '100%'}}/>
    );

  }

  createForm(stateVar) {
    return (
        <Pane header={stateVar.charAt(0).toUpperCase() + stateVar.slice(1)}>
          <Form>
            {this.createInputField(stateVar, 'latitude')}
            {this.createInputField(stateVar, 'longitude')}
          </Form>
        </Pane>
    );
  }

  createDistance() {
    if (this.props.calcsave.distance != 0) {
      this.updateMap();
    }
    return (
        <Pane header={'Distance'}>
          <div>
            <h5>{this.props.calcsave.distance} {this.props.options.activeUnit}</h5>
            <Button onClick={this.calculateDistance}>Calculate</Button>
          </div>
        </Pane>
    );
  }

  configRequest() {
    const tipConfigRequest = {
      'requestType': 'distance',
      'requestVersion': 5,
      'origin': {
        'latitude': magellan(this.props.calcsave.origin.latitude).toDD(),
        'longitude': magellan(this.props.calcsave.origin.longitude).toDD(),
      },
      'destination': {
        'latitude': magellan(this.props.calcsave.destination.latitude).toDD(),
        'longitude': magellan(this.props.calcsave.destination.longitude).toDD(),
      },
      'earthRadius': this.props.options.units[this.props.options.activeUnit],
    };

    return tipConfigRequest;
  }

  calculateDistance() {
    let tipConfigRequest = this.configRequest();

    sendServerRequestWithBody('distance', tipConfigRequest,
        this.props.settings.serverPort).then((response) => {
      if (!validate(response.body, 'distanceResponse')) {
        return;
      }
      if (response.statusCode >= 200 && response.statusCode <= 299) {
        this.props.updateCalc('distance', response.body.distance);
        this.props.updateCalc('errorMessage', null);
      } else {
        var message = '';
        if (response.statusCode == 400) {
          message = ' Please enter a valid longitude and latitude.';
        }
        this.props.updatecalcSave('errorMessage', this.props.createErrorBanner(
            response.statusText,
            response.statusCode,
            `Request to ${this.props.settings.serverPort} failed. ${message}`,
            ),
        );
      }
    });
  }
}
