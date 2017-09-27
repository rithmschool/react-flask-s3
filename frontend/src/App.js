import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getSignedRequest = this.getSignedRequest.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.state = {
      status: "Upload not started"
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const file = this.fileInput.files[0];
    if (!file) alert("no file selected!");
    this.getSignedRequest(file);
  }

  getSignedRequest(file) {
    axios
      .get(`${BASE_URL}/sign-s3`, {
        params: {
          "file-name": file.name,
          "file-type": file.type
        }
      })
      .then(response => {
        console.log("signd request complete!", response);
        this.setState({ status: "Starting Upload!" });
        this.uploadFile(file, response.data.data, response.data.url);
      })
      .catch(err => console.log(err));
  }

  uploadFile(file, s3Data, url) {
    const formData = new FormData();
    for (let key in s3Data.fields) {
      formData.append(key, s3Data.fields[key]);
    }
    formData.append("file", file);
    axios
      .post(s3Data.url, formData, {
        headers: {
          "x-amz-acl": "public-read"
        }
      })
      .then(response => {
        this.setState({ status: "Upload Complete!" });
        console.log("upload successful!", response);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Please upload a video!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="file"
            id="file-input"
            ref={input => (this.fileInput = input)}
          />
          <input type="submit" value="Add Video" />
          <h2 id="status">{this.state.status}</h2>
        </form>
      </div>
    );
  }
}

export default App;
