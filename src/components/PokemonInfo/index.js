import React, { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { PokemonsContext } from '../../context'

const PokemonInfo = ({ id }) => {
	const { state } = useContext(PokemonsContext)

	

	return (
		<div>
			<strong>{state.payload[id].name}</strong>
			{id}
			<NavLink to='/pokemons'>Home</NavLink>
		</div>
	)
}

export default PokemonInfo
