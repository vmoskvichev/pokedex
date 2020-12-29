import { Route } from 'react-router-dom'
import Cards from '../Cards'
import PokemonInfo from '../PokemonInfo'
import Favorites from '../Favorites'

const PokemonInfoPage = (
	<Route
		path='/pokemons/:id'
		render={({ match }) => {
			const { id } = match.params
			return <PokemonInfo id={id} />
		}}
	/>
)

const CardsPage = (
	<Route
		path='/pokemons/list/:page/:offset'
		exact
		render={({ match }) => {
			const { page, offset } = match.params
			return <Cards page={page} offset={offset} />
		}}
	/>
)

const FavoritesPage = (
	<Route
		path='/pokemons/favorites/list/:page/:offset'
		render={({ match }) => {
			const { page, offset } = match.params
			return <Favorites page={page} offset={offset} />
		}}
	/>
)

export default {
	PokemonInfoPage,
	FavoritesPage,
	CardsPage,
}
