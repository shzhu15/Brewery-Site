import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import Pane from './Pane';

/*
 * Renders the home page.
 */
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      long: null,
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position => {
          this.setState(
              {lat: position.coords.latitude, long: position.coords.longitude});
        }, err => console.log(err),
    );
  }

  render() {
    return (
        <Container>
          <Row>
            <Col xs={12} sm={12} md={7} lg={8} xl={9}>
              {this.renderMap()}
            </Col>
            <Col xs={12} sm={12} md={5} lg={4} xl={3}>
              {this.renderIntro()}
            </Col>
          </Row>
        </Container>
    );
  }

  renderMap() {
    return (
        <Pane header={'Where Am I?'}>
          <div>
            <p>{this.renderLeafletMap()}</p>
          </div>
        </Pane>
    );
  }

  renderLeafletMap() {
    // initial map placement can use either of these approaches:
    // 1: bounds={this.coloradoGeographicBoundaries()}
    // 2: center={this.csuOvalGeographicCoordinates()} zoom={10}
    return (
        <Map center={this.csuOvalGeographicCoordinates()} zoom={10}
             style={{height: 500, maxwidth: 700}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <Marker position={this.currentCoords()}
                  icon={this.markerIcon()}>
            <Popup className="font-weight-extrabold">You are Here!</Popup>
          </Marker>
        </Map>
    );
  }

  renderIntro() {
    return (
        <Pane header={'Bon Voyage!'}>
          <div>
            <p>Let us help you plan your next trip.</p>
          </div>
        </Pane>
    );
  }

  coloradoGeographicBoundaries() {
    // northwest and southeast corners of the state of Colorado
    return L.latLngBounds(L.latLng(41, -109), L.latLng(37, -102));
  }

  csuOvalGeographicCoordinates() {
    return L.latLng(40.576179, -105.080773);
  }

  // Credit given to https://stackoverflow.com/questions/52564217/cant-return-jsx-with-geolocation-coordinates-in-react
  currentCoords() {
    if (this.state.lat == null && this.state.long == null) {
      return L.latLng(40.576179, -105.080773);
    } else {
      return L.latLng(this.state.lat, this.state.long);
    }
  }

  markerIcon() {
    // react-leaflet does not currently handle default marker icons correctly,
    // so we must create our own
    return L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconAnchor: [12, 40],  // for proper placement
    });
  }
}
