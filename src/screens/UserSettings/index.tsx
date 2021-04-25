import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State, Owner, FormState } from '../../types/types';
import { getLocalStorageItem } from '../../modules/localStorageAPI';
import { Redirect, NavLink } from 'react-router-dom';
import { AvatarEditor } from '../../components/AvatarEditor';
import { Dialog } from '../../components/Dialog';
import { InputWithValidation } from '../../components/InputWithValidation';
import { STORAGE } from '../../firebase/storageAPI';
import { DATABASE } from '../../firebase/databaseAPI';
import { BusyIndicator } from '../../components/BusyIndicator';
import { fetchLoggedOwner, setLoggedOwner } from '../../actions/ownersActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import { loggedOwnerSelector } from '../../selectors';


export type InputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;




function UserSettings() {
    useEffect(() => {
		document.title = "Settings";
	});
    const dispatch = useDispatch();

    const [ formState, setFormState ] = useState<FormState>(FormState.NotSubmitted);

    const loggedUserIdFromLocalStorage = getLocalStorageItem("loggedUser");

    const loggedOwner: Owner | null = useSelector(loggedOwnerSelector);
    const DEFAULT_AVATAR_PATH = "http://cdn.onlinewebfonts.com/svg/img_343322.png";
    
    const [payload, setPayload] = useState<Owner>({
        id: "",
        key: "",
        name: "",
        email: "",
        location: "",
        phoneNumber: "",
        avatar: ""
    });

    const changeAvatar = (src: string | Blob) => {
        setPayload({...payload, avatar: src as string});
    };

    const clearAvatar = () => {
        setPayload({...payload, avatar: DEFAULT_AVATAR_PATH});
        STORAGE.deleteAvatarOfOwner(payload.id);
    };
   
    useEffect(() => {
        setPayload(loggedOwner as Owner);
    }, [loggedOwner?.id]);


    const onInputChange = (key: string, value: string | null) => {
		setPayload({...payload, [key]: value});
    };

    const submitData = async (EO: React.FormEvent<HTMLFormElement>) => {
        EO.preventDefault();

        setFormState(FormState.Submitting);

        if (payload.avatar) {
            const avatarUrl: string = await STORAGE.addAvatarOfOwner(payload.id, payload.avatar);
            payload.avatar = avatarUrl;
        }
        console.log(payload.avatar);

        await DATABASE.editOwner(payload.key, payload);

        dispatch(fetchLoggedOwner(payload.id));
        setFormState(FormState.Submitted);
    };
    

    if (!loggedUserIdFromLocalStorage) {
        return <Redirect to="/" />
    }
    if ( formState === FormState.Submitting ) {
        return <BusyIndicator />;
    }
    if ( formState === FormState.Submitted ) {
        return <Redirect to="/profile" />
    }
    return <Dialog
        title="Изменить профиль"
        onSubmit={submitData}
    >
        <div className="User-Settings__Content px-3">
            <div className="User-Settings__Editors">
                <AvatarEditor
                    avatarSrc={payload.avatar instanceof Blob ? URL.createObjectURL(payload.avatar) : payload.avatar}
                    changeAvatar={changeAvatar}
                    clearAvatar={clearAvatar}
                />
            </div>
            <div className="User-Settings__Inputs">
                <InputWithValidation
                    defaultValue={payload.name}
                    type="text"
                    labelText="ИМЯ :"
                    validityCondition={value => value.length > 0}
                    errorMessage="Поле должно быть заполнено."
                    placeholder=""
                    required={true}
                    onChange={(value) => onInputChange("name", value)}
                />
                <InputWithValidation
                    defaultValue={payload.phoneNumber}
                    type="tel"
                    labelText="НОМЕР ТЕЛЕФОНА :"
                    validityCondition={value => Boolean(value.match(/^\+\d{11,14}$/))}
                    errorMessage="Неверный формат"
                    placeholder=""
                    required={true}
                    onChange={(value) => onInputChange("phoneNumber", value)}
                />
                <label className="Standard-Label">
                    Location :
                    <input 
                        className="Standard-Input"
                        type="text"
                        defaultValue={payload.location}
                        onChange={(EO) => onInputChange("location", EO.target.value)}
                    />
                </label>
            </div>
        </div>
    </Dialog>
};


export default UserSettings;