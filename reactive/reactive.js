export const effects = [];

export const effect = (fn) => {
  effects.push(fn)
  fn()
}

export const reactive = (object) => {
  let reactiveObject = new Proxy(object, {
    get (target, property, receiver) {
      console.info('get value:', target[property])
      return target[property]
    },
    set (target, property, value, receiver) {
      console.info('set value:', target, property, value)
      target[property] = value;
      // traverser effects & execute function
      for (const effectFn of effects) {
        if (effectFn) effectFn()
      }
      return target
    }
  })

  return reactiveObject
}