import { Component } from "react";
import { Col, Row } from "react-bootstrap";

export default class Section extends Component {
  constructor(params, title, body, alignment) {
    super(params);
    this.title = title;
    this.body = body;
    this.alignment = alignment;
  }

    
  render() {
    if (this.alignment === "left") return (
      <Row>
        <Col lg={6} className={'section ' + this.alignment}>
          <div className="section-title">{this.title}</div>
          <div className="section-text">{this.body}</div>
        </Col>
        
      </Row>
    );
    return (
      <Row>
        <Col lg={6} className={'section ' + this.alignment}>
          <div className="section-title">{this.title}</div>
          <div className="section-text">{this.body}</div>
        </Col>
      </Row>
    );

  }
}