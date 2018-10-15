const squareSum = (arr) => arr.reduce((squareSum, number) => {
		return squareSum + Math.pow(number, 2);
	}, 0);
module.exports = squareSum;
