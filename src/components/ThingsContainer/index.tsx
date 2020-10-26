import React, { useEffect, useRef, useState } from 'react';
import ThingItem from '../ThingItem/Item';
import { Thing, State } from '../../types/types';
import './style.scss';
import EditButton from '../ThingItem/EditButton';
import DeleteButton from '../ThingItem/DeleteButton';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';

type Props = {
	things: Thing[],
	hasEditDeleteButtons: boolean
	onDeletePressed: (EO?: React.MouseEvent<HTMLButtonElement>) => void
};

export function ThingsContainer({ things, hasEditDeleteButtons, onDeletePressed }: Props) {
	const pageId = useRef(things[0]?.id);

	return (
		<section>
			<TransitionGroup className="Things-Container">
			{
				things.length
				?
				things.map((thing: Thing) => {
					return (
						<CSSTransition
							key={thing.id}
							in={things[0]?.id === pageId.current}
							appear={true}
							timeout={500}
							classNames="bubble"
						>
							<ThingItem data={thing}>
							{
								hasEditDeleteButtons
								?
								<div className="btn-group-vertical absolute">
									<EditButton
										thingId={thing.id} 
									/>
									<DeleteButton
										firebaseKey={thing.key} 
										thingId={thing.id} 
										onClick={onDeletePressed} 
									/>
								</div>
								:
								null
							}
							</ThingItem>
						</CSSTransition>
					)
				})
				:
				null
			}
			</TransitionGroup>
		</section>
		
	);
}

