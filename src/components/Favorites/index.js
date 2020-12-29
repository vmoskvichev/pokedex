import React, { useContext } from 'react'
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

const Favorites = ({ page, offset }) => {
	const { state } = useContext(PokemonsContext)
	const hasContent = Object.keys(state.favorites).length
	return !hasContent ? (
		<Preloader View={a} />
	) : (
		<>
			<Pagination
				arr={Object.values(state.favorites)}
				offset={offset}
				page={page}
			/>
			<CardsCollection>
				{Object.values(state.favorites).map((pokemon) => (
					<Card pokemon={pokemon} key={pokemon.id} />
				))}
			</CardsCollection>
		</>
	)
}

export default Favorites
