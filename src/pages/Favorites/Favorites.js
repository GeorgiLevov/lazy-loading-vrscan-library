import React, { useEffect, useState } from 'react';
import { useVRScans } from '../../../api/context/vrscans.context';
import Header from '../../components/Header/Header';
import Main from '../../components/Main';
import Card from '../../components/Card';
import Footer from '../../components/Footer/Footer';
import { Objectify } from '../../helpers';
import styled from 'styled-components';
import ViewScanDetails from '../../components/Modal/ViewScanDetails';
import BackToTopButton from '../../components/Button/BackToTopButton';
import Breadcrumbs from '../../components/Breadcrumbs';
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { updatePrefs } from '../../redux/slices/userSlice';
import NoResultsHeader from '../../components/NoResultsHeader';
import Button from '../../components/Button';
import { Compass } from 'react-feather';
function Favorites() {
	const { data: user, isLoggedIn, status } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { favoriteScans, getFavorites } = useVRScans();

	const [favorites, setFavorites] = useState(user?.prefs.favorites || []);

	useEffect(() => {
		if (favorites.length > 0) {
			const favoritesArray =
				typeof favorites === 'string' ? JSON.parse(favorites) : favorites;
			setFavorites(favoritesArray);
			getFavorites(favoritesArray);
		}
	}, [favorites]);

	const toggleFavorite = (scanId) => {
		let newFavorites;
		if (favorites.includes(scanId)) {
			newFavorites = favorites.filter(
				(favoriteScanId) => favoriteScanId !== scanId
			);
		}
		setFavorites(newFavorites);
		dispatch(updatePrefs({ favorites: JSON.stringify(newFavorites) }));
	};

	return (
		<>
			<Header />
			<BackToTopButton />
			<Main>
				<Breadcrumbs />
				<PageTitle>Favourites</PageTitle>
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
											{Objectify(scan.manufacturer).name}
										</p>
									)}
									<p className="filename">
										{scan.file_name.replace('.vrscan', '')}
									</p>
									<ViewScanDetails scan={scan} />
								</Card>
							))
						) : (
							<>
								<NoResultsHeader>
									You haven't favorited any scans yet!
									<br />
									What are you waiting for?
									<Button
										href="/catalog"
										variant="primary"
										icon={Compass}
										size="large"
										style={{ margin: '20px auto' }}>
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
