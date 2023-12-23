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
import ImageHandler from '../../components/Picture/ImageHandler';
import { useVRScans } from '../../../api/context/vrscans.context';

function Login() {
	const { loginVRScans } = useVRScans();

	const padding = useResponsivePadding();

	return (
		<>
			<Header />

			<Main style={{ padding: `0 ${padding}` }}>
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
			</Main>
		</>
	);
}

export default Login;
