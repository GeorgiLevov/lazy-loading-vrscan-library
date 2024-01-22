export const random = (min, max) =>
	Math.floor(Math.random() * (max - min)) + min;
export const dedupeArray = (array) =>
	array.filter((value, index) => array.indexOf(value) === index);

const range = (start, end, step = 1) => {
	let output = [];

	if (typeof end === 'undefined') {
		end = start;
		start = 0;
	}
	for (let i = start; i < end; i += step) {
		output.push(i);
	}
	return output;
};

export const capitalize = (word = '') =>
	// prettier-ignore
	word.length 
    ? word[0].toUpperCase() + word.substring(1) 
    : word;

export const insertItemAtIndex = (array, index, item) => {
	if (index < 0 || index > array.length) {
		console.error('Index out of bounds for array');
		return array;
	}

	// ignore-prettier
	return array.slice(0, index).concat(item, array.slice(index));
};
