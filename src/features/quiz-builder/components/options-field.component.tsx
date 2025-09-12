import { InputControlled } from '@/components/input-controlled/input-controlled.component'
import { useFieldArray, type Control, type FieldValues } from 'react-hook-form'

export const OptionsField = ({
  control,
  index,
}: {
  control: unknown
  index: number
}) => {
  const {
    fields: optionsFields,
    append,
    remove,
  } = useFieldArray({
    control: control as Control<FieldValues>,
    name: `questions.${index}.options`,
  })

  return (
    <div className='space-y-2'>
      {optionsFields.map((option, optionIndex) => (
        <div key={option.id} className='flex items-center gap-2'>
          <InputControlled
            label={`Option ${optionIndex + 1}`}
            name={`questions.${index}.options.${optionIndex}`}
            control={control as Control<FieldValues>}
            placeholder={`Option ${optionIndex + 1}`}
          />
          <button
            type='button'
            onClick={() => remove(optionIndex)}
            className='text-red-400 cursor-pointer'
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type='button'
        onClick={() => append('')}
        className='text-indigo-500 mt-1 cursor-pointer'
      >
        Add Option
      </button>
    </div>
  )
}
