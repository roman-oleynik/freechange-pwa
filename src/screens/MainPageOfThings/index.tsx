import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State, SearchThingsQuery } from '../../types/types';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import { ThingsContainer } from '../../components/ThingsContainer';

import { useQueryString } from '../../hooks/useQueryString';
import { Link, Redirect } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig';
import { fetchPageOfFreeThings, fetchPageOfThings, setDataOfThings } from '../../actions/thingsActions';
import { BusyIndicator } from '../../components/BusyIndicator';
import { Page } from '../../components/Page';
import {
	curPageOfThingsSelector,
	thingsPageDataSelector,
	amountOfPagesOfThingsSelector
} from '../../selectors';
import './style.scss';

export function MainPageOfThings() {
	const dispatch = useDispatch();


	const things = useSelector(thingsPageDataSelector); 	
	const curPage = useSelector(curPageOfThingsSelector); 	
	const pagesAmount = useSelector(amountOfPagesOfThingsSelector);
	
	useEffect(() => {
		document.title = "Freechange";
	});
	
	useEffect(() => {
		if (things.length === 0) {
			dispatch(fetchPageOfThings(curPage));
		}
	}, [curPage]);

	function fetchPageContent(page: number) {
		dispatch(fetchPageOfThings(page));
	}

	if (!things.length) {
		return <BusyIndicator />;
	}
	return (
		<Page title="Main" isMain>
			<>
				<SearchBar searchFreeThings={false} />
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
					<Link className="Corner-Button btn btn-primary" to="/free">Show free things</Link>
				</section>
			</>
		</Page>
	);
}
