const companiesReducer =  (state = [], {type, payload} = {}) => {
  switch (type) {
    case 'FETCH_COMPANIES_SUCCESS':
      return payload

    default:
      return state
  }
}

export default companiesReducer
