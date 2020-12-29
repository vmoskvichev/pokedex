export const getFavorites = () => {
	return JSON.parse(localStorage.getItem('favorites')) || {}
}
export const setFavorites = (obj) => {
	localStorage.setItem('favorites', JSON.stringify(obj))
}

export default {
	getFavorites,
	setFavorites,
}
