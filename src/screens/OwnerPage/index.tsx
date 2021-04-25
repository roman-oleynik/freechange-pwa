import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Owner, State } from '../../types/types';
import './style.scss';
import axios from 'axios';
import { axiosOwners } from '../../axios-instances/axios-instances';
import { getArrayFromObject } from '../../modules/getArrayFromObject';
import { BusyIndicator } from '../../components/BusyIndicator';
import { Page } from '../../components/Page';
import { Avatar } from '../../components/Avatar';

type Match = {
	path: string,
	url: string,
	isExact: boolean,
	params: {
		ownerId: string
	}
};
type Props = {
	match: Match
};



function OwnerPage(props: Props) {
	const ownerId = props.match.params.ownerId;

	const [ owner, setOwner ] = useState<Owner | null>(null)

	async function fetchOwner(id: string) {
		const { data } = await axiosOwners.get(`?orderBy="id"&equalTo="${id}"`, {
			transformResponse: [(data: string) => {
                return getArrayFromObject(JSON.parse(data));
            }]
		});
        setOwner(data[0]);
	}
	useEffect(() => {
		if ( owner ) {
			document.title = `${owner.name}`;
		}
	});
	useEffect(() => {
		fetchOwner(ownerId);
		return () => {
			setOwner(null);
		}
	}, [ownerId]);

	if ( !owner ) {
		return <BusyIndicator />;
	}
	return (
		<Page
			title={owner.name}
			isMain={false}
		>
			<div className="container-fluid d-flex flex-column align-items-center">
				<div className="pt-3">
					<Avatar
						source={owner.avatar instanceof Blob ? URL.createObjectURL(owner.avatar) : owner.avatar}
						size={260}
					/>
				</div>
				<div className="pt-3">
					<a
						href={`tel:${owner.phoneNumber}`}
						className="btn btn-success">
						Позвонить
					</a>
				</div>
			</div>
		</Page>
	);
}

export default OwnerPage;