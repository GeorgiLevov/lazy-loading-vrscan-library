import { useEffect, useState, useId } from 'react';

import useResponsivePadding from '../../hooks/ResponsvieContainer';
import Header from '../../components/Header/Header';
import Logo from '../../components/Header/Logo';
import Main from '../../components/Main/Main';
import Card from '../../components/Card/Card';
import { CardImageContainer } from '../../components/Card/CardImage';
import CardDetails from '../../components/Card/CardDetails';
import SignInForm from '../../components/Form/SignInForm';
import ScansSlider from '../../components/ScansSlider';

function Login() {
	const products = [
		{ id: 1, name: 'Product 1', image: '/src/assets/images/product1.png' },
		{ id: 2, name: 'Product 2', image: '/src/assets/images/product2.png' },
		{ id: 2, name: 'Product 2', image: '/src/assets/images/product3.png' },
		{ id: 2, name: 'Product 2', image: '/src/assets/images/product4.png' },
		{ id: 2, name: 'Product 2', image: '/src/assets/images/product5.png' },
		{ id: 2, name: 'Product 2', image: '/src/assets/images/product6.png' },
	];

	const padding = useResponsivePadding();

	return (
		<>
			<Header>
				<Logo />
			</Header>
			<Main style={{ padding: `0 ${padding}` }}>
				<Main>
					<Card variant="inverted">
						{/* <CardImage src="https://download.chaosgroup.com/images/vrscans/thumb/leather_white_s"></CardImage> */}
						<CardImageContainer>
							<ScansSlider products={products} />
						</CardImageContainer>
						<CardDetails>
							<SignInForm />
						</CardDetails>
					</Card>
				</Main>
			</Main>
		</>
	);
}

export default Login;
