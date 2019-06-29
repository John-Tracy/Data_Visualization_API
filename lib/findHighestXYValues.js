module.exports = () => {
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