import React from 'react';
import './style.scss';

type Props = {
	title: string
	message: string
	onOkPress: () => void
}

export function MessageBox({ title, message, onOkPress }: Props) {
	return (
		<div className="Message-Box-Container">
			<div className="Message-Box">
				<h4 className="Message-Box__Title">{title}</h4>
				<p className="Message-Box__Text">{message}</p>
				<button
					className="Message-Box__Button Message-Box__Button_Ok"
					onClick={onOkPress}       
				>Ок</button>
			</div>
		</div>
	);
};