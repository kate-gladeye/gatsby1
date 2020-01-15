import React from 'react'
import {Link, graphql} from 'gatsby'
import { css } from "@emotion/core"

function BlogList({data, pageContext}) {
    const {numPages, currentPage} = pageContext
    return(
        <React.Fragment>
            <ul
                css={css`
                list-style-type: none;
                margin: 0;
                padding: 0;
                `}
            >
                {data.allMarkdownRemark.edges.map(({node}) => {
                    return (
                        <li
                            key={node.id}
                            css={css`
                            margin-top: 50px;
                            padding-bottom: 50px;
                            border-bottom: 1px solid #333;
                            &:last-of-type{
                                border-bottom: none;
                            }
                            `}
                        >
                            <h1>{node.frontmatter.title}</h1>
                            <p>Date posted: {node.frontmatter.date}</p>
                            <p>{node.excerpt}</p>
                            <Link
                                to={node.fields.slug}
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
                                Read more
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <div>
                <ul
                    css={css`
                        margin: 0;
                    `}
                >
                    {currentPage > 1 && 
                        <li
                            css={css`
                                display: inline-block;
                                float: left;
                            `}
                        >
                            <Link
                                to={currentPage === 2 ? '/blog/' : '/blog/' + (currentPage - 1)}
                                css={css`
                                    display: inline-block;
                                    background: #ee3333;
                                    color: #ffffff;
                                    text-decoration: none;
                                    text-transform: uppercase;
                                    font-size: 12px;
                                    padding: 10px 20px;
                                    &:hover{
                                        background: #990000;
                                    }
                                `}
                            >
                                Prev
                            </Link>
                        </li>
                    }
                    {currentPage !== numPages && 
                        <li
                            css={css`
                                display: inline-block;
                                float: right;     
                            `}
                        >
                            <Link
                                to={'/blog/' + (currentPage + 1)}
                                css={css`
                                    display: inline-block;
                                    background: #ee3333;
                                    color: #ffffff;
                                    text-decoration: none;
                                    text-transform: uppercase;
                                    font-size: 12px;
                                    padding: 10px 20px;
                                    &:hover{
                                        background: #990000;
                                    }
                                `}
                            >
                                Next
                            </Link>
                        </li>
                    }
                </ul>
            </div>
        </React.Fragment>
    )
}

export const query = graphql`
    query($skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date
                    }
                    id
                    excerpt
                }
            }
        }
    }
`

export default BlogList