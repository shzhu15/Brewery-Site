import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Pane from '../Pane';
import Cat from './cat.jpg';
import Will from './Domier_Will.jpg';
import Mike from './MichaelAboutPicture.jpg';
import William from './WilliamScarbro.jpg';
import Sharon from './Sharon_PCMR_1-18-19.jpg';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

export default class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Container>
          <Row>
            <Col>
              {this.heading()}
            </Col>
            <Col xs={12} sm={6}>
              {this.teamMascot()}
            </Col>
          </Row>
          <Col>
            {this.renderMap()}
          </Col>
          <Row>
            {this.createFormWilliam('William')}
            {this.createFormMichael('Michael')}
            {this.createFormWill('Will')}
            {this.createFormSharon('Sharon')}
          </Row>
        </Container>
    );
  }

  heading() {
    return (
        <Pane header={'Team Bio'}>
          <div>We are four CS students currently taking CS314.
            We are currently working together on the project for
            CS314.
          </div>
        </Pane>

    );
  }

  teamMascot() {
    return (
        <Pane header={'Team Mascot'}>
          <img src={Cat} width='300' height='250'/>
        </Pane>
    );
  }

  createFormWilliam(name) {
    return (
        <Container>
          <img src={William}
               style={{width: 300}, {height: 250}}/>
          <Pane header={name}>
            <div>{'I am a second year student from Golden, CO. I enjoy mountain biking and hiking.'
            +
            ' In my free time I hang with friends, do math, or fix my bike. ' +
            'I have gone on several long distance bike tours with my father and I worked on a trail crew in the Rawah Wilderness '
            +
            'the summer after high school.'}
            </div>
          </Pane>

        </Container>
    );
  }

  createFormMichael(name) {
    return (
        <Container>
          <img src={Mike}
               style={{width: 300}, {height: 250}}/>
          <Pane header={name}>
            <div>
              {'The name\'s Chaney. Michael Chaney. Programming and music are my passions,'
              +
              ' and I have a tattoo on my left arm with a music player\'s controls to reflect that. '
              +
              '   My dad likes to call me a VHS player because of that. I play Alto Sax in the CSU marching band.'
              +
              ' I like pina coladas, getting caught in the rain. And I picked Bulbasaur :/'}
            </div>
          </Pane>
        </Container>
    );
  }

  createFormWill(name) {
    return (
        <Container>
          <img src={Will}
               style={{width: 300},{height: 250}}/>
          <Pane header={name}>
            <div>
              {'I am a 3rd year Computer Science student. ' +
              'I am originally from California but I have lived in Colorado for the last 7 years. '
              +
              'I love skiing, fly fishing, motorcycles and just being outdoors. '
              +
              'I am also a sprinter on the track and field team here at CSU.'}
            </div>
          </Pane>
        </Container>
    );
  }

  createFormSharon(name) {
    return (
        <Container>
          <img src={Sharon}
               style={{height: 200}}/>
          <Pane header={name}>
            <div>
              {'I am currently a 4th year Computer Science student.' +
              'I am from Utah, where I grew up in a ski town. In my free time I like to hangout with friends,'
              +
              ' playing video games or in the winter go snowboarding.'}
            </div>
          </Pane>
        </Container>
    );
  }

  renderMap() {
    return (
        <Pane header={'Where are we from?'}>
          <div>
            <p>{this.renderLeafletMap()}</p>
          </div>
        </Pane>
    );
  }

  renderLeafletMap() {
    return (
        <Map center={this.centerCoordinates()} zoom={4.5}
             style={{height: 500, maxwidth: 700}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <Marker position={this.sharonCoordinates()}
                  icon={this.markerIcon()}>
            <Popup className="font-weight-extrabold">Park City, UT</Popup>
          </Marker>
          <Marker position={this.willCoordinates()}
                  icon={this.markerIcon()}>
            <Popup className="font-weight-extrabold">Sunnyvale, CA</Popup>
          </Marker>
          <Marker position={this.michaelCoordinates()}
                  icon={this.markerIcon()}>
            <Popup className="font-weight-extrabold">Longmont "The Shithole",
              CO</Popup>
          </Marker>
          <Marker position={this.williamCoordinates()}
                  icon={this.markerIcon()}>
            <Popup className="font-weight-extrabold">Golden, CO</Popup>
          </Marker>
        </Map>
    );
  }

  centerCoordinates() {
    return L.latLng(39.246080, -113.510838);
  }

  sharonCoordinates() {
    return L.latLng(40.646061, -111.497971);
  }

  willCoordinates() {
    return L.latLng(37.363176, -122.037813);
  }

  michaelCoordinates() {
    return L.latLng(40.1852054, -105.1231305);
  }

  williamCoordinates() {
    return L.latLng(39.754185, -105.230484);
  }

  markerIcon() {
    return L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconAnchor: [12, 40],
    });
  }
}
