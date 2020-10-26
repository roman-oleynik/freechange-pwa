import React from 'react';
import './style.scss';

type Props = {
    firebaseKey: string
    thingId: string
    onClick: (EO: any) => void
}

function DeleteButton(props: Props) {
    return <button 
        data-key={props.firebaseKey}
        data-id={props.thingId}
        className="Thing-Item__Delete-Button btn btn-danger"
        onClick={props.onClick}>Удалить</button>
};

export default DeleteButton;