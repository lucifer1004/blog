import React from 'react'
import {AboutPageTemplate} from '../../templates/about-page'

interface AboutPagePreviewProps {
  entry: {
    getIn: Function
  }
  widgetFor: Function
}

const AboutPagePreview = ({entry, widgetFor}: AboutPagePreviewProps) => (
  <AboutPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

export default AboutPagePreview
