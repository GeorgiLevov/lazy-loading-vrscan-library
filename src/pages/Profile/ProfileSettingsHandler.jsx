import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import {
	InputField,
	SaveButton,
	TextInputWrapper,
	EmailEditContainer,
	EmailEditMessage,
	EmailEditInputContainer,
	CancelButton,
	ErrorMessage,
} from './ProfileStyles';
import Modal from '../../components/Modal';
import { Edit, ArrowRight } from 'react-feather';
import Subheading from '../../components/Subheading';
import Divider from '../../components/Divider';
import useToggle from '../../hooks/useToggle.hook';
import { useDispatch, useSelector } from 'react-redux';
import { updateName, updateEmail } from '../../redux/slices/userSlice';

/**
 * @module ProfileSettingsHandler
 * @description Handles the functionality for updating user profile settings.
 * Includes form elements and logic for editing name, email, and other user-specific information.
 * @returns {React.Component} Component with form elements for user profile settings.
 */

function ProfileSettingsHandler() {
	const { data: user, isLoggedIn } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [isEditing, setIsEditing] = useState({
		firstname: false,
		lastname: false,
		email: false,
	});
	const [showEmailModal, toggleEmailModal] = useToggle(false);
	const [password, setPassword] = useState('');
	const inputRef = useRef({ firstname: null, lastname: null, email: null });
	const [formErrorMessage, setFormErrorMessage] = useState('');

	/**
	 * Synchronizes component state with current user details.
	 * @function
	 * @name useEffect
	 * @memberof module:ProfileSettingsHandler
	 */

	useEffect(() => {
		if (user) {
			setFirstname(user?.name.split(' ')[0]);
			setLastname(user?.name.split(' ')[1]);
			setEmail(user?.email);
		}
	}, [user]);

	/**
	 * Toggles edit mode for a given profile field.
	 * @function
	 * @name toggleEdit
	 * @param {string} field - The field to toggle edit mode (e.g., 'firstname', 'lastname', 'email').
	 * @memberof module:ProfileSettingsHandler
	 */

	const toggleEdit = (field) => {
		setIsEditing((prev) => {
			const isFieldEditing = !prev[field];
			if (isFieldEditing) {
				setTimeout(() => inputRef.current[field]?.focus(), 0);
			}
			return { ...prev, [field]: isFieldEditing };
		});
	};

	/**
	 * Cancels edit mode for a given profile field and resets its value.
	 * @function
	 * @name cancelEdit
	 * @param {string} field - The field to cancel edit mode for.
	 * @memberof module:ProfileSettingsHandler
	 */
	const cancelEdit = (field) => {
		setIsEditing((prev) => ({ ...prev, [field]: false }));

		if (field === 'firstname') setFirstname(user?.name.split(' ')[0]);
		if (field === 'lastname') setLastname(user?.name.split(' ')[1]);
	};

	/**
	 * Handles cancelation of email editing.
	 * @function
	 * @name handleCancelEmailEdit
	 * @memberof module:ProfileSettingsHandler
	 */
	const handleCancelEmailEdit = () => {
		setEmail(user?.email);
		setFormErrorMessage('');
		toggleEmailModal();
	};

	/**
	 * Updates the first name in the user slice.
	 * @function
	 * @name handleFirstNameUpdate
	 * @memberof module:ProfileSettingsHandler
	 */
	const handleFirstNameUpdate = () => {
		dispatch(updateName(`${firstname} ${lastname}`));
		toggleEdit('firstname');
	};

	/**
	 * Updates the last name in the user slice.
	 * @function
	 * @name handleLastNameUpdate
	 * @memberof module:ProfileSettingsHandler
	 */
	const handleLastNameUpdate = () => {
		dispatch(updateName(`${firstname} ${lastname}`));
		toggleEdit('lastname');
	};

	/**
	 * Initiates the process for email editing.
	 * @function
	 * @name handleEmailEdit
	 * @memberof module:ProfileSettingsHandler
	 */
	const handleEmailEdit = () => {
		setIsEditing((prev) => ({ ...prev, email: true }));
	};

	/**
	 * Handles the focus-out event for the email input field.
	 * @function
	 * @name handleEmailFocusOut
	 * @memberof module:ProfileSettingsHandler
	 */
	const handleEmailFocusOut = () => {
		if (email !== user?.email) {
			toggleEmailModal();
		}
		setIsEditing((prev) => ({ ...prev, email: false }));
	};

	/**
	 * Handles updating the user's email.
	 * @function
	 * @name handleEmailUpdate
	 * @param {Event} event - The event object.
	 * @memberof module:ProfileSettingsHandlers
	 */
	const handleEmailUpdate = async (event) => {
		if (event) {
			event.preventDefault();
		}

		try {
			dispatch(updateEmail({ email, password }));
			toggleEmailModal();
			setFormErrorMessage('');
		} catch (error) {
			console.error(error);
			setFormErrorMessage(error.message);
		}
	};

	return (
		<>
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
						<SaveButton
							id="edit_first_name_save"
							onClick={handleFirstNameUpdate}>
							Save
						</SaveButton>
						<CancelButton onClick={() => cancelEdit('firstname')}>
							Cancel
						</CancelButton>
					</>
				) : (
					<Button
						id="edit_first_name"
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
						<SaveButton id="edit_last_name_save" onClick={handleLastNameUpdate}>
							Save
						</SaveButton>
						<CancelButton onClick={() => cancelEdit('lastname')}>
							Cancel
						</CancelButton>
					</>
				) : (
					<Button
						id="edit_last_name"
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
						<SaveButton id="edit_email_save" onClick={handleEmailEdit}>
							Save
						</SaveButton>
					</>
				) : (
					<Button
						id="edit_email"
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
				<Modal title="Email Edit Modal" closeDialog={handleCancelEmailEdit}>
					<EmailEditContainer>
						<EmailEditMessage>
							Are you sure you want to change your email to:{' '}
							<span>{email}</span>
							<p>Please verify this is you by entering your password below:</p>
						</EmailEditMessage>
						<EmailEditInputContainer>
							<InputField
								id="email-update-confirmation"
								type="password"
								placeholder="Enter password"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<SaveButton
								id="email-update-confirmation-save"
								onClick={(e) => handleEmailUpdate(e)}>
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
			<Subheading>Quick Access</Subheading>
			<Button
				variant="secondary"
				iconfirst={true}
				size="medium"
				icon={ArrowRight}
				href="/catalog">
				<span>VRScan Library</span>
			</Button>
			<Button
				variant="secondary"
				iconfirst={true}
				size="medium"
				icon={ArrowRight}
				href="/favorites">
				<span>Your Favorites</span>
			</Button>
		</>
	);
}
export default ProfileSettingsHandler;
