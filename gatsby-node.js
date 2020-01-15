/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const {createFilePath} = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
    const {createNodeField} = actions
    if(node.internal.type === 'MarkdownRemark'){
        const slug = createFilePath({node, getNode, basePath: 'pages'})
        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)
    result.data.allMarkdownRemark.edges.forEach( md => {
        createPage({
            path: md.node.fields.slug,
            component: path.resolve('./src/templates/blog-post.js'),
            context: {
                slug: md.node.fields.slug,
            }
        })
    })

    // pagination
    const posts = result.data.allMarkdownRemark.edges
    const postsPerPage = 2
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({length: numPages}).forEach((_, i) => {
        createPage({
            path: i === 0 ? '/blog' : '/blog/' + (i + 1),
            component: path.resolve('./src/templates/blog-list-template.js'),
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages: numPages,
                currentPage: i + 1
            }
        })
    })
}