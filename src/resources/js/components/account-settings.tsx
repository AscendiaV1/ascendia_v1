'use client'

import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react'

export default function AccountSettingsComponent() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isMentor, setIsMentor] = useState(false);
  const [mentorTitle, setMentorTitle] = useState('');
  const [mentorLocation, setMentorLocation] = useState('');
  const [mentorAbout, setMentorAbout] = useState('');
  const [expertise, setExpertise] = useState(['']);
  const [languages, setLanguages] = useState(['']);
  const [experience, setExperience] = useState([{ title: '', company: '', period: '', description: '' }]);
  const [education, setEducation] = useState([{ degree: '', institution: '', year: '' }]);
  const [mentorshipAreas, setMentorshipAreas] = useState(['']);
  const [achievements, setAchievements] = useState(['']);

  useEffect(() => {
    axios.get('/api/v1/user').then(res => {
      const user = res.data;
      setUserId(user.id);
      setName(user.name || '');
      setEmail(user.email || '');
      setAvatarUrl(`https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(user.name || '')}`);
      setIsMentor(user.is_mentor || false);

      if (user.mentor) {
        const m = user.mentor;
        setMentorTitle(m.title || '');
        setMentorLocation(m.location || '');
        setMentorAbout(m.about || '');
        setExpertise(m.expertise?.map(e => e.expertise) || ['']);
        setLanguages(m.languages?.map(l => l.language) || ['']);
        setExperience(m.experience || [{ title: '', company: '', period: '', description: '' }]);
        setEducation(m.education || [{ degree: '', institution: '', year: '' }]);
        setMentorshipAreas(m.mentorship_areas?.map(a => a.mentorship_area) || ['']);
        setAchievements(m.achievements?.map(a => a.achievement) || ['']);
      }
    }).finally(() => setLoading(false));
  }, []);

  const handleUserSave = async () => {
    try {
      await axios.put('/api/v1/user', { name, email });
      alert('User info saved!');
    } catch (err) {
      alert('Failed to save user data');
    }
  };

  const handleMentorSave = async () => {
    try {
      await axios.post(`/api/v1/user/update/${userId}`, {
        title: mentorTitle,
        location: mentorLocation,
        about: mentorAbout,
        expertise,
        languages,
        experience,
        education,
        mentorship_areas: mentorshipAreas,
        achievements
      });
      alert('Mentor profile saved!');
    } catch (err) {
      alert('Error saving mentor profile');
    }
  };

  const handleListChange = (list, setList, index, value, key = null) => {
    const newList = [...list];
    if (key) newList[index][key] = value;
    else newList[index] = value;
    setList(newList);
  };

  const renderListInputs = (label, list, setList, isObject = false, fields = []) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      {list.map((item, i) => (
        <div key={i} className="space-y-1">
          {isObject
            ? fields.map(field => (
              <Input
                key={field}
                placeholder={field}
                value={item[field]}
                onChange={(e) => handleListChange(list, setList, i, e.target.value, field)}
              />
            ))
            : (
              <Input
                placeholder={`${label} ${i + 1}`}
                value={item}
                onChange={(e) => handleListChange(list, setList, i, e.target.value)}
              />
            )}
        </div>
      ))}
      <Button variant="outline" onClick={() => setList([...list, isObject ? fields.reduce((a, f) => ({ ...a, [f]: '' }), {}) : ''])}>
        Adaugă {label.toLowerCase()}
      </Button>
    </div>
  );

  if (loading) return <p className="text-center py-10">Loading user data...</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" /> Profile
          </TabsTrigger>
          {isMentor && (
            <TabsTrigger value="mentor" className="flex items-center">
              <User className="mr-2 h-4 w-4" /> Mentor Details
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatarUrl} alt={name} />
                  <AvatarFallback>{name?.[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUserSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {isMentor && (
          <TabsContent value="mentor">
            <Card>
              <CardHeader>
                <CardTitle>Mentor Profile</CardTitle>
                <CardDescription>Completează informațiile tale ca mentor.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titlu profesional</Label>
                  <Input id="title" value={mentorTitle} onChange={(e) => setMentorTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Locație</Label>
                  <Input id="location" value={mentorLocation} onChange={(e) => setMentorLocation(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about">Despre tine</Label>
                  <Input id="about" value={mentorAbout} onChange={(e) => setMentorAbout(e.target.value)} />
                </div>
                {renderListInputs('Expertiză', expertise, setExpertise)}
                {renderListInputs('Limbi vorbite', languages, setLanguages)}
                {renderListInputs('Experiență profesională', experience, setExperience, true, ['title', 'company', 'period', 'description'])}
                {renderListInputs('Educație', education, setEducation, true, ['degree', 'institution', 'year'])}
                {renderListInputs('Arii de mentorat', mentorshipAreas, setMentorshipAreas)}
                {renderListInputs('Realizări', achievements, setAchievements)}
              </CardContent>
              <CardFooter>
                <Button onClick={handleMentorSave}>Salvează profilul de mentor</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
