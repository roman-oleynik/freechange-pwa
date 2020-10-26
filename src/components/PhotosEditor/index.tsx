import React, { forwardRef } from 'react';
import { generateId } from '../../modules/generateId';
import { readImagesFromFileInput } from '../../modules/readImageFromFileInput';
import { Photo } from '../../types/types';
import { PhotoCircle } from './PhotoCircle';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

type Props = {
    rel_Thing: string,
    photos: Photo[],
    deletePhoto: (id: string, key?: string) => void
    addPhotos: (photos: Photo[]) => void
};

export const PhotosEditor = ({ photos, deletePhoto, addPhotos, rel_Thing }: Props) => {
    const deleteTempPhoto = (EO: React.SyntheticEvent<EventTarget>) => {
        EO.preventDefault();

        const id = (EO.target as HTMLButtonElement).dataset.id;
        const key = (EO.target as HTMLButtonElement).dataset.key;
        if ( id && key ) {
            deletePhoto(id, key);
        }
    };
    const handlePhotosInputChange = (EO: React.ChangeEvent<HTMLInputElement>) => {
        const files = EO.target.files && EO.target.files;
        const loadedPhotos: Photo[] = [];

        readImagesFromFileInput(files, function onSuccess(reader: FileReader) {
            const id = generateId();
            loadedPhotos.push({
                id,
                key: id,
                source: reader.result as string,
                rel_Thing,
            })
            addPhotos(loadedPhotos, );
        })
    };
    return (
        <section className="container border-top border-secondary py-1 px-0">
            <div className="d-flex flex-row flex-wrap">
                {
                    photos.length > 0
                    &&
                    photos.map((photo: Photo) => {
                        return <PhotoCircle
                            key={photo.key}
                            data={photo}
                            deleteTempPhoto={deleteTempPhoto}
                        />;
                    })
                }
                <label className="photos-editor-add mx-2 my-2 btn btn-outline-primary rounded-circle">
                    <svg className="plus" viewBox="0 0 426.66667 426.66667"><path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"/></svg>
                    
                    <input
                        type="file"
                        multiple
                        className="Invisible-Checkbox"
                        onChange={handlePhotosInputChange}
                    />
                </label>
            </div>
        
    </section>
    );
};