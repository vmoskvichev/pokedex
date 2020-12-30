import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePagination } from '../../services/hooks'
import { NavLink, useLocation, useParams } from 'react-router-dom'
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

function Pagination({ arr }) {
	const { page, offset } = useParams()
	const {
		items,
		changePage,
		goNext,
		goPrev,
		goLast,
		goFirst,
		currentPage,
		quantityOfPages,
	} = usePagination(arr, page, offset)

	const { pathname } = useLocation()
	const path = pathname.match(/^\/\w+\//)[0] // ? match /pokemons/ | /favorites/ | /other_path/

	const { state } = useContext(PokemonsContext)

	useEffect(() => {
		state.setCurrentList(items)
	}, [items])

	return (
		<PaginationBar>
			<NavLink to={`${path}list/${1}/${offset}`}>
				<PaginationBarItem onClick={goFirst} disabled={currentPage === 1}>
					<FontAwesomeIcon icon={faAngleDoubleLeft} />
				</PaginationBarItem>
			</NavLink>
			<NavLink to={`${path}list/${currentPage - 1}/${offset}`}>
				<PaginationBarItem onClick={goPrev} disabled={currentPage === 1}>
					<FontAwesomeIcon icon={faAngleLeft} />
				</PaginationBarItem>
			</NavLink>

			{/* PREVIOUS */}
			{currentPage > 2 &&
				currentPage === quantityOfPages &&
				currentPage - 2 > 0 && (
					<NavLink to={`${path}list/${currentPage - 2}/${offset}`}>
						<PaginationBarItem
							content={currentPage - 2}
							onClick={() => changePage(currentPage - 2)}
						/>
					</NavLink>
				)}

			{currentPage > 1 && (
				<NavLink to={`${path}list/${currentPage - 1}/${offset}`}>
					<PaginationBarItem
						content={currentPage - 1}
						onClick={() => changePage(currentPage - 1)}
					/>
				</NavLink>
			)}

			<PaginationBarItem content={currentPage} active />

			{/* NEXT */}
			{+currentPage < quantityOfPages && (
				<NavLink to={`${path}list/${currentPage + 1}/${offset}`}>
					<PaginationBarItem
						content={currentPage + 1}
						onClick={() => changePage(currentPage + 1)}></PaginationBarItem>
				</NavLink>
			)}

			{currentPage === 1 && currentPage + 2 <= quantityOfPages && (
				<NavLink to={`${path}list/${currentPage + 2}/${offset}`}>
					<PaginationBarItem
						content={currentPage + 2}
						onClick={() => changePage(currentPage + 2)}></PaginationBarItem>
				</NavLink>
			)}

			<NavLink to={`${path}list/${+currentPage + 1}/${offset}`}>
				<PaginationBarItem
					onClick={goNext}
					disabled={currentPage === quantityOfPages}>
					<FontAwesomeIcon icon={faAngleRight} />
				</PaginationBarItem>
			</NavLink>
			<NavLink to={`${path}list/${quantityOfPages}/${offset}`}>
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
