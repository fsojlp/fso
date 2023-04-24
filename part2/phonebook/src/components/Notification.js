import React from 'react'

export const Notification = ({content}) => {

    if (content === null) {
        return null
    }

  return (
    <div className={content.type}>
        {content.text}
    </div>
  )
}
