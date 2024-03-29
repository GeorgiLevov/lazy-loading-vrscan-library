import { useRef } from 'react';
import Button from '../../components/Button';
import { Edit } from 'react-feather';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import { SPACING } from '../../constants';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updatePhoto } from '../../redux/slices/userSlice';
import useToggle from '../../hooks/useToggle.hook';

/**
 * @module EditImageHandler
 * @description Provides functionality to update the user's profile image.
 * Includes an image loader and a handler to upload a new image.
 * @returns {React.Component} Component for profile image editing.
 */

function EditImageHandler() {
	const { data: user, status } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const fileInputRef = useRef(null);
	const [profileImageLoading, toggleProfileImageLoading] = useToggle();
	/**
	 * Initiates the profile image update process by triggering a click on the hidden file input.
	 * @function
	 * @name handleProfileImageUpdate
	 * @memberof module:EditImageHandler
	 */
	const handleProfileImageUpdate = () => {
		fileInputRef.current.click();
	};

	/**
	 * Handles the new image file selection and updates the user's profile image.
	 * @function
	 * @name handleFileChange
	 * @param {Event} event - The event triggered by changing the file input.
	 * @memberof module:EditImageHandler
	 */

	const handleFileChange = async (event) => {
		toggleProfileImageLoading();
		const file = event.target.files[0];
		if (file) {
			try {
				await dispatch(updatePhoto(file));
				toggleProfileImageLoading();
			} catch (error) {
				console.error(error.message);
			}
		}
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<>
			<Loader
				isLoading={status === 'loading' && profileImageLoading}
				variant="profile">
				<Card
					variant="profile"
					imageSrc={user?.prefs.photo || ''}
					imageAlt="Profile image">
					<input
						type="file"
						style={{ display: 'none' }}
						ref={fileInputRef}
						onChange={handleFileChange}
					/>
					<Button
						id="update-profile-image"
						variant="secondary"
						iconfirst={true}
						size="medium"
						icon={Edit}
						onClick={handleProfileImageUpdate}>
						Edit Profile Image
					</Button>
					<UserInfoWrap>
						<p style={{ fontWeight: '700' }}>{user.name}</p>
						<p>{user.email}</p>
					</UserInfoWrap>
					<Button
						variant="primary"
						size="medium"
						onClick={handleLogout}
						href={'/'}>
						Log out
					</Button>
				</Card>
			</Loader>
		</>
	);
}

const UserInfoWrap = styled.div`
	text-align: center;
	padding-bottom: ${SPACING.medium};
`;
export default EditImageHandler;
