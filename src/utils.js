const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

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
