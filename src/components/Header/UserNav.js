import { User, Heart } from 'feather-icons-react';
import { useUser } from '../../../api/context/user.context';

function UserNav() {
	const { user, login, signup: register, logout } = useUser();

	return (
		<div className="userNav-container">
			<ul>
				<li>
					<a href="">
						<User strokeWidth="1.1" />{' '}
						<span>
							Hi, <span>{user.name}</span>
						</span>
					</a>
				</li>
				<li>
					<a href="">
						<Heart strokeWidth="1.1" /> <span>Favourites</span>
					</a>
				</li>
			</ul>
		</div>
	);
}
export default UserNav;

