'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, DollarSign, Globe, Mail, MapPin, Phone, Star, Video } from 'lucide-react'
import posthog from 'posthog-js'
import { useParams, useNavigate } from 'react-router-dom'


export default function MentorProfileComponent() {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [newSession, setNewSession] = useState(null);

  useEffect(() => {
    posthog.capture('Mentor Profile Page');
    if (mentorId) {
      axios.get(`/api/v1/mentor/${mentorId}`)
        .then((response) => {
          setMentor(response.data);
        })
        .catch((error) => {
          console.error("Error fetching mentor data:", error);
        });
    }
  }, [mentorId]);

  const handleBookSession = async () => {
    try {
      const response = await axios.post('/api/v1/sessions/book', {
        mentor_id: mentorId,
        topic: mentor.title,
        date: new Date().toISOString(),
        duration: 60
      });

      setNewSession(response.data);
      setShowSuccessModal(true);
      setBookingError("");
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setBookingError(error.response?.data?.message || "An error occurred while booking the session");
      }
    }
  };

  if (!mentor) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <main className="flex-1 py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-200">
                    <img
                      src={`https://api.dicebear.com/6.x/personas/svg?seed=${mentor.name}`}
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h1 className="text-2xl font-bold">{mentor.name}</h1>
                  <p className="text-gray-600 mt-1">{mentor.title}</p>

                  <div className="flex items-center mt-2">
                    <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm">{mentor.location}</span>
                  </div>

                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="font-semibold">{mentor.rating}</span>
                    <span className="text-gray-600 ml-1">({mentor.reviewCount} reviews)</span>
                  </div>

                  <div className="flex items-center mt-2">
                    <span className="font-semibold">{mentor.hourly_rate} RON/hr</span>
                  </div>

                  {/* Expertise */}
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill.expertise}
                      </span>
                    ))}
                  </div>

                  {/* Languages */}
                  <div className="mt-4 flex items-center">
                    <Globe className="h-4 w-4 text-gray-500 mr-2" />
                    <div className="flex flex-wrap gap-2">
                      {mentor.languages.map((language, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                        >
                          {language.language}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Booking Button */}
                  <button
                    onClick={handleBookSession}
                    className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    Book a Session
                  </button>

                  {/* Error Message */}
                  {bookingError && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                      {bookingError}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-lg shadow-md mt-6">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{mentor.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{mentor.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Video className="h-4 w-4 text-gray-500 mr-2" />
                    <span>Zoom, Google Meet, Skype</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-lg shadow-md">
              {/* Tabs Header */}
              <div className="border-b">
                <div className="flex">
                  {['about', 'experience', 'mentorship', 'achievements'].map((tab) => (
                    <button
                      key={tab}
                      className={`px-4 py-2 text-sm font-medium ${
                        activeTab === tab
                          ? 'border-b-2 border-blue-500 text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tabs Content */}
              <div className="p-6">
                {activeTab === 'about' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">About Me</h2>
                    <p className="text-gray-700">{mentor.about}</p>

                    <div className="mt-6">
                      <h2 className="text-xl font-bold mb-4">Education</h2>
                      <ul className="space-y-4">
                        {mentor.education.map((edu, index) => (
                          <li key={index} className="flex justify-between">
                            <div>
                              <p className="font-semibold">{edu.degree}</p>
                              <p className="text-gray-600">{edu.institution}</p>
                            </div>
                            <span>{edu.year}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'experience' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Professional Experience</h2>
                    <ul className="space-y-6">
                      {mentor.experience.map((exp, index) => (
                        <li key={index}>
                          <h3 className="font-semibold">{exp.title}</h3>
                          <p className="text-gray-600">{exp.company} | {exp.period}</p>
                          <p className="mt-2">{exp.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'mentorship' && (
                  <div>
                    <div>
                      <h2 className="text-xl font-bold mb-2">Mentorship Areas</h2>
                      <p className="text-gray-600 mb-4">I specialize in guiding mentees in the following areas:</p>
                      <ul className="space-y-2">
                        {mentor.mentorship_areas.map((area, index) => (
                          <li key={index} className="flex items-start">
                            <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                            <span>{area.mentorship_area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'achievements' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Key Achievements</h2>
                    <ul className="space-y-2">
                      {mentor.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <Star className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
                          <span>{achievement.achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-lg font-bold mb-2">Session Booked Successfully!</div>
            <p className="text-gray-600 mb-4">
              Your session has been scheduled with {mentor.name}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm font-medium">Date:</p>
                <p className="text-sm text-gray-500">
                  {new Date(newSession?.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Duration:</p>
                <p className="text-sm text-gray-500">{newSession?.duration} minutes</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
                onClick={() => navigate('/purchased-sessions')}
              >
                View My Sessions
              </button>
              <button
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors"
                onClick={() => setShowSuccessModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
