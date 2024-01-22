import { useEffect, useState } from 'react';
import { useVRScans } from '../../../api/context/vrscans.context';
import Header from '../../components/Header/Header';
import Main from '../../components/Main';
import Card from '../../components/Card';
import Footer from '../../components/Footer/Footer';
import { Objectify } from '../../helpers';
import styled from 'styled-components';
import BackToTopButton from '../../components/Button/BackToTopButton';
import Breadcrumbs from '../../components/Breadcrumbs';
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { updatePrefs } from '../../redux/slices/userSlice';
import NoResultsHeader from '../../components/NoResultsHeader';
import Button from '../../components/Button';
import { Compass } from 'react-feather';
import ViewScanDetails from '../../components/ViewScanDetails';
function Favorites() {
	const { data: user, isLoggedIn } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { favoriteScans, getFavorites } = useVRScans();

	const [favorites, setFavorites] = useState(user?.prefs.favorites || []);

	useEffect(() => {
		setFavorites(favorites);
		getFavorites(favorites);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [favorites]);

	const toggleFavorite = (scanId) => {
		let newFavorites;
		if (favorites.includes(scanId)) {
			newFavorites = favorites.filter(
				(favoriteScanId) => favoriteScanId !== scanId
			);
		}
		setFavorites(newFavorites);
		dispatch(updatePrefs({ favorites: newFavorites }));
	};

	return (
		<>
			<Header />
			<BackToTopButton />
			<Main>
				<Breadcrumbs />
				<PageTitle>Favorites</PageTitle>
				{isLoggedIn && (
					<VRScansContainer>
						{favoriteScans.length > 0 ? (
							favoriteScans.map((scan) => (
								<Card
									key={scan.id}
									scanId={scan.id}
									variant="vrscan"
									name={scan.name}
									summary={[scan.material, scan.colors, scan.tags]}
									imageSrc={scan.thumb}
									imageAlt={scan.name}
									favorited={favorites.includes(scan.id)}
									toggleFavorite={toggleFavorite}>
									{scan.manufacturer && (
										<p className="manufacturer">
											Manufacturer: {Objectify(scan.manufacturer).name}
										</p>
									)}
									{scan.industries.map((industry, index) => (
										<p key={crypto.randomUUID()} className="filename">
											{index === 0 && 'Industries: '}
											{Objectify(industry).name}
										</p>
									))}
									<ViewScanDetails scan={scan} />
								</Card>
							))
						) : (
							<>
								<NoResultsHeader>
									You haven&apos;t favorited any scans yet!
									<br />
									What are you waiting for?
									<br />
									<Button
										href="/catalog"
										variant="primary"
										icon={Compass}
										size="large"
										style={{ margin: '40px auto' }}>
										Explore VRScans!
									</Button>
								</NoResultsHeader>
							</>
						)}
					</VRScansContainer>
				)}
			</Main>
			<Footer />
		</>
	);
}

const VRScansContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 30px;
	justify-content: center;
	width: 100%;
	margin: 0 auto;
	justify-items: center;

	.filename {
		margin-bottom: 10px;
	}

	img {
		background-color: transparent;
	}
`;

export default Favorites;
