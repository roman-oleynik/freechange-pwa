import React from 'react';
import { Photo } from '../../../types/types';

type Props = {
    photos: Photo[]
    page: number
}

function PhotosPagination({photos, page}: Props) {
    return <p className="text-center pt-2">{page + 1} из {photos.length}</p>;
};

export default PhotosPagination;