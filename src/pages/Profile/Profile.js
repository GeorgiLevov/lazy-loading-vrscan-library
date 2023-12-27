import React, { useEffect, useState } from 'react';
import { useUser } from '../../../api/context/user.context';
import Button from '../../components/Button';
import Main from '../../components/Main';
import { updateName } from './profile.utils';
import Modal from '../../components/Modal/Modal';
import useToggle from '../../hooks/useToggle.hook';

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

	const [isModalOpen, toggleIsModalOpen] = useToggle(false);

	return (
		<Main>
			<h1>Profile</h1>
			{user && (
				<>
					{isModalOpen && (
						<Modal title="Testing Modal" closeDialog={toggleIsModalOpen}>
							<p>
								Hey, I'm some text in here, don't click on the X button because
								I'll disappear!
							</p>
						</Modal>
					)}
					<button onClick={toggleIsModalOpen}>Toggle modal</button>
				</>
			)}
		</Main>
	);
}

export default Profile;
