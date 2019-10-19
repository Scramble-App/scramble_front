export default function requestsReducer(state = [], {type, payload}) {
  if(type === 'GET_WATCHLIST_SUCCESS') {
    return payload
  }
  return state
}





