import * as React from "react"
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/use-auth"

export default function LoginForm() {
  const { register, handleSubmit, errors } = useForm();

  const { signin } = useAuth()

  // const onSubmit = data => {
  //   signin(data)
  // }

  return (
    <form onSubmit={handleSubmit(signin)}>

      <div>

        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <div class="mt-1">
          <input id="name" type="text" name="name" ref={register({ required: true })} class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Billy Gene" aria-describedby="name-description" />
          <p class="mt-2 text-sm text-gray-500" id="name-description">Real or fake, made available with your comment.</p>
        </div>
        {errors.name && <span>This field is required</span>}
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <div class="mt-1">
          <input ref={register({ required: true })} type="email" name="email" id="email" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="you@example.com" aria-describedby="email-description" />
        </div>
        <p class="mt-2 text-sm text-gray-500" id="email-description">We'll only use this for spam.</p>
        {errors.email && <span>This field is required</span>}
      </div>

      <div class="flex items-center">
        <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
        <label for="remember_me" class="ml-2 block text-sm text-gray-900">
          Remember me
            </label>
      </div>
      <input type="submit" value="Login" />
    </form >
  );
}