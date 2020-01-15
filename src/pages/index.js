import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'
import { css } from "@emotion/core"

export default ({ data }) => {
  return (
    <React.Fragment>
      <h1>Gatsby Website</h1>
      <p>The image below is responsive and optimised.</p>
      <div>
        {(data.file != null &&
          <Img
            fluid={data.file.childImageSharp.fluid}
            alt="Group of pandas eating bamboo"
          />
        )}
      </div>
      <hr />
      <div>
        <p>Total blog post count: {data.allMarkdownRemark.totalCount}</p>
        <ul
          css={css`
          list-style-type: none;
          margin: 0;
          padding: 0;
          `}
        >
          {data.allMarkdownRemark.edges.map(post => (
            <li
              key={post.node.id}
              css={css`
              margin-top: 50px;
              padding-bottom: 50px;
              border-bottom: 1px solid #333;
              &:last-of-type{
                border-bottom: none;
              }
              `}
            >
              <h2>{post.node.frontmatter.title}</h2>
              <p>Date posted: {post.node.frontmatter.date}</p>
              <p>{post.node.excerpt}</p>
              <Link
                to={post.node.fields.slug}
                css={css`
                background: #aaa;
                padding: 10px;
                color: #fff;
                text-decoration: none;
                transition: background 0.3s;
                &:hover{
                  background: #000;
                }
                `}
              >
                Go to post
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  )
}

export const loadedImageFluid = graphql`
  fragment loadedImageFluid on File {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
`

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            date
            title
          }
          fields {
            slug
          }
        }
      }
      totalCount
    }
    file(relativePath: {eq: "panda-group-eating-bamboo.jpg"}) {
      ...loadedImageFluid
    }
  }  
`