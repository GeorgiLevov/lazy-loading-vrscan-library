import React, { useEffect, useState } from 'react';
import { useUser } from '../../../api/context/user.context';
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

function Favorites() {
    const { favorites, toggleFavorite } = useUser();
    const { vrScans } = useVRScans();
    const [filteredScans, setFilteredScans] = useState([]);

    useEffect(() => {
        const favScans = vrScans.filter(scan => favorites.includes(scan.id));
        setFilteredScans(favScans);
    }, [vrScans, favorites]);

    const isFavorited = (vrScanId) => {
        return favorites.includes(vrScanId);
    };

    return (
        <>
            <Header />
			<BackToTopButton />
            <Main>
			<Breadcrumbs />
				<PageTitle>Favourites</PageTitle>
                <VRScansContainer>
                    {filteredScans.map(scan => (
                        <Card
                            key={scan.id}
                            variant="vrscan"
                            name={scan.name}
                            summary={[scan.material, scan.colors, scan.tags]}
                            imageSrc={scan.thumb}
                            imageAlt={scan.name}
                            favorited={isFavorited(scan.id)}
                            vrScanId={scan.id}
                            onFavoriteToggle={toggleFavorite}>
                                {scan.manufacturer && (
                                    <p className='manufacturer'>{Objectify(scan.manufacturer).name}</p>
                                )}
                                <p className='filename'> {scan.file_name.replace('.vrscan', '')}</p>
                                <ViewScanDetails scan={scan} />
                        </Card>
                    ))}
                </VRScansContainer>
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

    img { background-color: transparent; }
`;

export default Favorites;
