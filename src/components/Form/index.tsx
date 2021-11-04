import React, { useRef } from 'react';
import formStyles from './index.module.css';
interface FormInterface {
  name: string;
  children: (props: any) => React.ReactElement;
}

export function Form({ children, name }: FormInterface) {
  const childrenRef = useRef<{ [key: string]: HTMLFormElement }>({});

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(childrenRef.current);
  }

  function validateForm() {
    // todo: validation logic
  }

  function register(ref: HTMLFormElement, name: any) {
    childrenRef.current[name] = ref;
  }

  return (
    <form
      className={formStyles.container}
      onSubmit={submitHandler}
      noValidate
      name={name}
    >
      {children({
        loading: false,
        error: false,
        data: {},
        register: register
      })}
    </form>
  );
}

export default Form;