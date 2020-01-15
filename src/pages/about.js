import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => (
  <React.Fragment>
    <h1>About {data.site.siteMetadata.title}</h1>
    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ligula lorem, tincidunt vitae enim at, sodales porta ligula. Cras vel sem mauris. Praesent hendrerit erat sed erat tempus, at bibendum augue aliquet. Curabitur non vulputate leo, id sagittis nisl. Morbi a efficitur nibh, condimentum convallis elit. Phasellus ut malesuada eros. Duis eget molestie nisi.
    </p>
  </React.Fragment>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`