import React, { useState, useEffect, useRef } from 'react';
import Main from '../../components/Main/Main';
import Button from '../../components/Button';
import { storage } from '../../../api/appwrite';
import { useUser } from '../../../api/context/user.context';
import Breadcrumbs from '../../components/Breadcrumbs';
import Header from '../../components/Header/Header';
import { ProfileContainer, InputField, SaveButton } from './ProfileStyles';
import { Edit, ArrowRight } from 'react-feather';
import Footer from '../../components/Footer';

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
	const inputRef = useRef({ firstname: null, lastname: null, email: null });

	useEffect(() => {
		if (user) {
			setFirstname(user?.name.split(' ')[0]);
			setLastname(user?.name.split(' ')[1]);
			setEmail(user?.email);
			setProfileUrl(user?.prefs.photo_url);
		}
	}, [user]);

	const toggleEdit = (field) => {
		setIsEditing((prev) => {
			const isFieldEditing = !prev[field];
			if (isFieldEditing) {
				setTimeout(() => inputRef.current[field]?.focus(), 0);
			}
			return { ...prev, [field]: isFieldEditing };
		});
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
		<>
			<Header />
			<Main>
				<Breadcrumbs />
				<h1>Profile</h1>
				<ProfileContainer>
					{user && (
						<>
							<div className="section-profile-info">
								<div className="profile-image-container">
									<img src={profileUrl} alt="Profile" />
								</div>
								<div className="update-image">
									<input
										type="file"
										style={{ display: 'none' }}
										ref={fileInputRef}
										onChange={handleFileChange}
									/>
									<Button
										variant="secondary"
										iconfirst={true}
										size="medium"
										icon={Edit}
										onClick={handleEditProfileImageClick}>
										Edit Profile Image
									</Button>
								</div>
								<div className="user-details">
									<div className="fullname">{user.name}</div>
									<div className="email">{user.email}</div>
								</div>
							</div>
							<div className="section-profile-settings">
								<div className="profile-settings-wrap">
									<div className="section-heading">
										<h2>Account settings</h2>
									</div>
									<div className="edit-row">
										<label>First Name</label>
										<div className="input">
											<InputField
												ref={(el) => (inputRef.current.firstname = el)}
												type="text"
												value={firstname}
												readOnly={!isEditing.firstname}
												$isEditing={isEditing.firstname}
												onChange={(e) => setFirstname(e.target.value)}
											/>
											{isEditing.firstname ? (
												<SaveButton onClick={handleFirstNameChange}>
													Save
												</SaveButton>
											) : (
												<Button
													variant="secondary"
													iconfirst={true}
													size="medium"
													icon={Edit}
													onClick={() => toggleEdit('firstname')}>
													Edit
												</Button>
											)}
										</div>
									</div>

									<div className="edit-row">
										<label>Last Name</label>
										<div className="input">
											<InputField
												ref={(el) => (inputRef.current.lastname = el)}
												type="text"
												value={lastname}
												readOnly={!isEditing.lastname}
												onChange={(e) => setLastname(e.target.value)}
												$isEditing={isEditing.lastname}
											/>
											{isEditing.lastname ? (
												<SaveButton onClick={handleLastNameChange}>
													Save
												</SaveButton>
											) : (
												<Button
													variant="secondary"
													iconfirst={true}
													size="medium"
													icon={Edit}
													onClick={() => toggleEdit('lastname')}>
													Edit
												</Button>
											)}
										</div>
									</div>

									<div className="edit-row">
										<label>Email</label>
										<div className="edit-row-helper">
											<div className="input email-wrap">
												<InputField
													ref={(el) => (inputRef.current.email = el)}
													type="email"
													value={email}
													readOnly={!isEditing.email}
													onChange={(e) => setEmail(e.target.value)}
													onBlur={handleEmailFocusOut}
													$isEditing={isEditing.email}
												/>
												{isEditing.email ? (
													<SaveButton onClick={handleEmailEdit}>
														Save
													</SaveButton>
												) : (
													<Button
														variant="secondary"
														iconfirst={true}
														size="medium"
														icon={Edit}
														onClick={handleEmailEdit}>
														Edit
													</Button>
												)}
											</div>

											<div className="pass-popup-wrap">
												{showEmailPopup && (
													<div className="popup">
														<div className="popup-warning">
															<label>
																{' '}
																Your email will be changed to:{' '}
																<span>{email}</span>
															</label>
															<p>Please enter your password</p>
														</div>
														<div className="input">
															<InputField
																type="password"
																placeholder="Enter password"
																onChange={(e) => setPassword(e.target.value)}
															/>
															<SaveButton onClick={handleEmailUpdate}>
																Confirm
															</SaveButton>
														</div>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
								<div className="additional-links-wrap">
									<div className="section-heading">
										<h2>Reviews & Favorites</h2>
									</div>
									<ul>
										<li>
											<Button
												variant="secondary"
												iconfirst={true}
												size="medium"
												icon={ArrowRight}
												href="/reviews">
												My Reviews
											</Button>
										</li>
										<li>
											<Button
												variant="secondary"
												iconfirst={true}
												size="medium"
												icon={ArrowRight}
												href="/favorites">
												<span>Favourites</span>
											</Button>
										</li>
									</ul>
								</div>
							</div>
						</>
					)}
				</ProfileContainer>
			</Main>
		</>
	);
}

export default Profile;

