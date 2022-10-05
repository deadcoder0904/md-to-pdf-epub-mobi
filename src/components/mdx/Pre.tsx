import React from 'react'

interface IPre {
  children: React.ReactElement
}

export const Pre = ({ children, ...props }: IPre) => {
  return (
    <pre className="px-4 py-3 overflow-x-auto rounded-lg font-jetbrains">
      {children}
    </pre>
  )
}
