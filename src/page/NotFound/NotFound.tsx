import React from 'react'
import { FrownOutlined } from '@ant-design/icons'
import { Page } from '../../components/PageContent/Page'
import './NotFound.sass'

export const NotFound = () => (
  <Page >
    <div className="error">
      <FrownOutlined />
      <h1>404 Not Found</h1>
    </div>
  </Page>
  
)
