import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPageComponent from "./components/landing-page";
import MentorSearchComponent from "./components/mentor-search"
import MentorProfileComponent from "./components/mentor-profile"
import LoginComponent from "./components/login"
import RegisterComponent from "./components/register"
import AccountSettingsComponent from "./components/account-settings"
import PurchasedSessionsComponent from "./components/purchased-sessions"
import MentorClientManagementComponent from "./components/mentor-client-management"
import HowItWorks from "./components/how-it-works"
import Contact from "./components/contact"
import AboutUs from "./components/about-us"
import TermsOfService from "./components/terms-of-service"
import PrivacyPolicy from "./components/privacy-policy"
import Layout from "./layout";
import DataCollection from "./components/data-collection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPageComponent />} />
          <Route path="mentor-search" element={<MentorSearchComponent />} />
          <Route path="login" element={<LoginComponent />} />
          <Route path="register" element={<RegisterComponent />} />
          <Route path="account-settings" element={<AccountSettingsComponent />} />
          <Route path="purchased-sessions" element={<PurchasedSessionsComponent />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="mentor/:mentorId" element={<MentorProfileComponent />} />
          <Route path="mentor-client-management" element={<MentorClientManagementComponent />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="enroll" element={<DataCollection />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
