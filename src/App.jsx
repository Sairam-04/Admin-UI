import { useState } from 'react'
import AdminComponent from './components/admin/AdminComponent'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BasicConfiguration from './components/admin/BasicConfiguration'
import UploadChaptersSyllabus from './components/admin/UploadChaptersSyllabus'
import ContentConfiguration from './components/admin/ContentConfiguration'
import ContentUpload from './components/admin/ContentUpload'
import AssessmentConfiguration from './components/admin/AssessmentConfiguration'
import HomePage from './components/admin/HomePage'
import LandingPage from './components/admin/LandingPage'
import AdminLogin from './components/adminlogin/AdminLogin'
import UploadTopicSyllabus from './components/admin/UploadTopicSyllabus'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<AdminLogin />} />
          <Route path='/' element={<AdminComponent />}>
            <Route index element={<HomePage />} />
            <Route path='/homepage' element={<HomePage />} />
            <Route path='/landingpage' element={<LandingPage />} />
            <Route path='/basic-configuration' element={<BasicConfiguration />} />
            <Route path='/upload-syllabus' element={<UploadChaptersSyllabus />} />
            <Route path='/upload-topic-syllabus' element={<UploadTopicSyllabus />} />
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
