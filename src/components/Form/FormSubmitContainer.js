import React from 'react';
import styled from 'styled-components';

const FormSubmitContainer = ({ children }) => {
	return <FlexSplitContainer>{children}</FlexSplitContainer>;
};

const FlexSplitContainer = styled.div`
	width: inherit;
	display: flex;
	justify-content: space-between;

	& > button {
		display: block;
	}
`;

export default FormSubmitContainer;
