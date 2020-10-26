import React from 'react';
import { Link } from 'react-router-dom';




export function MenuAuthButtons() {
	return (
		<div className="btn-group">
			<Link
				to="/login"
				className="btn btn-light"
			>
				Sign In
			</Link>
			<Link
				to="/signup"
				className="btn btn-danger"
			>
				Sign Up
			</Link>
		</div>
	);
};


export default MenuAuthButtons;