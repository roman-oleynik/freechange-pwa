import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.scss';

type Props = {
  type: string,
}

export function ErrorPage({ type }: Props) {
  return <p className="Error-Page__Message">Error has occurred.</p>
}

