import React, { useState, useEffect, useRef } from 'react';
import Button from '../../components/Button';
import { useUser } from '../../../api/context/user.context';
import { Edit } from 'react-feather';
import Card from '../../components/Card';
import useToggle from '../../hooks/useToggle.hook';
import Loader from '../../components/Loader/Loader';

/**
 * @module EditImageHandler
 * @description Provides functionality to update the user's profile image.
 * Includes an image loader and a handler to upload a new image.
 * @returns {React.Component} Component for profile image editing.
 */

function EditImageHandler() {
	const { user, update } = useUser();
	const [profileUrl, setProfileUrl] = useState('');
	const fileInputRef = useRef(null);
	const [isUploading, toggleisUploading] = useToggle(false);

	/**
	 * Updates the profile URL state when the user data changes.
	 * @function
	 * @name useEffect
	 * @memberof module:EditImageHandler
	 */
	useEffect(() => {
		if (user) {
			setProfileUrl(user?.photo);
		}
	}, [user]);

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
		const file = event.target.files[0];
		if (file) {
			toggleisUploading();
			try {
				await update.photo(file);
				toggleisUploading();
			} catch (error) {
				console.error(error.message);
				toggleisUploading();
			}
		}
	};

	return (
		<>
			<Loader isLoading={isUploading}>
				<Card variant="profile" imageSrc={profileUrl} imageAlt="Profile image">
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
					<p style={{ fontWeight: '700' }}>{user.name}</p>
					<p>{user.email}</p>
				</Card>
			</Loader>
		</>
	);
}
export default EditImageHandler;

