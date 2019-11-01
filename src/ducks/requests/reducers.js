export default function requestsReducer(state = [], {type, payload}) {
  switch (type) {
    case 'GET_WATCHLIST_SUCCESS':
      return payload

    case 'UPDATE_WATCHLIST_SUCCESS':
      const elementToUpdate = state.find((el) => el.id === payload.id)
      const updatedElement = {...elementToUpdate, status: payload.status}
      const newState = state.filter(el => el.id !== payload.id)
      return [...newState, updatedElement]

    case 'ADD_WATCHLIST_SUCCESS':
      return [...state, payload]

    default:
      return state
  }
}





