'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Users, Mail, CheckCircle } from 'lucide-react'
import { Link } from "react-router-dom";
import posthog from 'posthog-js'

export default function DataCollection() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    posthog.capture('Waitlist Submission', { email, role })
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setEmail('')
    setRole('')
  }

  useEffect(() => {
    posthog.capture('Data Collection Page');
  }
  , []);

  return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">Join the Ascendia Waitlist</h1>
          <p className="text-blue-700 mb-6 text-center">
            Be the first to know when Ascendia launches. Leave your email and let us know if you're interested in being a mentor or mentee.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label>I'm interested in being a:</Label>
              <RadioGroup value={role} onValueChange={setRole} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mentor" id="mentor" />
                  <Label htmlFor="mentor">Mentor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mentee" id="mentee" />
                  <Label htmlFor="mentee">Mentee</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both">Both</Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
            </Button>
          </form>
        </div>
      </div>
  )
}