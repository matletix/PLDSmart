// The types of actions that can be dispatched to modify the state of the store
export const types = {
  SET_TOKEN: 'SET_TOKEN',
  SET_USERNAME: 'SET_USERNAME',
  SET_PWD: 'SET_PWD',
  SET_PSEUDO: 'SET_PSEUDO',
  SET_LEVEL: 'SET_LEVEL',
  ADD_COURSE: 'ADD_COURSE',
}

// Helper functions to dispatch actions, optionally with payloads
export const dispatchAction = {
  set_token: (token) => {
    return {type: types.SET_TOKEN, payload: token}
  },
  set_username: (username) => {
    return {type: types.SET_USERNAME, payload: username}
  },
  set_password: (pwd) => {
    return {type: types.SET_PWD, payload: pwd}
  },
  set_pseudo: (pseudo) => {
    return {type: types.SET_PSEUDO, payload: pseudo}
  },
  set_points: (points) => {
    return {type: types.SET_POINTS, payload: points}
  },
  set_level: (level) => {
    return {type: types.SET_LEVEL, payload: level}
  },
  add_course: (course) => {
    return {type: types.ADD_COURSE, payload: course}
  },
}

// Initial state of the store
const initialState = {
  token: '',
  username: '',
  password: '',
  pseudo: '',
  points: 0,
  currentLevel: 0,
  courses: [],
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const reducer = (state = initialState, action) => {
  const { username, password, token, pseudo, points, currentLevel, courses } = state
  const { type, payload } = action

  switch (type) {
    case types.SET_TOKEN: {
      return {
        ...state,
	token: payload,
      }
    }
    case types.SET_USERNAME: {
      return {
        ...state,
	username: payload,
      }
    }
    case types.SET_PWD: {
      return {
        ...state,
	password: payload,
      }
    }
    case types.SET_PSEUDO: {
      return {
        ...state,
	pseudo: payload,
      }
    }
    case types.SET_LEVEL: {
      return {
        ...state,
	currentLevel: payload,
      }
    }
    case types.ADD_COURSE: {
      return {
        ...state,
	courses: [payload, ...courses],
      }
    }
  }

  return state
}
