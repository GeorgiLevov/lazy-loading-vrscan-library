import React from 'react';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Card from '../../components/Card/Card';
import { ProfileContainer } from './ProfileStyles';
import UserCard from './UserCard';

function Profile() {
	return (
		<>
			<Header />
			<Main>
				<h1>Profile</h1>
				<ProfileContainer>
					<UserCard></UserCard>
				</ProfileContainer>
			</Main>
		</>
	);
}

export default Profile;

