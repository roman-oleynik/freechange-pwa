import React from 'react';
import { createBrowserHistory } from 'history';
import './style.scss';

export function PageHeader({ title, hasBackLink }: any) {
	const history = createBrowserHistory();

    function goBack(EO: React.MouseEvent<HTMLButtonElement>) {
		EO.preventDefault();
		history.goBack();
    };
    return (
        <header className="Page__Header border-bottom border-secondary">
            <div className="d-flex justify-content-center align-items-center py-3 pl-4">
                {
                    hasBackLink &&
                    <button
                        type="button"
                        className="Page__Back btn btn-link py-0 px-0 mr-4"
                        onClick={goBack}
                    >
                        Назад
                    </button>
                }
                <h2 className="Page__Title text-center text-truncate my-0">{title}</h2>
            </div>
        </header>
    );
}