import styled from 'styled-components';
import LoadingAnimation from './LoadingAnimation';

const Wrapper = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
`;

const Overlay = styled.div`
	position: absolute;
	top: -50%;
	left: 0px;
	right: 0px;
	bottom: 0px;
	width: 150px;
	height: 150px;
	margin: auto;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Loader = ({ isLoading, children, variant }) => {
	const loaderStyles = {
		base: {
			overlayBackground: 'transparent',
		},
		profile: {
			overlayBackground: 'rgba(0, 0, 0, 0.5)',
		},
		vrscan: {
			overlayBackground: 'transparent',
		},
	};

	const { overlayBackground } = loaderStyles[variant] || loaderStyles.base;

	return (
		<Wrapper className="loader">
			{isLoading ? (
				<Overlay
					style={{ background: overlayBackground }}
					data-testid="overlay">
					<LoadingAnimation />
				</Overlay>
			) : (
				children
			)}
		</Wrapper>
	);
};

export default Loader;
