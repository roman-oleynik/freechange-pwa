import React from 'react';
import { SimpleFormData } from '../../types/types';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
    data: SimpleFormData[]
}

export function SimpleForm({ data }: Props) {
    return (
        <section className="row d-flex flex-column align-items-center">
            {
                data.map((el, i) => {
                    return <div key={i} className="col">
                        <h4 className="text-center">{el.field}:</h4>
                        <p className="text-center">{el.value}</p>
                    </div>
                })
            }
        </section>
    );
}