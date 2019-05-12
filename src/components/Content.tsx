import React from 'react'

interface ContentProps {
  content: React.ReactNode
  className: string
}

export const HTMLContent = ({content, className}: ContentProps) => (
  // @ts-ignore
  <div className={className} dangerouslySetInnerHTML={{__html: content}} />
)

const Content = ({content, className}: ContentProps) => (
  <div className={className}>{content}</div>
)

export default Content
