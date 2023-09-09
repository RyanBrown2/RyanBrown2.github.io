import { Component } from "react";
import { Col, Row } from "react-bootstrap";

export default class Section extends Component {
  constructor(params, title, alignment) {
    super(params);
    this.title = title;
    this.alignment = alignment;
  }
    
  render() {
    return (
      <Row>
        <Col lg={6} className={'section ' + this.alignment}>
          <div className="section-title">{this.title}</div>
        </Col>
      </Row>
      // <div>
      //   <h1>{this.title}</h1>
      // </div>
    );
  }
}