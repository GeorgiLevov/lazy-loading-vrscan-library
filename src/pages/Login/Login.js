import { useEffect, useState, useId } from 'react';
import { useUser } from '../../../api/context/user.context';
import useResponsivePadding from '../../hooks/ResponsvieContainer';
import {
	CardHorizontal,
	Container,
} from '../../components/Main/MainContainerStyle';
import { Link } from 'react-router-dom';
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
	const user = useUser();
	console.log(user.current);

	const id = useId();

	const emailId = `${id}-email`;
	const passwordId = `${id}-password`;

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	return (
		<>
			<Header />
			<Container style={{ padding: `0 ${padding}` }}>
				<CardHorizontal className="login">
					<ProductSliderContainer>
						<ScansSlider products={products} />
					</ProductSliderContainer>
					<LoginRegisterFormContainerOuter>
						<LoginRegisterFormContainerInner>
							{user.current ? (
								<section>
									<h1>Welcome back {user.current.name}</h1>
									<button type="button" onClick={() => user.logout()}>
										Logout
									</button>
									<Link to="/">
										<b>Redirect to VRScans Catalog</b>
									</Link>
								</section>
							) : (
								<>
									<section>
										<h1>Login</h1>
										{/* <DescriptionText>
							Welcome! Please use the fields below to log in.
						</DescriptionText> */}
										<form>
											<input
												type="email"
												id={emailId}
												placeholder="Email"
												value={email}
												onChange={(event) => {
													setEmail(event.target.value);
												}}
											/>
											<input
												type="password"
												id={passwordId}
												placeholder="Password"
												value={password}
												onChange={(event) => {
													setPassword(event.target.value);
												}}
											/>
											<div className="submit-btn">
												<ButtonPrimary
													type="button"
													onClick={() => user.login(email, password)}>
													Sign In <ArrowRight strokeWidth="1.1" />
												</ButtonPrimary>
											</div>
										</form>
									</section>
									<section>
										<h1>Signup</h1>
										{/* <DescriptionText>Welcome! Please use the fields below to signup in.</DescriptionText> */}
										<form>
											<input
												type="text"
												placeholder="First Name"
												value={firstName}
												onChange={(event) => {
													setFirstName(event.target.value);
												}}
											/>
											<input
												type="text"
												placeholder="Last Name"
												value={lastName}
												onChange={(event) => {
													setLastName(event.target.value);
												}}
											/>
											<input
												type="email"
												id={emailId}
												placeholder="Email"
												value={email}
												onChange={(event) => {
													setEmail(event.target.value);
												}}
											/>
											<input
												type="password"
												id={passwordId}
												placeholder="Password"
												value={password}
												onChange={(event) => {
													setPassword(event.target.value);
												}}
											/>
											<div className="submit-btn">
												<ButtonPrimary
													type="button"
													onClick={() => user.register(email, password)}>
													Sign Up <ArrowRight strokeWidth="1.1" />
												</ButtonPrimary>
											</div>
										</form>
									</section>
								</>
							)}
						</LoginRegisterFormContainerInner>
					</LoginRegisterFormContainerOuter>
				</CardHorizontal>
			</Container>
			{/* <Footer /> */}
		</>
	);
}

export default Login;

