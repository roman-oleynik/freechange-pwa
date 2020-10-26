import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../../../types/types';
import UserMenuToggleButton from '../UserMenuToggleButton';
import MenuAuthButtons from '../MenuAuthButtons';
import './style.scss';
import DropdownMenu from '../DropdownMenu';


export function Navbar() {
    const [isDropdownOpened, setIsDropdownOpened] = useState(false);
    const loggedOwner = useSelector((state: State) => state.loggedOwner);

    function toggleDropdown(EO: React.MouseEvent<HTMLButtonElement>) {
        EO.stopPropagation();

        setIsDropdownOpened(!isDropdownOpened);
    };
    function closeDropdown() {
        setIsDropdownOpened(false);
    };
    return (<>
        <nav className="Navbar">
            <NavLink to="/">
                <h1 className="Navbar__Title">FREECHANGE</h1>
            </NavLink>
            <div className="Navbar__Links">
                <NavLink
                    to="/"
                    exact
                    className="Navbar__Link"
                    activeClassName="Navbar__Link_Active"
                >Home</NavLink>
                <NavLink
                    to="/about"
                    className="Navbar__Link"
                    activeClassName="Navbar__Link_Active"
                >About</NavLink>
            </div>
            {
                loggedOwner
                ?
                <UserMenuToggleButton
                    toggleDropdown={toggleDropdown}
                />
                :
                <MenuAuthButtons />
            }
            {
                isDropdownOpened && <DropdownMenu close={closeDropdown} />
            }
        </nav>
    </>);
};

export default Navbar;