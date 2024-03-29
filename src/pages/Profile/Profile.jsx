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

/**
 * @module Profile
 * @description Main container for the user profile page.
 * Renders the user's profile section and settings.
 * Uses ProfileSettingsHandler and EditImageHandler for specific functionalities.
 * @returns {React.Component} The Profile component.
 */

function Profile() {
	return (
		<>
			<Header />
			<Main>
				<Breadcrumbs />
				<PageTitle>Profile</PageTitle>
				<ProfileContainer>
					<>
						<ProfileSection>
							<EditImageHandler />
						</ProfileSection>

						<ProfileSettings>
							<Subheading>Account settings</Subheading>
							<ProfileSettingsHandler />
						</ProfileSettings>
					</>
				</ProfileContainer>
			</Main>
		</>
	);
}

export default Profile;
