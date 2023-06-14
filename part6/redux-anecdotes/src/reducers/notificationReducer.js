export const createNotification = (content) => {
    return {
        type: 'CREATE_NOTIFICATION',
        data: {
            content
        }
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'CREATE_NOTIFICATION':
            return `${action.data.content}`
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export default notificationReducer