import styled from 'styled-components';
import CollapsibleFilterBox from './CollapsibleFilterBox';
import filtersData from './filter';
import { useVRScans } from '../../../api/context/vrscans.context';
import { QUERIES } from '../../constants';

function Filters() {
	const OuterFiltersWrapper = styled.div`
		position: relative;
		z-index: 500;
		height: 230px;

		@media (${QUERIES.laptopAndDown}) {
			height: auto;
		}
	`;

	const FiltersWrapper = styled.div`
		display: flex;
		justify-content: space-between;
		margin: 20px 0;
		align-items: flex-start;
		position: relative;
		z-index: 500;

		@media (${QUERIES.laptopAndDown}) {
			flex-direction: column;
			align-items: stretch;
		}
	`;

	return (
		<OuterFiltersWrapper>
			<FiltersWrapper>
				<CollapsibleFilterBox title="Materials" filterType="materials" />
				<CollapsibleFilterBox
					title="Colors"
					filterType="colors"
					isColor={true}
				/>
				<CollapsibleFilterBox title="Tags" filterType="tags" />
			</FiltersWrapper>
		</OuterFiltersWrapper>
	);
}
export default Filters;

