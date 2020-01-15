import React from 'react'
import {graphql} from 'gatsby'

function MyFiles({data}) {
    return (
        <React.Fragment>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Path</th>
                            <th>Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.allFile.edges.map(file => (
                            <tr key = {file.node.relativePath}>
                                <td>
                                    {file.node.relativePath}
                                </td>
                                <td>
                                    {file.node.prettySize}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export const query = graphql`
    query{
        allFile(sort: {fields: relativePath, order: ASC}) {
            edges {
                node {
                    id
                    relativePath
                    size
                    prettySize
                }
            }
        }
    }
`

export default MyFiles