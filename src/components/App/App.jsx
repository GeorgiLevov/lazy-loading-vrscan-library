import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../../../GlobalStyles';
import MyNewComponent from '../MyNewComponent';

const StylishHeading = styled.h1`
	font-family: Georgia, serif;
	color: violet;
`;
function App() {
	return (
		<>
			<StylishHeading>VRScans!</StylishHeading>
			<GlobalStyles />
		</>
	);
}

export default App;
