import type { ComponentPropsWithoutRef } from 'react'
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
type TextAreaControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<ControllerProps<TFieldValues, TName>, 'name' | 'control'> &
  ComponentPropsWithoutRef<'textarea'> & {
    label: string
  }

export const TextAreaControlled = <
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>,
>({
  name,
  control,
  label,
  ...rest
}: TextAreaControlledProps<T, U>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label htmlFor={name} className='text-sm text-white'>
            {label}
          </label>
          <textarea
            {...rest}
            {...field}
            rows={4}
            className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
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
