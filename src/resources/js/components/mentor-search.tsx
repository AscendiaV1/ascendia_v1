'use client'

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Search, Clock, Briefcase } from "lucide-react";
import posthog from "posthog-js";

export default function MentorSearchComponent() {
  const [searchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State pentru loader
  const [searchFilters, setSearchFilters] = useState({
    searchQuery: searchParams.get("searchQuery") || "",
    expertise: "",
    availableNow: false,
  });
  const [bookingError, setBookingError] = useState(""); // State for booking errors
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to show success modal
  const [newSession, setNewSession] = useState(null); // To hold the booked session details

  const fetchMentors = async () => {
    setLoading(true); // Activează loader-ul înainte de request
    try {
      const response = await axios.get("/api/v1/mentors/search", {
        params: { ...searchFilters, priceRange },
      });
      setMentors(response.data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    } finally {
      setLoading(false); // Dezactivează loader-ul după request
    }
  };

  useEffect(() => {
    posthog.capture("Mentor Search Page");
    fetchMentors();
  }, [searchFilters, priceRange]);

  const handleFilterChange = (key, value) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleBookSession = async (mentorId) => {
    try {
      const response = await axios.post("/api/v1/sessions/book", {
        mentor_id: mentorId,
        topic: "Initial Session",
        date: new Date().toISOString(),
        duration: 60,
      });

      setNewSession(response.data);
      setShowSuccessModal(true);
      setBookingError(""); // Reset any previous error messages
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        setBookingError(
          error.response?.data?.message || "An error occurred while booking the session"
        );
      }
    }
  };

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Find Your Perfect Mentor</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtrele */}
          <aside className="w-full md:w-1/4 space-y-6">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search mentors..."
                  className="pl-8"
                  value={searchFilters.searchQuery}
                  onChange={(e) =>
                    handleFilterChange("searchQuery", e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <Label>Expertise</Label>
              <Select onValueChange={(value) => handleFilterChange("expertise", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select expertise" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="0">Any</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price Range (per hour)</Label>
              <Slider
                min={0}
                max={200}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mt-2"
              />
              <div className="flex justify-between mt-2">
                <span>RON{priceRange[0]}</span>
                <span>RON{priceRange[1]}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="available-now"
                checked={searchFilters.availableNow}
                onCheckedChange={(value) => handleFilterChange("availableNow", value)}
              />
              <Label htmlFor="available-now">Available Now</Label>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                console.log("Filters applied:", searchFilters, priceRange);
              }}
            >
              Apply Filters
            </Button>
          </aside>

          {/* Lista de mentori */}
          <div className="w-full md:w-3/4 space-y-6">
            {loading ? (
              // Loader afișat doar în zona listei de mentori
              <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
              </div>
            ) : mentors.length > 0 ? (
              mentors.map((mentor, index) => (
                <MentorCard
                  key={index}
                  {...mentor}
                  onBookSession={handleBookSession}
                />
              ))
            ) : (
              <div className="text-center text-muted-foreground">
                No mentors found. Try adjusting your filters.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-lg font-bold mb-2">Session Booked Successfully!</div>
            <p className="text-gray-600 mb-4">
              Your session has been scheduled with {newSession?.mentor_name}
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
                onClick={() => navigate("/purchased-sessions")}
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
  );
}

function MentorCard({
  id,
  name,
  title,
  rating,
  ratingCount,
  hourlyRate,
  expertise,
  yearsOfExperience,
  availableNow,
  onBookSession, // Add the new prop
}) {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/mentor/${id}`);
  };

  return (
    <div className="border rounded-lg p-6 flex flex-col md:flex-row gap-4">
      <div className="md:w-1/6 flex flex-row justify-center items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
            alt={name}
          />
          <AvatarFallback>
            {name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="md:w-5/6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-muted-foreground">{title}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-semibold">{rating}</span>
              <span className="ml-1 text-muted-foreground">({ratingCount})</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="font-semibold">{hourlyRate} RON /hr</span>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {expertise.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="ml-1 text-sm text-muted-foreground">
              {yearsOfExperience} years of experience
            </span>
          </div>
          {availableNow && (
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="ml-1 text-sm text-muted-foreground">
                Available now
              </span>
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-4">
          <Button className="bg-blue-500 text-white" onClick={handleViewProfile}>
            View Profile
          </Button>
          <Button
            className="bg-green-500 text-white"
            onClick={() => onBookSession(id)} // Call the booking function
          >
            Book a Session
          </Button>
        </div>
      </div>
    </div>
  );
}
