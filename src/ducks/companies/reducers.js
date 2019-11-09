export default function companiesReducer(state = [], {type, payload} = {}) {
  if (type === 'FETCH_COMPANIES_SUCCESS') {
    return payload
  } else if (type === 'FETCH_COMPANY_SUCCESS') {
    return [...state.filter(i => i.id !== payload.id), payload]
  } else {
    return state
  }
}


