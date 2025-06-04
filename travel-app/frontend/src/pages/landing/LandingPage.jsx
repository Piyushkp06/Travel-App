

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Stars, Sphere, Float } from "@react-three/drei"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import {
  Menu,
  X,
  Play,
  Compass,
  Map,
  Plane,
  Hotel,
  Utensils,
  Camera,
  Check,
  Zap,
  Crown,
  Star,
  MapPin,
  Phone,
  Mail,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Globe,
} from "lucide-react"
import { Link } from "react-router-dom"
import * as THREE from "three"

// Enhanced 3D Globe Component
function AnimatedGlobe() {
  const globeRef = useRef(null)
  const atmosphereRef = useRef(null)
  const earthTexture = new THREE.TextureLoader().load("/placeholder.svg?height=1024&width=2048")

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.005
      globeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.003
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      {/* Main Globe */}
      <Sphere ref={globeRef} args={[3.2, 64, 64]}>
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.2}
          metalness={0.1}
          emissive={new THREE.Color(0x112244)}
          emissiveIntensity={0.15}
        />
      </Sphere>
      {/* Glowing Atmosphere */}
      <Sphere ref={atmosphereRef} args={[3.6, 32, 32]}>
        <meshBasicMaterial color={new THREE.Color(0xff6b35)} transparent opacity={0.15} side={THREE.BackSide} />
      </Sphere>
      {/* Outer Glow */}
      <Sphere args={[4.0, 32, 32]}>
        <meshBasicMaterial color={new THREE.Color(0xffa726)} transparent opacity={0.08} side={THREE.BackSide} />
      </Sphere>
    </Float>
  )
}

const VIDEO_URL =
  "https://videos.pexels.com/video-files/3401407/3401407-hd_1920_1080_25fps.mp4"; // Sample travel video from Pexels

