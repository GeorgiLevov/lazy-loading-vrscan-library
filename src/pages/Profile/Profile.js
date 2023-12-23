import React from 'react';
import { useUser } from '../../../api/context/user.context';
import Button from '../../components/Button/Button';
import Main from '../../components/Main';

function Profile() {
	const { user, logout } = useUser();

	return (
		<Main>
			<h1>Profile</h1>
			{user && (
				<Button variant="secondary" size="medium" onClick={() => logout()}>
					Log out
				</Button>
			)}
		</Main>
	);
}

export default Profile;
