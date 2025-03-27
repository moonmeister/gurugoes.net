import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { classNames } from '../../libs/strings';
import { buttonClasses } from '../button';
const inputStyles =
  'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md';

export function Label({ htmlFor, value, children }) {
  return (
    <div className="p-2">
      <label htmlFor={htmlFor} class="block text-sm font-semibold text-black">
        {value}
        <div class="mt-1">{children}</div>
      </label>
    </div>
  );
}

export function Input({ className, name, reg = {}, ...props }) {
  const { register } = useFormContext();
  return (
    <input
      {...props}
      {...register(name, reg)}
      className={classNames(inputStyles, className)}
    />
  );
}

export function Textarea({ className, name, reg = {}, ...props }) {
  const { register } = useFormContext();

  return (
    <textarea
      {...props}
      {...register(name, reg)}
      className={classNames(inputStyles, className)}
    />
  );
}

export function Description({ children, ...props }) {
  return (
    <p {...props} class=" text-sm font-light text-black">
      {children}
    </p>
  );
}

export function Submit({ ...props }) {
  return (
    <input
      {...props}
      type="submit"
      className={classNames(buttonClasses, 'cursor-pointer')}
    />
  );
}

export function Error({ className, ...props }) {
  return (
    <ErrorMessage
      render={({ message }) => {
        return (
          <p
            className={className}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        );
      }}
      {...props}
    />
  );
}
