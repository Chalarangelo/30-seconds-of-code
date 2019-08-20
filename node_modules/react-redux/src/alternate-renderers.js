import Provider from './components/Provider'
import connectAdvanced from './components/connectAdvanced'
import { ReactReduxContext } from './components/Context'
import connect from './connect/connect'

import { useDispatch } from './hooks/useDispatch'
import { useSelector } from './hooks/useSelector'
import { useStore } from './hooks/useStore'

import { getBatch } from './utils/batch'
import shallowEqual from './utils/shallowEqual'

// For other renderers besides ReactDOM and React Native, use the default noop batch function
const batch = getBatch()

export {
  Provider,
  connectAdvanced,
  ReactReduxContext,
  connect,
  batch,
  useDispatch,
  useSelector,
  useStore,
  shallowEqual
}
