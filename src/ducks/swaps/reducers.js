export default function swapsReducer(state = [], {type, payload}) {
  switch (type) {
    case 'FETCH_SWAPS_SUCCESS':
      return payload
    case 'UPDATE_SWAP_SUCCESS':
      return [...state.filter(el => el.id !== payload.id), payload]
    default:
      return state
  }

}
