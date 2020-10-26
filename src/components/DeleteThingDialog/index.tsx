import React from 'react';
import ConfirmPopup from '../Popups/ConfirmPopup';

type Props = {
	title: string
	message: string
	close: () => void
	onYesPressed: () => void
};

export function DeleteThingDialog(props: Props) {
	return <ConfirmPopup
		title={props.title}
		message={props.message}
		onYesPressed={props.onYesPressed}
		close={props.close}
	/>
};