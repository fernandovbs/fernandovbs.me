import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Image from 'gatsby-image'
import postlistStyles from './postlist.module.css'

export default class IndexPage extends React.Component {
  render() {
    const { posts, title } = this.props

    return (
      <section className="section">
        <div className="container">
          <div className="content">
            <h2 className="has-text-weight-bold is-size-2">{title}</h2>
          </div>
          {posts.map(({ node: post }) => (
            <div
              className="content"
              style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
              key={post.id}
            >
              <div className={postlistStyles.thumbnail}>
                <Image fluid={post.featured_media.localFile.childImageSharp.fluid} />
              </div>
              <p>
                <Link className="has-text-primary" to={post.slug}>
                  {post.title}
                </Link>
                <span> &bull; </span>
                <small>
                  {post.date} - posted by{' '}
                  <Link to={`/author/${post.author.slug}`}>
                    {post.author.name}
                  </Link>
                </small>
              </p>
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.replace(/<p class="link-more.*/, ''),
                  }}
                />
                <Link className="button is-small" to={post.slug}>
                  Keep Reading →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export const pageQuery = graphql`
  fragment PostListFields on wordpress__POST {
    id
    title
    excerpt
    author {
      name
      slug
      avatar_urls {
        wordpress_48
      }
    }
    featured_media {
      localFile{
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    date(formatString: "MMMM DD, YYYY")
    slug
  }
`
