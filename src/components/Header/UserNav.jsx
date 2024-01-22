/**
 * @module UserNav
 * @description This React component renders the user navigation area in the application's header.
 * It displays buttons for user profile and favorites, which are visible only when the user is logged in.
 * The component uses Redux to access the user's authentication status and information.
 *
 * @requires User, Heart from react-feather - Feather icons for the navigation buttons.
 * @requires Button - Custom button component.
 * @requires getFirstName - Utility function to extract the first name from a full name.
 */

import { User, Heart } from 'react-feather';
import Button from '../Button/Button';
import { getFirstName } from './Header.utils';
import { useSelector } from 'react-redux';
import { QUERIES } from '../../constants';
import styled from 'styled-components';

function UserNav() {
	const { data: user, isLoggedIn } = useSelector((state) => state.user);

	return (
		<>
			{isLoggedIn && (
				<NavContainer>
					<ul>
						<li>
							<Button
								variant="underline"
								iconfirst={true}
								size="medium"
								icon={User}
								href="/profile">
								<span>{getFirstName(user?.name)}</span>
							</Button>
						</li>
						<li>
							<Button
								variant="underline"
								iconfirst={true}
								size="medium"
								icon={Heart}
								href="/favorites">
								<span>Favorites</span>
							</Button>
						</li>
					</ul>
				</NavContainer>
			)}
		</>
	);
}

const NavContainer = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;

	ul {
		display: flex;
		list-style: none;
		padding: 0;

		li {
			display: flex;
			align-items: center;
			margin-right: 30px;

			&:last-child {
				margin-right: 0;
			}

			@media ${QUERIES.tabletAndDown} {
				margin-right: 20px;
				text-align: center;
				span {
					display: none;
				}
			}
		}
	}
`;
export default UserNav;

