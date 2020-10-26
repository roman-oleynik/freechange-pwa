import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
    page: number,
    photosAmount: number,
    onPress: (pageNumber: number) => void,
}


export function ChangePageButtons(props: Props) {
    const {
        page,
        onPress,
        photosAmount
    } = props;

    function setPageNumber(EO: React.SyntheticEvent) {
        const setPageNumberMode: string = (EO.target as HTMLButtonElement).dataset.changePageNumberDir as string;
        
        if (setPageNumberMode === "decrease") {
            onPress(page - 1);
        } else if (setPageNumberMode === "increase") {
            onPress(page + 1);
        }
    }

    return (<>
        <button 
            data-change-page-number-dir="decrease"
            disabled={page <= 0}
            onClick={setPageNumber} 
            className="carousel-control-prev"
        >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </button>
        <button 
            data-change-page-number-dir="increase"
            disabled={page >= photosAmount - 1} 
            onClick={setPageNumber} 
            className="carousel-control-next"
        >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </button>
    </>);
};

export default ChangePageButtons;