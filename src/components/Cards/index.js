import React, { useContext, useState, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import { PokemonsContext } from '../../context'
import Card from '../Card'
import Preloader from '../Preloader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faAngleLeft,
	faAngleRight,
	faAngleDoubleLeft,
	faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons'

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
	border-radius: 30%;
	width: 30px;
	height: 30px;
	border-radius: ${(props) => props.borderRadius || 'none'};
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
	background: none;

	${this}:disabled {
		color: lightgray;
		border-color: lightgray;
	}

	${this}:before {
		content: '${(props) => props.content}';
	}
`

const initialState = {
	items: [],
	currentPage: 1,
	quantityOfPages: 1,
}

const usePagination = (allItems, itemsOnPage = 8) => {
	const [state, setState] = useState(initialState)

	const changePage = useCallback(
		(currentPage = 1) => {
			const idxOfLastItem = currentPage * itemsOnPage
			const idxOfFirstItem = idxOfLastItem - itemsOnPage

			setState({
				currentPage: currentPage,
				quantityOfPages: Math.ceil(allItems.length / itemsOnPage),
				items: allItems.slice(idxOfFirstItem, idxOfLastItem),
			})
		},
		[allItems, itemsOnPage, state]
	)

	const goNext = () => {
		if (state.currentPage + 1 <= state.quantityOfPages)
			changePage(state.currentPage + 1)
	}

	const goPrev = () => {
		if (state.currentPage - 1 >= 1) changePage(state.currentPage - 1)
	}

	const goFirst = () => {
		changePage(1)
	}

	const goLast = () => {
		changePage(state.quantityOfPages)
	}

	useEffect(() => {
		changePage()
	}, [])

	return { ...state, changePage, goNext, goPrev, goFirst, goLast }
}

const Cards = ({ page }) => {
	const { state } = useContext(PokemonsContext)

	const {
		items,
		changePage,
		goNext,
		goPrev,
		goLast,
		goFirst,
		currentPage,
		quantityOfPages,
	} = usePagination(Object.values(state.payload))

	return state.isLoading ? (
		<Preloader View={Circle} />
	) : (
		<>
			<PaginationBar>
				<PaginationBarItem onClick={goFirst} disabled={currentPage === 1}>
					<FontAwesomeIcon icon={faAngleDoubleLeft} />
				</PaginationBarItem>
				<PaginationBarItem onClick={goPrev} disabled={currentPage === 1}>
					<FontAwesomeIcon icon={faAngleLeft} />
				</PaginationBarItem>

				{/* PREVIOUS */}
				{currentPage > 2 &&
					currentPage === quantityOfPages &&
					currentPage - 2 > 0 && (
						<PaginationBarItem
							content={currentPage - 2}
							onClick={() => changePage(currentPage - 2)}
						/>
					)}

				{currentPage > 1 && (
					<PaginationBarItem
						content={currentPage - 1}
						onClick={() => changePage(currentPage - 1)}
					/>
				)}

				<PaginationBarItem content={currentPage} active />

				{/* NEXT */}
				{currentPage < quantityOfPages && (
					<PaginationBarItem
						content={currentPage + 1}
						onClick={() => changePage(currentPage + 1)}
					/>
				)}

				{currentPage === 1 && currentPage + 2 <= quantityOfPages && (
					<PaginationBarItem
						content={currentPage + 2}
						onClick={() => changePage(currentPage + 2)}
					/>
				)}

				<PaginationBarItem
					onClick={goNext}
					disabled={currentPage === quantityOfPages}>
					<FontAwesomeIcon icon={faAngleRight} />
				</PaginationBarItem>
				<PaginationBarItem
					onClick={goLast}
					disabled={currentPage === quantityOfPages}
					borderRight>
					<FontAwesomeIcon icon={faAngleDoubleRight} />
				</PaginationBarItem>
			</PaginationBar>
			<CardsCollection>
				{items.map((pokemon) => (
					<Card pokemon={pokemon} key={pokemon.id} />
				))}
			</CardsCollection>
		</>
	)
}

export default Cards
