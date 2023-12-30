import styled from 'styled-components';
import CollapsibleFilterBox from './CollapsibleFilterBox';
import filtersData from './filter';

function Filters() {
	const FiltersWrapper = styled.div`
		display: flex;
		justify-content: space-between;
		margin: 10px 0;
		align-items: flex-start;

		@media (max-width: 960px) {
			flex-direction: column;
			align-items: stretch;
		}
	`;

	return (
		<FiltersWrapper>
			<CollapsibleFilterBox title="Materials" filters={filtersData.materials} />
			<CollapsibleFilterBox
				title="Colors"
				filters={filtersData.colors}
				isColor={true}
			/>
			<CollapsibleFilterBox title="Tags" filters={filtersData.tags} />
		</FiltersWrapper>
	);
}
export default Filters;

