'use client'

import { Button } from "@/components/ui/button"
import { Users } from 'lucide-react'
import posthog from "posthog-js";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  useEffect(() => {
    posthog.capture('Privacy Policy Page');
  }
  , []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 text-center">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Introduction</h2>
          <p>Ascendia ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>
          
          <h2>2. Information We Collect</h2>
          <p>We collect information that you provide directly to us, such as:</p>
          <ul>
            <li>Personal information (e.g., name, email address, phone number)</li>
            <li>Profile information (e.g., professional experience, skills, interests)</li>
            <li>Communication data (e.g., messages sent through our platform)</li>
            <li>Payment information (processed by our third-party payment processors)</li>
          </ul>
          
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Match mentors and mentees</li>
            <li>Process transactions and send related information</li>
            <li>Send administrative messages, updates, and promotional materials</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze trends, usage, and activities</li>
          </ul>
          
          <h2>4. Sharing of Information</h2>
          <p>We may share your information in the following situations:</p>
          <ul>
            <li>With mentors or mentees as part of our services</li>
            <li>With third-party service providers who perform services on our behalf</li>
            <li>To comply with legal obligations</li>
            <li>In connection with a business transaction (e.g., merger or acquisition)</li>
          </ul>
          
          <h2>5. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your information against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
          
          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>The right to access and receive a copy of your personal information</li>
            <li>The right to rectify or update your personal information</li>
            <li>The right to erase your personal information</li>
            <li>The right to restrict processing of your personal information</li>
            <li>The right to object to processing of your personal information</li>
            <li>The right to data portability</li>
          </ul>
          
          <h2>7. Cookies and Similar Technologies</h2>
          <p>We use cookies and similar tracking technologies to collect and use personal information about you. For more information about our use of these technologies, please see our Cookie Policy.</p>
          
          <h2>8. Children's Privacy</h2>
          <p>Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18.</p>
          
          <h2>9. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
          
          <h2>10. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@ascendia.com" className="text-blue-600 hover:underline">privacy@ascendia.com</a>.</p>
        </div>
      </div>
    </div>
  )
}