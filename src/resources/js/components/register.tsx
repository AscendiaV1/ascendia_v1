import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Importă axios pentru a trimite datele
import posthog from "posthog-js";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    userType: [],
    termsAccepted: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    posthog.capture('Register Page');
  }, []);

  // Functie pentru actualizarea valorilor din formular
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Functie pentru actualizarea checkbox-urilor personalizate
  const handleCheckboxChange = (value, checked) => {
    setFormData((prevData) => {
      const newUserType = checked
        ? [...prevData.userType, value]
        : prevData.userType.filter((type) => type !== value);
      return {
        ...prevData,
        userType: newUserType,
      };
    });
  };

  // Functie pentru actualizarea checkbox-ului de termeni și condiții
  const handleTermsChange = (checked) => {
    setFormData((prevData) => ({
      ...prevData,
      termsAccepted: checked,
    }));
  };

  // Functie pentru procesarea submitului formularului
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validează datele înainte de submit
    if (formData.password !== formData.password_confirmation) {
      alert("Passwords do not match");
      return;
    }

    if (!formData.termsAccepted) {
      alert("You must accept the terms and conditions");
      return;
    }

    // Trimite datele către server folosind axios
    try {
      const response = await axios.post('/register', formData);
      console.log('User registered successfully:', response.data);
      // Poți redirecționa utilizatorul după înregistrare sau să afișezi un mesaj de succes
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:text-primary/90">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <div className="mt-1">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email address</Label>
                  <div className="mt-1">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="mt-1">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password-confirm">Confirm password</Label>
                  <div className="mt-1">
                    <Input
                      id="password-confirm"
                      name="password_confirmation"
                      type="password"
                      value={formData.password_confirmation}
                      onChange={handleInputChange}
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>I am a:</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="mentee"
                        name="user-type"
                        value="mentee"
                        checked={formData.userType.includes("mentee")}
                        onCheckedChange={(checked) => handleCheckboxChange("mentee", checked)}
                      />
                      <Label htmlFor="mentee" className="ml-2">Mentee (looking for guidance)</Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="mentor"
                        name="user-type"
                        value="mentor"
                        checked={formData.userType.includes("mentor")}
                        onCheckedChange={(checked) => handleCheckboxChange("mentor", checked)}
                      />
                      <Label htmlFor="mentor" className="ml-2">Mentor (offering expertise)</Label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="terms"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={handleTermsChange}
                    required
                  />
                  <Label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I agree to the{" "}
                    <Link href="/terms" className="font-medium text-primary hover:text-primary/90">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="font-medium text-primary hover:text-primary/90">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div>
                  <Button type="submit" className="w-full">
                    Create account
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
          alt="Mentoring background"
        />
      </div>
    </div>
  );
}
