export const getCharacterLabel = (offset: number) => {
	const initCharCode = "A".charCodeAt(0);
	const charCode = initCharCode + offset;

	return String.fromCharCode(charCode);
};
