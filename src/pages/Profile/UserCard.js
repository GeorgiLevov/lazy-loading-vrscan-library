import React from 'react';
import Card from '../../components/Card/Card';
import { useUser } from '../../../api/context/user.context';

function UserCard() {
	const { user } = useUser();

	if (!user) {
		return <p>Loading user data or not logged in...</p>;
	}

	const profileImageUrl = user.photo_url;

	return (
		<Card variant="base">
			{profileImageUrl && (
				<img src={profileImageUrl} alt={`${user.name}'s Profile`} />
			)}
			<p>User: {user.name}</p>
			<p>Email: {user.email}</p>
		</Card>
	);
}
export default UserCard;

