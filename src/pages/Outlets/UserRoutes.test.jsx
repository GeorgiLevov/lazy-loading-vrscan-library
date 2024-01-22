// import { describe, expect, test } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import configureMockStore from 'redux-mock-store';
// import UserRoutes from './UserRoutes';

// const mockStore = configureMockStore();

// describe('UserRoutes Component', () => {
//   const mockUserData = {
//     id: '123',
//     name: 'John Doe',
//     email: 'john@example.com'
//   };

//   test('renders Outlet when user is logged in', () => {
//     const store = mockStore({
//       user: {
//         data: mockUserData,
//       },
//       loader: {
//         loadingCounter: 0,
//       }
//     });

//     render(
//       <Provider store={store}>
//         <MemoryRouter initialEntries={['/protected']}>
//           <Routes>
//             <Route path="/protected" element={<UserRoutes />}>
//               <Route path="" element={<div>Protected Content</div>} />
//             </Route>
//             <Route path="/login" element={<div>Login Page</div>} />
//           </Routes>
//         </MemoryRouter>
//       </Provider>
//     );

//     expect(screen.getByText('Protected Content')).toBeInTheDocument();
//   });

//   test('redirects to login when no user is present and loadingCounter is 0', () => {
//     const store = mockStore({
//       user: {
//         data: null,
//       },
//       loader: {
//         loadingCounter: 0,
//       }
//     });

//     render(
//       <Provider store={store}>
//         <MemoryRouter initialEntries={['/protected']}>
//           <Routes>
//             <Route path="/protected" element={<UserRoutes />} />
//             <Route path="/login" element={<div>Login Page</div>} />
//           </Routes>
//         </MemoryRouter>
//       </Provider>
//     );

//     expect(screen.getByText('Login Page')).toBeInTheDocument();
//   });

// });
