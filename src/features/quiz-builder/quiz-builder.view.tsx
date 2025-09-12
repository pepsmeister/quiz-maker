import { InputControlled } from '@/components/input-controlled/input-controlled.component'
import {
  RadioGroupControlled,
  type Option,
} from '@/components/radio-controlled/radio-controlled.component'
import { TextAreaControlled } from '@/components/text-area-controlled/text-area-controlled.component'
import {
  createQuestion,
  createQuiz,
} from '@/features/quiz-builder/api/quiz-builder-api'
import { OptionsField } from '@/features/quiz-builder/components/options-field.component'
import { QUESTION_TYPE_OPTIONS } from '@/features/quiz-builder/constants/quiz-builder-const'
import {
  quizBuilderSchema,
  type QuizBuilderType,
} from '@/features/quiz-builder/constants/quiz-builder-schema.const'
import type {
  QuizInput,
  QuizQuestionInput,
} from '@/features/quiz-builder/types/quiz-builder.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useFieldArray, useForm } from 'react-hook-form'

export const QuizBuilderView = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      questions: [
        {
          type: 'mcq',
          prompt: '',
          correctAnswer: '',
          options: [''],
        },
        {
          type: 'short',
          prompt: '',
          correctAnswer: '',
        },
      ],
    },
    resolver: yupResolver(quizBuilderSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const watchQuestions = watch('questions')

  const {
    fields: questionsFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'questions',
  })

  const { mutateAsync: createQuizMutation } = useMutation({
    mutationFn: (quizInput: QuizInput) => createQuiz(quizInput),
  })

  const { mutateAsync: createQuizQuestionMutation } = useMutation({
    mutationFn: (question: QuizQuestionInput) => createQuestion(question),
  })

  const onSubmit = async (data: QuizBuilderType) => {
    try {
      const { title, description, questions } = data

      const createQuizResult = await createQuizMutation({ title, description })

      const { id: quizId } = createQuizResult

      for (const question of questions) {
        await createQuizQuestionMutation({
          ...question,
          quizId,
        })
      }

      reset()

      alert(
        `Quiz ${title} created successfully! Here's your quiz ID: ${quizId}`
      )
    } catch (e) {
      alert(
        `Failed to create quiz. Please try again or contact administrator. Error: ${e}`
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='p-4 space-y-8 bg-gray-900 w-full'
    >
      <div className='container mx-auto'>
        <h1 className='text-2xl font-bold mb-4 text-white'>Quiz Builder</h1>
        <InputControlled
          label='Quiz Title'
          name='title'
          control={control}
          placeholder='Enter quiz title'
        />
        <InputControlled
          label='Quiz Description'
          name='description'
          control={control}
          placeholder='Enter quiz description'
        />
        {questionsFields.map((field, index) => {
          const qType = watchQuestions?.[index]?.type

          return (
            <div
              key={field.id}
              className='border rounded-md p-4 mb-6 bg-gray-800'
            >
              <div className='flex justify-between items-center mb-2'>
                <h2 className='text-lg font-semibold text-white'>
                  Question {index + 1}
                </h2>
                <button
                  type='button'
                  onClick={() => remove(index)}
                  className='text-red-500 cursor-pointer'
                >
                  Remove
                </button>
              </div>
              <RadioGroupControlled
                name={`questions.${index}.type`}
                control={control}
                options={QUESTION_TYPE_OPTIONS}
                onChange={(e) => {
                  if (e.target.value !== 'mcq') {
                    setValue(`questions.${index}.options`, undefined)
                    setValue(`questions.${index}.correctAnswer`, '')
                  }
                }}
                className='mb-4'
              />
              <InputControlled
                label='Question Prompt'
                name={`questions.${index}.prompt`}
                control={control}
                placeholder='Enter question prompt'
              />
              {qType === 'mcq' && (
                <>
                  <br />
                  <div className='mb-2 font-medium text-white'>Options</div>
                  <OptionsField control={control} index={index} />
                  {/* Select the correct option */}
                  <div className='mt-4'>
                    <div className='mb-2 font-medium text-white'>
                      Correct Answer
                    </div>
                    <RadioGroupControlled
                      name={`questions.${index}.correctAnswer`}
                      control={control}
                      options={
                        (watchQuestions[index]?.options?.map(
                          (opt, optIndex) => ({
                            id: optIndex.toString(),
                            name: opt,
                          })
                        ) as unknown as Option[]) || []
                      }
                    />
                    {errors.questions?.[index]?.options && (
                      <div className='text-red-500 text-sm mt-2'>
                        {errors.questions?.[index]?.options?.message}
                      </div>
                    )}
                  </div>
                </>
              )}
              {qType === 'short' && (
                <>
                  <br />
                  <InputControlled
                    label='Correct Answer'
                    name={`questions.${index}.correctAnswer`}
                    control={control}
                    placeholder='Enter correct answer'
                  />
                </>
              )}

              {qType === 'code' && (
                <>
                  <br />
                  <TextAreaControlled
                    label='Correct Answer'
                    name={`questions.${index}.correctAnswer`}
                    control={control}
                    placeholder='Write your code'
                  />
                </>
              )}
            </div>
          )
        })}
        <button
          type='button'
          onClick={() =>
            append({
              type: 'mcq',
              prompt: '',
              correctAnswer: '',
              options: [''],
            })
          }
          className='cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700'
        >
          Add Question
        </button>
        {/* Error message for questions field */}
        {errors.questions?.root && (
          <div className='text-red-500 text-sm mt-2'>
            {errors.questions?.root?.message}
          </div>
        )}
        <div className='mt-6'>
          <button
            type='submit'
            className='cursor-pointer bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 :disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        </div>
      </div>
    </form>
  )
}
