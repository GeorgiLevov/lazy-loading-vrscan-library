import { User, Heart } from 'react-feather';
import Button from '../Button/Button';
import { getFirstName } from './Header.utils';
import { useState } from 'react';

function UserNav({ name }) {
	const [username, setUsername] = useState(name);

	if (name !== username) {
		setUsername(name);
	}

	return (
		<>
			{username && (
				<div className="userNav-container">
					<ul>
						<li>
							<Button
								variant="underline"
								iconfirst={true}
								size="medium"
								icon={User}
								href="/profile">
								<span>Hi, {getFirstName(username)}</span>
							</Button>
						</li>
						<li>
							<Button
								variant="underline"
								iconfirst={true}
								size="medium"
								icon={Heart}
								href="/favorites">
								<span>Favourites</span>
							</Button>
						</li>
					</ul>
				</div>
			)}
		</>
	);
}
export default UserNav;
