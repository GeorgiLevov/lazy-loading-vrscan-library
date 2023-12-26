import { User, Heart } from 'react-feather';
import Button from '../Button/Button';
import { getFirstName } from './Header.utils';

function UserNav({ name }) {
	return (
		<div className="userNav-container">
			<ul>
				<li>
					<Button
						variant="icon"
						iconfirst={true}
						size="medium"
						icon={User}
						href="/profile">
						<span>Hi, {getFirstName(name)}</span>
					</Button>
				</li>
				<li>
					<Button
						variant="icon"
						iconfirst={true}
						size="medium"
						icon={Heart}
						href="/favorites">
						<span>Favourites</span>
					</Button>
				</li>
			</ul>
		</div>
	);
}
export default UserNav;
