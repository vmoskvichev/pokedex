import React from 'react'
import './App.css'
import styled from 'styled-components'
import Header from '../Header'
import Routes from '../Routes'
import { PokemonsProvider } from '../../context'
import { Redirect, Switch } from 'react-router-dom'

export const Container = styled.div`
	margin: 0 auto;
	max-width: 1200px;
	padding: 0.5em;
`

function App() {
	return (
		<PokemonsProvider>
			<Header />
			<Container>
				<Switch>
					{Routes.CardsPage}
					{Routes.PokemonInfoPage}
					{Routes.FavoritesPage}
				</Switch>
			</Container>
		</PokemonsProvider>
	)
}

export default App
