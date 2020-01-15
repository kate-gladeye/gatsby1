import React from 'react'
import { graphql } from 'gatsby'

function BlogPost({data}) {
    const post = data.markdownRemark
    return(
        <React.Fragment>
            <div>
                <h1>{post.frontmatter.title}</h1>
                <p>Date posted: {post.frontmatter.date}</p>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </React.Fragment>
    )
}

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                date
            }
        }
    }
`

export default BlogPost