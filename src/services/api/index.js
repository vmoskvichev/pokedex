const rootUrl = 'https://pokeapi.co/api/v2'

export async function fetchData(url = '') {
	const res = await fetch(url)
	return res.json()
}

const callAPI = (path) => fetchData(rootUrl + path)

export async function getList(limit = '', offset = '') {
	const res = await callAPI(`/pokemon/?limit=${limit}&offset=${offset}`)
	const promises = res.results.map(({ url }) => fetchData(url))

	return Promise.all(promises)
}

export async function getOne(id) {
	console.log('id', id)
	console.time(id)
	const res = await fetchData(rootUrl + '/pokemon/' + id)
	console.timeEnd(id)
	return res
}
