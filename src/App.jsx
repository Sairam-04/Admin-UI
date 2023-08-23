import { useState } from 'react'
import AdminComponent from './components/admin/AdminComponent'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BasicConfiguration from './components/admin/BasicConfiguration'
import UploadSyllabus from './components/admin/UploadSyllabus'
import ContentConfiguration from './components/admin/ContentConfiguration'
import ContentUpload from './components/admin/ContentUpload'
import AssessmentConfiguration from './components/admin/AssessmentConfiguration'
import HomePage from './components/admin/HomePage'
import LandingPage from './components/admin/LandingPage'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<AdminComponent />}>
            <Route index element={<HomePage />} />
            <Route path='/homepage' element={<HomePage />} />
            <Route path='/landingpage' element={<LandingPage />} />
            <Route path='/basic-configuration' element={<BasicConfiguration />} />
            <Route path='/upload-syllabus' element={<UploadSyllabus />} />
            <Route path='/content-configuration' element={<ContentConfiguration />} />
            <Route path='/content-upload' element={<ContentUpload />} />
            <Route path='/assessment-configuration' element={<AssessmentConfiguration />} />
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
