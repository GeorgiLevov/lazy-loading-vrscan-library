import { useEffect, useState, useId } from 'react';
import { useUser } from '../../../api/context/user.context';
import useResponsivePadding from '../../hooks/ResponsvieContainer';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Logo from '../../components/Header/Logo';
import Main from '../../components/Main/Main';
import Card from '../../components/Card/Card';
import { CardImageContainer } from '../../components/Card/CardImage';
import CardDetails from '../../components/Card/CardDetails';
import SignInForm from '../../components/Form/SignInForm';
import Footer from '../../components/Footer/Footer';
import ScansSlider from '../../components/ScansSlider';
import ImageHandler from '../../components/Picture/ImageHandler';

function Login() {
	const products = [
		{ id: 1, name: 'Product 1', image: ImageHandler.product1 },
		{ id: 2, name: 'Product 2', image: ImageHandler.product2 },
		{ id: 3, name: 'Product 3', image: ImageHandler.product3 },
		{ id: 4, name: 'Product 4', image: ImageHandler.product4 },
		{ id: 5, name: 'Product 5', image: ImageHandler.product5 },
		{ id: 6, name: 'Product 6', image: ImageHandler.product6 },
	];

	const padding = useResponsivePadding();

	const { user, login, signup: register, logout } = useUser();

	return (
		<>
			<Header />

			<Main style={{ padding: `0 ${padding}` }}>
				{user ? (
					<section>
						<h1>Welcome back {user.name}</h1>
						<button type="button" onClick={() => logout()}>
							Logout
						</button>
						<Link to="/">
							<b>Redirect to VRScans Catalog</b>
						</Link>
					</section>
				) : (
					<Card variant="inverted">
						{/* <CardImage src="https://download.chaosgroup.com/images/vrscans/thumb/leather_white_s"></CardImage> */}
						<CardImageContainer>
							<ScansSlider products={products} />
						</CardImageContainer>
						<CardDetails>
							<SignInForm user={user} login={login} signup={register} />
						</CardDetails>
					</Card>
				)}
			</Main>
		</>
	);
}

export default Login;

