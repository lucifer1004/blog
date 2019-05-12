import {FluidObject} from 'gatsby-image'

export interface ImageInfo {
  alt?: string
  childImageSharp?: {
    fluid: FluidObject
  }
  image: string | ImageInfo
  style?: object
}

export interface GridItem {
  image: string | ImageInfo
  text?: string
}
