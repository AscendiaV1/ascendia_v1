'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, Star } from "lucide-react";
import posthog from "posthog-js";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function LandingPageComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    posthog.capture("Landing Page");
  }, []);

  const handleSearch = () => {
    navigate(`/mentor-search?searchQuery=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
            Find Your Perfect Mentor
          </h1>
          <p className="text-xl text-blue-700 mb-10 max-w-2xl mx-auto">
            Connect with qualified mentors who can guide you towards your personal and professional goals.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <Input
            className="max-w-xs"
            placeholder="What skill do you want to learn?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={handleSearch}
          >
            Find a Mentor
          </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Why Choose Ascendia?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Search className="h-12 w-12 text-blue-600" />}
                title="Easy Mentor Search"
                description="Find the perfect mentor with our advanced search and compatibility filters."
              />
              <FeatureCard 
                icon={<Calendar className="h-12 w-12 text-blue-600" />}
                title="Flexible Scheduling"
                description="Book sessions that fit your schedule, with mentors available globally."
              />
              <FeatureCard 
                icon={<Star className="h-12 w-12 text-blue-600" />}
                title="Verified Experts"
                description="Connect with verified mentors, rated by the community for quality assurance."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard 
                number={1}
                title="Create Your Profile"
                description="Sign up and tell us about your goals and interests."
              />
              <StepCard 
                number={2}
                title="Find Your Mentor"
                description="Use our search tools to find the perfect mentor for you."
              />
              <StepCard 
                number={3}
                title="Start Learning"
                description="Book sessions and start your journey to success."
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-blue-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TestimonialCard 
                quote="Ascendia helped me find the perfect mentor to guide me in my career transition. I'm now in my dream job!"
                author="Sarah L."
                role="Software Engineer"
              />
              <TestimonialCard 
                quote="As a mentor, I love how easy it is to connect with mentees who are truly passionate about learning."
                author="Michael R."
                role="Marketing Executive"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-blue-700 mb-10 max-w-2xl mx-auto">
              Join Ascendia today and take the first step towards achieving your goals.
            </p>
            <Button className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-3">
              <Link to="/enroll">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg">
      {icon}
      <h3 className="text-xl font-semibold text-blue-900 mt-4 mb-2">{title}</h3>
      <p className="text-blue-700">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
      <p className="text-blue-700">{description}</p>
    </div>
  )
}

function TestimonialCard({ quote, author, role }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-blue-700 mb-4">"{quote}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-blue-200 rounded-full mr-4"></div>
        <div>
          <p className="font-semibold text-blue-900">{author}</p>
          <p className="text-blue-600">{role}</p>
        </div>
      </div>
    </div>
  )
}