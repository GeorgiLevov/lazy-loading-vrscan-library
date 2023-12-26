import { useEffect, useState, useId } from 'react';

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Card from '../../components/Card/Card';
import { CardImageContainer } from '../../components/Card/CardImage';
import CardDetails from '../../components/Card/CardDetails';
import SignInForm from '../../components/Form/SignInForm';
import ScansSlider from '../../components/ScansSlider';
import { useVRScans } from '../../../api/context/vrscans.context';

function Login() {
	const { loginVRScans } = useVRScans();

	return (
		<>
			<Header />

			<Main>
				<Card variant="inverted">
					{/* <CardImage src="https://download.chaosgroup.com/images/vrscans/thumb/leather_white_s"></CardImage> */}
					<CardImageContainer>
						<ScansSlider products={loginVRScans} />
					</CardImageContainer>
					<CardDetails>
						<SignInForm />
					</CardDetails>
				</Card>
			</Main>
		</>
	);
}

export default Login;
