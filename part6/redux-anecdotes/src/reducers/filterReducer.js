export const setFilter = filter => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

const initialState = 'ALL'

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.filter
        default:
            return initialState
    }
}

export default filterReducer