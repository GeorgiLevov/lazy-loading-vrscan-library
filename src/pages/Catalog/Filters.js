import styled from 'styled-components';
import CollapsibleFilterBox from './CollapsibleFilterBox';
import filtersData from './filter';

function Filters() {
	const OuterFiltersWrapper = styled.div`
		position: relative;
		z-index: 500;
		height: 230px;

		@media (max-width: 1024px) {
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

		@media (max-width: 1024px) {
			flex-direction: column;
			align-items: stretch;
		}
	`;

	return (
		<OuterFiltersWrapper>
			<FiltersWrapper>
				<CollapsibleFilterBox
					title="Materials"
					filters={filtersData.materials}
				/>
				<CollapsibleFilterBox
					title="Colors"
					filters={filtersData.colors}
					isColor={true}
				/>
				<CollapsibleFilterBox title="Tags" filters={filtersData.tags} />
			</FiltersWrapper>
		</OuterFiltersWrapper>
	);
}
export default Filters;

