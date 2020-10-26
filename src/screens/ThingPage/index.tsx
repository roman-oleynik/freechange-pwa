import React, { useState, useEffect } from 'react';
import { Thing, State, Photo } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import PhotosCarousel from '../../components/PhotosCarousel/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios, { AxiosResponse } from 'axios';
import { getArrayFromObject } from '../../modules/getArrayFromObject';
import { axiosPhotos, axiosThings } from '../../axios-instances/axios-instances';
import { generateId } from '../../modules/generateId';
import { BusyIndicator } from '../../components/BusyIndicator';
import { Page } from '../../components/Page';
import { SimpleForm } from '../../components/SimpleForm';

type Match = {
    params: {
      thingId: string
    }
};


type Props = {
	match: Match
};

enum ContentLoadingState {
    BeforeLoading,
    Loading,
    Loaded,
    NotLoaded
}


export function ThingPage(props: Props) {
    const thingId: string = props.match.params.thingId;

    const [ thing, setThing ] = useState<Thing | null>( null );
    const [ photos, setPhotos ] = useState<Photo[]>([]);

    const { BeforeLoading, Loading, Loaded, NotLoaded } = ContentLoadingState;
    const [ contentState, setContentState ] = useState<ContentLoadingState>(BeforeLoading);

    async function fetchPhotosOfThing(thingId: string): Promise<Photo[]> {
        const { data }: AxiosResponse<Photo[]> = await axiosPhotos.get(`?orderBy="rel_Thing"&equalTo="${thingId}"`);
        return data;
    };
    async function fetchThing(thingId: string): Promise<Thing> {
        const { data }: AxiosResponse<Thing[]> = await axiosThings.get(`?orderBy="id"&equalTo="${thingId}"`, {
            transformResponse: [(data: string) => getArrayFromObject(JSON.parse(data))]
        });
        setThing(data[0]);
        return data[0];
    };
    async function fetchPhotos(thingId: string) {
        try {
            const { avatar }: Thing = await fetchThing(thingId);
            const photos: Photo[] = await fetchPhotosOfThing(thingId);

            setContentState(Loaded);
            setPhotos([
                {
                    id: generateId(),
                    rel_Thing: thingId,
                    key: generateId(),
                    source: avatar
                },
                ...photos,
            ]);
        }
        catch {
            setContentState(NotLoaded);
        }
    }
    useEffect(() => {
        if ( thing ) {
            document.title = thing.name;
        }
	});
    useEffect(() => {
        setContentState(Loading);
        fetchPhotos(thingId);
        return () => {
            setPhotos([]);
            setThing(null);
            setContentState(BeforeLoading);
        }
    }, [thingId]);


    if ( contentState === Loading ) {
        return <BusyIndicator />;
    }
    if ( contentState === NotLoaded ) {
        return <Redirect to="/error" />
    }
    if ( contentState === Loaded && thing ) {
        return (
            <Page
                title={thing.name}
                isMain={false}>
                <div className="container-fluid d-flex flex-column align-items-center pb-5 px-0">
                    <PhotosCarousel photos={photos} />
                    <SimpleForm
                        data={[
                            {
                                field: "Цена",
                                value: thing.price === 0 ? "Бесплатно" : `${thing.price} ${thing.currency}`
                            },
                            {
                                field: "Описание",
                                value: thing.description ? thing.description : "нет"
                            }
                        ]}
                    />
                    <NavLink
                        to={`/owner/${thing.rel_Owner}`}
                        className="btn btn-primary">
                        Перейти на страницу владельца
                    </NavLink>
                </div>
            </Page>
        );
    }
    return null;
}