import { Component } from "react";
import { Col, Row } from "react-bootstrap";

import "./style.css";

export default class Hero extends Component {
	render() {
		return (
			<div id="hero">

				{/* Main Title Bar */}
				<div className="d-none d-sm-block">
					<Row className="hero-header">
						<Col sm={6}>
							<h1 className="hero-main-primary">Ryan Brown</h1>
							<p className="hero-main-secondary">Experienced Programmer</p>
						</Col>
						<Col sm={6} className="hero-secondary my-auto">
							Porfolio Building In-Progress
						</Col>
					</Row>
				</div>

				{/* Mobile Title Bar */}
				<div className="hero-header d-block d-sm-none">
					<Row className="hero-main-primary">Ryan Brown</Row>
					<Row className="hero-main-secondary">Experienced Programmer</Row>
					<Row className="hero-secondary">Porfolio Building In-Progress</Row>
				</div>
				

				<Row className="hero-description">
				Greetings! I'm Ryan, a passionate and dedicated programmer with an exciting journey spanning over 8 years in the realm of code. My insatiable curiosity and love for problem-solving have led me to explore a diverse range of programming languages and projects that have shaped me into the programmer I am today.	
				</Row>

				<Row id="about-me">
					<Col lg={4}>
						<div className="about-me-panel">
							<div className="panel-title">Experience and Expertise</div>
							<div className="panel-text">
								Throughout my journey, I've dived deep into various programming languages, including Java, C++, Python, NodeJS, and even ventured into low level Assembly. This multifaceted experience has equipped me with a comprehensive skill set that allows me to approach challenges from different angles.
							</div>
						</div>
					</Col>
					<Col lg={4}>
						<div className="about-me-panel">
							<div className="panel-title">Entrepreneurial Flair</div>
							<div className="panel-text">
								What sets me apart is not just my technical prowess, but also my entrepreneurial spirit. I have a keen eye for opportunities, an instinct to innovate, and the drive to bring ideas to life. My entrepreneurial skills have enabled me to not only build elegant solutions, but also to see them through from conception to fruition.
							</div>
						</div>
					</Col>
					<Col lg={4}>
						<div className="about-me-panel">
							<div className="panel-title">Dedication to Learning</div>
							<div className="panel-text">
								In this fast-paced world of technology, I believe that learning is a lifelong journey. Every challenge, every project, and every line of code is an opportunity to learn and grow. I approach each new endeavor with enthusiasm, 
								knowing that as I develop projects, I am also furthering my capabilities.
							</div>
						</div>
					</Col>
				</Row>

				<Row className="hero-footer">
					As you browse through my portfolio, you'll discover a chronicle of my experiences, a showcase of my skills, and a testament to my commitment to the world of computer programming.
				</Row>

			</div>
		)
	}
}