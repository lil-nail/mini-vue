import { expect, test, describe } from 'vitest'
import { reactive, effect } from './reactive'

describe('reactive', () => {
  test('effect demo', () =>　{
    const person = reactive({
      age: 13,
      sex: 'man',
      isStudent: true,
    })

    let resultAge = null
    effect(() => { resultAge = person.age })
    
    expect(resultAge).toEqual(13)
    person.age = 20
    expect(resultAge).toEqual(20)
  })
})