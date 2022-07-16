import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import './react-table.css';
import ReactTable from 'react-table';

export default class Legs extends Component {
  constructor(props) {
    super(props);

    this.createRTable = this.createRTable.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);

    this.state = {
      name: '',
      latitude: 0,
      longitude: 0,
      showMenu: false,
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
    this.createRTable();

  }

  componentDidMount() {
    this.createRTable();
  }

  render() {
    return (
        <Container>
          <Row>
            <Col>
                <h5>Total Distance: {this.props.itinerarySave.total} {this.props.options.activeUnit}</h5>
                {this.createRTable()}
            </Col>

          </Row>


        </Container>
    );
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
        document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
    });
  }

  toggleColumn(option) {
    let toggleCopy = Object.assign({}, this.state.toggle);
    toggleCopy[option] = !this.state.toggle[option];
    this.setState({'toggle': toggleCopy});
  }

  // Credit given to https://codesandbox.io/s/03x3r0vx1l for the react table
  // Credit given to https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe for dropdown
  createRTable() {
    return( <div>
            <div>
                <button onClick={this.showMenu}>Toggles</button>
                {
                    this.state.showMenu
                        ? (
                            <div className="menu">
                                <button onClick={() => this.toggleColumn('name')}>Name</button> &nbsp;
                                <button onClick={() => this.toggleColumn('latitude')}>Latitude</button> &nbsp;
                                <button onClick={() => this.toggleColumn('longitude')}>Longitude</button> &nbsp;
                                <button onClick={() => this.toggleColumn('distance')}>Distance</button> &nbsp;
                                <button onClick={() => this.toggleColumn('cdistance')}>Cumulative Distance</button>
                            </div>
                        )
                        : (
                            null
                        )
                }
            </div>
          <ReactTable
              data={this.props.itinerarySave.places}
              columns={[
              {
                  Header: 'Swap',
                  id: 'swap',
                  accessor: str => 'swap',

                  Cell: (row) => (
                      <div>
                            <span style={{cursor: 'pointer', color: 'blue'}}
                                  onClick={() => {
                                      let data = this.props.itinerarySave.places;
                                      let temp = data[0];
                                      data[0] = row.original;
                                      data[row.index] = temp;
                                      this.props.updateSave('places', data);
                                  }}>
                            {'\uD83D\uDD1D'}
                            </span>
                          <span style={{cursor: 'pointer', color: 'green'}}
                                onClick={() => {
                                    let data = this.props.itinerarySave.places;
                                    if (row.index > 0) {
                                        let temp = data[row.index - 1];
                                        data[row.index - 1] = row.original;
                                        data[row.index] = temp;
                                    }
                                    this.props.updateSave('places', data);
                                }}>
                            {'\u2B06'}
                            </span>
                          <span style={{cursor: 'pointer', color: 'green'}}
                                onClick={() => {
                                    let data = this.props.itinerarySave.places;
                                    if (row.index != this.props.itinerarySave.places.length - 1) {
                                        let temp = data[row.index + 1];
                                        data[row.index + 1] = row.original;
                                        data[row.index] = temp;
                                    }
                                    this.props.updateSave('places', data);
                                }}>
                            {'\u2B07'}
                            </span>
                          <span style={{cursor: 'pointer', color: 'green'}}
                                onClick={() => {
                                    let data = this.props.itinerarySave.places;
                                    data[row.index].marker = !data[row.index].marker;
                                    this.props.updateSave('places', data);
                                }}>
                            {'\uD83D\uDCCD'}
                            </span>
                          <span style={{cursor: 'pointer', color: 'red'}}
                                onClick={() => {
                                    let data = this.props.itinerarySave.places;
                                    data.splice(row.index, 1);
                                    this.props.updateSave('places', data);
                                }}>
                            {'\u2715'}
                            </span>
                      </div>
                  ),
              },
                {
                  Header: 'Name',
                  accessor: 'name',
                  minWidth: 250,
                  show: this.state.toggle.name,
                },
                {
                  Header: 'Latitude',
                  accessor: 'latitude',
                  minWidth: 100,
                  show: this.state.toggle.latitude,
                },
                {
                  Header: 'Longitude',
                  accessor: 'longitude',
                  minWidth: 100,
                  show: this.state.toggle.longitude,
                },
                {
                  Header: 'Distance',
                  accessor: 'distance',
                  minWidth: 100,
                  show: this.state.toggle.distance,
                },
                {
                  Header: 'Cumulative Distance',
                  accessor: 'cdistance',
                  minWidth: 100,
                  show: this.state.toggle.cdistance,
                }
              ]}
              defaultPageSize={10}
          />
        </div>
    );
  }

}