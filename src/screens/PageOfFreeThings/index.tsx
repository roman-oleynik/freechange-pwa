import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State, SearchThingsQuery } from '../../types/types';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import { ThingsContainer } from '../../components/ThingsContainer';

import { useQueryString } from '../../hooks/useQueryString';
import { fetchPageOfFreeThings } from '../../actions/thingsActions';
import { Redirect } from 'react-router-dom';
import { BusyIndicator } from '../../components/BusyIndicator';
import { Page } from '../../components/Page';
import {
	freeThingsPageDataSelector,
	curPageOfFreeThingsSelector,
	amountOfPagesOfFreeThingsSelector
} from '../../selectors';


export function PageOfFreeThings() {
	const dispatch = useDispatch();

	const things = useSelector(freeThingsPageDataSelector);
	const pagesAmount = useSelector(amountOfPagesOfFreeThingsSelector);
	const curPage = useSelector(curPageOfFreeThingsSelector);
		
	useEffect(() => {
		document.title = "Free things";
	});
	useEffect(() => {
		dispatch(fetchPageOfFreeThings(curPage));
	}, [curPage]);

	function fetchPageContent(page: number) {
		dispatch( fetchPageOfFreeThings( page ));
	}
	if (!things.length) {
		return <BusyIndicator />;
	}
	return (
		<Page
			title="Free things"
			isMain={false}>
			<>
				<SearchBar searchFreeThings={true} />
				<section>
					<Pagination
						pagesAmount={pagesAmount}
						curPage={curPage}
						onPageChange={fetchPageContent}
					/>
					<ThingsContainer
						things={things}
						hasEditDeleteButtons={false}
						onDeletePressed={() => {}}
					/>
				</section>
			</>
		</Page>
	);
}
