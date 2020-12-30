import { Route } from 'react-router-dom'
import Cards from '../Cards'
import PokemonInfo from '../PokemonInfo'
import Favorites from '../Favorites'

const PokemonInfoPage = <Route path='/pokemons/:id' component={PokemonInfo} />

const CardsPage = (
	<Route path='/pokemons/list/:page/:offset' exact component={Cards} />
)

const FavoritesPage = (
	<Route path='/favorites/list/:page/:offset' component={Favorites} />
)

export default {
	PokemonInfoPage,
	FavoritesPage,
	CardsPage,
}
