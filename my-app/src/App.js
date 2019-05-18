import React, { Component } from "react";
import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage
} from "react-chat-widget";

import "react-chat-widget/lib/styles.css";

// import logo from "./logo.svg";

const axios = require("axios");

class App extends Component {
  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
  }

  handleNewUserMessage = newMessage => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    axios
      .post("http://localhost:9000/ask", {
        q: newMessage
      })
      .then(res => addResponseMessage(res.data._text))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          // profileAvatar={logo}
          title="My new awesome title"
          subtitle="And my cool subtitle"
        />
      </div>
    );
  }
}

export default App;
