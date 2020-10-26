import React, { forwardRef, useState } from 'react';
import './style.scss';

type Props = {
  defaultValue: string,
	type: string,
	labelText: string,
	validityCondition: ((value: string) => boolean) | null,
	errorMessage: string,
	placeholder: string,
  required: boolean,
  onChange: (value: string | null) => void
  ref?: React.Ref<HTMLInputElement>
}

export const InputWithValidation = forwardRef(({
  defaultValue,
  type,
	labelText,
	validityCondition,
	errorMessage,
  placeholder,
  onChange,
  required,
}: Props, ref?: React.Ref<HTMLInputElement>) => {
  const [ isValid, setIsValid ] = useState<boolean>(true);
  const handleChange = (EO: React.ChangeEvent<HTMLInputElement>) => {
    if ( !validityCondition ) {
      onChange(EO.target.value);
      return;
    }
    if ( validityCondition(EO.target.value) ) {
      setIsValid(true);
      onChange(EO.target.value);
    } else {
      setIsValid(false);
      onChange(null);
    }
  }
  return (
		<>
			<label className="Standard-Label">
				{labelText}
				<input 
					className={
						!isValid
						?
						"Standard-Input Standard-Input_Error"
						:
						"Standard-Input"
					}
					ref={ref ? ref : null}
					type={type} 
          required={required}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={handleChange}
				/>
			</label>
      {
        !isValid &&
        <p className="Validation-Error-Text">{errorMessage}</p>
      }
		</>
	);
});
