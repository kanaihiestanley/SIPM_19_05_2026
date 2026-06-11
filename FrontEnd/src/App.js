import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Components/Login_Context/AuthContext';
import HomePage from './Components/HomePage';
import HomeFlyer from './Components/Flyer Pages/HomeFlyer';
import OurServices from './Components/OurServices';
import FooterContent from './Components/FooterContent';
import Testimonies from './Components/Testimonies';
import OurContact from './Components/OurContact';
import AboutPastor from './Components/AboutPastor';
import AboutSIPM from './Components/AboutSIPM';
import Login from './Components/Login_Context/Login';
import Register from './Components/Login_Context/Register';
import ProtectedRoute from './Components/Login_Context/ProtectedRoute';
import Unauthorized from './Components/Login_Context/Unauthorized';
import HomeBiblePost from './Components/BiblePost Pages/HomeBiblePost';
import HomeGallery from './Components/Gallery Pages/HomeGallery';
import AdminUsers from './Components/Login_Context/AdminUsers';
// import YTStreamPost from './Components/YTLiveStream Folder/YTStreamPost';
// import HomeBiblePostNew from './Components/BiblePost Pages/HomeBiblePostNew';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes - everyone can access */}
            <Route path="/" element={<HomePage />} />
            <Route path="/ourservices" element={<OurServices />} />
            <Route path="/testimonies" element={<Testimonies />} />
            <Route path="/ourcontact" element={<OurContact />} />
            <Route path="/aboutpastor" element={<AboutPastor />} />          
            <Route path="/aboutsipm" element={<AboutSIPM />} />   
            {/* <Route path="/ytstreampost" element={<YTStreamPost />} /> */}

            {/* Auth routes */}
            {/* <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />     */}


            {/* Auth routes - Register is now protected */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={
              <ProtectedRoute requiredCategory={1}>
                <Register />
              </ProtectedRoute>
            } />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/admin/users" element={
              <ProtectedRoute requiredCategory={1}>
                <AdminUsers />
              </ProtectedRoute>
            } />

            
            {/* Protected routes - require authentication */}
            <Route path="/gallery" element={
              <ProtectedRoute>
                <HomeGallery />
              </ProtectedRoute>
            } />
            
            <Route path="/flyers" element={
              <ProtectedRoute>
                <HomeFlyer />
              </ProtectedRoute>
            } />
            
            <Route path="/bible-posts" element={
              <ProtectedRoute>
                <HomeBiblePost />
              </ProtectedRoute>
            } />
            
            {/* <Route path="/homebiblepost" element={
              <ProtectedRoute>
                <HomeBiblePostNew />
              </ProtectedRoute>
            } /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <FooterContent />
    </div>
  );
}

export default App;