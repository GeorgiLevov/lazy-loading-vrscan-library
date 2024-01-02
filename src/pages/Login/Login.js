import { useEffect, useState, useId } from 'react';

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Card from '../../components/Card/Card';
import CardDetails from '../../components/Card/CardDetails';
import SignInForm from '../../components/Form/SignInForm';
import { useVRScans } from '../../../api/context/vrscans.context';

function Login() {
	const { loginVRScans } = useVRScans();

	return (
		<>
			<Header />

			<Main>
				<Card variant="inverted" imageSrc={loginVRScans}>
					<SignInForm />
				</Card>
			</Main>
		</>
	);
}

export default Login;
