const notificationReducer = (state = 'HI', action) => {
    switch (action.type) {
        case 'NEW_ANECDOTE':
            return action.data
        default:
            return state
    }
}

export default notificationReducer