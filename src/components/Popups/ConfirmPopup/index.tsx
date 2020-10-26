import React, { useRef, useEffect } from 'react';
import './style.scss';

import 'bootstrap/dist/css/bootstrap.min.css';


type Props = {
  title: string
	message: string
	close: () => void
	onYesPressed: () => void
};

export default function ConfirmPopup(props: Props) {
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    yesButtonRef.current?.focus();
  }, [yesButtonRef]);
  
	return (
    <div className="Background">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={props.close}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p className="text-center">{props.message}</p>
          </div>
          <div className="modal-footer">
            <div className="btn-group">
              <button
                ref={yesButtonRef}
                className="btn btn-primary"
                onClick={props.onYesPressed}
              >Да</button>
              <button 
                className="btn btn-danger"
                onClick={props.close}
              >Нет</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );    
};