import * as Yup from 'yup'

const isMultipleChoice = Yup.array()
  .of(Yup.string().required('Option cannot be empty.'))
  .test(
    'is-multiple-choice',
    'Please provide at least two options.',
    function (value) {
      const { type } = this.parent ?? {}
      if (type === 'mcq') {
        return Array.isArray(value) && value.length >= 2
      }

      return true
    }
  )

// const correctAnswerValidation = Yup.string()
//   .test(
//     'is-correct-answer',
//     'Correct answer must be one of the options.',
//     function (value) {
//       const { type, options } = this.parent ?? {}

//       const lowercaseOptions = options?.map((option: string) => {
//         return option.toLowerCase().trim()
//       })

//       if (type === 'mcq') {
//         return lowercaseOptions?.find(
//           (option: string) => option === value?.toLowerCase().trim()
//         )
//       }

//       return true
//     }
//   )
//   .required('Please provide a correct answer.')

const correctAnswerValidation = Yup.string()
  .required('Please provide a correct answer.')
  .trim()

const quizQuestionSchema = Yup.object().shape({
  type: Yup.string().oneOf(['mcq', 'short', 'code']).required('Required'),
  correctAnswer: correctAnswerValidation,
  prompt: Yup.string().required('Please provide a prompt.').trim(),
  options: isMultipleChoice,
})

export const quizBuilderSchema = Yup.object().shape({
  title: Yup.string().required('Please provide a title.').trim(),
  description: Yup.string().required('Please provide a description.').trim(),
  questions: Yup.array()
    .min(2, 'Please provide at least two questions.')
    .of(quizQuestionSchema)
    .required('Please provide at least two questions.'),
})

export type QuizBuilderType = Yup.InferType<typeof quizBuilderSchema>
