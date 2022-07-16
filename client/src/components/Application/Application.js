import React, {Component} from 'react';
import {Container} from 'reactstrap';

import Home from './Home';
import Itinerary from './Itinerary/Itinerary';
import Options from './Options/Options';
import About from './About/About';
import Calculator from './Calculator/Calculator';
import Settings from './Settings/Settings';
import {getOriginalServerPort, sendServerRequest} from '../../api/restfulAPI';
import ErrorBanner from './ErrorBanner';
import validate from './Validator/Validator.js';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
export default class Application extends Component {
  constructor(props) {
    super(props);

    this.updatePlanOption = this.updatePlanOption.bind(this);
    this.updateClientSetting = this.updateClientSetting.bind(this);
    this.createApplicationPage = this.createApplicationPage.bind(this);
    this.updatecalcSave = this.updatecalcSave.bind(this);
    this.updateLocationOnChange = this.updateLocationOnChange.bind(this);
    this.updateitinerarySave = this.updateitinerarySave.bind(this);

    this.state = {
      serverConfig: null,
      planOptions: {
        units: {'miles': 3959.0, 'kilometers': 6371.0, 'nautical miles': 3440},
        activeUnit: 'miles',
      },
      calcSave: {
        origin: {latitude: '', longitude: ''},
        destination: {latitude: '', longitude: ''},
        distance: 0,
        errorMessage: null,
      },
      itinerarySave: {
        fileInput: '',
        map: 'undefined',
        markersLayer: '',
        requestType: 'itinerary',
        requestVersion: 5,
        options: {
          title: 'My Trip',
          earthRadius: '3958.761316',
          optimization: 'none',
        },
        places: [],
        total: 0,
        found: [],
        copyPlaces: [],
        distances: [],
      },
      clientSettings: {
        serverPort: getOriginalServerPort(),
      },
      errorMessage: null,
    };

    this.updateServerConfig();
  }

  render() {
    let pageToRender = this.state.serverConfig ? this.props.page : 'settings';

    return (
        <div className='application-width'>
          {this.state.errorMessage}{this.createApplicationPage(pageToRender)}
        </div>
    );
  }

  updateClientSetting(field, value) {
    if (field === 'serverPort') {
      this.setState({clientSettings: {serverPort: value}},
          this.updateServerConfig);
    } else {
      let newSettings = Object.assign({}, this.state.planOptions);
      newSettings[field] = value;
      this.setState({clientSettings: newSettings});
    }
  }

  updatePlanOption(option, value) {
    let optionsCopy = Object.assign({}, this.state.planOptions);
    optionsCopy[option] = value;
    this.setState({'planOptions': optionsCopy});
  }

  updatecalcSave(option, value) {
    let saveCopy = Object.assign({}, this.state.calcSave);
    saveCopy[option] = value;
    this.setState({'calcSave': saveCopy});
  }

  updateitinerarySave(option, value) {
    let saveCopy = Object.assign({}, this.state.itinerarySave);
    saveCopy[option] = value;
    this.setState({'itinerarySave': saveCopy});
  }

  updateLocationOnChange(stateVar, field, value) {
    let location = Object.assign({}, this.state.calcSave);
    location[stateVar][field] = value;
    this.setState({'calcSave': location});
  }

  updateServerConfig() {
    sendServerRequest('config', this.state.clientSettings.serverPort).
    then(config => {

      if (!validate(config.body, 'configResponse')) {
        console.log('bad config response');
        return;
      }

      console.log(config);
      this.processConfigResponse(config);
    });
  }

  createErrorBanner(statusText, statusCode, message) {
    return (
        <ErrorBanner statusText={statusText}
                     statusCode={statusCode}
                     message={message}/>
    );
  }

  renderItinerary() {
    return <Itinerary options={this.state.planOptions}
                      settings={this.state.clientSettings}
                      itinerarySave={this.state.itinerarySave}
                      updateSave={this.updateitinerarySave}
                      createErrorBanner={this.createErrorBanner}/>;
  }

  renderAbout() {
    return <About options={this.state.planOptions}
                  settings={this.state.clientSettings}
                  createErrorBanner={this.createErrorBanner}/>;
  }

  renderCalculator() {
    return <Calculator options={this.state.planOptions}
                       calcsave={this.state.calcSave}
                       settings={this.state.clientSettings}
                       updateLocation={this.updateLocationOnChange}
                       updateCalc={this.updatecalcSave}
                       createErrorBanner={this.createErrorBanner}/>;
  }

  renderOptions() {
    return <Options options={this.state.planOptions}
                    config={this.state.serverConfig}
                    updateOption={this.updatePlanOption}/>;

  }

  renderSettings() {
    return <Settings settings={this.state.clientSettings}
                     serverConfig={this.state.serverConfig}
                     updateSetting={this.updateClientSetting}/>;
  }

  createApplicationPage(pageToRender) {
    switch (pageToRender) {
      case 'itinerary':
        return this.renderItinerary();
      case 'about':
        return this.renderAbout();
      case 'calc':
        return this.renderCalculator();
      case 'options':
        return this.renderOptions();
      case 'settings':
        return this.renderSettings();
      default:
        return <Home/>;
    }
  }

  processConfigResponse(config) {
    if (config.statusCode >= 200 && config.statusCode <= 299) {
      console.log('Switching to server ', this.state.clientSettings.serverPort);
      this.setState({
        serverConfig: config.body,
        errorMessage: null,
      });
    } else {
      this.setState({
        serverConfig: null,
        errorMessage:
            <Container>
              {this.createErrorBanner(config.statusText, config.statusCode,
                  `Failed to fetch config from ${this.state.clientSettings.serverPort}. Please choose a valid server.`)}
            </Container>,
      });
    }
  }
}
