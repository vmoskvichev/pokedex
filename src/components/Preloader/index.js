import React from 'react'
import styled from 'styled-components'

const PreviewWrapper = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	overflow: auto;
	z-index: -100;
`

const Preloader = ({ View }) => {
	return (
		<PreviewWrapper>
			<View />
		</PreviewWrapper>
	)
}

export default Preloader
