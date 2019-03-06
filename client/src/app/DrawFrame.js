import React, { Component } from 'react';
import axios from 'axios';
import styles from './DrawFrame.module.css';

class DrawFrame extends Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    this.state = {
      diagramList: [],
      currentDiagram: '',
      xmlContent: {}
    };
  }

  async componentDidMount() {
    window.addEventListener('message', this.handleDrawIOEvent);

    await axios.get('//0.0.0.0:5000/').then(response => {
      if (response.data) {
        Object.keys(response.data).forEach(key => {
          this.setState((state, props) => {
            let stateChange = {...state};
            stateChange.diagramList.push(key);
            stateChange.xmlContent[key] = '';
            stateChange.currentDiagram = key
            return stateChange;
          });
        });
      }
      else {
        throw(new Error('Server failed to return list of available diagrams!'));
      }
    });

    this.state.diagramList.forEach(async diagram => {
      const url = `//0.0.0.0:5000/diagrams/${diagram}.xml`;

      await axios.get(url).then(response => {
        this.setState((state, props) => {
          let stateChange = {...state};
          stateChange.xmlContent[diagram] = response.data;
          return stateChange;
        });
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleDrawIOEvent);
  }

  render() {
    return (
      <div>
        <iframe src="//0.0.0.0:8080?embed=1&spin=1&modified=unsavedChanges&proto=json" className={styles.iframe} title="draw.io" ref={f => (this._iframe = f) } />
      </div>
    );
  }

  handleDrawIOEvent = evt => {
    const msg = evt.data.length > 0 ? JSON.parse(evt.data) : undefined;

    if (msg) {
      switch (msg.event) {
        case 'init': {
          this.sendDiagramXMLToDrawIO();
          break;
        }
        case 'save': {
          this.saveXMLToFile(msg.xml);
          break;
        }
        case 'export': {
          this.saveXMLToFile(msg.xml);
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  sendDiagramXMLToDrawIO = () => {
    const {xmlContent, currentDiagram} = this.state;

    this._iframe.contentWindow.postMessage(JSON.stringify(
      {action: 'load', xml: xmlContent[currentDiagram]}
    ), '*');
  }

  saveXMLToFile = xml => {
    const {currentDiagram} = this.state;

    axios.post('//0.0.0.0:5000/', {
      diagram: currentDiagram,
      xml
    });
  }
}

export default DrawFrame;
