/* service modules */
const scatterPlot = require('./scatter_plot');

/* 
	This exposes all the services as an object literal 
	each property will be revealed to users in the docs
*/
module.exports = {
	scatter_plot: scatterPlot
};