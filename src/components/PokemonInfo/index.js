import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { PokemonsContext } from '../../context'
import { Container } from '../App'
import Card from '../Card'

const Content = styled.div`
	display: flex;
`

const Info = styled.div``

const PokemonInfo = ({ id }) => {
	const { state } = useContext(PokemonsContext)

	return (
		<div>
			<Container>
				<Content>
					<Card pokemon={state.payload[id]} />

					<Info></Info>
				</Content>
			</Container>
		</div>
	)
}

export default PokemonInfo
