'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MessageSquare, Phone, Search, Star, User, Video } from 'lucide-react'

export default function MentorClientManagementComponent() {
  const [activeSessions, setActiveSessions] = useState([])
  const [pastSessions, setPastSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch active clients
    axios.get('/api/v1/clients/active')
      .then(response => {
        setActiveSessions(response.data)
      })
      .catch(error => {
        console.error("Error fetching active clients data:", error)
      })

    // Fetch past clients
    axios.get('/api/v1/clients/past')
      .then(response => {
        setPastSessions(response.data)
      })
      .catch(error => {
        console.error("Error fetching past clients data:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Client Management</h1>
      {/* <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Input placeholder="Search clients..." className="w-64" />
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        <Button>
          <User className="h-4 w-4 mr-2" />
          Add New Client
        </Button>
      </div> */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Clients</TabsTrigger>
          <TabsTrigger value="past">Past Clients</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="grid gap-4 md:grid-cols-2">
            {loading ? (
              <div>Loading...</div>
            ) : (
              activeSessions.map((session) => (
                <ClientCard key={session.id} session={session} isActive={true} />
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="grid gap-4 md:grid-cols-2">
            {loading ? (
              <div>Loading...</div>
            ) : (
              pastSessions.map((client) => (
                <ClientCard key={session.id} session={session} isActive={false} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ClientCard({ session, isActive }) {
  const navigate = useNavigate();
  const handleJoinSession = () => {
    navigate(`/session/${session.id}`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${session.user.name}`} alt={session.user.name} />
          <AvatarFallback>{session.avatar}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{session.user.name}</CardTitle>
          <CardDescription>{session.topic}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {isActive ? "Session:" : "Session:"}
          </div>
          <span>{new Date(session.date).toLocaleDateString()}</span>
        </div>
        {isActive ? (
          <Badge variant={session.status === "Upcoming" ? "default" : "destructive"}>
            {session.status}
          </Badge>
        ) : (
          <Badge variant="secondary">{session.status}</Badge>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleJoinSession}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
        {/* {isActive ? (
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="schedule">Schedule Session</SelectItem>
              <SelectItem value="notes">View Notes</SelectItem>
              <SelectItem value="progress">Update Progress</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Button variant="outline">View Summary</Button>
        )} */}
      </CardFooter>
    </Card>
  )
}
