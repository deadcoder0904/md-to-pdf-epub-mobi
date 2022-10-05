import React from 'react'

interface IImg {
  children: React.ReactElement
}

export const Img = ({ children, ...props }: IImg) => {
  return (
    // eslint-disable-next-line
    <img className="px-4 py-3 overflow-x-auto rounded-lg img">{children}</img>
  )
}
