  import React, { Component } from 'react';
  import logo from './logo.svg';
  import './App.css';

  class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        translatedText: ''
      };

      this.state = {
        tabCreated: false // Declare your boolean variable in state
      };
    }

    componentDidMount() {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.message !== "text" && request.tabId) {
          this.setState({ translatedText: request.message });
        }
        if(request.tabId === 1) {
          this.setState({tabCreated: true});
        }
      });
    }

    render() {
      let message;
      if (this.state.tabCreated === true) {
        message = <p>tabben anses skapad av app.js</p>;
      } else {
        message = <p>tabben anses ej skapad av app.js</p>;
      }


      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to da translation station biotch!</h2>
            <p>{this.state.translatedText}</p>
            <p>message</p>
          </div>
        </div>
      );
    }
  }

  export default App;
