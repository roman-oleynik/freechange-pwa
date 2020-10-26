import React, { useRef, useEffect, useState } from 'react';
import {Thing} from '../../../types/types';
import {Link, NavLink} from 'react-router-dom';
import './style.scss';

type Props = {
    data: Thing
    children?: JSX.Element | null
}

export default function ThingItem({ data, children }: Props) {
    const defaultImageSrc = "https://flevix.com/wp-content/uploads/2019/07/Camera-Preloader.gif";
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    const waitForImageLoading = (ref: React.RefObject<HTMLImageElement>): void => {
        if (ref.current) {
            ref.current.onload = () => {
                setIsImageLoaded(true);
            }
        }
    }
    
    useEffect(() => {
        waitForImageLoading(imageRef);
    }, [imageRef]);

    return (
        <figure className="Thing-Item">
            {
                data.price > 0
                ?
                <span className="Price-Label btn btn-danger">{data.price} {data.currency}</span>
                :
                <Link to="/free" className="Price-Label btn btn-success">Бесплатно</Link>
            }
            {
                data.avatar
                ?
                <NavLink
                    to={`/thing/${data.id}`}
                    className="Thing-Item__Photo-Link">
                    {
                        isImageLoaded
                        ?
                        null
                        :
                        <img
                            className="Thing-Item__Photo" 
                            src={defaultImageSrc} 
                            alt="Preloader"
                        />
                    }
                    <img 
                        ref={imageRef} 
                        className="Thing-Item__Photo" 
                        src={data.avatar instanceof Blob ? URL.createObjectURL(data.avatar) : data.avatar} 
                        alt="Thing"
                    />
                </NavLink>
                :
                <div className="No-Photo-Fallback-Container">Нет фото</div>
            }
            <figcaption className="px-3 d-flex flex-column align-items-center">
                <NavLink to={`/thing/${data.id}`} className="Thing-Item__Title btn btn-link">{data.name}</NavLink>
                <p className="Thing-Item__Description">{data.description}</p>
            </figcaption>
            {
                children
            }
        </figure>
    );
};