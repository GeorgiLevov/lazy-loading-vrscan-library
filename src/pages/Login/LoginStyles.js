import styled from 'styled-components';
import { QUERIES, FONTS } from '/src/constants.js';

export const ProductSliderContainer = styled.div`
	flex: 1;
	width: 50%;
	background: #e9e9e9;
	@media ${QUERIES.tabletAndDown} {
		width: 100%;
	}
`;

export const LoginRegisterFormContainerOuter = styled.div`
	flex: 1;
	width: 50%;
	padding: 40px;
    @media ${QUERIES.tabletAndDown} {
		width: 100%;
	}
`;
export const LoginRegisterFormContainerInner = styled.div`
	display: flex;
	justify-content: flex-start;
	flex-direction: column;

	h1 {
		font-size: ${FONTS.heading.large};
		margin-bottom: 15px;
	}

    input {
        background: #F3F3F3;
        color: #000;
        border-radius: 30px;
        height: 40px;
        width: 100%;
        display: block;
        margin-bottom: 10px;
        font-weight: 300;
    }

    .submit-btn {display: inline-block;}
`;
