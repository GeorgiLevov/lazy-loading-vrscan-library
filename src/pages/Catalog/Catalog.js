import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import Main from '../../components/Main';
import Filters from './Filters';
import PageTitle from '../../components/PageTitle';
import styled from 'styled-components';
import { COLORS, FONTS, QUERIES, SPACING } from '../../constants';
import { useVRScans } from '../../../api/context/vrscans.context';
import Card from '../../components/Card';
import BackToTopButton from './BackToTopButton';
import { Objectify } from '../../helpers';
import { visuallyHiddenStyles } from '../../components/VisuallyHidden/VisuallyHidden';
import { useInView } from 'react-intersection-observer';
import Loader from '../../components/Loader';
import ActiveFiltersList from '../../components/ActiveFiltersList';

function Catalog() {
	const { vrScans, search } = useVRScans();

	const { ref: scrollRef, inView } = useInView({
		threshold: 1,
		triggerOnce: true,
		onChange: (inView) => {
			if (inView) {
				// Fire a tracking event to your tracking service of choice.
				getMoreScans();
			}
		},
	});

	const textSearchFilter = useRef();
	const [textSearchValue, setTextSearchValue] = useState('');
	const [textSetValue, setTextSetValue] = useState('');
	const [filterSearchValues, setFilterSearchValues] = useState(new Set());
	const [resultsPage, setResultsPage] = useState(1);
	const [scansErrorMessage, setScansErrorMessage] = useState('');

	// idle / loading / success / error
	const [status, setStatus] = useState('idle');

	async function handleSubmit() {
		setResultsPage(1);
		// this will set the textFilter value in our ActiveFiltersList
		setTextSetValue(textSearchValue);

		try {
			await search(textSearchValue, filterSearchValues);
		} catch (error) {
			setStatus('error');
			setScansErrorMessage(error.message);
			console.error(error);
		}
	}

	async function getMoreScans() {
		setResultsPage((prevCount) => prevCount + 1);

		try {
			await search(textSearchValue, filterSearchValues, resultsPage);
		} catch (error) {
			setStatus('error');
			setScansErrorMessage(error.message);
			console.error(error);
		}
	}

	// Only submit search request if it meets search conditions, wait 1500ms
	useEffect(() => {
		setStatus('loading');
		const searchDelayFromLatestnput = 1500;
		// preventing meaningless requests from happening
		let timer = setTimeout(() => {
			handleSubmit();
		}, searchDelayFromLatestnput);

		return () => clearTimeout(timer);
	}, [textSearchValue, filterSearchValues]);

	// Set fetch status to Success once we have the Scans loaded
	useEffect(() => {
		// making sure status is appropriate sicne we're rendeding based on the status
		if (vrScans) {
			setStatus('success');
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
						onSubmit={(event) => {
							event.preventDefault;
							return false;
						}}>
						<SearchInput
							id="search-form"
							ref={textSearchFilter}
							required={true}
							label="search"
							placeholder="What type of scan are you looking for..."
							value={textSearchValue}
							onChange={(e) => {
								setTextSearchValue(e.target.value);
							}}
						/>
					</form>
					<Filters
						id="filter-buttons"
						filterSearchValues={filterSearchValues}
						setFilterSearchValues={setFilterSearchValues}
					/>
					<ActiveFiltersList
						textSetValue={textSetValue}
						setTextSetValue={setTextSetValue}
						filterSearchValues={filterSearchValues}
						setFilterSearchValues={setFilterSearchValues}
					/>
				</FiltersContainer>
				{/*  */}
				<Loader isLoading={status === 'loading'}>
					<VRScansContainer>
						{vrScans.map((scan, index) => {
							const isElementinMiddle = index === vrScans.length - 9;

							return (
								<Card
									key={`${scan.id}`}
									variant="vrscan"
									name={scan.name}
									summary={[scan.material, scan.colors, scan.tags]}
									imageSrc={scan.thumb}
									imageAlt={scan.name}>
									{scan.manufacturer && (
										<p>{Objectify(scan.manufacturer).name}</p>
									)}
									<p> {scan.file_name.replace('.vrscan', '')}</p>
									{isElementinMiddle && (
										<span style={visuallyHiddenStyles} ref={scrollRef}>
											Will start fetching next elements once this is reached!
										</span>
									)}
								</Card>
							);
						})}

						{status === 'error' && <div>{scansErrorMessage}</div>}
					</VRScansContainer>
				</Loader>
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
