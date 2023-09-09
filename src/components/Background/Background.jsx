import { Component, useEffect, useRef } from "react"
import { BackgroundStyled, BackgroundContainerStyled } from "./styles/BackgroundStyled"

export default class Background extends Component {

	constructor(props) {
		super(props)
		this.state = {
			pageHeight: Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.documentElement.clientHeight,
				// document.documentElement.scrollHeight,
				document.documentElement.offsetHeight
			)
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize)
		window.addEventListener('scroll', this.handleScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize)
		window.removeEventListener('scroll', this.handleScroll)
	}

	getPageHeight = () => {
		return Math.max(
			document.body.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.clientHeight,
			// document.documentElement.scrollHeight,
			document.documentElement.offsetHeight
		);
	}

	handleScroll = () => {
		this.setState({pageHeight: this.getPageHeight()});
		window.removeEventListener('scroll', this.handleScroll)
	}

	handleResize = () => {
		this.setState({pageHeight: this.getPageHeight()});
  };

	render() {
		const { pageHeight } = this.state
		return (
			<BackgroundStyled style={{height: `${pageHeight}px`}}>
				<BackgroundContainerStyled />
			</BackgroundStyled>
		)
	}
}