import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

// ----- Background -----
function configureBackground() {
	const footer = document.querySelector('#footer');
	const backgroundRoot = document.querySelector('#background');

	backgroundRoot.style.height = `${footer.offsetTop}px`;
	// footer.offsetTop;

	// get the height of the entire page
	var documentHeight = Math.max(
		document.body.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.clientHeight,
		document.documentElement.scrollHeight,
		document.documentElement.offsetHeight
	);
	
	backgroundRoot.style.height = `${documentHeight}px`;

	const backgroundContainer = document.querySelector('#background-container');
	backgroundContainer.textContent = '';

	createAtmosphere(backgroundContainer);
	// backgroundContainer.appendChild(atmosphere);
}

configureBackground();
window.addEventListener('resize', () => {
	configureBackground();
});

/**
 * Creates the atmosphere element
 * @param {HTMLDivElement} parent The parent element to append the atmosphere to
 * @returns {HTMLDivElement} The container element for the atmosphere
 */
function createAtmosphere(parent) {
	// const firstLayerPercent = 0.75;

	const atmosphereContainer = document.createElement('div');
	atmosphereContainer.classList.add('atmosphere-container');
	parent.appendChild(atmosphereContainer);

	console.log(`Atmospher Container Height: ${atmosphereContainer.offsetHeight}px`);

	// wait until footer is finished before implementing
	// createAtmosphereLayerElement(atmosphereContainer, 0.5);
}

/**
 * 
 * @param {HTMLDivElement} container the layer will be added to 
 * @param {*} heightPercent what percent of the page should the layer start at
 */
function createAtmosphereLayerElement(container, pagePercent = 0.5) {
	const layer = document.createElement('div');
	layer.classList.add('atmosphere-layer');

	const heightPercent = 1 - pagePercent;

	const layerRadius = container.offsetHeight * heightPercent;
	console.log(`Layer Radius: ${layerRadius}px`);


	layer.style.height = `${layerRadius*2}px`;
	layer.style.width = `${layerRadius*2}px`;
	// layer.style.width = 0;

	layer.style.backgroundColor = 'red';

	container.appendChild(layer);

	// return layer;
}
