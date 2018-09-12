import {hySelect, hyOption} from './components/select'

const view = {
  'hy-select': hySelect,
  'hy-option': hyOption
}

const install = (Vue, option={}) => {
  if(install.installed) return
  Object.keys(view).forEach((key) => {
    Vue.component(key,view[key])
  })
}

if((typeof window) !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const API = {
  install,
  'hy-select': hySelect,
  'hy-option': hyOption
}

export default API
