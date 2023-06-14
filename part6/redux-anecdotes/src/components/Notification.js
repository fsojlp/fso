import React from 'react'

const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notificationMessage = store.getState().notifications

  if (notificationMessage === '') {
    return null
  }

  return (
    <div style={style}>
      {notificationMessage}
    </div>
  )
}

export default Notification