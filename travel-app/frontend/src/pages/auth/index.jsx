import React, { useState } from 'react'
import { Loader2, Plane, Palmtree } from 'lucide-react'

// Login Form Component
function LoginForm({ onSuccess, onSignupClick }) {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email or phone number is required"
    }
    
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      // Your authentication logic here
      console.log("Login data:", formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Call success callback
      onSuccess()
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="space-y-6 rounded-lg border border-white/20 p-6 shadow-xl bg-white/80 backdrop-blur-sm">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome back
        </h2>
        <p className="text-sm text-gray-600">Enter your credentials to access your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email or Phone Number
          </label>
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="email@example.com or +1234567890"
            className="w-full px-3 py-2 bg-white/70 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
          {errors.identifier && (
            <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-3 py-2 bg-white/70 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="rememberMe" className="text-sm font-medium text-gray-700">
              Remember me
            </label>
          </div>

          <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </div>
          ) : (
            "Log in"
          )}
        </button>
      </form>

      <div className="text-center text-sm">
        Don't have an account?{" "}
        <button 
          type="button" 
          onClick={onSignupClick} 
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign up
        </button>
      </div>
    </div>
  )
}

// Signup Form Component
function SignupForm({ onSuccess, onLoginClick }) {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    // Phone validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number (e.g. +1234567890)"
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter"
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter"
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number"
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    
    // Terms validation
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      // Your authentication logic here
      console.log("Signup data:", formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Call success callback
      onSuccess()
    } catch (error) {
      console.error("Signup error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="space-y-6 rounded-lg border border-white/20 p-6 shadow-xl bg-white/80 backdrop-blur-sm">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Create an account
        </h2>
        <p className="text-sm text-gray-600">Enter your information to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="w-full px-3 py-2 bg-white/70 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+1234567890"
            className="w-full px-3 py-2 bg-white/70 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-3 py-2 bg-white/70 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-3 py-2 bg-white/70 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <div>
            <label htmlFor="termsAccepted" className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                terms of service
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                privacy policy
              </a>
            </label>
            {errors.termsAccepted && (
              <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </div>
          ) : (
            "Sign up"
          )}
        </button>
      </form>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <button 
          type="button" 
          onClick={onLoginClick} 
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Log in
        </button>
      </div>
    </div>
  )
}

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login")

  const handleLoginSuccess = () => {
    // Handle successful login
    console.log("Login successful!")
    // Redirect to dashboard or home page
  }

  const handleSignupSuccess = () => {
    // Handle successful signup
    console.log("Signup successful!")
    // Redirect to dashboard or home page
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Auth forms */}
      <div className="flex w-full flex-col justify-center space-y-6 px-4 md:w-1/2 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <Plane className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Yatra
            </h1>
          </div>
          <p className="text-gray-600">Your companion for unforgettable journeys</p>
        </div>

        <div className="mx-auto w-full max-w-md">
          {/* Tab Navigation */}
          <div className="flex bg-white/80 backdrop-blur-sm rounded-lg p-1 mb-6">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "login"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "signup"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "login" ? (
            <LoginForm 
              onSuccess={handleLoginSuccess} 
              onSignupClick={() => setActiveTab("signup")} 
            />
          ) : (
            <SignupForm 
              onSuccess={handleSignupSuccess} 
              onLoginClick={() => setActiveTab("login")} 
            />
          )}
        </div>
      </div>

      {/* Right side - Travel image */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 overflow-hidden">
        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Beautiful mountain landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-indigo-500/20 to-purple-500/30" />
          <div className="absolute bottom-8 left-8 max-w-md rounded-lg bg-white/90 p-6 backdrop-blur-sm border border-white/20 shadow-xl">
            <div className="flex items-center gap-2">
              <Palmtree className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Discover the world with us
              </h3>
            </div>
            <p className="mt-2 text-sm text-gray-700">
              Join thousands of travelers who trust Yatra for their journey planning, exclusive deals, and unforgettable
              experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth