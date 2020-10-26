import React, {useState, useEffect, useRef} from 'react';
import { State, Photo, Thing } from '../../../types/types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import ImageContainer from '../ImageContainer';
import ChangePageButtons from '../ChangePageButtons';
import PhotosPagination from '../PhotosPagination';


type Props = {
    photos: Photo[]
};


function PhotosCarousel({ photos }: Props) {
  const [page, setPage] = useState(0);
  
  const onArrowPress = (pageNumber: number) => {
    setPage(pageNumber);
  }

  return (
    <div className="Carousel">
      <div className="carousel slide">
        {
          photos.length
          ?
          <ImageContainer
            imageSrc={photos[page].source}
          />
          :
          <div className="Carousel__Empty-Space">No photos</div>
        }
        {
          photos.length > 1
          ?
          <ChangePageButtons 
            page = {page}
            photosAmount = {photos.length}
            onPress = {onArrowPress}
          />
          :
          null
        }
      </div>
      <PhotosPagination photos={photos} page={page} />
    </div>
  );
}


export default PhotosCarousel;