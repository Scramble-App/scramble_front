export default function userReducer (state = {isLoading: true}, {type, payload} = {}) {
  switch(type) {
    case 'FETCH_USER_REQUEST':
      return {...state, isLoading: true}

    case 'FETCH_USER_SUCCESS':
      return {...state, ...payload, isLoading: false}

    case 'FETCH_USER_FAILURE':
      return {...state, isLoading: false}

    case 'LOGOUT_SUCCESS':
      return {isLoading: false}

    default:
      return state

  }
}

