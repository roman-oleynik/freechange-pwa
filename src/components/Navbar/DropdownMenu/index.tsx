import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { State } from '../../../types/types';
import { setLoggedOwner } from '../../../actions/ownersActions';
import { removeLocalStorageItem } from '../../../modules/localStorageAPI';
import { auth } from '../../../firebase/firebaseConfig';

type Props = {
	close: () => void
};



export function DropdownMenu({ close }: Props) {
	const dispatch = useDispatch();

	const loggedOwner = useSelector((state: State) => state.loggedOwner);
	
	async function logOut() {
		await auth.signOut();
		try {
			removeLocalStorageItem("loggedUser");
			dispatch(setLoggedOwner(null));
		}
		catch (err) {
			throw new Error(err.message);
		}
	};

	const onLogoutButtonPressed = () => {
		close();
		logOut();
	}

	if (!loggedOwner) {
		return <Redirect to="/" />;
	} else {
		return (
			<div className="User-Dropdown-Menu">
				<h3 className="User-Dropdown-Menu__Title">{loggedOwner.name}</h3>
				<nav>
					<ul className="User-Dropdown-Menu__Navigation-List">
						<NavLink
							to="/profile"
							className="User-Dropdown-Menu__Navigation-List-Item"
							onClick={close}>Profile</NavLink>
						<NavLink
							to="/settings"
							className="User-Dropdown-Menu__Navigation-List-Item"
							onClick={close}>Settings</NavLink>
						<NavLink
							to="/about"
							className="User-Dropdown-Menu__Navigation-List-Item"
							onClick={close}>About the app</NavLink>
						<li className="User-Dropdown-Menu__Navigation-List-Item">
							<button
								className="User-Dropdown-Menu__Log-Out"
								onClick={onLogoutButtonPressed}>
								Log Out
							</button>
						</li>
					</ul>
				</nav>
			</div>
		);
	};
};


export default DropdownMenu;