import { User, Heart } from 'feather-icons-react';
import { getFirstName } from './Header.utils';
import { Link, NavLink } from 'react-router-dom';
function UserNav({ name }) {
	return (
		<div className="userNav-container">
			<ul>
				<li>
					<Link to="/profile">
						<User strokeWidth="1.1" /> <span>Hi, {getFirstName(name)}</span>
					</Link>
				</li>
				<li>
					<Link to="/favorites">
						<Heart strokeWidth="1.1" /> <span>Favourites</span>
					</Link>
				</li>
			</ul>
		</div>
	);
}
export default UserNav;
