import { ReactElement, useState } from 'react'
import { describe, expect, it } from 'vitest'

import { renderWithOptions } from '../../../../testing/render'
import { createRadioGroupForm } from './RadioGroupForm'

type Option = 'first' | 'second'
const RadioGroupForm = createRadioGroupForm<Option>()
const options = { labelByValue: { first: 'Erste Option', second: 'Zweite Option' } }

const StatefulRadioGroupForm = (): ReactElement => {
  const [state, setState] = useState(RadioGroupForm.initialState)
  return (
    <RadioGroupForm.Component
      state={state}
      setState={setState}
      options={options}
      title='Antrag auf:'
      divideItems={false}
    />
  )
}

describe('RadioGroupForm', () => {
  it('should mark only the group label as required, not each option', () => {
    const { container, getByRole } = renderWithOptions(<StatefulRadioGroupForm />, {
      translation: true,
    })

    expect(container.querySelectorAll('.MuiFormLabel-asterisk')).toHaveLength(1)
    expect(container.querySelectorAll('.MuiFormControlLabel-asterisk')).toHaveLength(0)
    expect(getByRole('radiogroup')).toHaveAttribute('aria-required', 'true')
  })
})
