// version 1.0
export const useReactiveV1 = () => {

  const effects = [];

  const effect = (fn) => {
    effects.push(fn)
    fn()
  }

  const reactive = (object) => {
    let reactiveObject = new Proxy(object, {
      get (target, property, receiver) {
        console.info('version1 - get value:', target[property])
        return target[property]
      },
      set (target, property, value, receiver) {
        console.info('version1 - set value:', target, property, value)
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

  return {
    effects,
    effect,
    reactive,
  }
}

// first. every set will execute all effect, but I wish it just execute the same dependence object and property
// second. but if 100 object & 100 effect, the effect will execute 100 x 100 = 10000 times
// third. every effect will execute 

// version 2.0

export const useReactiveV2 = () => {
  
  const effects = new Map();

  let currentEffect = null;

  const effect = (fn) => {
    if (effects.has(fn)) effects.set(fn)
    currentEffect = fn;
    fn();
    currentEffect = null;
  }

  const reactive = (object) => {
    let observed = new Proxy(object, {
      get (target, property, receiver) {
        console.info('version2 - get value:', target[property])
        if (currentEffect) {
          if (!effects.has(target))
            effects.set(target, new Map);
          if (!effects.get(target).has(property))
            effects.get(target).set(property, new Array)
          effects.get(target).get(property).push(currentEffect)
        }
        return target[property]
      },
      set (target, property, value, receiver) {
        console.info('version2 - set value:', target, property, value)
        target[property] = value;
        // traverser effects & execute function
        if (effects.has(target) && effects.get(target).has(property)) {
          for (let effect of effects.get(target).get(property)) {
            effect()
          }
        }
        return value;
      }
    })

    return observed
  }

  return {
    effects,
    currentEffect,
    effect,
    reactive,
  }
}