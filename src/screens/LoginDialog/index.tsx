import React, { useState, useRef, ReactChildren, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { auth, firebase } from "../../firebase/firebaseConfig";
import { fetchLoggedOwner } from '../../actions/ownersActions';
import { useDispatch, useSelector } from 'react-redux';
import { FormState, Owner, State } from '../../types/types';
import { setLocalStorageItem } from '../../modules/localStorageAPI';
import { openSignInWithGooglePopup } from '../../modules/signInWithGooglePopup';
import './style.scss';
import { MessageBox } from '../../components/Popups/MessageBox';
import { Dialog } from '../../components/Dialog';
import { useErrorMessage } from '../SignUpDialog';
import { BusyIndicator } from '../../components/BusyIndicator';
import { InputWithValidation } from '../../components/InputWithValidation';
import { SignInButtonsBox } from '../../components/SignInButtonsBox';


type Props = {
	children?: ReactChildren 
}

type LoginData = {
	email: string
	password: string
}



export function LoginDialog({ children }: Props) {
	const dispatch = useDispatch();

	const [ formData, setFormData ] = useState<LoginData>({
		email: "",
		password: ""
	});

	const { errorMessage, setErrorMessage } = useErrorMessage("");
	const [ formState, setFormState ] = useState<FormState>(FormState.NotSubmitted);

	const logUserIn = (loggedOwnerId: string) => {
		setLocalStorageItem("loggedUser", loggedOwnerId);
		dispatch(fetchLoggedOwner(loggedOwnerId));
    };
	useEffect(() => {
		document.title = "Login";
	});
	const signInViaFirebase = async (emailAndPassword: LoginData) => {
		const { email, password } = emailAndPassword;
		
		try {
			const { user } = await auth.signInWithEmailAndPassword(email, password);
			
			if (user?.emailVerified) {
				const loggedOwnerId: string = (user as firebase.User).uid;
				setFormState(FormState.Submitted);

				logUserIn(loggedOwnerId);
			} else {
				setErrorMessage("Email is not verified");
				setFormState(FormState.NotSubmitted);
			}
		}
		catch (err) {
			console.log(err);
			setErrorMessage(err.message);
			setFormState(FormState.NotSubmitted);
		}
	};

	const isFormValid = (formData: LoginData) => {
		let isValid: boolean = true;
		
		let key: keyof LoginData;
		for (key in formData) {
		  if (formData[key] === null) {
			isValid = false;
		  }
		}
		return isValid;
	}

	const handleFormSubmit = (EO: React.FormEvent<HTMLFormElement>) => {
		EO.preventDefault();


		if ( isFormValid(formData) ) {
			setFormState(FormState.Submitting);
			signInViaFirebase(formData);
		} else {
			setErrorMessage("Form is not valid");
		}
	};
	
	const onInputChange = (key: string, value: string | null) => {
		setFormData({...formData, [key]: value});
	}

	if ( formState === FormState.Submitted ) {
		return <Redirect to="/" />;
	}
	if ( formState === FormState.Submitting ) {
		return <BusyIndicator />;
	}
	return (
		<div className="Login">
			<Dialog
				title="Войти"
				onSubmit={handleFormSubmit}
			>
				<div className="container">
					{
						errorMessage
						?
						<MessageBox
							title="Ошибка"
							message={errorMessage}
							onOkPress={() => setErrorMessage("")}
						/>
						:
						null
					}
					<div className="row">
						<div className="col-sm-12 col-md-6">
							<InputWithValidation
								defaultValue=""
								type="email"
								labelText="E-MAIL :"
								validityCondition={(value: string) => Boolean(value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))}
								errorMessage="E-mail is not valid"
								placeholder=""
								required={true}
								onChange={(value) => onInputChange("email", value)}
							/>
						</div>
						<div className="col-sm-12 col-md-6">
							<InputWithValidation
								defaultValue=""
								type="password"
								labelText="ПАРОЛЬ :"
								validityCondition={(value: string) => value.length >= 6}
								errorMessage="Password must contain 6 and more symbols"
								placeholder=""
								required={true}
								onChange={(value) => onInputChange("password", value)}
							/>
						</div>
					</div>
				</div>
			</Dialog>

			<span className="Login__Question">
				{"Don't have an account yet? "}  
				<NavLink to="/signup" className="Login__Link">Sign Up</NavLink>
			</span>
			<SignInButtonsBox>
				{children}
			</SignInButtonsBox>
		</div>
	);
};