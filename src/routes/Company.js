import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CompanyJobs from '../pages/Platform/Companies/CompanyJobs'
import CompanyProfile from '../pages/Platform/Companies/CompanyProfile'
import Applications from '../pages/Platform/Companies/Applications'
import CompanySettings from '../pages/Platform/Companies/CompanySettings'
import PageNotFound from '../pages/PageNotFound'

function Company() {
  return (
    <Routes>
        <Route exact path="/company-jobs" element={<CompanyJobs/>}/>
        <Route exact path="/company-profile" element={<CompanyProfile/>}/>
        <Route exact path="/applications" element={<Applications/>}/>
        <Route exact path="/company-settings" element={<CompanySettings/>}/>
        <Route exact path='*' element={<PageNotFound/>}/>
    </Routes>
  )
}

export default Company