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

// Pagination logic
const initialState = {
	items: [],
	currentPage: 1,
	quantityOfPages: 1,
}

function usePagination(allItems, itemsOnPage = 8, page) {
	const [state, setState] = useState(initialState)

	const changePage = useCallback(
		(currentPage = 1) => {
			const idxOfLastItem = currentPage * itemsOnPage
			const idxOfFirstItem = idxOfLastItem - itemsOnPage

			setState({
				currentPage: +currentPage,
				quantityOfPages: Math.ceil(allItems.length / itemsOnPage),
				items: allItems.slice(idxOfFirstItem, idxOfLastItem),
			})
		},
		[allItems, itemsOnPage, state]
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
	}, [])

	return { ...state, changePage, goNext, goPrev, goFirst, goLast, itemsOnPage }
}

export { useAPI, usePagination }
