import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '../../components/App'

const HeaderOuther = styled.header`
	background-color: palevioletred;
`

const HeaderContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const NavList = styled.ul`
	display: flex;
	list-style: none;
`

const NavListItem = styled.li`
	margin: 0 0.7em;
`

const Header = () => {
	return (
		<HeaderOuther>
			<Container>
				<HeaderContent>
					<h2>Pokedex</h2>
					<nav>
						<NavList>
							<NavListItem>
								<NavLink to='/favorites'>Favorites</NavLink>
							</NavListItem>
							<NavListItem>
								<NavLink exact to='/pokemons'>
									Pokemons
								</NavLink>
							</NavListItem>
						</NavList>
					</nav>
				</HeaderContent>
			</Container>
		</HeaderOuther>
	)
}

export default Header
