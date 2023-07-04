export class miniVue {
  constructor (config) {
    const { el, data } = config;
    this.template = document.querySelector(el)
    this.data = data;
  }
}

export const effect = () => {}

export const reactive = () => {}