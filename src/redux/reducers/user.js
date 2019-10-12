const userReducer = (state = {}, {type, payload} = {}) => {
  switch(type) {
    case 'FETCH_USER_REQUEST':
    case 'LOGIN_REQUEST':
    case 'SIGNUP_REQUEST':
      return {...state, isLoading: true}

    case 'FETCH_USER_SUCCESS':
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {...state, ...payload, isLoading: false}

    case 'FETCH_USER_FAILURE':
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
      return {...state, isLoading: false}

    default:
      return state

  }
}

export default userReducer