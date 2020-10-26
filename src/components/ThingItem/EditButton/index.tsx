import React from 'react';
import './style.scss';
import { Thing } from '../../../types/types';
import { NavLink } from 'react-router-dom';

type OwnProps = {
    thingId: string
}

function EditButton(props: OwnProps) {
    return <NavLink
        to={`/profile/editThing/${props.thingId}`}
        className="Thing-Item__Edit-Button btn btn-warning"
    >Изменить</NavLink>
};

export default EditButton;