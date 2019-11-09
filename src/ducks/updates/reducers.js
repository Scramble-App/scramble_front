export default function updatesReducer(state = [], {type, payload} = {}) {
  if (type === 'FETCH_UPDATES_SUCCESS') {
    return payload
  } else if (type === 'ADD_UPDATE_SUCCESS') {
    return [...state, payload]
  } else {
    return state
  }

}
