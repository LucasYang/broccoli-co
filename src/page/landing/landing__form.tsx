import React from "react";
import Form from "../../components/Form";

export function LandingPageForm() {
  return (
    <Form name="landingPageForm">
      {({ error, register }: any) => {
        // form content
        return (
          <div>
            <fieldset className="form-fieldset">
              <label htmlFor="fullName">
                Full name
                <input name="fullName" type="text" defaultValue="" ref={(ref) => register(ref, 'fullName')} />
                {error["fullName"] ? "error" : null}
              </label>
            </fieldset>
            <fieldset className="form-fieldset">
              <label htmlFor="email">
                Email
                <input name="email" type="email" defaultValue="" ref={(ref) => register(ref, 'email')} />
              </label>
            </fieldset>
            <fieldset className="form-fieldset">
              <label htmlFor="confirmEmail">
                Confirm email
                <input name="confirmEmail" type="email" defaultValue="" ref={(ref) => register(ref, 'confirmEmail')} />
              </label>
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