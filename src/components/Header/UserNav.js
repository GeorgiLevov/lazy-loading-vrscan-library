import { User, Heart } from 'feather-icons-react';

function UserNav() {
	return (
		<div className="userNav-container">
			<ul>
				<li>
					<a href="">
						<User strokeWidth="1.1" /> <span>Hi, Georgi</span>
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

