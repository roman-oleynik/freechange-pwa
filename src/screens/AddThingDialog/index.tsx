import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State, Owner, Photo, InputElement, FormState, Thing } from '../../types/types';
import { Dialog } from '../../components/Dialog';
import { Redirect } from 'react-router-dom';
import { STORAGE } from '../../firebase/storageAPI';
import { DATABASE } from '../../firebase/databaseAPI';
import { AvatarEditor } from '../../components/AvatarEditor';
import { PhotosEditor } from '../../components/PhotosEditor';
import './style.scss';
import { BusyIndicator } from '../../components/BusyIndicator';
import { generateId } from '../../modules/generateId';
import { loggedOwnerSelector } from '../../selectors';
import { requestAddingThing } from '../../actions/thingsActions';
import { InputWithValidation } from '../../components/InputWithValidation';


export function AddThingDialog() {
    const dispatch = useDispatch();

    const loggedOwner = useSelector<State, Owner | null>(loggedOwnerSelector);
    
    const [ tempPhotos, setTempPhotos ] = useState<Photo[]>([]);

    const EMPTY_THING: Thing = {
        id: generateId(),
        name: "",
        description: "",
        avatar: "",
        rel_Owner: "",
        price: 0,
        currency: "BYN",
        key: ""
    };
    const [ payload, setPayload ] = useState<Thing>(EMPTY_THING);
    const [ formState, setFormState ] = useState<FormState>(FormState.NotSubmitted);
    
    useEffect(() => {
		document.title = "Add a thing";
	});
    useEffect(() => {
        if (loggedOwner?.id) {
            setPayload({...payload, rel_Owner: (loggedOwner as Owner).id})
        }
        return () => {
            setPayload(EMPTY_THING);
            setTempPhotos([]);
            setFormState(FormState.NotSubmitted);
        }
    }, [loggedOwner?.id]);

    const processFormData = async (EO: React.FormEvent<HTMLFormElement>) => {
        EO.preventDefault();

        setFormState(FormState.Submitting);
        await dispatch(requestAddingThing(payload, tempPhotos))
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
    }

    const deletePhotoFromPayload = (id: string) => {
        const filteredTempPhotos = tempPhotos.filter((photo: Photo) => photo.id !== id);
        setTempPhotos(filteredTempPhotos);
    };

    const changeAvatarInPayload = (src: string) => {
        setPayload({...payload, avatar: src});
    };

    if ( formState === FormState.Submitted ) {
        return <Redirect to="/profile" />
    }
    if ( formState === FormState.Submitting ) {
        return <BusyIndicator />;
    }
    return <Dialog
        title="Добавить вещь"
        onSubmit={processFormData}
    >
        <div className="Add-Thing-Form__Content px-3">
            <div className="Add-Thing-Form__Editors">
                <AvatarEditor
                    avatarSrc={payload.avatar}
                    changeAvatar={changeAvatarInPayload}
                    clearAvatar={() => setPayload({...payload, avatar: ""})}
                />
                <PhotosEditor
                    rel_Thing={payload.id}
                    photos={tempPhotos}
                    deletePhoto={deletePhotoFromPayload}
                    addPhotos={addPhotosToPayload}
                />
            </div>
            <div className="Add-Thing-Form__Inputs">
                <InputWithValidation
                    defaultValue=""
                    type="text"
                    labelText="NAME :"
                    validityCondition={(value: string) => value.length > 0}
                    errorMessage="Поле, обязательное для заполнения"
                    placeholder=""
                    required
                    onChange={(value) => editPayloadOfThing("name", value)}
                />
                <InputWithValidation
                    defaultValue=""
                    type="number"
                    labelText="PRICE :"
                    validityCondition={(value: string) => Boolean(value.match(/^\d+$/))}
                    errorMessage="Нужно ввести число"
                    placeholder=""
                    required
                    onChange={(value) => editPayloadOfThing("price", value)}
                />
                <label className="Standard-Label">Currency : <br />
                    <select 
                        className="Standard-Input" 
                        onChange={(EO) => editPayloadOfThing("currency", EO.target.value)}
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
                        onChange={(EO) => editPayloadOfThing("description", EO.target.value)}
                        spellCheck
                    ></textarea>
                </label>
            </div>
        </div> 
    </Dialog>
};
