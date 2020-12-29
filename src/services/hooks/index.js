import React, { useState } from 'react'

export const toObject = (array) => {
	const a = array.map((item) => [item.id, item])
	return Object.fromEntries(a)
}

function useAPI(cb) {
	const [state, setState] = useState({
		payload: {},
		error: null,
		isLoading: false,
	})

	const refetch = () => {
		setState({
			payload: {},
			error: null,
			isLoading: true,
		})
		cb()
			.then((resp) => {
				setState({
					payload: toObject(resp),
					error: null,
					isLoading: false,
				})
			})
			.catch((err) => {
				setState({
					payload: {},
					error: err,
					isLoading: false,
				})
			})
	}

	return [state, { refetch }]
}

export { useAPI }
