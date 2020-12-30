import React, { useState, useEffect, useCallback } from 'react'

// Requests logic
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

function usePagination(allItems, page, offset) {
	const [state, setState] = useState({
		items: [],
		currentPage: page,
		quantityOfPages: 1,
		offset: 8,
	})

	const changePage = useCallback(
		(currentPage = 1) => {
			const idxOfLastItem = currentPage * offset
			const idxOfFirstItem = idxOfLastItem - offset

			setState({
				currentPage: +currentPage,
				quantityOfPages: Math.ceil(allItems.length / offset),
				items: allItems.slice(idxOfFirstItem, idxOfLastItem),
			})
		},
		[allItems, offset, page, state.items]
	)

	const goNext = () => {
		if (+state.currentPage + 1 <= state.quantityOfPages)
			changePage(+state.currentPage + 1)
	}

	const goPrev = () => {
		if (+state.currentPage - 1 >= 1) changePage(+state.currentPage - 1)
	}

	const goFirst = () => {
		changePage(1)
	}

	const goLast = () => {
		changePage(state.quantityOfPages)
	}

	useEffect(() => {
		changePage(page)
	}, [offset, page])

	return { ...state, changePage, goNext, goPrev, goFirst, goLast }
}

export { useAPI, usePagination }