const LandingPage = () => {
  // Header state
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Hero stats animation
  const [stats, setStats] = useState({ destinations: 0, customers: 0, rating: 0 })

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000
      const steps = 60
      const stepTime = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps

        setStats({
          destinations: Math.floor(progress * 150),
          customers: Math.floor(progress * 10000),
          rating: Math.min(progress * 4.9, 4.9),
        })

        if (step >= steps) clearInterval(timer)
      }, stepTime)
    }

    animateStats()
  }, [])

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, destination: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("🎉 Amazing! We'll get back to you within 2 hours with your personalized travel plan!")
    setFormData({
      name: "",
      email: "",
      phone: "",
      destination: "",
      message: "",
    })
  }

  // Services data
  const services = [
    {
      icon: <Plane className="h-10 w-10" />,
      title: "✈️ Flight Booking",
      description: "Score the best deals on flights worldwide with our AI-powered booking system!",
      color: "from-orange-500 to-red-500",
      badge: "Most Popular",
    },
    {
      icon: <Hotel className="h-10 w-10" />,
      title: "🏨 Luxury Stays",
      description: "From boutique hotels to 5-star resorts - we'll find your perfect home away from home.",
      color: "from-pink-500 to-rose-500",
      badge: "Premium",
    },
    {
      icon: <Map className="h-10 w-10" />,
      title: "🗺️ Custom Adventures",
      description: "Personalized itineraries crafted by local experts who know all the secret spots!",
      color: "from-emerald-500 to-teal-500",
      badge: "Exclusive",
    },
    {
      icon: <Compass className="h-10 w-10" />,
      title: "🧭 Expert Guides",
      description: "Professional local guides who'll show you hidden gems and share amazing stories.",
      color: "from-amber-500 to-orange-500",
      badge: "Local",
    },
    {
      icon: <Utensils className="h-10 w-10" />,
      title: "🍽️ Foodie Experiences",
      description: "Taste authentic cuisines and discover culinary secrets from around the world.",
      color: "from-yellow-500 to-amber-500",
      badge: "Delicious",
    },
    {
      icon: <Camera className="h-10 w-10" />,
      title: "📸 Photo Adventures",
      description: "Capture Instagram-worthy moments with our photography tours and workshops.",
      color: "from-violet-500 to-purple-500",
      badge: "Trending",
    },
  ]

  // Pricing data
  const pricingPlans = [
    {
      name: "Explorer",
      price: "$299",
      originalPrice: "$399",
      description: "Perfect for budget-conscious adventurers who want quality experiences!",
      icon: <Star className="h-6 w-6" />,
      features: [
        "✈️ Flight booking assistance",
        "🏨 Handpicked budget accommodations",
        "📞 24/7 customer support",
        "📱 Digital travel documents",
        "🗺️ Basic itinerary planning",
      ],
      popular: false,
      color: "from-orange-500 to-red-500",
      savings: "Save $100!",
    },
    {
      name: "Adventurer",
      price: "$599",
      originalPrice: "$799",
      description: "Our most popular choice - perfect balance of value and luxury!",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "🌟 Everything in Explorer",
        "🏖️ Premium hotel selections",
        "🎯 Guided tour packages",
        "🚗 Airport transfers included",
        "👨‍🏫 Local guide services",
        "📸 Photo session included",
      ],
      popular: true,
      color: "from-pink-500 to-rose-500",
      savings: "Save $200!",
    },
    {
      name: "Luxury Elite",
      price: "$1,299",
      originalPrice: "$1,699",
      description: "The ultimate VIP experience - because you deserve the absolute best!",
      icon: <Crown className="h-6 w-6" />,
      features: [
        "👑 Everything in Adventurer",
        "🏰 5-star luxury accommodations",
        "🚁 Private transportation",
        "🥂 Exclusive VIP experiences",
        "🤵 Personal concierge service",
        "⚡ Priority everything",
        "🎁 Surprise luxury perks",
      ],
      popular: false,
      color: "from-amber-500 to-yellow-500",
      savings: "Save $400!",
    },
  ]
  

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Adventure Traveler",
      content:
        "Wanderlust planned the most amazing trip to Bali for me. Every detail was taken care of, and I didn't have to worry about a thing. The local experiences they arranged were truly unforgettable!",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Family Vacation",
      content:
        "Our family trip to Europe was flawlessly organized by Wanderlust. The accommodations were perfect for our needs, and the itinerary kept both adults and kids engaged. Will definitely book with them again!",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Honeymoon Trip",
      content:
        "We couldn't have asked for a more perfect honeymoon. Wanderlust understood exactly what we wanted and delivered a romantic, luxurious experience that exceeded our expectations.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-rose-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-orange-600" />
            <Link
              to="/"
              className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent"
            >
              Wanderlust
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm font-medium hover:text-orange-600 transition-colors">
              Services
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-orange-600 transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-orange-600 transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-orange-600 transition-colors">
              Contact
            </a>
            <Button
              size="sm"
              className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white"
            >
              Book Now
            </Button>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="container md:hidden py-4 flex flex-col gap-4 bg-white border-t">
            <a
              href="#services"
              className="text-sm font-medium hover:text-orange-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium hover:text-orange-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium hover:text-orange-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-sm font-medium hover:text-orange-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white"
            >
              Book Now
            </Button>
          </div>
        )}
      </header>
      

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-orange-100 via-rose-100 to-pink-200">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200/40 via-rose-200/40 to-pink-200/40 animate-pulse" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">🌅</div>
        <div className="absolute top-40 right-20 text-4xl opacity-20 animate-pulse">✨</div>
        <div className="absolute bottom-32 left-20 text-5xl opacity-20 animate-bounce">🏝️</div>

        {/* Enhanced 3D Scene */}
        <div className="absolute inset-0 z-10">
          <Canvas>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 8]} />
              <ambientLight intensity={1.2} />
              <spotLight position={[15, 15, 15]} angle={0.2} penumbra={1} intensity={1.5} />
              <pointLight position={[-15, -15, -15]} intensity={0.8} color="#ff6b35" />
              <directionalLight position={[10, 10, 5]} intensity={1} color="#ffa726" />
              <Stars radius={300} depth={80} count={1200} factor={6} saturation={0} fade speed={0.8} />
              <AnimatedGlobe />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
              <Environment preset="sunset" />
            </Suspense>
          </Canvas>
        </div>

        {/* Hero Content */}
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center">
          <div className="max-w-5xl space-y-8">
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-6 py-3 text-sm animate-bounce shadow-lg">
              ✈️ #1 Travel Agency Worldwide
            </Badge>

            <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                Adventure
              </span>
              <br />
              <span className="text-gray-800">Awaits You!</span>
            </h1>

            <p className="mx-auto max-w-[800px] text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
              🌍 Discover breathtaking destinations • 🏖️ Create magical memories • ✨ Experience luxury like never before
            </p>

            {/* Enhanced Stats */}
            <div className="flex flex-wrap justify-center gap-8 py-6">
              <div className="text-center bg-white/30 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-white/20">
                <div className="text-4xl font-bold text-orange-600">{stats.destinations}+</div>
                <div className="text-gray-700 text-sm font-medium">Destinations</div>
              </div>
              <div className="text-center bg-white/30 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-white/20">
                <div className="text-4xl font-bold text-pink-600">{stats.customers.toLocaleString()}+</div>
                <div className="text-gray-700 text-sm font-medium">Happy Travelers</div>
              </div>
              <div className="text-center bg-white/30 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-white/20">
                <div className="text-4xl font-bold text-rose-600">{stats.rating.toFixed(1)} ⭐</div>
                <div className="text-gray-700 text-sm font-medium">Average Rating</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white font-bold text-lg px-10 py-5 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                🚀 Start Your Adventure
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white font-bold text-lg px-10 py-5 rounded-full backdrop-blur-sm bg-white/40 transform hover:scale-105 transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Our Story
              </Button>
            </div>

            {/* Floating action hint */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="text-gray-600 text-sm font-medium">Scroll to explore</div>
              <div className="w-6 h-10 border-2 border-gray-500 rounded-full mx-auto mt-2">
                <div className="w-1 h-3 bg-gray-600 rounded-full mx-auto mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50 relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute top-10 left-10 text-6xl opacity-10">✈️</div>
        <div className="absolute top-32 right-20 text-4xl opacity-10">🌍</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-10">🏖️</div>

        <div className="container relative">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 text-sm font-semibold">
              🌟 Our Amazing Services
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                Everything You Need
              </span>
              <br />
              <span className="text-gray-800">For Epic Adventures!</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From planning to execution, we handle every detail so you can focus on making memories! 🎉
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm overflow-hidden relative"
              >
                {service.badge && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-bold z-10">
                    {service.badge}
                  </Badge>
                )}
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                  >
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <div className="mt-4 text-sm font-semibold text-orange-600 group-hover:text-pink-600 transition-colors cursor-pointer">
                    Learn More →
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fixed Pricing Section */}
      <section
        id="pricing"
        className="py-24 bg-gradient-to-br from-gray-900 via-orange-900 to-red-900 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ff6b35&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>

        <div className="container relative">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black px-4 py-2 text-sm font-bold">
              💰 Limited Time Offer - Up to 40% OFF!
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-white">
              Choose Your
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Adventure Level! 🚀
              </span>
            </h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Every package includes our happiness guarantee - if you're not amazed, we'll make it right! ✨
            </p>
          </div>

          {/* Fixed pricing grid with proper spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="relative">
                {/* Popular badge positioned outside the card */}
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold px-6 py-2 text-sm animate-pulse shadow-lg">
                      🔥 MOST POPULAR 🔥
                    </Badge>
                  </div>
                )}

                <Card
                  className={`relative overflow-hidden h-full ${
                    plan.popular ? "ring-4 ring-amber-400 shadow-2xl shadow-amber-400/25 mt-6" : "shadow-xl mt-6"
                  } hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/95 backdrop-blur-sm`}
                >
                  {/* Savings badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold">
                      {plan.savings}
                    </Badge>
                  </div>

                  <CardHeader className="text-center pb-4 pt-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}
                    >
                      {plan.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl text-gray-400 line-through">{plan.originalPrice}</span>
                        <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                      </div>
                      <span className="text-gray-600 font-medium">/person</span>
                    </div>
                    <CardDescription className="mt-3 text-base font-medium">{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow px-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-6 px-6 pb-6">
                    <Button
                      className={`w-full font-bold text-lg py-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        plan.popular
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black shadow-lg"
                          : "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white"
                      }`}
                    >
                      {plan.popular ? "🚀 Start Adventure Now!" : `Choose ${plan.name}`}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-orange-200 text-lg">
              🎁 All packages include free cancellation up to 48 hours before departure!
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2">
              ⭐ Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">What Our Travelers Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from some of our satisfied adventurers!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border border-orange-100">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full overflow-hidden h-10 w-10 flex-shrink-0">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-orange-600 via-pink-600 to-rose-600 relative overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-rose-500/20 animate-pulse"></div>

        <div className="container relative">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-bold backdrop-blur-sm">
              💬 Let's Plan Your Dream Trip!
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-white">
              Ready for an
              <br />
              <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">
                Epic Adventure? 🌟
              </span>
            </h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Our travel wizards are standing by to create your perfect getaway! ✨
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-xl w-fit mb-4">
                    <Phone className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">📞 Call Us Now!</h3>
                  <p className="text-orange-100">+1 (555) 123-4567</p>
                  <p className="text-orange-200 text-sm mt-1">Available 24/7 for emergencies</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="bg-gradient-to-br from-pink-400 to-rose-500 p-3 rounded-xl w-fit mb-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">✉️ Email Us</h3>
                  <p className="text-orange-100">hello@wanderlust.com</p>
                  <p className="text-orange-200 text-sm mt-1">Response within 2 hours</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-3 rounded-xl w-fit mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">🏢 Visit Our Office</h3>
                <p className="text-orange-100 mb-2">123 Adventure Boulevard, Dream City, DC 12345</p>
                <p className="text-orange-200 text-sm">Mon-Fri: 9AM-8PM | Sat-Sun: 10AM-6PM</p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-300">2hrs</div>
                  <div className="text-orange-200 text-sm">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-300">24/7</div>
                  <div className="text-orange-200 text-sm">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-300">100%</div>
                  <div className="text-orange-200 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">🚀 Start Your Journey</h3>
                <p className="text-orange-100">
                  Fill out the form and we'll create a personalized travel plan just for you!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-medium">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Adventure"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@adventure.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination" className="text-white font-medium">
                      Dream Destination
                    </Label>
                    <Select onValueChange={handleSelectChange} value={formData.destination}>
                      <SelectTrigger className="bg-white/20 border-white/30 text-white">
                        <SelectValue placeholder="Where to?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="europe">🇪🇺 Europe Adventure</SelectItem>
                        <SelectItem value="asia">🇯🇵 Asia Explorer</SelectItem>
                        <SelectItem value="africa">🦁 African Safari</SelectItem>
                        <SelectItem value="north-america">🗽 North America</SelectItem>
                        <SelectItem value="south-america">🏔️ South America</SelectItem>
                        <SelectItem value="australia">🦘 Australia & Oceania</SelectItem>
                        <SelectItem value="surprise">🎲 Surprise Me!</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white font-medium">
                    Tell Us About Your Dream Trip *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="I want to explore ancient temples, taste amazing food, and create unforgettable memories..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black font-bold text-lg py-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <Send className="h-5 w-5 mr-2" />🚀 Launch My Adventure!
                </Button>
              </form>

              <p className="text-orange-200 text-sm text-center mt-4">
                🔒 Your information is secure and will never be shared
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-8 w-8 text-orange-400" />
                <h3 className="text-white text-lg font-bold">Wanderlust</h3>
              </div>
              <p className="mb-4">Creating unforgettable travel experiences since 2010. Your journey is our passion.</p>
              <div className="flex space-x-4">
                <Link to="#" className="hover:text-orange-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link to="#" className="hover:text-orange-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link to="#" className="hover:text-orange-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link to="#" className="hover:text-orange-400 transition-colors">
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
                <Link to="#" className="hover:text-orange-400 transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="hover:text-orange-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="#services" className="hover:text-orange-400 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="#pricing" className="hover:text-orange-400 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="#testimonials" className="hover:text-orange-400 transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link to="#contact" className="hover:text-orange-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Popular Destinations</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="hover:text-orange-400 transition-colors">
                    Bali, Indonesia
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-orange-400 transition-colors">
                    Paris, France
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-orange-400 transition-colors">
                    Santorini, Greece
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-orange-400 transition-colors">
                    Tokyo, Japan
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-orange-400 transition-colors">
                    New York, USA
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Newsletter</h3>
              <p className="mb-4">Subscribe to our newsletter for travel tips and exclusive offers.</p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 rounded-md text-gray-900 flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Wanderlust Travel Agency. All rights reserved.</p>
            <div className="mt-2 flex justify-center space-x-4">
              <Link to="#" className="hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="hover:text-orange-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage;
