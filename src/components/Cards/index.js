import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { PokemonsContext } from '../../context'
import Card from '../Card'
import Preloader from '../Preloader'
import Pagination from '../Pagination'

export const CardsCollection = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: baseline;
	justify-content: center;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Circle = styled.div`
	width: 50px;
	height: 50px;
	border-left: 3px solid palevioletred;
	border-top: 2px solid black;
	border-right: 3px solid palevioletred;
	border-bottom: 2px solid black;
	animation: ${rotate} 0.7s linear infinite;
	border-radius: 50%;
	position: absolute;
	left: 50%;
	top: 50%;
`

const Cards = ({ page, offset }) => {
	const { state } = useContext(PokemonsContext)

	if (state.isLoading) return <Preloader View={Circle} />

	return (
		<>
			<Pagination
				arr={Object.values(state.payload)}
				offset={offset}
				page={page}
			/>
			<CardsCollection>
				{state.currentList.map((pokemon) => (
					<Card pokemon={pokemon} key={pokemon.id} />
				))}
			</CardsCollection>
		</>
	)
}

export default Cards
