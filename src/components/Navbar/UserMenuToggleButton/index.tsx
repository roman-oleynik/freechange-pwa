import React, { useState} from 'react';
import { Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../../../types/types';
import './style.scss';

type Props = {
	toggleDropdown: (EO: React.MouseEvent<HTMLButtonElement>) => void
};



export function UserMenuToggleButton({ toggleDropdown }: Props) {
	const loggedOwner = useSelector((state: State) => state.loggedOwner);

	if (!loggedOwner) {
		return <Redirect to="/login" />;
	} else {
		return (
			<button
				className="Navbar__User-Menu"
				onClick={toggleDropdown}>
				<div 
					className="Navbar__User-Menu-Avatar-Container"
					style={{background: `url(${loggedOwner.avatar}) no-repeat center top / cover`}}
				>
					{
						!loggedOwner.avatar && loggedOwner.name[0]
					}
				</div>
			</button>
		);
	};
};


export default UserMenuToggleButton;