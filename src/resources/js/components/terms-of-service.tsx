'use client'

import { Button } from "@/components/ui/button"
import { Users } from 'lucide-react'
import posthog from "posthog-js";
import React, { use, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TermsOfService() {
  useEffect(() => {
    posthog.capture('Terms of Service Page');
  }
  , []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 text-center">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using the Ascendia platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          
          <h2>2. Description of Service</h2>
          <p>Ascendia provides a platform connecting mentors and mentees for professional development purposes. Our services include, but are not limited to, mentor matching, scheduling, and communication tools.</p>
          
          <h2>3. User Accounts</h2>
          <p>You must create an account to use certain features of our platform. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
          
          <h2>4. User Conduct</h2>
          <p>You agree to use Ascendia for lawful purposes only. Prohibited activities include, but are not limited to:</p>
          <ul>
            <li>Violating any applicable laws or regulations</li>
            <li>Impersonating any person or entity</li>
            <li>Harassing, threatening, or intimidating other users</li>
            <li>Posting false, misleading, or inappropriate content</li>
          </ul>
          
          <h2>5. Intellectual Property</h2>
          <p>All content and materials available on Ascendia, including but not limited to text, graphics, logos, and software, are the property of Ascendia or its licensors and are protected by copyright and other intellectual property laws.</p>
          
          <h2>6. Payment and Refunds</h2>
          <p>Fees for mentorship services are set by individual mentors. Ascendia charges a platform fee for facilitating these services. Refunds are subject to our Refund Policy, which can be found on our website.</p>
          
          <h2>7. Limitation of Liability</h2>
          <p>Ascendia is not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>
          
          <h2>8. Modifications to Terms</h2>
          <p>We reserve the right to modify these Terms of Service at any time. We will notify users of any significant changes via email or through our platform.</p>
          
          <h2>9. Termination</h2>
          <p>We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users or us.</p>
          
          <h2>10. Governing Law</h2>
          <p>These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
          
          <h2>11. Contact Us</h2>
          <p>If you have any questions about these Terms of Service, please contact us at <a href="mailto:legal@ascendia.com" className="text-blue-600 hover:underline">legal@ascendia.com</a>.</p>
        </div>
      </div>
    </div>
  )
}