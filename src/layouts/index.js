import React from "react"
import { css } from "@emotion/core"
import { Link, graphql, useStaticQuery } from "gatsby"
import Transition from "../components/transition"

import { rhythm } from "../utils/typography"

import "./layout.css"

const Header = ({title}) => (
  <div
    css={css`
      background: rebeccapurple;
      margin-bottom: 1.45rem;
    `}
  >
    <div
      css={css`
        margin: 0 auto;
        max-width: 700px;
		padding: 1.45rem ${rhythm(2)};
      `}
    >
      <h1 css={css` margin: 0 `}>
        <Link
          to="/"
          css={css`
            color: white;
            text-decoration: none;
          `}
        >
          {title}
        </Link>
      </h1>
	  <nav>
		  <ul
			css={css`
				list-style-type: none;
				float: right;
			`}
		  >
			  <li
				css={css`
				display: inline-block;
				margin-right: 20px;
				`}
			  >
			  	<Link
					to={`/`}
					css={css`
					color: white;
					text-decoration: none;
					`}
				>
					Home
				</Link>
			  </li>
			  <li
				css={css`
				display: inline-block;
				margin-right: 20px;
				`}
			  >
			  	<Link
					to={`/about/`}
					css={css`
					color: white;
					text-decoration: none;
					`}
				>
					About
				</Link>
			  </li>
			  <li
				css={css`
				display: inline-block;
				margin-right: 20px;
				`}
			  >
			  	<Link
					to={`/my-files/`}
					css={css`
					color: white;
					text-decoration: none;
					`}
				>
					File List
				</Link>
			  </li>
			  <li
				css={css`
				display: inline-block;
				margin-right: 20px;
				`}
			  >
			  	<Link
					to={`/blog/`}
					css={css`
					color: white;
					text-decoration: none;
					`}
				>
					Blog
				</Link>
			  </li>
			  <li
				css={css`
				display: inline-block;
				`}
			  >
			  	<Link
					to={`/contact/`}
					css={css`
					color: white;
					text-decoration: none;
					`}
				>
					Contact
				</Link>
			  </li>
		  </ul>
	  </nav>
    </div>
  </div>
)

const TemplateWrapper = ({ children, location }) => {
    const data = useStaticQuery(
      graphql`
        {
          site {
            siteMetadata {
              title
            }
          }
        }
      `
    )
    return (
        <div>
            <Header title={data.site.siteMetadata.title} />
            <div
            	css={css`
					margin: 0 auto;
					max-width: 700px;
					padding: ${rhythm(2)};
					padding-top: ${rhythm(1.5)};
				`}
            >
            <Transition location={location}>{children}</Transition>
            </div>
        </div>
    )
}

export default TemplateWrapper