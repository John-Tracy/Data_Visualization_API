module.exports = (value, scale) => {
	if(value <= scale) {
		return scale;
	}

	if(value % scale === 0) {
		return value;
	}

	return value + (scale - (value % scale));
}