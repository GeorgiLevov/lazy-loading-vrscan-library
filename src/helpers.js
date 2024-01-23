/* c8 ignore start */

export const Objectify = (string) => {
	// DB import has single quotes instead of double quotes on attributes
	// so they need to be updated before we can parse the attribute into an object
	const updatedQuotes = string.replace(/'/g, '"');
	return JSON.parse(updatedQuotes);
};

export const Stringify = (object) => {
	// If we're trying to match a string in arrtibute then we need to have an exact string match
	const returnedToDBString = JSON.stringify(object)
		.replace(/"/g, "'")
		.replace(/{/g, '{ ')
		.replace(/}/g, ' }')
		.replace(/:/g, ': ')
		.replace(',', ', ');
	return returnedToDBString;
};

/* c8 ignore end */
