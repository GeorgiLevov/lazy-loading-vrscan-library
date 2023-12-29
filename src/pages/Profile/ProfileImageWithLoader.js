import React from 'react';
import styled from 'styled-components';
import { ProfileImage as StyledProfileImage } from './ProfileStyles';
import Loader from './Loader';

const ProfileImageWrapper = styled.div`
	position: relative;
	display: inline-block;
`;

const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 150px;
	height: 150px;
	border-radius: 50%;
`;

const ProfileImageWithLoader = ({ isLoading, src, alt }) => (
	<ProfileImageWrapper>
		<StyledProfileImage src={src} alt={alt} />
		{isLoading && (
			<Overlay>
				<Loader />
			</Overlay>
		)}
	</ProfileImageWrapper>
);

export default ProfileImageWithLoader;

