import { Component } from 'react';

import Section from './Section';

export default class ReverseEngineering extends Section {
  constructor(props) {
    var body = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam? Ullam nam natus, soluta sed optio dolorem veritatis possimus numquam, suscipit nihil modi cupiditate! Voluptatum sint quis in perferendis necessitatibus.";
    super(props, "Reverse Engineering", body, "left");
  }
}