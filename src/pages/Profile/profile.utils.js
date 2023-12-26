// takes in whole old username(first+last), the part that will change and the new name to change with
export const updateName = (username, partThatWillChange, newNamePart) => {
	const finalName =
		partThatWillChange === 'first'
			? `${newNamePart} ${username.split(' ')[1]}`
			: `${username.split(' ')[0]} ${newNamePart}`;
	return finalName;
};
