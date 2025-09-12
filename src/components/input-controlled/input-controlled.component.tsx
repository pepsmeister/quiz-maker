import type { ComponentPropsWithoutRef } from 'react'
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
type InputControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<ControllerProps<TFieldValues, TName>, 'name' | 'control'> &
  ComponentPropsWithoutRef<'input'> & {
    label: string
  }

export const InputControlled = <
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>,
>({
  name,
  control,
  label,
  ...rest
}: InputControlledProps<T, U>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label htmlFor={name} className='text-sm text-white'>
            {label}
          </label>
          <input
            {...rest}
            {...field}
            type='text'
            className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 mb-2'
          />
          {fieldState.error && fieldState.error.message && (
            <div className='text-red-500 text-sm'>
              {fieldState.error.message}
            </div>
          )}
        </div>
      )}
    />
  )
}
