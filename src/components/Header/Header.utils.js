export const getFirstName = (username) => {
	if (username === undefined) {
		return;
	} else {
		// Splitting user first and last name since our DB will always give us first+last separated by 'space'
		return username.split(' ')['0'];
	}
};
