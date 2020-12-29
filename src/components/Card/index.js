import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { PokemonsContext } from '../../context'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'

const CardOuther = styled.div`
	width: 250px;
	max-height: 580px;
	border: 1px solid lightgray;
	border-radius: 7px;
	margin: 0.3em;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	position: relative;
`
const FavIcon = styled.span`
	width: 30px;
	height: 30px;
	color: ${(props) => (props.isFavorite ? 'palevioletred' : 'lightseagreen')};
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2px solid
		${(props) => (props.isFavorite ? 'palevioletred' : 'lightseagreen')};
	border-radius: 50%;
	right: 0;
	top: 0;
	margin: 10px;
	cursor: pointer;
	transition: 0.1s;
	${this}:hover {
		transform: scale(1.1);
	}

	${this}:active {
		transform: scale(0.9);
	}
`
const CardTitle = styled.p`
	width: 100%;
	padding-top: 0.8em;
	margin-top: auto;
	border-top: 1px solid lightgray;
	font-weight: bold;
	text-align: center;
	text-transform: uppercase;
	font-family: 'Quicksand', sans-serif;
`
const StatsList = styled.ul`
	padding: 0;
	list-style: none;
`
const StatsListItem = styled.li`
	border-bottom: 1px solid whitesmoke;
	padding: 5px;
`
const CardImg = styled.div`
	padding: 0.8em 1em;
`
const CardInfo = styled.div`
	margin-top: auto;
	padding: 0.5em 0.5em;
`
const PokemonImage = styled.img`
	width: 120px;
	height: 120px;
`

const Card = ({ pokemon }) => {
	const { state } = useContext(PokemonsContext)
	const isFavorite = !!state.favorites[pokemon.id]

	return (
		<CardOuther key={pokemon.id}>
			<CardImg>
				<PokemonImage src={pokemon.sprites.other.dream_world.front_default} />
			</CardImg>
			<FavIcon
				onClick={() => state.markFavorites(pokemon.id)}
				isFavorite={isFavorite}>
				{isFavorite ? (
					<FontAwesomeIcon icon={faTimes} />
				) : (
					<FontAwesomeIcon icon={faPlus} />
				)}
			</FavIcon>
			<CardInfo>
				<StatsList>
					{pokemon.stats.map(({ stat, base_stat }) => (
						<StatsListItem>
							<span>
								{stat.name} - {base_stat}
							</span>
						</StatsListItem>
					))}
				</StatsList>
			</CardInfo>
			<CardTitle>
				<NavLink to={`/pokemons/${pokemon.id}`}>{pokemon.name}</NavLink>
			</CardTitle>
		</CardOuther>
	)
}

export default Card
