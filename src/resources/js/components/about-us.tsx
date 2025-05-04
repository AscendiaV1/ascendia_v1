'use client'

import { Button } from "@/components/ui/button"
import { Users, Heart, Globe, Lightbulb, Award, Linkedin } from 'lucide-react'
import { Link } from "react-router-dom";
import { Img } from 'react-image';
import React, { useEffect } from "react";
import posthog from "posthog-js";

export default function AboutUs() {
  useEffect(() => {
    posthog.capture('About Us Page');
  }
  , []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 text-center">About Ascendia</h1>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">Our Mission</h2>
          <p className="text-xl text-blue-700 mb-8">
            At Ascendia, we believe that everyone has the potential to achieve greatness. Our mission is to connect aspiring individuals with experienced mentors, fostering personal and professional growth through meaningful relationships and knowledge sharing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Heart className="h-12 w-12 text-red-500" />}
              title="Empowerment"
              description="We empower individuals to take control of their learning journey and reach their full potential."
            />
            <ValueCard
              icon={<Globe className="h-12 w-12 text-green-500" />}
              title="Inclusivity"
              description="We strive to create a diverse and inclusive community where everyone feels welcome and valued."
            />
            <ValueCard
              icon={<Lightbulb className="h-12 w-12 text-yellow-500" />}
              title="Innovation"
              description="We continuously innovate to provide the best mentorship experience for our users."
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">Our Story</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <p className="text-blue-700 mb-4">
                Ascendia was founded in 2022 by a group of passionate entrepreneurs who recognized the power of mentorship in their own lives. Having experienced the transformative impact of guidance from experienced professionals, they set out to create a platform that would make mentorship accessible to everyone.
              </p>
              <p className="text-blue-700 mb-4">
                What started as a small community of mentors and mentees has now grown into a global network of thousands of individuals committed to personal and professional development. Our platform has facilitated countless success stories, from career transitions to startup launches, and continues to inspire growth every day.
              </p>
            </div>
            <div className="md:w-1/2">
              <Img
                src="/placeholder.svg?height=150&width=150"
                alt={name}
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeamMemberCard
              name="Sarah Johnson"
              role="Co-Founder & CEO"
              image="/placeholder.svg?height=150&width=150"
              linkedin="https://www.linkedin.com/in/sarahjohnson"
            />
            <TeamMemberCard
              name="Michael Chen"
              role="Co-Founder & CTO"
              image="/placeholder.svg?height=150&width=150"
              linkedin="https://www.linkedin.com/in/michaelchen"
            />
            <TeamMemberCard
              name="Emily Rodriguez"
              role="Head of Mentor Relations"
              image="/placeholder.svg?height=150&width=150"
              linkedin="https://www.linkedin.com/in/emilyrodriguez"
            />
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg mb-16">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">Our Achievements</h2>
          <ul className="list-disc list-inside space-y-4 text-blue-700">
            <li>Over 10,000 successful mentorship matches</li>
            <li>Featured in Forbes as one of the "Top 20 EdTech Startups to Watch"</li>
            <li>Winner of the 2023 Global Mentorship Innovation Award</li>
            <li>Partnerships with 50+ leading companies for corporate mentorship programs</li>
            <li>5-star rating on Trustpilot with over 1,000 reviews</li>
          </ul>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">Join Our Community</h2>
          <p className="text-xl text-blue-700 mb-8 max-w-2xl mx-auto">
            Whether you're looking to grow your skills or share your expertise, there's a place for you in the Ascendia community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-3">
              <Link to="/mentor-search">Find a Mentor</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3">
              <Link to="/register">Become a Mentor</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

function ValueCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
      <p className="text-blue-700">{description}</p>
    </div>
  )
}

function TeamMemberCard({ name, role, image, linkedin }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
      <Img
        src="/placeholder.svg?height=150&width=150"
        alt={name}
        width={150}
        height={150}
        className="rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold text-blue-900 mb-1">{name}</h3>
      <p className="text-blue-700 mb-3">{role}</p>
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
        <Linkedin className="h-6 w-6" />
        <span className="sr-only">LinkedIn profile of {name}</span>
      </a>
    </div>
  )
}