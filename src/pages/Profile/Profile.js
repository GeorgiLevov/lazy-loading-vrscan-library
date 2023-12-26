import React, { useState, useEffect, useRef } from 'react';
import Main from '../../components/Main/Main';
import Button from '../../components/Button';
import { storage } from '../../../api/appwrite';
import { useUser } from '../../../api/context/user.context';
import Breadcrumbs from '../../components/Breadcrumbs';

function Profile() {
	const { user, update, updateProfileImage } = useUser();

	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [profileUrl, setProfileUrl] = useState('');
	const [isEditing, setIsEditing] = useState({
		firstname: false,
		lastname: false,
		email: false,
	});
	const [showEmailPopup, setShowEmailPopup] = useState(false);
	const [password, setPassword] = useState('');
	const fileInputRef = useRef(null);

	useEffect(() => {
		if (user) {
			setFirstname(user?.name.split(' ')[0]);
			setLastname(user?.name.split(' ')[1]);
			setEmail(user?.email);
			setProfileUrl(user?.prefs.photo_url);
		}
	}, [user]);

	const toggleEdit = (field) => {
		setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
	};

	const handleFirstNameChange = () => {
		update.name(firstname + ' ' + lastname);
		toggleEdit('firstname');
	};

	const handleLastNameChange = () => {
		update.name(firstname + ' ' + lastname);
		toggleEdit('lastname');
	};

	const handleEmailEdit = () => {
		setIsEditing((prev) => ({ ...prev, email: true }));
	};

	const handleEmailFocusOut = () => {
		if (email !== user?.email) {
			setShowEmailPopup(true);
		}
		setIsEditing((prev) => ({ ...prev, email: false }));
	};

	const handleEmailUpdate = () => {
		update.email(email, password);
		setShowEmailPopup(false);
	};

	const handleEditProfileImageClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		if (file) {
			await updateProfileImage(file);
		}
	};

	return (
		<Main>
			<h1>Profile</h1>
			{user && (
				<>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div>First Name</div>
						<input
							type="text"
							value={firstname}
							readOnly={!isEditing.firstname}
							onChange={(e) => setFirstname(e.target.value)}
						/>
						<Button variant="secondary" onClick={() => toggleEdit('firstname')}>
							Edit
						</Button>
						{isEditing.firstname && (
							<Button variant="secondary" onClick={handleFirstNameChange}>
								Save
							</Button>
						)}

						<div>Last Name</div>
						<input
							type="text"
							value={lastname}
							readOnly={!isEditing.lastname}
							onChange={(e) => setLastname(e.target.value)}
						/>
						<Button variant="secondary" onClick={() => toggleEdit('lastname')}>
							Edit
						</Button>
						{isEditing.lastname && (
							<Button variant="secondary" onClick={handleLastNameChange}>
								Save
							</Button>
						)}

						<div>Email</div>
						<input
							type="email"
							value={email}
							readOnly={!isEditing.email}
							onChange={(e) => setEmail(e.target.value)}
							onBlur={handleEmailFocusOut}
						/>
						<Button variant="secondary" onClick={handleEmailEdit}>
							Edit
						</Button>
						{showEmailPopup && (
							<div className="popup">
								<p>New Email: {email}</p>
								<input
									type="password"
									placeholder="Enter password"
									onChange={(e) => setPassword(e.target.value)}
								/>
								<Button variant="secondary" onClick={handleEmailUpdate}>
									Confirm
								</Button>
							</div>
						)}

						<div>Photo URL</div>
						<input
							type="file"
							style={{ display: 'none' }}
							ref={fileInputRef}
							onChange={handleFileChange}
						/>
						<Button variant="secondary" onClick={handleEditProfileImageClick}>
							Edit Profile Image
						</Button>
						<img src={profileUrl} alt="Profile" />
					</div>
				</>
			)}
		</Main>
	);
}

export default Profile;

