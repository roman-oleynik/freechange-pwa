import React from 'react';
import './style.scss';

export function BusyIndicator() {
	return <div className="Busy-Indicator">
		<div className="container">
			<div className="holder">
				<div className="box"></div>
			</div>
			<div className="holder">
				<div className="box"></div>
			</div>
			<div className="holder">
				<div className="box"></div>
			</div>
		</div>
	</div>
}
