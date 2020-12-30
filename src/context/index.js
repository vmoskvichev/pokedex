import React, { createContext, useState, useEffect } from 'react'
import { getList } from '../services/api'
import { useAPI } from '../services/hooks'
import localStorageUtils from '../services/localStorageUtils'

export const PokemonsContext = createContext()

export function PokemonsProvider({ children }) {
	const [{ payload, error, isLoading }, { refetch }] = useAPI(() =>
		getList(40, 40)
	)

	const [favorites, setFavorites] = useState(localStorageUtils.getFavorites())
	const [currentList, setCurrentList] = useState([])

	useEffect(() => {
		refetch()
	}, [])

	const markFavorites = (id) => {
		if (favorites[id]) {
			const copy = { ...favorites }
			delete copy[id]
			localStorageUtils.setFavorites(copy)
			setFavorites(copy)
			return
		}

		const updatedFavorites = { ...favorites, [id]: payload[id] }
		localStorageUtils.setFavorites(updatedFavorites)
		setFavorites(updatedFavorites)
	}

	return (
		<PokemonsContext.Provider
			value={{
				state: {
					payload,
					error,
					isLoading,
					favorites,
					currentList,
					setCurrentList,
					markFavorites,
				},
			}}>
			{children}
		</PokemonsContext.Provider>
	)
}
