import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/Modal';
import { ChevronRight } from 'react-feather';
import { Objectify } from '../../helpers';
import { COLORS } from '../../constants';
import Button from '../../components/Button';
import { FONTS, SPACING } from '../../constants';

// const ViewDetailsButton = styled`
//   display: flex;
//   align-items: center;
//   border: none;
//   cursor: pointer;
//   background: transparent;
//   color: ${COLORS.primaryBlue};
//   font-family: 'Helvetica', sans-serif;
//     font-weight: 300;
// `;

const ModalContent = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
`;

const ImageSection = styled.div`
	flex: 1;
	padding: 20px;

	img {
		width: 280px;
		margin: 0 auto;
		min-width: 100px;
	}
`;

const DetailsSection = styled.div`
	flex: 1;
	padding: 10px;
`;

const AdditionalText = styled.p`
	font-size: ${FONTS.text.small};
	line-height: 18px;
	margin-top: 30px;
`;

const SingleDetail = styled.div`
	font-family: 'Helvetica', sans-serif;
	font-weight: 300;
	margin-bottom: 12px;
`;

const DetailName = styled.div`
	padding-right: 10px;
	display: inline-block;
	color: ${COLORS.black};
`;

const DetailItem = styled.span`
	display: inline;
	font-size: ${FONTS.text.normal};
	border-radius: 16px;
	padding: 4px 12px;
	border: 1px solid ${COLORS.primaryBlue};
	color: ${COLORS.primaryBlue};
	background: transparent;

	white-space: nowrap;

	&:last-of-type {
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const ItemTitle = styled.h2`
	font-family: 'Helvetica', sans-serif;
	font-weight: 500;
	font-size: ${FONTS.heading.large};
	line-height: 36px;
	margin-bottom: 15px;
`;

function ViewScanDetails({ scan }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	function parseString(string) {
		try {
			return JSON.parse(string.replace(/'/g, '"'));
		} catch (error) {
			console.error('Parsing error', string, error);
			return null;
		}
	}

	return (
		<div>
			<Button onClick={openModal} variant="secondary" iconfirst={true}>
				View Scan Details{' '}
				<ChevronRight size={10} style={{ marginLeft: '5px' }} />
			</Button>
			{isModalOpen && (
				<Modal closeDialog={closeModal} title={scan.name}>
					<ModalContent>
						<ImageSection>
							<img src={scan.thumb} alt={scan.name} />
						</ImageSection>
						<DetailsSection>
							<ItemTitle>{scan.name}</ItemTitle>
							<SingleDetail>
								<DetailName>Materials: </DetailName>
								<DetailItem>
									{scan.manufacturer
										? Objectify(scan.material).name
										: 'Not available'}
								</DetailItem>
							</SingleDetail>
							<SingleDetail>
								<DetailName>Colors: </DetailName>
								<DetailItem>
									{scan.colors && scan.colors.length > 0
										? scan.colors
												.map((string) => {
													const colorObj = parseString(string);
													return colorObj ? colorObj.name : 'Invalid format';
												})
												.join(', ')
										: 'Not available'}
								</DetailItem>
							</SingleDetail>
							<SingleDetail>
								<DetailName>Tags: </DetailName>
								<DetailItem>
									{scan.tags && scan.tags.length > 0
										? scan.tags
												.map((string) => {
													const tagObj = parseString(string);
													return tagObj ? tagObj.name : 'Invalid format';
												})
												.join(', ')
										: 'Not available'}
								</DetailItem>
							</SingleDetail>

							<AdditionalText>
								Each material is generated using thousands of images. Real-world
								response to lighting, no seams - the result is often
								indistinguishable from the original sample.
							</AdditionalText>
						</DetailsSection>
					</ModalContent>
				</Modal>
			)}
		</div>
	);
}

export default ViewScanDetails;

