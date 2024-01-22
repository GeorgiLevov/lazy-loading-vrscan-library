export const getFirstName = (username) => {
	if (username === undefined) {
		return `Hello there!`;
	} else {
		// Splitting user first and last name since our DB will always give us first+last separated by 'space'
		return `Hi, ${username.split(' ')['0']}`;
	}
};
