import * as React from 'react';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch('email')); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input type="email" name="email" ref={register({ required: true })} />

      {/* include validation with required or other standard HTML validation rules */}
      <input
        type="password"
        name="password"
        ref={register({ required: true })}
      />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
