import {hySelect, hyOption} from './components/select'
import hyTable from './components/table'
import hyPagination from './components/pagination'

const view = {
  'hy-select': hySelect,
  'hy-option': hyOption,
  'hy-table': hyTable,
  'hy-pagination': hyPagination
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
  'hy-option': hyOption,
  'hy-table': hyTable,
  'hy-pagination': hyPagination
}

export default API
