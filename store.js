import { createStore } from 'redux'

const initialState = {
  session: 'false',
  user: '',
  userdata: {},
  ciudades:'',
  token: '',
  spinner: false,
  partner: 'false',

}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store