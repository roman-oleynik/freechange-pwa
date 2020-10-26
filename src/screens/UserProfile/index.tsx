import React, { useState, useEffect, useMemo, CSSProperties } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, Link } from 'react-router-dom';
import { fetchThingsOfUser } from '../../actions/thingsActions';
import { getLocalStorageItem } from '../../modules/localStorageAPI';
import { DeleteThingDialog } from '../../components/DeleteThingDialog';
import { DATABASE } from '../../firebase/databaseAPI';
import { STORAGE } from '../../firebase/storageAPI';
import { BusyIndicator } from '../../components/BusyIndicator';
import { Page } from '../../components/Page';
import "./style.scss";
import { loggedOwnerSelector, thingsOfUserSelector } from '../../selectors';
import { SimpleForm } from '../../components/SimpleForm';
import { ThingsContainer } from '../../components/ThingsContainer';
import { Avatar } from '../../components/Avatar';


function UserProfile() {
	const dispatch = useDispatch();

	const loggedUserIdFromLocalStorage: string | null = getLocalStorageItem("loggedUser");

	const loggedOwner = useSelector(loggedOwnerSelector);
	const thingsOfUser = useSelector(thingsOfUserSelector);

	const [ popup, setPopup ] = useState<JSX.Element>(<></>);
	const [ isBusy, setIsBusy ] = useState<boolean>(false);
		
	useEffect(() => {
		document.title = "Profile";
	});
	useEffect(() => {
		if ( !loggedOwner ) {
			return;
		}
		dispatch(fetchThingsOfUser(loggedOwner.id));
	}, [loggedOwner?.id]);

	async function onDeleteConfirmed(key: string | undefined, id: string | undefined) {
		if ( key && id ) {
			setPopup(<></>);
			setIsBusy(true);

			await DATABASE.deleteThing(key);
			
			if (loggedOwner) {
				dispatch(fetchThingsOfUser(loggedOwner.id));
			}
			await DATABASE.deletePhotosOfThing(id);
			await STORAGE.deletePhotosOfThing(id);

			setIsBusy(false);
		} else {
			throw new Error("The data- attribute of Delete button wasn't got.")
		}
	};

	function openDeleteThingConfirmationDialog(EO?: React.MouseEvent<HTMLButtonElement>) {
		const keyOfThing = (EO?.target as HTMLButtonElement).dataset.key;
		const idOfThing = (EO?.target as HTMLButtonElement).dataset.id;

		setPopup(<DeleteThingDialog
			title="Удаление вещи"
			message="Вы действительно хотите удалить эту вещь?"
			onYesPressed={() => onDeleteConfirmed(keyOfThing, idOfThing)}
			close={() => setPopup(<></>)}
		/>);
	};

	if ( isBusy ) {
		return <BusyIndicator />;
	}
	if ( !loggedUserIdFromLocalStorage ) {
        return <Redirect to="/" />
	}
	if (!loggedOwner) {
		return <BusyIndicator />
	}
	return (
		<Page
			title={loggedOwner.name}
			isMain={false}
		>
			<div className="container py-4 px-3">
				<div className="d-flex flex-column justify-content-flex-start align-items-center">
					<div className="pb-3">
						<Avatar
							source={loggedOwner.avatar}
							size={260}
						/>
					</div>
					<SimpleForm
						data={[
							{
								field: "Город",
								value: loggedOwner.location || "пусто"
							},
							{
								field: "Номер телефона",
								value: loggedOwner.phoneNumber || "пусто"
							}
						]}
					/>
					<Link
						to="/settings"
						className="btn btn-primary mb-5">
						Edit Profile
					</Link>
					<ThingsContainer
						things={thingsOfUser}
						hasEditDeleteButtons={true}
						onDeletePressed={openDeleteThingConfirmationDialog}
					/>
					<Link
						to="/profile/addThing"
						className="Corner-Button btn btn-primary">
						Добавить вещь
					</Link>
					{
						popup
					}
				</div>
			</div>
		</Page>
	);
};

export default UserProfile;
