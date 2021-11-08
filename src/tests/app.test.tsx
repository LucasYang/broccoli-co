import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import App from "../App";
import {
  INVITE_BUTTON_TEST_ID,
  LANDING_FORM_TEST_ID,
  LANDING_FORM_INPUT_CONFIRM_EMAIL_TEST_ID,
  LANDING_FORM_INPUT_EMAIL_TEST_ID,
  LANDING_FORM_INPUT_FULLNAME_TEST_ID,
  LANDING_FORM_SUBMIT_BUTTON_TEST_ID,
} from "./_setup";
import LandingPageForm from "../page/landing/landing__form";
import LandingPage from "../page/landing";

test("Invite button functions properly", () => {
  render(<App />);
  const buttonElement = screen.getByTestId(INVITE_BUTTON_TEST_ID);

  expect(buttonElement).toBeInTheDocument();

  fireEvent.click(buttonElement);
  const landingFormElement = screen.getByTestId(LANDING_FORM_TEST_ID);
  expect(landingFormElement).toBeInTheDocument();
});

test("Landing form renders properly", () => {
  render(
    <LandingPageForm
      onSuccess={() => {}}
      postLandingForm={() => Promise.resolve()}
    />
  );
  const landingFormFullNameInput = screen.getByTestId(
    LANDING_FORM_INPUT_FULLNAME_TEST_ID
  );
  const landingFormEmailInput = screen.getByTestId(
    LANDING_FORM_INPUT_EMAIL_TEST_ID
  );
  const landingFormConfirmEmailInput = screen.getByTestId(
    LANDING_FORM_INPUT_CONFIRM_EMAIL_TEST_ID
  );
  const landingFormSubmitButton = screen.getByTestId(
    LANDING_FORM_SUBMIT_BUTTON_TEST_ID
  );

  expect(landingFormFullNameInput).toBeInTheDocument();
  expect(landingFormEmailInput).toBeInTheDocument();
  expect(landingFormConfirmEmailInput).toBeInTheDocument();
  expect(landingFormSubmitButton).toBeInTheDocument();
});

test("Landing form rejects invalid inputs", async () => {
  const mockSuccessHandler = jest.fn();
  render(
    <LandingPageForm
      onSuccess={mockSuccessHandler}
      postLandingForm={() => Promise.resolve()}
    />
  );
  const landingFormSubmitButton = screen.getByTestId(
    LANDING_FORM_SUBMIT_BUTTON_TEST_ID
  );

  const landingFormFullNameInput = screen.getByTestId(
    LANDING_FORM_INPUT_FULLNAME_TEST_ID
  );
  const landingFormEmailInput = screen.getByTestId(
    LANDING_FORM_INPUT_EMAIL_TEST_ID
  );
  const landingFormConfirmEmailInput = screen.getByTestId(
    LANDING_FORM_INPUT_CONFIRM_EMAIL_TEST_ID
  );

  act(() => {
    fireEvent.change(landingFormFullNameInput, { target: { value: "" } });
    fireEvent.change(landingFormEmailInput, {
      target: { value: "invalid-email" },
    });
    fireEvent.change(landingFormConfirmEmailInput, {
      target: { value: "invalid-email" },
    });
    fireEvent.click(landingFormSubmitButton);
  });

  expect(landingFormSubmitButton).toBeEnabled();
});

test("Landing form accepts valid inputs and shows all done modal", async () => {
  render(<LandingPage postLandingForm={() => Promise.resolve()} />);
  const buttonElement = screen.getByTestId(INVITE_BUTTON_TEST_ID);

  expect(buttonElement).toBeInTheDocument();
  fireEvent.click(buttonElement);

  const landingFormSubmitButton = screen.getByTestId(
    LANDING_FORM_SUBMIT_BUTTON_TEST_ID
  );

  const landingFormFullNameInput = screen.getByTestId(
    LANDING_FORM_INPUT_FULLNAME_TEST_ID
  );
  const landingFormEmailInput = screen.getByTestId(
    LANDING_FORM_INPUT_EMAIL_TEST_ID
  );
  const landingFormConfirmEmailInput = screen.getByTestId(
    LANDING_FORM_INPUT_CONFIRM_EMAIL_TEST_ID
  );

  act(() => {
    fireEvent.change(landingFormFullNameInput, { target: { value: "abc" } });
    fireEvent.change(landingFormEmailInput, {
      target: { value: "valid@valid.com" },
    });
    fireEvent.change(landingFormConfirmEmailInput, {
      target: { value: "valid@valid.com" },
    });
    fireEvent.click(landingFormSubmitButton);
  });

  await waitFor(() => landingFormSubmitButton);
  // all done page shows
  const landingAllDone = screen.getByTestId("landing-alldone");
  expect(landingAllDone).toBeInTheDocument();
});
