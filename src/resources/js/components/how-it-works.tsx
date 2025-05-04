'use client'

import { Button } from "@/components/ui/button"
import { Users, Search, Calendar, Star, MessageCircle, Award } from 'lucide-react'
import posthog from "posthog-js";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  useEffect(() => {
    posthog.capture('How It Works Page');
  }
  , []);
  
  return (
    <div className="container mx-auto py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 text-center">How Ascendia Works</h1>
        
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">Your Journey to Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              icon={<Users className="h-12 w-12 text-blue-600" />}
              title="Create Your Profile"
              description="Sign up and tell us about your goals, interests, and the skills you want to develop. This helps us match you with the most suitable mentors."
              step={1}
            />
            <StepCard
              icon={<Search className="h-12 w-12 text-blue-600" />}
              title="Find Your Mentor"
              description="Use our advanced search tools to find mentors who match your criteria. Filter by expertise, industry, availability, and more."
              step={2}
            />
            <StepCard
              icon={<Calendar className="h-12 w-12 text-blue-600" />}
              title="Book Your Sessions"
              description="Once you've found a mentor, book your first session at a time that works for both of you. Our flexible scheduling system makes it easy."
              step={3}
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">The Mentorship Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageCircle className="h-12 w-12 text-green-600" />}
              title="Personalized Guidance"
              description="Engage in one-on-one video sessions with your mentor. Get tailored advice, feedback, and insights to help you achieve your goals."
            />
            <FeatureCard
              icon={<Star className="h-12 w-12 text-green-600" />}
              title="Track Your Progress"
              description="Set milestones, track your progress, and celebrate your achievements. Our platform helps you stay motivated and focused."
            />
            <FeatureCard
              icon={<Award className="h-12 w-12 text-green-600" />}
              title="Grow Your Skills"
              description="Access resources, complete assignments, and receive certifications to showcase your newly acquired skills and knowledge."
            />
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg mb-16">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">Why Choose Ascendia?</h2>
          <ul className="list-disc list-inside space-y-4 text-blue-700">
            <li>Access to a diverse network of verified, experienced mentors</li>
            <li>Flexible scheduling to fit your busy lifestyle</li>
            <li>Personalized matching algorithm to find the perfect mentor</li>
            <li>Secure and user-friendly platform for seamless communication</li>
            <li>Affordable pricing options to suit various budgets</li>
            <li>Continuous support from our dedicated customer service team</li>
          </ul>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-700 mb-8 max-w-2xl mx-auto">
            Join Ascendia today and take the first step towards achieving your personal and professional goals.
          </p>
          <Button asChild className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-3">
            <Link href="/register">Get Started Now</Link>
          </Button>
        </section>
        </div>
    
  )
}

function StepCard({ icon, title, description, step }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-lg font-bold mb-4">
        {step}
      </div>
      <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
      <p className="text-blue-700">{description}</p>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
      <p className="text-blue-700">{description}</p>
    </div>
  )
}