import React, { Component } from 'react';
import styles from './App.module.css';
import DrawFrame from './app/DrawFrame';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <DrawFrame />
      </div>
    );
  }
}

export default App;
