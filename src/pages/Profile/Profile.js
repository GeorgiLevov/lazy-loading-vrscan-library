import React, { useState, useEffect, useRef } from 'react';
import Main from '../../components/Main/Main';
import Button from '../../components/Button';
import { useUser } from '../../../api/context/user.context';
import Breadcrumbs from '../../components/Breadcrumbs';
import Header from '../../components/Header/Header';
import {
	ProfileContainer,
	ProfileSection,
	InputField,
	SaveButton,
	ProfileImage,
	ProfileSettings,
	TextInputWrapper,
	EmailEditContainer,
	EmailEditMessage,
	EmailEditInputContainer,
	CancelButton,
	ErrorMessage,
} from './ProfileStyles';
import Modal from '../../components/Modal';
import { Edit, ArrowRight } from 'react-feather';
import Footer from '../../components/Footer';
import PageTitle from '../../components/PageTitle';
import Subheading from '../../components/Subheading';
import Divider from '../../components/Divider';
import Card from '../../components/Card';
import CardDetails from '../../components/Card/CardDetails';
import useToggle from '../../hooks/useToggle.hook';
import ProfileImageWithLoader from './ProfileImageWithLoader';

function Profile() {
	const { user, update } = useUser();
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [profileUrl, setProfileUrl] = useState('');
	const [isEditing, setIsEditing] = useState({
		firstname: false,
		lastname: false,
		email: false,
	});
	const [showEmailModal, toggleEmailModal] = useToggle(false);
	const [password, setPassword] = useState('');
	const fileInputRef = useRef(null);
	const inputRef = useRef({ firstname: null, lastname: null, email: null });
	const [isUploading, setIsUploading] = useState(false);
	const [formErrorMessage, setFormErrorMessage] = useState('');

	useEffect(() => {
		if (user) {
			setFirstname(user?.name.split(' ')[0]);
			setLastname(user?.name.split(' ')[1]);
			setEmail(user?.email);
			setProfileUrl(user?.photo);
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

	const cancelEdit = (field) => {
		setIsEditing((prev) => ({ ...prev, [field]: false }));

		if (field === 'firstname') setFirstname(user?.name.split(' ')[0]);
		if (field === 'lastname') setLastname(user?.name.split(' ')[1]);
	};

	const handleCancelEmailEdit = () => {
		setEmail(user?.email);
		setFormErrorMessage('');
		toggleEmailModal();
	};

	const handleFirstNameUpdate = () => {
		update.name(firstname + ' ' + lastname);
		toggleEdit('firstname');
	};

	const handleLastNameUpdate = () => {
		update.name(firstname + ' ' + lastname);
		toggleEdit('lastname');
	};

	const handleEmailEdit = () => {
		setIsEditing((prev) => ({ ...prev, email: true }));
	};

	const handleEmailFocusOut = () => {
		if (email !== user?.email) {
			toggleEmailModal();
		}
		setIsEditing((prev) => ({ ...prev, email: false }));
	};

	const handleEmailUpdate = async (event) => {
		if (event) {
			event.preventDefault();
		}

		try {
			await update.email(email, password);
			toggleEmailModal();
			setFormErrorMessage('');
		} catch (error) {
			console.error(error);
			setFormErrorMessage(error.message);
		}
	};

	const handleProfileImageUpdate = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		if (file) {
			setIsUploading(true);
			try {
				await update.photo(file);
				setIsUploading(false);
			} catch (error) {
				console.error(error.message);
				setIsUploading(false);
			}
		}
	};

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
								<Card variant="profile">
									<ProfileImageWithLoader
										src={profileUrl}
										alt="Profile image"
										isLoading={isUploading}
									/>

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
										onClick={handleProfileImageUpdate}>
										Edit Profile Image
									</Button>
									<CardDetails>
										<p style={{ fontWeight: '700' }}>{user.name}</p>
										<p>{user.email}</p>
									</CardDetails>
								</Card>
							</ProfileSection>

							<ProfileSettings>
								<Subheading>Account settings</Subheading>
								<TextInputWrapper>
									<label htmlFor="first-name-update-input">First Name</label>
									<InputField
										id="first-name-update-input"
										ref={(el) => (inputRef.current.firstname = el)}
										type="text"
										value={firstname}
										readOnly={!isEditing.firstname}
										$isEditing={isEditing.firstname}
										onChange={(e) => setFirstname(e.target.value)}
									/>
									{isEditing.firstname ? (
										<>
											<SaveButton onClick={handleFirstNameUpdate}>
												Save
											</SaveButton>
											<CancelButton onClick={() => cancelEdit('firstname')}>
												Cancel
											</CancelButton>
										</>
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
								</TextInputWrapper>

								<TextInputWrapper>
									<label htmlFor="last-name-update-input">Last Name</label>
									<InputField
										id="last-name-update-input"
										ref={(el) => (inputRef.current.lastname = el)}
										type="text"
										value={lastname}
										readOnly={!isEditing.lastname}
										onChange={(e) => setLastname(e.target.value)}
										$isEditing={isEditing.lastname}
									/>
									{isEditing.lastname ? (
										<>
											<SaveButton onClick={handleLastNameUpdate}>
												Save
											</SaveButton>
											<CancelButton onClick={() => cancelEdit('lastname')}>
												Cancel
											</CancelButton>
										</>
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
								</TextInputWrapper>

								<TextInputWrapper>
									<label htmlFor="email-update-input">Email</label>
									<InputField
										id="email-update-input"
										ref={(el) => (inputRef.current.email = el)}
										type="email"
										value={email}
										readOnly={!isEditing.email}
										$isEditing={isEditing.email}
										onChange={(e) => setEmail(e.target.value)}
										onBlur={handleEmailFocusOut}
									/>{' '}
									{isEditing.email ? (
										<>
											<SaveButton onClick={handleEmailEdit}>Save</SaveButton>
										</>
									) : (
										<Button
											variant="secondary"
											iconfirst={true}
											size="medium"
											icon={Edit}
											onClick={() => toggleEdit('email')}>
											Edit
										</Button>
									)}
								</TextInputWrapper>

								{showEmailModal && (
									<Modal
										title="Email Edit Modal"
										closeDialog={handleCancelEmailEdit}>
										<EmailEditContainer>
											<EmailEditMessage>
												Are you sure you want to change your email to:{' '}
												<span>{email}</span>
												<p>
													Please verify this is you by entering your password
													below:
												</p>
											</EmailEditMessage>
											<EmailEditInputContainer>
												<InputField
													type="password"
													placeholder="Enter password"
													onChange={(e) => setPassword(e.target.value)}
												/>
												<SaveButton onClick={(e) => handleEmailUpdate(e)}>
													Confirm
												</SaveButton>
											</EmailEditInputContainer>
											{formErrorMessage && (
												<ErrorMessage>{formErrorMessage}</ErrorMessage>
											)}
										</EmailEditContainer>
									</Modal>
								)}

								<Divider />
								<Subheading>Reviews & Favorites</Subheading>
								<Button
									variant="secondary"
									iconfirst={true}
									size="medium"
									icon={ArrowRight}
									href="/reviews">
									My Reviews
								</Button>
								<Button
									variant="secondary"
									iconfirst={true}
									size="medium"
									icon={ArrowRight}
									href="/favorites">
									<span>Favourites</span>
								</Button>
							</ProfileSettings>
						</>
					)}
				</ProfileContainer>
			</Main>
		</>
	);
}

export default Profile;

