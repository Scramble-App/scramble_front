export default function companiesReducer(state = [], {type, payload} = {}) {
  if (type === 'FETCH_COMPANIES_SUCCESS') {
    return payload
  } else {
    return state
  }
}


