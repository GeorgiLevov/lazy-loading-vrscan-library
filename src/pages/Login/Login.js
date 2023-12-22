import { useEffect, useState, useId } from 'react';
import { useUser } from '../../../api/context/user.context';
import useResponsivePadding from '../../hooks/ResponsvieContainer';
import {
	CardHorizontal,
	Container,
} from '../../components/Main/MainContainerStyle';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { HeaderWrap } from '../../components/Header/HeaderStylings';
import Logo from '../../components/Header/Logo';
import Main from '../../components/Main/Main';
import Card from '../../components/Card/Card';
import CardImage from '../../components/Card/CardImage';
import CardDetails from '../../components/Card/CardDetails';
import SignInForm from '../../components/Form/SignInForm';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ScansSlider from '../../components/ScansSlider';
import {
	ProductSliderContainer,
	LoginRegisterFormContainerOuter,
	LoginRegisterFormContainerInner,
} from './LoginStyles';
import { ButtonPrimary } from '../Home/HomeStyles';
import { ArrowRight } from 'feather-icons-react/build/IconComponents';

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

	const { user, login, signup: register, logout } = useUser();

	return (
		<>
			<Header>
				<HeaderWrap style={{ padding: `0 ${padding}` }} />
				<Logo />
			</Header>
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
					<>
						<Card variant="inverted">
							<CardImage src="https://download.chaosgroup.com/images/vrscans/thumb/leather_white_s"></CardImage>
							<CardDetails>
								<SignInForm user={user} login={login} signup={register} />
							</CardDetails>
						</Card>
					</>
				)}
			</Main>
		</>
	);
}

export default Login;
