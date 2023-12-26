import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Card from '../../components/Card/Card';
import { ProfileContainer } from './ProfileStyles';
import UserCard from './UserCard';
import { useUser } from '../../../api/context/user.context';
import Button from '../../components/Button';
import Main from '../../components/Main';
import { updateName } from './profile.utils';

function Profile() {
	const { user, logout, update } = useUser();

	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [profileUrl, setProfileUrl] = useState('');

	console.log(user);

	useEffect(() => {
		setFirstname(user?.name.split(' ')[0]);
		setLastname(user?.name.split(' ')[1]);
		setEmail(user?.email);
		setProfileUrl(user?.prefs.photo_url);
	}, [user]);

	const handleFirstNameChange = (name) => {
		setFirstname(name);
		update.name(updateName(`${user.name}`, 'first', name));
	};
	const handleLastNameChange = (name) => {
		setLastname(name);
		update.name(updateName(`${user.name}`, 'last', name));
	};
	const handleEmailChange = (email, password) => {
		setEmail(email);
		update.email(email, password);
	};
	const handleProfileURLChange = (profileURL) => {
		setProfileUrl(profileURL);
		update.photo({
			photo_url: profileURL,
		});
	};

	return (
		<Main>
			<h1>Profile</h1>
			{user && (
				<>
					<Button variant="secondary" size="medium" onClick={() => logout()}>
						<span>Log out</span>
					</Button>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div>First Name</div>
						<Button
							variant="secondary"
							size="medium"
							onClick={() => handleFirstNameChange('Bash')}>
							<div>Change: {firstname}</div>
						</Button>
						<div>Last Name</div>
						<Button
							variant="secondary"
							size="medium"
							onClick={() => handleLastNameChange('Crash')}>
							<div>Change: {lastname}</div>
						</Button>
						<div>email</div>
						<Button
							variant="secondary"
							size="medium"
							onClick={() =>
								handleEmailChange('new@hotmail.com', 'masterpassword')
							}>
							<div>Change: {email}</div>
						</Button>
						{/* NEED SOME SORT OF VERIFICATION IF USER IS UPLOADING AN IMAGE OR SOMETHING ELSE THROUGH URL? */}
						<div>Photo URL</div>
						<Button
							variant="secondary"
							size="medium"
							onClick={() =>
								handleProfileURLChange(
									'https://static.vecteezy.com/system/resources/previews/026/576/517/large_2x/woman-pretty-smiling-professional-business-woman-happy-confiden-photo.jpg'
								)
							}>
							<div>Change: {profileUrl}</div>
						</Button>
					</div>
				</>
			)}
		</Main>
	);
}

export default Profile;

