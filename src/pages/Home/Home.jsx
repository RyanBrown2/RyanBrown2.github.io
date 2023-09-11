import { Component } from "react";
import Hero from "./components/Hero/Hero";
import { Container } from "react-bootstrap";
import Sections from "./components/Sections/Sections";
import Footer from "../../components/Footer/Footer";
import Background from "../../components/Background/Background";

import Experience from "./components/Experience/Experience";

export default class HomePage extends Component {
  render() {
    return (
      <>
        <Container fluid>
          <Hero />
          <Sections />
          <Footer />
        </Container>
        {/* <Background /> */}
      </>
    )
  }
}