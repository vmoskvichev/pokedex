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
	<Route path='/pokemons' exact render={() => <Cards />} />
)

// const CardsPage = (
// 	<Route
// 		path='/pokemons/page/:page'
// 		exact
// 		render={({ match }) => {
// 			const { page } = match.params
// 			return <Cards page={page} />
// 		}}
// 	/>
// )

const FavoritesPage = <Route path='/favorites' render={() => <Favorites />} />

export default {
	PokemonInfoPage,
	FavoritesPage,
	CardsPage,
}
