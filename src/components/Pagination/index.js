import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePagination } from '../../services/hooks'
import { NavLink } from 'react-router-dom'
import {
	faAngleLeft,
	faAngleRight,
	faAngleDoubleLeft,
	faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons'
import { PokemonsContext } from '../../context'

const PaginationBar = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
	margin: 0.5em 0.2em;
`

const PaginationBarItem = styled.button`
	outline: none;
	border: 1px solid ${(props) => (props.active ? 'lightseagreen' : 'black')};
	color: ${(props) => (props.active ? 'lightseagreen' : 'black')};
	margin: 0 3px;
	font-weight: bold;
	border-radius: 25%;
	width: 35px;
	height: 35px;
	border-radius: ${(props) => props.borderRadius || 'none'};
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: ${(props) =>
		props.disabled || props.active ? 'default' : 'pointer'};
	background: none;

	${this}:disabled {
		color: lightgray;
		border-color: lightgray;
	}

	${this}:before {
		content: '${(props) => props.content}';
	}
`

function Pagination({ arr, offset, page }) {
	const {
		items,
		changePage,
		goNext,
		goPrev,
		goLast,
		goFirst,
		currentPage,
		quantityOfPages,
		itemsOnPage,
	} = usePagination(arr, offset, page)

	const { state } = useContext(PokemonsContext)

	useEffect(() => {
		state.setCurrentList(items)
	}, [items])

	return (
		<PaginationBar>
			<NavLink to={`/pokemons/list/${1}/${itemsOnPage}`}>
				<PaginationBarItem onClick={goFirst} disabled={currentPage === 1}>
					<FontAwesomeIcon icon={faAngleDoubleLeft} />
				</PaginationBarItem>
			</NavLink>
			<NavLink to={`/pokemons/list/${currentPage - 1}/${itemsOnPage}`}>
				<PaginationBarItem onClick={goPrev} disabled={currentPage === 1}>
					<FontAwesomeIcon icon={faAngleLeft} />
				</PaginationBarItem>
			</NavLink>

			{/* PREVIOUS */}
			{currentPage > 2 &&
				currentPage === quantityOfPages &&
				currentPage - 2 > 0 && (
					<NavLink to={`/pokemons/list/${currentPage - 2}/${itemsOnPage}`}>
						<PaginationBarItem
							content={currentPage - 2}
							onClick={() => changePage(currentPage - 2)}
						/>
					</NavLink>
				)}

			{currentPage > 1 && (
				<NavLink to={`/pokemons/list/${currentPage - 1}/${itemsOnPage}`}>
					<PaginationBarItem
						content={currentPage - 1}
						onClick={() => changePage(currentPage - 1)}
					/>
				</NavLink>
			)}

			<PaginationBarItem content={currentPage} active />

			{/* NEXT */}
			{+currentPage < quantityOfPages && (
				<NavLink to={`/pokemons/list/${currentPage + 1}/${itemsOnPage}`}>
					<PaginationBarItem
						content={currentPage + 1}
						onClick={() => changePage(currentPage + 1)}></PaginationBarItem>
				</NavLink>
			)}

			{
				// ! NEED FIX
				currentPage === 1 && currentPage + 2 <= quantityOfPages && (
					<NavLink to={`/pokemons/list/${currentPage + 2}/${itemsOnPage}`}>
						<PaginationBarItem
							content={+currentPage + 2}
							onClick={() => changePage(currentPage + 2)}></PaginationBarItem>
					</NavLink>
				)
			}

			<NavLink to={`/pokemons/list/${+currentPage + 1}/${itemsOnPage}`}>
				<PaginationBarItem
					onClick={goNext}
					disabled={currentPage === quantityOfPages}>
					<FontAwesomeIcon icon={faAngleRight} />
				</PaginationBarItem>
			</NavLink>
			<NavLink to={`/pokemons/list/${quantityOfPages}/${itemsOnPage}`}>
				<PaginationBarItem
					onClick={goLast}
					disabled={currentPage === quantityOfPages}
					borderRight>
					<FontAwesomeIcon icon={faAngleDoubleRight} />
				</PaginationBarItem>
			</NavLink>
		</PaginationBar>
	)
}

export default Pagination
