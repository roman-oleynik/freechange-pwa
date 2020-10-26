import React, {useState, useRef, ReactChildren, ReactNode, useEffect} from 'react';
import {auth, firebase} from '../../firebase/firebaseConfig';
import { fetchLoggedOwner } from '../../actions/ownersActions';
import { useDispatch } from 'react-redux';
import { Owner, FormState } from '../../types/types';
import { NavLink, Redirect } from 'react-router-dom';
import './style.scss';
import { BusyIndicator } from '../../components/BusyIndicator';
import { InputWithValidation } from '../../components/InputWithValidation';
import { MessageBox } from '../../components/Popups/MessageBox';
import { Dialog } from '../../components/Dialog';
import { MessageToast } from '../../components/MessageToast';
import { DATABASE } from '../../firebase/databaseAPI';
import { SignInButtonsBox } from '../../components/SignInButtonsBox';


type Props = {
	children?: ReactNode
}




export function useErrorMessage(value: string) {
  const [ errorMessage, setErrorMessage ] = useState<string>(value);

  return {
    errorMessage,
    setErrorMessage
  };
}

type FormDataOfOwner = {
  email: string
  password: string
  password2: string
  name: string
  phoneNumber: string
  location: string
}

export function SignUpDialog({ children }: Props) {
  useEffect(() => {
		document.title = "Sign up";
	});

  const [ formState, setFormState ] = useState<FormState>(FormState.NotSubmitted);
  const [ formData, setFormData ] = useState<FormDataOfOwner>({
    email: "", 
    password: "", 
    password2: "", 
    name: "",
    phoneNumber: "",
    location: "",
  });
  
  const { errorMessage, setErrorMessage } = useErrorMessage("");

	const createNewOwner = async (formData: FormDataOfOwner) => {
		const { email, password, name, phoneNumber, location } = formData;
		
		try {
			const { user } = await auth.createUserWithEmailAndPassword(email, password);
			if ( user ) {
        const payload: Owner = {
          id: user.uid,
          key: "",
          name,
          email,
          location,
          phoneNumber,
          avatar: ""
        };
        DATABASE.addOwner(payload);
        try {
					await user.sendEmailVerification();
					setFormState(FormState.Submitted);
				}
				catch (err) {
          setErrorMessage(err.message);
				}
			} else {
				setErrorMessage("Error while creating a new user.");
			}
		}
		catch (err) {
      setErrorMessage(err.message);
      setFormState(FormState.NotSubmitted);
		}
	};

  
  
  const isFormValid = (formData: FormDataOfOwner) => {
    let isValid: boolean = true;
    
    let key: keyof FormDataOfOwner;
    for (key in formData) {
      if (formData[key] === null) {
        isValid = false;
      }
    }
    return isValid;
  }

	const processFormData = (EO: React.FormEvent<HTMLFormElement>): void => {
    EO.preventDefault();
    
    if ( isFormValid(formData) ) {
      setFormState(FormState.Submitting);
      createNewOwner(formData);
    } else {
      setErrorMessage("Form is invalid");
    }
  };

  const onInputChange = (key: string, value: string | null) => {
    setFormData({...formData, [key]: value});
  }
  
  const passwordRef = useRef<HTMLInputElement>(null);

	if ( formState === FormState.Submitting ) {
		return <BusyIndicator />
	}
	return (
    <div className="Sign-Up">
      <Dialog
        title="Зарегистрироваться"
        onSubmit={processFormData}
      >
        <div className="container">
          {
            formState === FormState.Submitted
            ?
            <MessageToast
              message="На указанный адрес было отправлено письмо. Для входа в систему нужно верифицировать свой аккаунт."
            />
            :
            null
          }
          {
            errorMessage
            ?
            <MessageBox
              title="Error"
              message={errorMessage}
              onOkPress={() => setErrorMessage("")}
            />
            :
            null
          }
          <div className="row">
            <div className="col-xs-12 col-md-6 col-lg-4">
              <InputWithValidation
                defaultValue=""
                type="email"
                labelText="E-MAIL :"
                validityCondition={(value: string) => Boolean(value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))}
                errorMessage="Email must have a correct format."
                placeholder=""
                required={true}
                onChange={(value) => onInputChange("email", value)}
              />
            </div>
            <div className="col-xs-12 col-md-6 col-lg-4">
              <InputWithValidation
                defaultValue=""
                type="password"
                labelText="ПАРОЛЬ :"
                validityCondition={(value: string) => value.length >= 6}
                errorMessage="Password must contain 6 and more symbols"
                placeholder=""
                required={true}
                onChange={(value) => onInputChange("password", value)}
                ref={passwordRef}
              />
            </div>
            <div className="col-xs-12 col-md-6 col-lg-4">
              <InputWithValidation
                defaultValue=""
                type="password"
                labelText="ПОВТОРИТЕ ПАРОЛЬ :"
                validityCondition={(value: string) => value === passwordRef.current?.value}
                errorMessage="Passwords aren't matching."
                placeholder=""
                required={true}
                onChange={(value) => onInputChange("password2", value)}
              />
            </div>
            <div className="col-xs-12 col-md-6 col-lg-4">
              <InputWithValidation
                defaultValue=""
                type="text"
                labelText="ФИО :"
                validityCondition={(value: string) => value !== ""}
                errorMessage="This field must be filled"
                placeholder=""
                required={true}
                onChange={(value) => onInputChange("name", value)}
              />
            </div>
            <div className="col-xs-12 col-md-6 col-lg-4">
              <InputWithValidation
                defaultValue=""
                type="tel"
                labelText="НОМЕР ТЕЛЕФОНА :"
                validityCondition={(value: string) => Boolean(value.match(/^\+\d{11,14}$/))}
                errorMessage="Телефонный номер должен быть длиной от 11 до 14 цифр"
                placeholder=""
                required={true}
                onChange={(value) => onInputChange("phoneNumber", value)}
              />
            </div>
            <div className="col-xs-12 col-md-6 col-lg-4">
              <label className="Standard-Label">
                LOCATION :
                <input 
                  className={"Standard-Input"}
                  type="text"
                  onChange={(EO) => onInputChange("location", EO.target.value)}
                />
              </label>
            </div>
          </div>
          
        </div>
      </Dialog>

      <span className="Sign-Up__Question">
        {"Already have an account? "}
        <NavLink 
          to="/login"
          className="Sign-Up__Link"    
        >Log In</NavLink>
      </span>
      <SignInButtonsBox>
				{children}
			</SignInButtonsBox>
    </div>
	);
};