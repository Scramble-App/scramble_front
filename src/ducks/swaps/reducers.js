export default function swapsReducer(state = [], {type, payload}) {
  switch (type) {
    case 'FETCH_SWAPS_SUCCESS':
      return payload
    default:
    return state
  }

}
