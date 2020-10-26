import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

type Props = {
    imageSrc: string
}

export function ImageContainer({ imageSrc }: Props) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    function waitForImageLoading(ref: React.RefObject<HTMLImageElement>): void {
        if (ref.current) {
            ref.current.onload = () => {
                setIsImageLoaded(true);
            }
        }
    }
    const imageRef = useRef<HTMLImageElement>(null);
    useEffect(() => {
        setIsImageLoaded(false);
        waitForImageLoading(imageRef);
    }, [imageSrc]);


    return (
        <div className="Carousel__Image-Container">
            <img
                ref={imageRef}
                className="Carousel__Image_Image" 
                src={imageSrc} 
                alt="Thing"
            />
            {
                !isImageLoaded &&
                <div className="Carousel__Image_Preloader"></div>
            }
        </div>
    );
};

export default ImageContainer;