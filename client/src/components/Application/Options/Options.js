import React, {Component} from 'react';
import {Button, Col, Container, Input, Row} from 'reactstrap';
import Pane from '../Pane';
import Units from './Units';

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Distance object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
export default class Options extends Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);

    this.state = {
      name: '',
      radius: 0,
    };
  }

  render() {
    return (
        <Container>
          <Row>
            <Col xs="12">
              {this.heading()}
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="6" lg="4" xl="3">
              <Units options={this.props.options}
                     activeUnit={this.props.options.activeUnit}
                     updateOption={this.props.updateOption}/>
            </Col>
            <Col xs="12" sm="12" md="6" lg="4" xl="3">
              {this.newUnit()}
            </Col>
          </Row>
        </Container>
    );
  }

  heading() {
    return (
        <Pane header={'Options'}>
          <div>
            <p>Select ...</p>
          </div>
        </Pane>
    );
  }

  newUnit() {
    let updateStateNameOnChange = (event) => {
      this.setState({'name': event.target.value});
    };
    let updateStateRadiusOnChange = (event) => {
      this.setState({'radius': event.target.value});
    };
    return (
        <Pane header={'New Unit'}>
          <div>
            <Input type="name" name="name" id="exname" placeholder="Name"
                   onChange={updateStateNameOnChange}/>
            <Input type="radius" name="radius" id="exradius"
                   placeholder="Radius" onChange={updateStateRadiusOnChange}/>
            <Button onClick={this.add}>Add new unit</Button>
          </div>
        </Pane>
    );
  }

  add() {
    let nUnit = Object.assign({}, this.props.options.units);
    let objectSize = Object.keys(nUnit).length;
    let nInput = this.state.name;
    nUnit[nInput] = this.state.radius;
    this.props.updateOption('units', nUnit);

  }

}
