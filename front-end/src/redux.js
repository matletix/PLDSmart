// The types of actions that can be dispatched to modify the state of the store
export const types = {
  SET_TOKEN: 'SET_TOKEN',
  SET_USERNAME: 'SET_USERNAME',
  SET_PWD: 'SET_PWD',
  SET_PSEUDO: 'SET_PSEUDO',
  SET_LEVEL_MAX: 'SET_LEVEL_MAX',
  ADD_COURSE: 'ADD_COURSE',
  SET_COURSES: 'SET_COURSES',
  SET_POINTS: 'SET_POINTS',
  ADD_LEVEL: 'ADD_LEVEL',
  SET_CENTRES_OF_INTEREST: 'SET_CENTRES_OF_INTEREST',
  UP_NB_COIS_COURSE: 'UP_NB_COIS_COURSE',
  UP_NB_COURSES_LEVEL: 'UP_NB_COURSES_LEVEL',
  SET_VALIDATION_COURSES: 'SET_VALIDATION_COURSES',
  SET_NB_COIS_COURSE_SELECTED: 'SET_NB_COIS_COURSE_SELECTED',
  SET_NB_COURSES_LEVEL_SELECTED: 'SET_NB_COURSES_LEVEL_SELECTED',
  SET_VALIDATION_LEVEL: 'SET_VALIDATION_LEVEL',
  SET_NB_COIS_VALIDATED: 'SET_NB_COIS_VALIDATED',
}

// Helper functions to dispatch actions, optionally with payloads
export const dispatchAction = {
  set_token: (token) => {
    return {type: types.SET_TOKEN, payload: token}
  },
  set_nb_courses_level_selected: (nb_courses) => {
    return {type: types.SET_NB_COURSES_LEVEL_SELECTED, payload: nb_courses}
  },
  set_nb_cois_validated: (nb_cois) => {
    return {type: types.SET_NB_COIS_VALIDATED, payload: nb_cois}
  },
  set_nb_cois_course_selected: (nb_cois) => {
    return {type: types.SET_NB_COIS_COURSE_SELECTED, payload: nb_cois}
  },
  set_validation_courses: (courses) => {
    return {type: types.SET_VALIDATION_COURSES, payload: courses}
  },
  set_validation_level: (courses) => {
    return {type: types.SET_VALIDATION_LEVEL, payload: courses}
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
  set_levelMax: (level) => {
    return {type: types.SET_LEVEL_MAX, payload: level}
  },
  add_course: (course) => {
    return {type: types.ADD_COURSE, payload: course}
  },
  set_courses: (courses) => {
    return {type: types.SET_COURSES, payload: courses}
  },
  add_level: (level, courses) => {
      return {type: types.ADD_LEVEL, payload: {level: level, courses: courses}}
  },
  up_nb_cois_course: (course, level) => {
      return {type: types.UP_NB_COIS_COURSE, payload: {id_course: course, level: level} }
  },
  up_nb_courses_level: (level) => {
      return {type: types.UP_NB_COURSES_LEVEL, payload: level }
  },
  set_centers_of_interest: (centers_of_interest) => {
    return {type: types.SET_CENTRES_OF_INTEREST, payload: centers_of_interest}
  },
}

// Initial state of the store
export const initialState = {
    api_key: 'AIzaSyCZzFP9IPRM4YgAxXfMLVzauDMKCNAVYbE',
    token: '',
    username: '',
    password: '',
    pseudo: '',
    age: 0,
    sex: '',
    weight: 0,
    height: 0,
    points: 0,
    levelMax: 1,
    totalLevels: 5,
    courses: [],
    centers_of_interest: [],
    levelValidation: [],    // Number of courses validated in the level (level = position in the array)
                            // Position starts at 1
    courseValidation: [],   // Number of COIs validated in the course Ex. {id_course: 1, level: 1, nb_cois: 4}
    nb_cois_course_selected: 0,
    nb_courses_level_selected: 0,
    nb_cois_validated: 0,
}


// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const reducer = (state = {}, action) => {
  // const { username, password, token, pseudo, points, currentLevel, courses } = state
  const { type, payload } = action

  switch (type) {
    case types.SET_TOKEN: {
      return {
        ...state,
	token: payload,
      }
    }
    case types.SET_NB_COIS_VALIDATED: {
      return {
        ...state,
	nb_cois_validated: payload,
      }
    }
    case types.SET_VALIDATION_COURSES: {
      return {
         ...state,
	     courseValidation : payload,
      }
    }
    case types.SET_VALIDATION_LEVEL: {
      return {
         ...state,
	     levelValidation : payload,
      }
    }
    case types.SET_NB_COURSES_LEVEL_SELECTED: {
      return {
         ...state,
	     nb_courses_level_selected : payload,
      }
    }
    case types.SET_NB_COIS_COURSE_SELECTED: {
      return {
         ...state,
	     nb_cois_course_selected : payload,
      }
    }
    case types.UP_NB_COIS_COURSE: {
        var exist = state.courseValidation.find(function(course){
            var found = (course.id_course === payload.id_course && course.level === payload.level);
            if (found) {
                // Update the number
                course.nb_cois += 1;
            }
            return found;
        });

        if (!exist) state.courseValidation.push({id_course: payload.id_course, level: payload.level, nb_cois: 1});
        return state;
    }
    case types.UP_NB_COURSES_LEVEL: {
        if(!state.levelValidation[payload]){
            state.levelValidation[payload] = 1;
        } else {
            state.levelValidation[payload] += 1;
        }

        return state;
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
    case types.SET_CENTRES_OF_INTEREST: {
      return {
        ...state,
	centers_of_interest: payload,
      }
    }
    case types.SET_LEVEL_MAX: {
      return {
          ...state,
	       levelMax: payload,
      }
    }
    case types.ADD_COURSE: {
      return {
        ...state,
	courses: [payload, ...courses],
      }
    }
    case types.SET_COURSES: {
      return {
          ...state,
	       courses: payload,
      }
    }
    case type.ADD_LEVEL: {
        return {
            ...state,
            levels: [...levels, payload],
        }
    }
  }

  return state
}
