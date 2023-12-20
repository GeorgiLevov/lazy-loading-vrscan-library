import { useEffect, useState, useId } from 'react';
import { useUser } from '../../../api/context/user.context';
import useResponsivePadding from '../../hooks/ResponsvieContainer';
import { Container } from '../../components/Main/MainContainerStyle';
import { Link } from 'react-router-dom';

function Login() {
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
		<Container style={{ padding: `0 ${padding}` }}>
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
							<div>
								<button
									type="button"
									onClick={() => user.login(email, password)}>
									Login
								</button>
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
							<div>
								<button
									type="button"
									onClick={() => user.register(email, password)}>
									Register
								</button>
							</div>
						</form>
					</section>
				</>
			)}
		</Container>
	);
}

export default Login;

