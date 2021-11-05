import React, { useRef, useState } from 'react';
import formStyles from './index.module.css';
interface FormInterface {
  name: string;
  handleSubmit: (inputsValid: boolean, inputValues: { [key: string]: string }) => any;
  children: (props: any) => React.ReactElement;
}

export function Form({ children, name, handleSubmit }: FormInterface) {
  const childrenRef = useRef<{ [key: string]: any }>({});
  const [inputErrors, setInputErrors] = useState<{ [key: string]: any }>({});

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputsValid = validateFormInputs();
    const inputValues: { [key: string]: string } = {};
    for (const [key, obj] of Object.entries(childrenRef.current)) {
      inputValues[key] = obj.ref.value;
    }
    handleSubmit(inputsValid, inputValues);
  }

  function validateFormInputs() {
    const newErrors = inputErrors;
    for (const [key, obj] of Object.entries(childrenRef.current)) {
      const { validationFunc, ref } = obj;
      if (validationFunc) {
        const { error } = validationFunc(ref.value);
        newErrors[key] = error;
      } else {
        newErrors[key] = null;
      }
    }

    setInputErrors({
      ...newErrors,
    });

    return Object.values(newErrors).filter((e) => e !== null).length === 0;
  }

  function register(ref: HTMLFormElement, name: string, validationFunc: (str: string) => any) {
    childrenRef.current[name] = {
      ref,
      validationFunc,
    };
  }

  return (
    <form
      className={formStyles.container}
      onSubmit={submitHandler}
      noValidate
      name={name}
    >
      {children({
        inputErrors,
        register,
        loading: false,
      })}
    </form>
  );
}

export default Form;