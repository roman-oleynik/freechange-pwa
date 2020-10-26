import React, { CSSProperties } from 'react';
import './style.scss';


type Props = {
    source: string,
    size: number
}

export function Avatar({ source, size }: Props) {
	const style: CSSProperties = {
		height: `${size}px`,
		width: `${size}px`,
	}
	return (
		<div
			style={style}
			className="avatar-container d-flex justify-content-center align-items-center"
		>
		{
			source
			?
			<img
				src={source}
				className="img-avatar"
			/>
			:
			<p className="text-center pt-2">No photo</p>
		}
		</div>
	);
}