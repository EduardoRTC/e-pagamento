import React from 'react'

export default function Label({children}) {
  return (
    <label htmlFor={children}>{children}</label>
  )
}
