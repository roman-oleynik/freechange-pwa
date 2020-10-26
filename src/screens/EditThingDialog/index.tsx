import React, { useState, useRef, useEffect } from 'react';
import { generateId } from '../../modules/generateId';
import { useDispatch, useSelector } from 'react-redux';
import { Thing, Photo, InputElement, FormState, State, Owner } from '../../types/types';
import { Dialog } from '../../components/Dialog';
import { database } from '../../firebase/firebaseConfig';
import { fetchLoggedOwner } from '../../actions/ownersActions';
import { getLocalStorageItem } from '../../modules/localStorageAPI';
import { Redirect } from 'react-router-dom';
import './style.scss';
import { DATABASE } from '../../firebase/databaseAPI';
import { STORAGE } from '../../firebase/storageAPI';
import { AvatarEditor } from '../../components/AvatarEditor';
import { PhotosEditor } from '../../components/PhotosEditor';
import { BusyIndicator } from '../../components/BusyIndicator';
import { axiosPhotos, axiosThings } from '../../axios-instances/axios-instances';
import { getArrayFromObject } from '../../modules/getArrayFromObject';
import { InputWithValidation } from '../../components/InputWithValidation';
import { requestEditingThing } from '../../actions/thingsActions';


type Props = {
    match: {
        params: {
            thingId: string
        }
    }
};

function EditThingDialog(props: Props) {
    const dispatch = useDispatch();
    const thingId = props.match.params.thingId;


    const [ payload, setPayload ] = useState<Thing>({} as Thing);
    const [ tempPhotos, setTempPhotos ] = useState<Photo[]>([]);

    const [ formState, setFormState ] = useState<FormState>(FormState.Loading);

    const fetchPhotosByThing = async (id: string) => {
        const { data } = await axiosPhotos.get(`?orderBy="rel_Thing"&equalTo="${id}"`, {
            transformResponse: [(data: string) => getArrayFromObject(JSON.parse(data))],
        });
        setTempPhotos(data);
    };

    const fetchThingData = async (id: string) => {
        const { data } = await axiosThings.get(`?orderBy="id"&equalTo="${id}"`, {
            transformResponse: [(data: string) => getArrayFromObject(JSON.parse(data))],
        });
        setPayload(data[0]);
    };

    async function loadRequiredForDialogData(): Promise<void> {
        await dispatch(fetchLoggedOwner(getLocalStorageItem("loggedUser") as string));
        await fetchThingData(thingId);
        await fetchPhotosByThing(thingId);

        setFormState(FormState.NotSubmitted);
    };

    useEffect(() => {
		document.title = "Edit a thing";
        if (!getLocalStorageItem("loggedUser")) {
            setFormState(FormState.NotLoaded);
        }
        loadRequiredForDialogData();
    }, []);

    const processFormData = async (EO: React.FormEvent<HTMLFormElement>) => {
        EO.preventDefault();

        setFormState(FormState.Submitting);
        await dispatch(requestEditingThing(payload, tempPhotos));
        setFormState(FormState.Submitted);
        if (tempPhotos.length) {
            const photosURLs: Photo[] | undefined = await STORAGE.addPhotosOfThing(tempPhotos);
            if (photosURLs) {
                await DATABASE.addPhotos(photosURLs);
            }
        }
    };

    const editPayloadOfThing = (prop: string, value: string | null) => {
        setPayload({...payload, [prop]: value})
    };

    const addPhotosToPayload = (photos: Photo[]) => {
        setTempPhotos([...tempPhotos, ...photos]);
    };

    const deleteAvatarFromPayload = () => {
        setPayload({...payload, avatar: ""});
        STORAGE.deleteAvatarOfThing(payload.id);
    }

    const deletePhotoFromPayload = (id: string, key?: string) => {
        const filteredTempPhotos = tempPhotos.filter((photo: Photo) => photo.id !== id);
        setTempPhotos(filteredTempPhotos);
        if (key) {
            DATABASE.deletePhoto(key);
            STORAGE.deletePhoto(id);
        }  
    };
    const changeAvatarInPayload = (src: string) => {
        setPayload({...payload, avatar: src});
        STORAGE.deleteAvatarOfThing(payload.id);
    };

    if ( formState === FormState.Submitted ) {
        return <Redirect to="/profile" />
    }
    if ( formState === FormState.Submitting ) {
        return <BusyIndicator />;
    }
    if ( formState === FormState.Loading ) {
        return <BusyIndicator />;
    }
    if ( formState === FormState.NotLoaded ) {
        return <Redirect to="/" />
    }
    return (
        <Dialog 
            title="Изменить вещь"
            onSubmit={processFormData}
        >
            <div className="Edit-Thing-Form__Content px-3">
                <div className="Edit-Thing-Form__Editors">
                    <AvatarEditor
                        avatarSrc={payload.avatar}
                        changeAvatar={changeAvatarInPayload}
                        clearAvatar={deleteAvatarFromPayload}
                    />
                    <PhotosEditor
                        rel_Thing={payload.id}
                        photos={tempPhotos}
                        deletePhoto={deletePhotoFromPayload}
                        addPhotos={addPhotosToPayload}
                    />
                </div>
                <div className="Edit-Thing-Form__Inputs">
                    <InputWithValidation
                        defaultValue={payload.name}
                        type="text"
                        labelText="NAME :"
                        validityCondition={(value: string) => value.length > 0}
                        errorMessage="Это обязательное поле"
                        placeholder=""
                        required
                        onChange={(value: string | null) => editPayloadOfThing("name", value)}
                    />
                    <InputWithValidation
                        defaultValue={String(payload.price)}
                        type="number"
                        labelText="PRICE :"
                        validityCondition={(value: string) => +value > 0}
                        errorMessage="Это обязательное поле"
                        placeholder=""
                        required
                        onChange={(value: string | null) => editPayloadOfThing("price", value)}
                    />
                    <label className="Standard-Label">Currency : <br />
                        <select
                            className="Standard-Input"
                            defaultValue={payload.currency}
                            onChange={(EO) => editPayloadOfThing("currency", EO.target.value)}
                            data-field="currency"
                            placeholder="Currency" 
                            required
                        >
                            <option value="BYN">BYN</option>
                            <option value="USD">USD</option>
                            <option value="RUB">RUB</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </label>
                    <label className="Standard-Label">Description :
                        <textarea 
                            rows={4}
                            className="Standard-Input" 
                            defaultValue={payload.description || ""}
                            onChange={(EO) => editPayloadOfThing("description", EO.target.value)}
                            data-field="description"
                            placeholder="Description..." 
                        ></textarea>
                    </label>
                </div>
            </div>
        </Dialog>
    );
};


export default EditThingDialog;
