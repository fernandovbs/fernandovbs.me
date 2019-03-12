import React from 'react'
import Helmet from 'react-helmet'

import Navbar from './Navbar'
import './all.sass'
import layoutStyles from './layout.module.css'

const TemplateWrapper = ({ children }) => (
  <div className={layoutStyles.container}>
    <Helmet title="Home | Fernando Souza" />
    <Navbar />
    <div>{children}</div>
  </div>
)

export default TemplateWrapper
