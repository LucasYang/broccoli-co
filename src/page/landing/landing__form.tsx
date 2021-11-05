import React, { useRef, useState } from "react";
import Form from "../../components/Form";
import { isEmailValid, stringsMatch, NAME_MIN_LENGTH } from "../../utils/formValidation";

export function LandingPageForm() {
  const emailRef = useRef<HTMLInputElement | null>();
  const confirmEmailRef = useRef<HTMLInputElement | null>();
  const [emailsMatch, setEmailsMatch] = useState<boolean | undefined>();

  const validateEmail = (str: string) => {
    const isValid = isEmailValid(str);
    return {
      error: isValid ? null : 'email format incorrect',
    }
  };

  const validateFullName = (str: string) => {
    const isValid = str.length >= NAME_MIN_LENGTH;

    return {
      error: isValid ? null : 'Name needs to be at least 3 characters long'
    }
  };

  const validateEmailsMatch = () => {
    const isValid = stringsMatch(emailRef.current?.value || '', confirmEmailRef.current?.value || '');
    return isValid;
  }

  const handleLandingPageFormSubmit = (inputsValid: boolean) => {
    const match = validateEmailsMatch();
    setEmailsMatch(match);
    if (!inputsValid || !match) return;

    console.log('send to server');
  };

  return (
    <Form name="landingPageForm" handleSubmit={handleLandingPageFormSubmit}>
      {({ inputErrors, register }: any) => {
        // form content
        return (
          <div>
            <fieldset className="form-fieldset">
              <label htmlFor="fullName">
                Full name
                <input name="fullName" type="text" defaultValue="" ref={(ref) => register(ref, 'fullName', validateFullName)} />
              </label>
              <div>{inputErrors["fullName"] ? "error" : null}</div>
            </fieldset>
            <fieldset className="form-fieldset">
              <label htmlFor="email">
                Email
                <input
                  name="email"
                  type="email"
                  defaultValue=""
                  ref={(ref) => {
                    emailRef.current = ref;
                    register(ref, 'email', validateEmail)
                  }}
                />
              </label>
              <div>{inputErrors["email"] ? "error" : null}</div>
            </fieldset>
            <fieldset className="form-fieldset">
              <label htmlFor="confirmEmail">
                Confirm email
                <input
                  name="confirmEmail"
                  type="email"
                  defaultValue=""
                  ref={(ref) => {
                    confirmEmailRef.current = ref;
                    register(ref, 'confirmEmail', validateEmail);
                  }}
                />
              </label>
              <div>{inputErrors["confirmEmail"] ? "error" : null}</div>
              <div>{!emailsMatch === true && "emails do not match"}</div>
            </fieldset>
            <fieldset>
              <button type="submit">Send</button>
            </fieldset>
          </div>
        )
      }}
    </Form>
  );
}

export default LandingPageForm;