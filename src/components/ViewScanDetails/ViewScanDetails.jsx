import { useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import { ChevronRight } from 'react-feather';
import { Objectify } from '../../helpers';
import { COLORS, SPACING } from '../../constants';
import Button from '../Button';
import { FONTS } from '../../constants';
import Card from '../Card';
import Divider from '../Divider';
import PropTypes from 'prop-types';

const AdditionalText = styled.span`
	font-size: ${FONTS.text.label};
	line-height: 1.125rem;
	margin-top: auto;
	margin-bottom: ${SPACING.large};
`;

const SingleDetail = styled.div`
	font-family: 'Helvetica', sans-serif;
	font-weight: 300;
	word-wrap: break-word;
	overflow-wrap: break-word;
	hyphens: auto;
	line-break: anywhere;
	word-break: break-all;
`;

const DetailName = styled.div`
	padding-right: 10px;
	display: inline-block;
	color: ${COLORS.black};
	line-height: 2rem;
	font-family: 'Helvetica';
    font-weight: 300;
`;

const DetailItem = styled.span`
	display: inline;
	font-size: ${FONTS.text.normal};
	border-radius: 16px;
	padding: 2px 12px;
	border: 1px solid ${COLORS.primaryBlue};
	color: ${COLORS.primaryBlue};
	background-color: ${COLORS.transparent};
	margin-right: ${SPACING.micro};
	white-space: nowrap;
`;

function ViewScanDetails({ scan }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const noneOfTypeText = useRef('None');

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const colorNames = scan.colors.map((color) => {
		const colorObject = Objectify(color);
		return colorObject.name;
	});

	const industryNames = scan.industries.map((industry) => {
		const industryObject = Objectify(industry);
		return industryObject.name;
	});

	const tagNames =
		scan.tags.length > 0
			? scan.tags.map((tag) => {
					const tagObject = Objectify(tag);
					return tagObject.name;
				})
			: [];

	return (
		<>
			<Button
				onClick={openModal}
				variant="secondary"
				icon={ChevronRight}
				style={{
					padding: `${SPACING.micro} 0 ${SPACING.small}`,
					borderRadius: '0px',
					marginTop: 'auto',
				}}>
				<span style={{ marginRight: '-8px' }}>View Scan Details</span>
			</Button>
			{isModalOpen && (
				<Modal closeDialog={closeModal} title={scan.name}>
					<Card
						variant="inverted"
						imageSrc={scan.thumb}
						imageAlt={scan.name}
						name={scan.name}>
						<SingleDetail>
							<DetailName>Materials: </DetailName>
							<DetailItem>
								{scan.material
									? Objectify(scan.material).name
									: 'Not available'}
							</DetailItem>
						</SingleDetail>
						<SingleDetail>
							<DetailName>Colors: </DetailName>

							{scan.colors && scan.colors.length > 0
								? colorNames.map((colorName) => {
										return (
											<DetailItem key={crypto.randomUUID()}>
												{colorName}
											</DetailItem>
										);
									})
								: noneOfTypeText.current}
						</SingleDetail>
						<SingleDetail>
							<DetailName>Tags: </DetailName>
							{scan.tags && scan.tags.length > 0
								? tagNames.map((tagName) => {
										return (
											<DetailItem key={crypto.randomUUID()}>
												{tagName}
											</DetailItem>
										);
									})
								: noneOfTypeText.current}
						</SingleDetail>
						<SingleDetail>
							<DetailName>Industries: </DetailName>
							{scan.industries && scan.industries.length > 0
								? industryNames.map((industryName) => {
										return (
											<DetailItem key={crypto.randomUUID()}>
												{industryName}
											</DetailItem>
										);
									})
								: noneOfTypeText.current}
						</SingleDetail>
						<SingleDetail>
							<DetailName>File Name: </DetailName>
							{scan.file_name}
						</SingleDetail>
						<Divider />
						<AdditionalText>
							Each material is generated using thousands of images. Real-world
							response to lighting, no seams - the result is often
							indistinguishable from the original sample.
						</AdditionalText>
					</Card>
				</Modal>
			)}
		</>
	);
}

export default ViewScanDetails;

ViewScanDetails.propTypes = {
	scan: PropTypes.object.isRequired,
};
