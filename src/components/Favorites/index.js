import React, { useContext, useEffect } from 'react'
import Card from '../Card'
import { CardsCollection } from '../Cards'
import { PokemonsContext } from '../../context'
import styled from 'styled-components'
import Preloader from '../Preloader'
import Pagination from '../Pagination'

// !SHOW MESSAGE INSTEAD OF:
const a = styled.div`
	background-color: red;
	width: 100px;
	height: 100px;
	width: 50px;
	height: 50px;
	position: absolute;
	left: 50%;
	top: 50%;
`

const Favorites = () => {
	const { state } = useContext(PokemonsContext)
	const hasFavorites = Object.keys(state.favorites).length

	useEffect(() => {
		state.setCurrentList(Object.values(state.favorites))
	}, [state.favorites])

	return !hasFavorites ? (
		<Preloader View={a} />
	) : (
		<>
			<Pagination arr={Object.values(state.favorites)} />
			<CardsCollection>
				{state.currentList.map((pokemon) => (
					<Card pokemon={pokemon} key={pokemon.id} />
				))}
			</CardsCollection>
		</>
	)
}

export default Favorites
