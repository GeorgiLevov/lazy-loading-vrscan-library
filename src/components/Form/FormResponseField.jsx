import React from 'react';
import styled from 'styled-components';

const FormResponseField = ({ children }) => {
	return <ErrorResponse className="error-message">{children}</ErrorResponse>;
};

const ErrorResponse = styled.p`
	/* background: orangered; */
	color: red;
`;

export default FormResponseField;
