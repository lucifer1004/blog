import React from 'react'
import {BlogPostTemplate} from '../../templates/blog-post'

interface BlogPostPreviewProps {
  entry: {
    getIn: Function
  }
  widgetFor: Function
}

const BlogPostPreview = ({entry, widgetFor}: BlogPostPreviewProps) => (
  <BlogPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

export default BlogPostPreview
