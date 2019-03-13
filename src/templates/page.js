import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Image from 'gatsby-image'
import pageStyles from '../components/page.module.css'
import XmlEntities from 'html-entities'

export const PageTemplate = ({ title, content, featured_media }) => {
  const featured = featured_media.localFile.childImageSharp.fluid;
  const decodedTitle = XmlEntities.XmlEntities.decode(title)

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light" dangerouslySetInnerHTML={{__html: decodedTitle}}></h2>
              <div className={pageStyles.featured}>
              <Image fluid={featured} />
              </div>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  featured_media: PropTypes.object,
}

const Page = ({ data }) => {
  const { wordpressPage: page } = data

  return (
    <Layout>
      <PageTemplate title={page.title} content={page.content} featured_media={page.featured_media} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query PageById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      featured_media {
        localFile{
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }      
    }
  }
`
