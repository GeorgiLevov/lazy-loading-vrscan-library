import React, { useState, useEffect, useRef } from 'react';
import Main from '../../components/Main/Main';
import Breadcrumbs from '../../components/Breadcrumbs';
import Header from '../../components/Header/Header';
import {
	ProfileContainer,
	ProfileSection,
	ProfileSettings,
} from './ProfileStyles';
import PageTitle from '../../components/PageTitle';
import Subheading from '../../components/Subheading';
import ProfileSettingsHandler from './ProfileSettingsHandler';
import EditImageHandler from './EditImageHandler';
import { useUser } from '../../../api/context/user.context';
import Button from '../../components/Button';

/**
 * @module Profile
 * @description Main container for the user profile page.
 * Renders the user's profile section and settings.
 * Uses ProfileSettingsHandler and EditImageHandler for specific functionalities.
 * @returns {React.Component} The Profile component.
 */

function Profile() {
	const { user, logout } = useUser();
	return (
		<>
			<Header />
			<Main>
				<Breadcrumbs />
				<PageTitle>Profile</PageTitle>
				<ProfileContainer>
					{user && (
						<>
							<ProfileSection>
								<EditImageHandler />
								{/* Logout button for testing */}
							</ProfileSection>
							{/* <Button variant="primary" size="large" onClick={() => logout()}>
									Log out (Testing only)
								</Button> */}

							<ProfileSettings>
								<Subheading>Account settings</Subheading>
								<ProfileSettingsHandler />
							</ProfileSettings>
						</>
					)}
				</ProfileContainer>
			</Main>
		</>
	);
}

export default Profile;
