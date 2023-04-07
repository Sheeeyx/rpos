import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Page } from '../../components/PageContent/Page'
import ContactUs from './ContactUs/ContactUs'
import SafetyResource from './SafetyResource'

const Help = () => {
  return (
    <Page>
        <Routes>
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="safety-recource/*" element={<SafetyResource />} />
        </Routes>
    </Page>
  )
}

export default Help