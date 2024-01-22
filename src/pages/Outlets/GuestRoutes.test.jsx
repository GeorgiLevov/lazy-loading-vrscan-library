// import { describe, expect, test } from 'vitest';
// import { render, screen } from '../../test/test.utils';
// import GuestRoutes from './GuestRoutes';

// describe('GuestRoutes Component', () => {
//   test('renders Outlet when no user is logged in and loading is complete', () => {
//     const customState = {
//       user: {
//         data: null, 
//       },
//       loader: {
//         loadingCounter: 0, 
//       },
//     };

//     render(
//       <GuestRoutes />,
//       { state: customState, path: '/guest' }
//     );

//     expect(screen.getByText('Guest Content')).toBeInTheDocument();
//   });

//   test('redirects to home when user is present', () => {
//     const customState = {
//       user: {
//         data: {
//           id: '1',
//           name: 'Jane Doe',
//           email: 'jane@example.com',
//         }, 
//       },
//       loader: {
//         loadingCounter: 0, // Make sure to include the loader property
//       },
//     };

//     render(
//       <GuestRoutes />,
//       { state: customState, path: '/guest' }
//     );

//     expect(screen.getByText('Home Page')).toBeInTheDocument();
//   });
// });
