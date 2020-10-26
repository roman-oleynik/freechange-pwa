import React from 'react';
import { Photo } from '../../../types/types';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.scss';

type PhotoProps = {
    data: Photo,
    deleteTempPhoto: (EO: React.SyntheticEvent<EventTarget>) => void
}

export function PhotoCircle({data, deleteTempPhoto}: PhotoProps) {
    return <div className="Photo-Container mx-2 my-2" key={data.id}>
        <div className="Crop-Image rounded-circle">
            <img src={data.source} className="Photo" alt="Avatar"/>
        </div>
        <button
            type="button"
            data-id={data.id}
            data-key={data.key}
            onClick={deleteTempPhoto}
            className="btn btn-danger delete-photo rounded-circle d-flex justify-content-center align-items-center"
        >
            <svg className="cross" viewBox="0 0 426.66667 426.66667"><path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"/></svg>
        </button>
    </div>;
}