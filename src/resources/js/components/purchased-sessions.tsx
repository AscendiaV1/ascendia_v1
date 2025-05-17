'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import posthog from 'posthog-js';

export default function PurchasedSessionsComponent() {
  const [activeSessions, setActiveSessions] = useState([]);
  const [concludedSessions, setConcludedSessions] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        setIsLoading(true); // Start loading

        const activeRes = await axios.get('/api/v1/active-sessions');
        setActiveSessions(activeRes.data);

        const concludedRes = await axios.get('/api/v1/concluded-sessions');
        setConcludedSessions(concludedRes.data);

        const mentorsRes = await axios.get('/api/v1/my-mentors');
        setMentors(mentorsRes.data);

      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false); // Stop loading after the data is fetched
      }
    };

    posthog.capture('Purchased Sessions Page');
    fetchData();
  }, []);

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Mentoring Sessions</h1>
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Sessions</TabsTrigger>
          <TabsTrigger value="concluded">Concluded Sessions</TabsTrigger>
          <TabsTrigger value="mentors">My Mentors</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="grid gap-4 md:grid-cols-2">
            {activeSessions.map((session) => (
              <SessionCard key={session.id} session={session} isActive={true} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="concluded">
          <div className="grid gap-4 md:grid-cols-2">
            {concludedSessions.map((session) => (
              <SessionCard key={session.id} session={session} isActive={false} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="mentors">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SessionCard({ session, isActive }) {
  const navigate = useNavigate();

  const handleJoinSession = () => {
    navigate(`/session/${session.id}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{session.topic}</CardTitle>
        <CardDescription>with {session.mentor.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {new Date(session.date).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {session.duration} minutes
          </div>
        </div>
        <Badge className="mt-2" variant={session.status === "Upcoming" ? "outline" : session.status === "In Progress" ? "default" : "secondary"}>
          {session.status}
        </Badge>
      </CardContent>
      <CardFooter>
        {isActive ? (
          <Button className="w-full" onClick={handleJoinSession}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Join Session
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled={true}>View Notes</Button>
        )}
      </CardFooter>
    </Card>
  )
}

function MentorCard({ mentor }) {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/mentor/${mentor.id}`);
  };

  return (
    <Card>
      <CardHeader>
        <Avatar className="h-12 w-12 mb-2">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${mentor.name}`} alt={mentor.name} />
          <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <CardTitle>{mentor.name}</CardTitle>
        <CardDescription>{mentor.expertise}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Sessions completed: {mentor.sessionsCompleted}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleViewProfile}>View Profile</Button>
      </CardFooter>
    </Card>
  )
}