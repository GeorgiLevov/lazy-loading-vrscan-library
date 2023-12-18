import React from 'react';
// import { UserProvider, useUser } from '../../../api/user.context';
// import { account } from '../../../api/appwrite';

function Login() {
	// const user = useUser();

	return (
		// <UserProvider>
			<div>
				{/* {user ? ( */}
					<>
						{/* <h1>Hello {user.current.name}!</h1>
						<span>{user.current.email}</span> */}
					</>
				{/* ) : ( */}
					<>
						<h1>Please Login be!</h1>
						<button
							type="button">
							Login User
						</button>
					</>
				{/* )} */}
			</div>
		// </UserProvider>
	);
}

export default Login;
