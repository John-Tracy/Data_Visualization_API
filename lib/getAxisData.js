/*
	getAxisData

	@params {array}
	@params {int}
	@params {int}
*/
module.exports = (lineCoords, count, maxNumber) => {
	console.log(lineCoords, count, maxNumber, '===')
	let div = maxNumber/count;
	let distance;
	if(lineCoords[0] === lineCoords[2]){
		distance = lineCoords[3] - lineCoords[1];
	} else if(lineCoords[1] === lineCoords[3]){
		distance = lineCoords[2] - lineCoords[0];
	} else {
		// this area would be reserved for diagonal lines
	}

	let returnObject = [];

	for(let i = 0; i < count; i++) {
		let keyName = div*(i+1);
		returnObject.push({
			key: keyName,
			point: ((keyName/maxNumber) * distance)
		})
	}

	return returnObject;

}