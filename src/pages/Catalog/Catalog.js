import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import Main from '../../components/Main';
import Filters from './Filters';
import PageTitle from '../../components/PageTitle';
import styled from 'styled-components';
import { COLORS, FONTS, QUERIES, SPACING } from '../../constants';
import { useVRScans } from '../../../api/context/vrscans.context';
import Card from '../../components/Card';
import CardImage from '../../components/Card/CardImage';
import CardDetails from '../../components/Card/CardDetails';
import BackToTopButton from './BackToTopButton';

function Catalog() {
	const { vrScans, search } = useVRScans();

	const searchFilterForm = useRef();
	const [scanSearchValue, setScanSearchValue] = useState('');
	const [scansErrorMessage, setScansErrorMessage] = useState('');
	// idle / loading / success / error
	const [status, setStatus] = useState('idle');

	async function handleSubmit(event) {
		event.preventDefault();
		setStatus('loading');
		try {
			const response = await search(scanSearchValue);
		} catch (error) {
			setStatus('error');
			setScansErrorMessage(error.message);
			console.error(error);
		}
	}

	useEffect(() => {
		let timer = setTimeout(() => {
			// // preventing meaningless requests from happening
			const searchConditionMet = scanSearchValue && scanSearchValue.length > 2;
			if (searchConditionMet) searchFilterForm.current.requestSubmit();
		}, 1500);

		return () => clearTimeout(timer);
	}, [scanSearchValue]);

	useEffect(() => {
		// making sure status is appropriate sicne we're rendeding based on the status
		if (vrScans.length) {
			setStatus('success');
			setScanSearchValue('');
		}
	}, [vrScans]);
	return (
		<>
			<Header />
			<BackToTopButton />
			<Main>
				<PageTitle>VRScans Catalog</PageTitle>
				<FiltersContainer>
					{/* <SearchFilter></SearchFilter> */}
					<form
						ref={searchFilterForm}
						onSubmit={(event) => handleSubmit(event)}>
						<SearchInput
							id="search-form"
							required={true}
							label="search"
							placeholder="What type of scan are you looking for..."
							value={scanSearchValue}
							onChange={(e) => {
								setScanSearchValue(e.target.value);
							}}
						/>
					</form>
					<Filters />
					{/* ExpandingFilters
                    Materials / Colors / Tags */}
				</FiltersContainer>
				<VRScansContainer>
					{status === 'success' &&
						vrScans.map((scan) => {
							return (
								<Card
									key={scan.id}
									variant="vrscan"
									name={scan.name}
									imageSrc={scan.thumb}
									imageAlt={scan.name}>
									<CardDetails>
										<p>{scan.manufacturer_id}</p>
										<p>{scan.file_name}</p>
									</CardDetails>
								</Card>
							);
						})}
					{status === 'loading' && <div>Looking for the scans</div>}
					{status === 'error' && <div>{scansErrorMessage}</div>}
				</VRScansContainer>
			</Main>
			{/* <Footer></Footer> */}
		</>
	);
}

const FiltersContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: ${SPACING.large} auto;
`;

const SearchInput = styled.input`
	background-color: ${COLORS.white};
	color: ${COLORS.gray.dark};
	font-family: 'Helvetica', sans-serif;
	font-size: ${FONTS.text.mega};
	font-weight: 300;
	line-height: ${SPACING.large};
	text-align: center;

	width: 100%;
	border: 0;
	padding: ${SPACING.small};

	@media ${QUERIES.tabletAndDown} {
		font-size: ${FONTS.heading.small};
	}

	@media ${QUERIES.phoneAndDown} {
		font-size: ${FONTS.text.normal};
	}

	&::placeholder {
		color: ${COLORS.gray.text};
		opacity: 0.8;
		font-weight: 300;
		transition: opacity 0.25s linear;

		@media ${QUERIES.tabletAndDown} {
			font-size: ${FONTS.heading.small};
		}

		@media ${QUERIES.phoneAndDown} {
			font-size: ${FONTS.text.normal};
		}
	}

	&:focus {
		&::placeholder {
			opacity: 0;
		}
	}
`;

const VRScansContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 30px;
	justify-content: center;
	width: 100%;
	margin: 0 auto;
	justify-items: center;
`;

export default Catalog;

