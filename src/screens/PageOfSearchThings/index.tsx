import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State, SearchThingsQuery } from '../../types/types';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import { ThingsContainer } from '../../components/ThingsContainer';

import { useQueryString } from '../../hooks/useQueryString';
import { fetchThingsByQuery, setFoundThings } from '../../actions/thingsActions';
import { Redirect } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig';
import { BusyIndicator } from '../../components/BusyIndicator';
import { Page } from '../../components/Page';

type Props = {
    location: {
		search: string,
		pathname: string,
	},
	match: {
		params: {
			num: string
		}
	}
}


export function PageOfSearchThings({ location }: Props) {
	const dispatch = useDispatch();

	const { query, isFree } = useQueryString(location.search);

	const [ hasSearchEnded, setHasSearchEnded ] = useState(false);
	const [ isSearchFormDiscarded, setIsSearchFormDiscarded ] = useState<boolean>(false);

	const runFindingProcess = async (query: string, isFree: string) => {
		await dispatch(fetchThingsByQuery({
			valueOfSearchInput: query ? query as string : "",
    		isFree: isFree === "true" ? true : false,
		}));
		setHasSearchEnded(true);
	}
	useEffect(() => {
		document.title = "Things search";
	});
	useEffect(() => {
		if (typeof query === "string" && typeof isFree === "string") {
			runFindingProcess(query, isFree);
		}
		return () => {
			dispatch(setFoundThings([]));
		}
	}, [query, isFree]);
	const foundThings = useSelector((state: State) => state.foundThings);

	function discardSearchForm() {
		setIsSearchFormDiscarded(true);
	}


	if ( isSearchFormDiscarded ) {
		if (isFree === "true") {
			return <Redirect to="/free" />
		} else {
			return <Redirect to="/" />
		}
	}
	if ( !hasSearchEnded ) {
		return <BusyIndicator />;
	}
	return (
		<Page
			title={`Found ${foundThings.length} things`}
			isMain={false}>
			<>
				<SearchBar
					searchFreeThings={isFree === "true" ? true : false}
					onFormDiscard={discardSearchForm}
					thingNameFromQS={query ? query as string : ""}
				/>
				<section>
					<ThingsContainer
						things={foundThings}
						hasEditDeleteButtons={false}
						onDeletePressed={() => {}}
					/>
				</section>
			</>
		</Page>
	)
}
