import React, { useRef, useState } from "react";
import Form from "../../components/Form";
import { isEmailValid, stringsMatch, NAME_MIN_LENGTH } from "../../utils/formValidation";
import Button from "../../components/Button";
import styles from './landing__form.module.css';

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
          <div className={styles.landingFormContainer}>
            <div className={styles.landingFormHeader}>
              <h1 className={styles.landingFormHeading}>Request an invite</h1>
              <hr className={styles.landingFormHR} />
            </div>
            <fieldset className="form-fieldset">
              <input
                className={styles.landingFormInput}
                name="fullName"
                type="text"
                placeholder="Full name"
                ref={(ref) => register(ref, 'fullName', validateFullName)} />
              <div>{inputErrors["fullName"] ? "error" : null}</div>
            </fieldset>
            <fieldset className="form-fieldset">
              <input
                className={styles.landingFormInput}
                name="email"
                type="email"
                placeholder="Email"
                ref={(ref) => {
                  emailRef.current = ref;
                  register(ref, 'email', validateEmail)
                }}
              />
              <div>{inputErrors["email"] ? "error" : null}</div>
            </fieldset>
            <fieldset className="form-fieldset">
              <input
                className={styles.landingFormInput}
                name="confirmEmail"
                type="email"
                placeholder="Confirm email"
                ref={(ref) => {
                  confirmEmailRef.current = ref;
                  register(ref, 'confirmEmail', validateEmail);
                }}
              />
              <div>{inputErrors["confirmEmail"] ? "error" : null}</div>
              {emailsMatch !== undefined && <div>{!emailsMatch && "emails do not match"}</div>}
            </fieldset>
            <fieldset>
              <Button className={styles.landingFormButton}>
                <span>Send</span>
              </Button>
            </fieldset>
          </div>
        )
      }}
    </Form>
  );
}

export default LandingPageForm;