import { Component } from "react";
import ReverseEngineering from "./components/ReverseEngineering";
import WebDevelopment from "./components/WebDevelopment";

import "./style.css";
import AI from "./components/AI";
import Robotics from "./components/Robotics";

export default class Sections extends Component {
  render() {
    return (
      <div id="sections">
        <ReverseEngineering />
        <WebDevelopment />
        <AI />
        <Robotics />
      </div>
    );
  }
}