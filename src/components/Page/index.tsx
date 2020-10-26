import React from 'react';
import { PageHeader } from '../PageHeader';
import './style.scss';

type Props = {
    title: string,
    isMain: boolean,
    children: JSX.Element
}



export function Page({ title, isMain, children }: Props) {
    return (
		<article className="Page container-fluid px-0" data-testid="Page">
            {
                title &&
                <PageHeader
                    title={title}
                    hasBackLink={!isMain}
                />
            }
            <section>
                {
                    children
                }
            </section>
        </article>
    );
}
