const fs = require('fs');
const gm = require('gm');

const findHighestDivisbleValue = require('../lib/findHighestDivisbleValue');
const getAxisData = require('../lib/getAxisData');
const calculatePlotPoints = require('../lib/calculatePlotPoints');

function ScatterPlot(data) {

	/*
		gm uses a cooridinate plane where 0 starts at the top left corner
	*/
	const imgWidth = 800;
	const imgHeight = 500;

	const yScale = 5;
	const xScale = 8;
	const bgColor = '#efefef';

	const yAxisCoords = [100, 50, 100, 450];
	const xAxisCoords = [100, 450, 700, 450];

	let self = this;
	self.data = data;

	self.findHighestXYValues = (scatterPlotData) => {
		let coordData = scatterPlotData;
		let highestXvalue = 0;
		let highestYvalue = 0;
		for(let i = 0; i < coordData.length; i++) {
			if(coordData[i].x > highestXvalue){
				highestXvalue = coordData[i].x;
			}

			if(coordData[i].y > highestYvalue){
				highestYvalue = coordData[i].y;
			}
		}
		return [highestXvalue, highestYvalue];
	}

	self.init = (resolve, reject) => {
		let xyHighestInputValues = self.findHighestXYValues(self.data.data);
		console.log(xyHighestInputValues);
		let HighestDivisbleValues = [
			findHighestDivisbleValue(xyHighestInputValues[0], xScale),
			findHighestDivisbleValue(xyHighestInputValues[1], yScale)
		];

		let image = gm(imgWidth, imgHeight, bgColor)
		// 0 point
		.drawText(90, 455, '0')
		//title
		.drawText(350, 25, self.data.title)
		// y axis title
		.drawText(10, 250, self.data.y)
		// x axis title
		.drawText(400, 485, self.data.x)
		.drawLine(...yAxisCoords)
		.drawLine(...xAxisCoords);

		let yAxisData = getAxisData(yAxisCoords, yScale, HighestDivisbleValues[1]);
		let xAxisData = getAxisData(xAxisCoords, xScale, HighestDivisbleValues[0]);
		
		console.log(yAxisData, xAxisData);
		for(let i = 0; i < yAxisData.length; i++){
			image.drawText(55, (yAxisCoords[3] - yAxisData[i].point) + 5, yAxisData[i].key)
			image.drawLine(95, (yAxisCoords[3] - yAxisData[i].point), 105, (yAxisCoords[3] - yAxisData[i].point));
		}
		for(let i = 0; i < xAxisData.length; i++){
			image.drawText((xAxisData[i].point + xAxisCoords[0] - 3), 470, xAxisData[i].key)
			image.drawLine((xAxisCoords[0] + xAxisData[i].point), 445, (xAxisCoords[0] + xAxisData[i].point), 455);
		}

		console.log('plotting points');
		//let plotPoints = calculatePlotPoints(xAxisCoords, yAxisCoords, HighestDivisbleValues, self.data.data);

		image.write('./tmp/brandNewImg1.jpg', (err) => {
			if(err) {
				console.log(err)
				return reject({error: "this would be the error message"});
			}
			console.log('written')
			return resolve({link: 'this wwould be an s3 link'})
		})
	}

	return self;
}

module.exports = ScatterPlot;