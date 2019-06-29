module.exports = (xAxisCoords, yAxisCoords, peakXYValues, data) => {
	// left, top, right, bottom
	let plotPoints = [];
	const x = {
		start: xAxisCoords[0],
		stop: xAxisCoords[2],
		pixelRange: function() {return this.stop - this.start}
	};
	const y = {
		start: yAxisCoords[1],
		stop: yAxisCoords[3],
		pixelRange: function() {return this.stop - this.start}
	};
	const peakXValue = peakXYValues[0];
	const peakYValue = peakXYValues[1];

	for(let i = 0; i < data.length; i++){
		// percent of total for x
		let xPercent = data[i].x / peakXValue;
		// percent of total for y
		let yPercent = data[i].y / peakYValue;
		// convert percent to pixel translation
		let xyCoords = {
			x: xPercent * x.pixelRange(),
			y: yPercent * y.pixelRange()
		};
		xyCoords.x += x.start;
		xyCoords.y = y.stop - xyCoords.y;
		plotPoints.push(xyCoords)
		// flip the value to go from bottom left for Y
		// save the values to plotPoints array
	}
	return plotPoints
};