// import { useReactiveV2 } from './reactive/reactive';

// const { reactive, effect } = useReactiveV2;

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

export class miniVue {
  constructor (config) {
    const { el, data } = config
    this.template = document.querySelector(el)
    this.data = reactive(data);
    this.traverser(this.template)
  }
  traverser (node) {
    // type Node can use Object.create(Node) to check NodeType's all enum 
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.trim().match(/^{{([\s\S]+)}}$/)) {
        const bindName = RegExp.$1.trim()
        effect(() => {
          node.textContent = this.data[bindName]
        })
      }
    }
    if (node.childNodes && node.childNodes.length) {
      for (let childNode of node.childNodes) {
        this.traverser(childNode)
      }
    }
  }
}