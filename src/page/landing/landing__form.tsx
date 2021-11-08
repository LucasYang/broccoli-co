import React, { useRef, useState } from "react";
import Form from "../../components/Form";
import Button from "../../components/Button";
import { isEmailValid, stringsMatch, NAME_MIN_LENGTH } from "../../utils/formValidation";
import { landingInviteDataFactory } from "../../endpoints/landing__invite";
import {
  LANDING_FORM_TEST_ID,
  LANDING_FORM_INPUT_CONFIRM_EMAIL_TEST_ID,
  LANDING_FORM_INPUT_EMAIL_TEST_ID,
  LANDING_FORM_INPUT_FULLNAME_TEST_ID,
  LANDING_FORM_SUBMIT_BUTTON_TEST_ID,
} from '../../tests/_setup';
import styles from './landing__form.module.css';
import { LandingFormRequestBody } from '../../endpoints/landing__invite';

interface LandingPageFormInterface {
  onSuccess: () => void;
  postLandingForm: (data: LandingFormRequestBody) => Promise<any>;
}

export function LandingPageForm({ onSuccess, postLandingForm }: LandingPageFormInterface) {
  const emailRef = useRef<HTMLInputElement | null>();
  const confirmEmailRef = useRef<HTMLInputElement | null>();
  const [emailsMatch, setEmailsMatch] = useState<boolean | undefined>();
  const [sendingForm, setSendingForm] = useState<boolean | undefined>();
  const [serverError, setServerError] = useState<string | null>(null);

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

  const handleLandingPageFormSubmit = async (inputsValid: boolean, inputValues: { [key: string]: string }) => {
    setServerError(null);
    const match = validateEmailsMatch();
    setEmailsMatch(match);
    if (!inputsValid || !match) return;
    const payload = landingInviteDataFactory(inputValues);
    setSendingForm(true);
    const res = await postLandingForm(payload);
    setSendingForm(false);
    // fail: {errorMessage: 'Bad Request: Email is already in use'}
    if (typeof res === 'object') {
      setServerError(res.errorMessage);
    }
    // success: Registered
    onSuccess();
  };

  return (
    <Form name="landingPageForm" handleSubmit={handleLandingPageFormSubmit}>
      {({ inputErrors, register }: any) => {
        // form content
        return (
          <div className={styles.landingFormContainer} data-testid={LANDING_FORM_TEST_ID}>
            <div className={styles.landingFormHeader}>
              <h1 className={styles.landingFormHeading}>Request an invite</h1>
              <hr className={styles.landingFormHR} />
            </div>
            <fieldset className="form-fieldset">
              <input
                className={`${styles.landingFormInput} ${inputErrors["name"] && styles.landingFormInputError}`}
                name="name"
                type="text"
                placeholder="Full name"
                data-testid={LANDING_FORM_INPUT_FULLNAME_TEST_ID}
                ref={(ref) => register(ref, 'name', validateFullName)} />
              <div>{inputErrors["name"] && inputErrors["name"]}</div>
            </fieldset>
            <fieldset className="form-fieldset">
              <input
                className={`${styles.landingFormInput} ${inputErrors["email"] && styles.landingFormInputError}`}
                name="email"
                type="email"
                placeholder="Email"
                data-testid={LANDING_FORM_INPUT_EMAIL_TEST_ID}
                ref={(ref) => {
                  emailRef.current = ref;
                  register(ref, 'email', validateEmail)
                }}
              />
              <div>{inputErrors["email"] && inputErrors["email"]}</div>
            </fieldset>
            <fieldset className="form-fieldset">
              <input
                className={`${styles.landingFormInput} ${inputErrors["confirmEmail"] && styles.landingFormInputError}`}
                name="confirmEmail"
                type="email"
                placeholder="Confirm email"
                data-testid={LANDING_FORM_INPUT_CONFIRM_EMAIL_TEST_ID}
                ref={(ref) => {
                  confirmEmailRef.current = ref;
                  register(ref, 'confirmEmail', validateEmail);
                }}
              />
              <div>{inputErrors["confirmEmail"] && inputErrors["confirmEmail"]}</div>
              {emailsMatch !== undefined && <div>{!emailsMatch && "emails do not match"}</div>}
            </fieldset>
            <fieldset className="form-submit-fieldset">
              <Button
                className={styles.landingFormButton}
                disabled={sendingForm}
                data-testid={LANDING_FORM_SUBMIT_BUTTON_TEST_ID}
              >
                <span>{sendingForm ? 'Sending, please wait...' : 'Send'}</span>
              </Button>
              <div className={styles.landingFormServerError}>{serverError}</div>
            </fieldset>
          </div>
        )
      }}
    </Form>
  );
}

export default LandingPageForm;