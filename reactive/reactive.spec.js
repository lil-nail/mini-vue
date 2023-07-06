import { expect, test, describe } from 'vitest'
import { useReactiveV1, useReactiveV2 } from './reactive'

describe('reactive', () => {
  test('effect simple demo', () =>　{

    const { reactive, effect } = useReactiveV1();

    const person = reactive({
      age: 13,
      sex: 'man',
      isStudent: true,
    })

    let resultAge = null
    effect(() => {
      console.info('effect')
      resultAge = person.age
    })
    
    expect(resultAge).toEqual(13)
    person.age = 20
    expect(resultAge).toEqual(20)
  })

  test('effect version 1.0 demo', () =>　{

    const { reactive, effect } = useReactiveV1();

    const person = reactive({
      age: 13,
      sex: 'man',
      isStudent: true,
    })

    let resultAge = null
    effect(() => {
      console.info('v1 - effect1')
      resultAge = person.age
    })
    
    const person2 = reactive({
      age: 11,
      sex: 'woman',
      isStudent: true,
    })

    let resultAge2 = null
    effect(() => {
      console.info('v1 - effect2')
      resultAge2 = person2.age
    })
    
    expect(resultAge).toEqual(13)
    expect(resultAge2).toEqual(11)
    person.age = 20
    expect(resultAge).toEqual(20)
    expect(resultAge2).toEqual(11)
  })

  test('effect version 2.0 demo', () =>　{

    const { reactive, effect } = useReactiveV2();

    const person = reactive({
      age: 13,
      sex: 'man',
      isStudent: true,
    })

    let resultAge = null
    effect(() => {
      console.info('version2 - effect1')
      resultAge = person.age
    })
    
    const person2 = reactive({
      age: 11,
      sex: 'woman',
      isStudent: true,
    })

    let resultAge2 = null
    effect(() => {
      console.info('version2 - effect2')
      resultAge2 = person2.age
    })
    
    expect(resultAge).toEqual(13)
    expect(resultAge2).toEqual(11)
    person.age = 20
    expect(resultAge).toEqual(20)
    expect(resultAge2).toEqual(11)
  })
})