import React from 'react';
import { createBrowserHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import { PageHeader } from '../PageHeader';

export interface IDialog {
	title: string
	children?: React.ReactElement
	onSubmit: (EO: React.FormEvent<HTMLFormElement>) => void
};

export function Dialog(props: IDialog) {
	const history = createBrowserHistory();

	function goBack(EO: React.MouseEvent<HTMLButtonElement>) {
		EO.preventDefault();
		history.goBack();
	}

	return (
		<article className="Dialog container-fluid px-0">
			<PageHeader
				title={props.title}
				hasBackLink={true}
			/>
			<section className="d-flex flex-row justify-content-center pt-3">
				<form
					className="container-fluid"
					onSubmit={props.onSubmit}>

					{
						props.children
					}

					<div className="d-flex flex-row justify-content-center py-4">
						<input
							type="submit"
							className="btn btn-primary mr-4"
						/>
						<button
							className="btn btn-danger"
							onClick={goBack}>
							Отмена
						</button>
					</div>
				</form>
			</section>
		</article>
	);
}