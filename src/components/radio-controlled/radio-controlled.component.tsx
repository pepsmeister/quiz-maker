import type { ComponentPropsWithoutRef } from 'react'
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

type Option = {
  id: string
  name: string
  description?: string
}

type RadioGroupControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<ControllerProps<TFieldValues, TName>, 'name' | 'control'> & {
  options: Option[]
  className?: string
} & Omit<ComponentPropsWithoutRef<'input'>, 'name' | 'type' | 'value'>

export const RadioGroupControlled = <
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>,
>({
  name,
  control,
  options,
  className,
  onChange,
  ...rest
}: RadioGroupControlledProps<T, U>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <fieldset aria-label={name} className={className}>
          {options.map((option) => (
            <label
              key={option.id}
              aria-label={option.name}
              aria-description={option.description}
              className='group flex border border-gray-700 p-4 first:rounded-t-md last:rounded-b-md focus:outline-none has-[:checked]:relative has-[:checked]:border-indigo-800 has-[:checked]:bg-indigo-500/10'
            >
              <input
                {...rest}
                type='radio'
                value={option.id}
                checked={field.value === option.id}
                onChange={(e) => {
                  onChange?.(e)
                  field.onChange(e.target.value)
                }}
                className='relative mt-0.5 size-4 shrink-0 appearance-none rounded-full border border-white/10 bg-white/5 before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-500 checked:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden'
              />
              <span className='ml-3 flex flex-col'>
                <span className='block text-sm font-medium text-white group-has-[:checked]:text-indigo-300'>
                  {option.name}
                </span>
                {option.description && (
                  <span className='block text-sm text-gray-400 group-has-[:checked]:text-indigo-300/75'>
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          ))}
          {fieldState.error && (
            <p className='mt-1 text-sm text-red-500'>
              {fieldState.error.message}
            </p>
          )}
        </fieldset>
      )}
    />
  )
}
