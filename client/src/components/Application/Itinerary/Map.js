import React, {Component} from 'react';
import {Button} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './react-table.css';
import L from 'leaflet';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.invalidate = this.invalidate.bind(this);
    this.clear = this.clear.bind(this);
    this.updateMap = this.updateMap.bind(this);

    this.state = {
      name: '',
      latitude: 0,
      longitude: 0,
      toggle: {
        city: true,
        name: true,
        latitude: true,
        longitude: true,
        distance: true,
        cdistance: true,
      },
    };
  }

  componentWillMount() {
    // this.createMap();
    this.updateMap();

  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props.itinerarySave) {
      this.updateMap();
    }
  }

  componentDidMount() {
    this.createMap();
    this.updateMap();
  }

  render() {
    return (
        <div>
          <Button onClick={this.clear}>Clear Markers</Button>
          {this.renderMap()}
        </div>
    );
  }

  renderMap() {
    return (
        <div id="itinerary-map" style={{height: 500, maxwidth: 700}}>
        </div>
    );
  }

  clear() {
    let data = this.props.itinerarySave.places;
    for (let i = 0; i < this.props.itinerarySave.places.length; i++) {
      data[i].marker = false;
    }
    this.props.updateSave('places', data);
    this.updateMap();
  }

  markerIcon() {
    return L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconAnchor: [12, 40],
    });
  }

  streets() {
    return L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
        });
  }

  createMap() {
    var streets = this.streets();
    var topo = this.topo();
    var old = this.old();
    var map = L.map('itinerary-map', {
      center: [41.38, 2.17],
      zoom: 13,
      layers: [streets],
    });
    var baseMaps = {
      'Streets': streets,
      'Topographical': topo,
      'Terrain': old,
    };
    L.control.layers(baseMaps).addTo(map);
    this.props.itinerarySave.map = map;
  }



  topo(){
    return L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
         maxZoom: 17,
         attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
         });
  }

  old(){
    return L.tileLayer(
        'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}',
        {
          attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: 'abcd',
          minZoom: 0,
          maxZoom: 18,
          ext: 'png',
        });
  }

  invalidate() {
    this.props.itinerarySave.map.invalidateSize();
    this.updateMap();
  }

  updateMap() {
      if (this.props.itinerarySave.map == 'undefined') {
        return;
      }
      if (typeof (this.props.itinerarySave.markerLayer) != 'undefined') {
        this.props.itinerarySave.map.removeLayer(
            this.props.itinerarySave.markerLayer);
      }
      if (this.props.itinerarySave.places.length == 0) {
        return;
      }
      var map = this.props.itinerarySave.map;
      if(this.props.itinerarySave.places.length == 1){
        this.onePlaceCase();
        return;
      }
      var markers = this.createMarkers();

      this.addStartAndEnd(markers);
      var group = new L.featureGroup(markers);
      var markerLayer = L.layerGroup(markers);
      map.addLayer(markerLayer);
      this.props.itinerarySave.markerLayer = markerLayer;
      map.fitBounds(group.getBounds());
  }
  onePlaceCase() {
      if (this.props.itinerarySave.map == 'undefined') {
          return;
      }
      if (typeof (this.props.itinerarySave.markerLayer) != 'undefined') {
          this.props.itinerarySave.map.removeLayer(
              this.props.itinerarySave.markerLayer);
      }
      if (this.props.itinerarySave.places.length == 0) {
          return;
      }

      if (this.props.itinerarySave.places.length == 1) {
          console.log("start");
          var map = this.props.itinerarySave.map;
          var markers = [];
          var myIcon = this.markerIcon();
          var zeroPlace = this.props.itinerarySave.places[0];
          var mark = L.marker([zeroPlace.latitude, zeroPlace.longitude], {icon: myIcon});
          markers.push(mark);
          mark.addTo(map).bindPopup(zeroPlace.name);
          var latLongs = [mark.getLatLng()];
          var markerBounds = L.latLngBounds(latLongs);
          map.fitBounds(markerBounds);
          console.log("finish");
      }
  }
  addStartAndEnd(markers){
     var map = this.props.itinerarySave.map;
     var myIcon = this.markerIcon();
     var start = L.marker([this.props.itinerarySave.places[0].latitude, this.props.itinerarySave.places[0].longitude],{icon:myIcon});
     markers.push(start);
     var length = this.props.itinerarySave.places.length;
     var end = L.marker([this.props.itinerarySave.places[length-1].latitude, this.props.itinerarySave.places[length-1].longitude],{icon:myIcon});
     markers.push(end);
     start.addTo(map).bindPopup(this.props.itinerarySave.places[0].name);
     end.addTo(map).bindPopup(this.props.itinerarySave.places[length-1].name);
  }
  createMarkers(){
    var map = this.props.itinerarySave.map;
    var markers = [];
    for (var i = 0; i < this.props.itinerarySave.places.length - 1; i++) {
      var myIcon = this.markerIcon();
      if (this.props.itinerarySave.places[i].marker == true) {
        var mark = L.marker([
          this.props.itinerarySave.places[i].latitude,
          this.props.itinerarySave.places[i].longitude], {icon: myIcon});
        markers.push(mark);
        mark.addTo(map).bindPopup(this.props.itinerarySave.places[i].name);
      }

      var line = L.polygon([
        [
          this.props.itinerarySave.places[i].latitude,
          this.props.itinerarySave.places[i].longitude],
        [
          this.props.itinerarySave.places[i + 1].latitude,
          this.props.itinerarySave.places[i + 1].longitude]]);

      markers.push(line);
      line.addTo(map);
    }
    return markers;
  }
}
