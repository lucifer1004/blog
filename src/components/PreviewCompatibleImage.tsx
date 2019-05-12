import React from 'react'
import Img from 'gatsby-image'
import {ImageInfo} from '../common/types'

interface PreviewCompatibleImageProps {
  imageInfo?: ImageInfo
}

const PreviewCompatibleImage = ({imageInfo}: PreviewCompatibleImageProps) => {
  if (!imageInfo) return null

  const imageStyle = {borderRadius: '5px'}
  const {alt = '', childImageSharp, image} = imageInfo

  if (!!image && typeof image !== 'string' && !!image.childImageSharp) {
    return (
      <Img style={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />
    )
  }

  if (!!childImageSharp) {
    return <Img style={imageStyle} fluid={childImageSharp.fluid} alt={alt} />
  }

  if (!!image && typeof image === 'string')
    return <img style={imageStyle} src={image} alt={alt} />

  return null
}

export default PreviewCompatibleImage
