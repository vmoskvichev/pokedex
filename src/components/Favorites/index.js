import React, { useContext } from 'react'
import Card from '../Card'
import { CardsCollection } from '../Cards'
import { PokemonsContext } from '../../context'
import styled from 'styled-components'
import Preloader from '../Preloader'

// !SHOW MESSAGE INSTEAD OF IT
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
	return !Object.keys(state.favorites).length ? (
		<Preloader View={a} />
	) : (
		<CardsCollection>
			{Object.values(state.favorites).map((pokemon) => (
				<Card pokemon={pokemon} key={pokemon.id} />
			))}
		</CardsCollection>
	)
}

export default Favorites
