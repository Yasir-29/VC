"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, useInView } from "framer-motion"
import {
  Phone,
  Mail,
  MapPin,
  Award,
  PhoneIcon as WhatsappIcon,
  Facebook,
  Instagram,
  Linkedin,
  Star,
  Shield,
  Users,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import ScrollFloat from "@/components/scroll-float"

import LoadingScreen from "@/components/loading-screen"
import Image from "next/image"

// Counter component for animated numbers that resets every time it comes into view
const AnimatedCounter = ({ end, duration = 2, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, threshold: 0.3 })
  const animationRef = useRef(null)

  useEffect(() => {
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    if (isInView) {
      // Reset count to 0 when starting animation
      setCount(0)
      let startTime = null
      const startValue = 0
      const endValue = Number.parseInt(end.replace(/\D/g, "")) // Extract number from string like "400+"

      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = Math.floor(easeOutQuart * endValue)

        setCount(currentCount)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          setCount(endValue)
          animationRef.current = null
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    } else {
      // Reset to 0 when out of view
      setCount(0)
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isInView, end, duration])

  const displayValue = end.includes("+") ? `${count}+` : end.includes("%") ? `${count}%` : count.toString()

  return (
    <span ref={ref} className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F5A623]">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}

const AnimatedGradientBackground = () => (
  <motion.div
    aria-hidden
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
  >
    <motion.div
      initial={{ scale: 1, rotate: 0 }}
      animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
      transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      className="absolute left-1/2 top-1/2 w-[120vw] h-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#F5A62333] via-[#F5A62311] to-[#fff0] blur-3xl opacity-70"
    />
    <motion.div
      initial={{ scale: 1, rotate: 0 }}
      animate={{ scale: [1, 1.05, 1], rotate: [0, -8, 8, 0] }}
      transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
      className="absolute left-1/3 top-1/4 w-[80vw] h-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#F5A62322] via-[#F5A62311] to-[#fff0] blur-2xl opacity-60"
    />
  </motion.div>
)

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => setShowContent(true), 100)
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen"
      >
        {/* Logo - Responsive positioning */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20">
          <Image
            src="/images/casa-grande-logo.png"
            alt="Casa Grande PropCare Logo"
            width={150}
            height={60}
            className="h-auto w-24 sm:w-32 md:w-40 lg:w-48"
          />
        </div>

        {/* Contact Info - Responsive */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20">
          <a
            href="tel:+919345792031"
            className="text-gray-700 hover:text-[#F5A623] font-medium text-xs sm:text-sm md:text-base"
          >
            📞 <span className="hidden sm:inline">+91 9345792031</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>

        {/* Hero Section - Fully responsive */}
        <section
      id="hero"
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-2 sm:px-4 lg:px-8 relative bg-[#fafafa] overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/images/chinese-city.jpg  "
        alt="City in the clouds"
        fill
        className="object-cover object-center z-0"
        priority
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.8 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 sm:mb-8"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#F5A623] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 shadow-lg">
            <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">AS</span>
          </div>
        </motion.div>

        {/* Name */}
        {showContent && (
          <div className="mb-4 sm:mb-6">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black tracking-wide">
              ABRAHAM SAMUEL
            </div>
          </div>
        )}

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-4 sm:mb-6 flex items-center justify-center"
        >
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="w-8 sm:w-12 md:w-16 h-0.5 bg-[#F5A623]"></div>
            <span className="text-sm sm:text-base md:text-lg text-[#F5A623] font-bold tracking-widest">
              PROPRIETOR
            </span>
            <div className="w-8 sm:w-12 md:w-16 h-0.5 bg-[#F5A623]"></div>
          </div>
        </motion.div>

        {/* Company */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-black tracking-wide mb-4 sm:mb-6"
        >
          Casa Grande PropCare
        </motion.p>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-8 sm:mb-12 relative px-2"
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#F5A623] font-light italic relative z-10 ">
            Facilities Managed. Peace Delivered.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <Button
            onClick={() => scrollToSection("contact")}
            className="bg-[#F5A623] hover:bg-[#E6951F] text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-full shadow-lg border-0 w-full sm:w-auto min-h-[44px]"
          >
            📞 Call Now
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-[#F5A623] text-[#F5A623] hover:bg-[#FEF7E6] px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-full bg-transparent w-full sm:w-auto min-h-[44px]"
          >
            <a href="mailto:abrahamsamuel562004@gmail.com?subject=Quote%20Request%20from%20Portfolio">
              📋 Get Quote
            </a>
          </Button>
        </motion.div>
      </div>
    </section>

        {/* About Section - Responsive */}
        <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <ScrollFloat
            containerClassName="mb-4 sm:mb-6"
            textClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
            animationDuration={1}
            stagger={0.04}
          >
            About Casa Grande PropCare
          </ScrollFloat>
          <ScrollFloat
            containerClassName="mb-6 sm:mb-8"
            textClassName="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#F5A623] font-semibold"
            animationDuration={1.2}
            stagger={0.03}
          >
            Leading Facility Management Excellence
          </ScrollFloat>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#F5A623] mx-auto mb-6 sm:mb-8"></div>
        </motion.div>

        {/* Image + Card Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1"
          >
            <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200 group">
              <img
                src="/images/casa.webp"
                alt="Casa Grande Facility"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2"
          >
            <Card className="bg-white shadow-lg border border-gray-200">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="mb-4 sm:mb-6">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F5A623]">
                    Trusted Excellence
                  </span>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                  Casa Grande PropCare stands as a premier facility management company, delivering comprehensive
                  solutions that ensure optimal building performance and occupant satisfaction.
                </p>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  We are recognized among the top facility management companies in India, offering innovative and
                  sustainable solutions tailored to meet diverse client requirements across various sectors.
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  Our commitment to excellence and customer satisfaction has established us as a trusted partner for
                  integrated facility management services.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Stats with Icons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 sm:mb-16"
        >
          {/* Sites */}
          <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <MapPin className="w-8 h-8 text-[#F5A623]" />
            <div>
              <AnimatedCounter end="500+" duration={2.5} />
              <p className="text-sm sm:text-base text-gray-600">Facilities Managed</p>
            </div>
          </div>

          {/* Employees */}
          <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <Users className="w-8 h-8 text-[#F5A623]" />
            <div>
              <AnimatedCounter end="1000+" duration={2} />
              <p className="text-sm sm:text-base text-gray-600">Clients</p>
            </div>
          </div>

          {/* Recognition */}
          <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <Award className="w-8 h-8 text-[#F5A623]" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Certified Company</h2>
              <p className="text-sm sm:text-base text-gray-600">Great Place To Work</p>
            </div>
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <ScrollFloat
              containerClassName="mb-4 sm:mb-6"
              textClassName="text-xl sm:text-2xl md:text-3xl font-bold text-[#F5A623]"
              animationDuration={1}
              stagger={0.04}
            >
              Our Mission
            </ScrollFloat>
            <p className="text-base sm:text-lg lg:text-xl text-gray-500-bold italic">
              "To provide comprehensive, innovative, and sustainable facility management solutions that enhance
              operational efficiency and create value for our clients."
            </p>
          </div>
        </motion.div>
      </div>
    </section>


        {/* Services Section - Responsive */}
        <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-12 sm:mb-16"
    >
      <ScrollFloat
        containerClassName="mb-4 sm:mb-6"
        textClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
        animationDuration={1}
        stagger={0.04}
      >
        Our Services
      </ScrollFloat>
      <ScrollFloat
        containerClassName="mb-6 sm:mb-8"
        textClassName="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#F5A623] font-semibold"
        animationDuration={1.2}
        stagger={0.03}
      >
        Comprehensive Facility Management Solutions
      </ScrollFloat>
      <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#F5A623] mx-auto mb-6 sm:mb-8"></div>
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
        We offer integrated facility management services designed to optimize your building's performance and
        enhance occupant experience.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
      {[
        {
          title: "HVAC Management",
          description: "Complete heating, ventilation, and air conditioning system management and maintenance",
          image: "/images/Hvac.jpg",
          features: ["System Installation", "Preventive Maintenance", "Energy Optimization", "24/7 Monitoring"],
        },
        {
          title: "Electrical Services",
          description: "Comprehensive electrical system management and maintenance solutions",
          image: "/images/Electricity.jpg",
          features: ["Power Management", "Lighting Solutions", "Emergency Systems", "Energy Audits"],
        },
        {
          title: "Plumbing & Water Management",
          description: "Complete water system management and plumbing maintenance services",
          image: "/images/Plumber.jpg",
          features: ["Water Supply Systems", "Drainage Management", "Leak Detection", "Water Quality Testing"],
        },
        {
          title: "Building Maintenance",
          description: "Comprehensive building upkeep and maintenance services",
          image: "/images/Maintenance.jpg",
          features: ["Structural Maintenance", "Painting & Repairs", "Flooring Services", "Facade Cleaning"],
        },
        {
          title: "Security Services",
          description: "Complete security solutions for your facility",
          image: "/images/Security.jpg",
          features: ["Access Control", "CCTV Monitoring", "Security Personnel", "Emergency Response"],
        },
        {
          title: "Housekeeping Services",
          description: "Professional cleaning and housekeeping solutions",
          image: "/images/Housekeeper.jpg",
          features: ["Daily Cleaning", "Deep Cleaning", "Waste Management", "Sanitization"],
        },
      ].map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="group h-full"
        >
          <div className="h-full bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 rounded-xl flex flex-col p-6 service-card group">
            <div className="mb-5 flex justify-center">
              <div className="overflow-hidden rounded-lg w-32 h-32 md:w-36 md:h-36 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F5A623] transition-colors">
              {service.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 flex-grow">
              {service.description}
            </p>
            <ul className="text-xs sm:text-sm text-gray-500 space-y-1 mb-4 text-left">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-[#F5A623] mr-2 mt-1 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <button className="w-full border border-[#F5A623] text-[#F5A623] hover:bg-[#FEF7E6] bg-transparent px-4 py-2 rounded-md text-sm sm:text-base transition">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>



        {/* Why Choose Us - Responsive */}
        <section id="why-choose-us" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <ScrollFloat
                containerClassName="mb-4 sm:mb-6"
                textClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
                animationDuration={1}
                stagger={0.04}
              >
                Why Choose PropCare?
              </ScrollFloat>
              <ScrollFloat
                containerClassName="mb-6 sm:mb-8"
                textClassName="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#F5A623] font-semibold"
                animationDuration={1.2}
                stagger={0.03}
              >
                Your Trusted Facility Management Partner
              </ScrollFloat>
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#F5A623] mx-auto mb-6 sm:mb-8"></div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  title: "Experienced Team",
                  description: "Skilled professionals with years of facility management expertise",
                  icon: <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
                },
                {
                  title: "24/7 Support",
                  description: "Round-the-clock monitoring and emergency response services",
                  icon: <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
                },
                {
                  title: "Cost Effective",
                  description: "Optimized solutions that reduce operational costs and improve efficiency",
                  icon: <Award className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
                },
                {
                  title: "Technology Driven",
                  description: "Advanced systems and IoT integration for smart facility management",
                  icon: <Settings className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 h-full">
                    <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center h-full min-h-[200px] sm:min-h-[220px]">
                      <div className="text-[#F5A623] mb-3 sm:mb-4">{item.icon}</div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 text-center">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - Responsive */}
        <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <ScrollFloat
                containerClassName="mb-4 sm:mb-6"
                textClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
                animationDuration={1}
                stagger={0.04}
              >
                Get In Touch
              </ScrollFloat>
              <ScrollFloat
                containerClassName="mb-6 sm:mb-8"
                textClassName="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#F5A623] font-semibold"
                animationDuration={1.2}
                stagger={0.03}
              >
                Ready to Optimize Your Facility?
              </ScrollFloat>
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#F5A623] mx-auto mb-6 sm:mb-8"></div>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Contact us today to discuss your facility management needs and discover how we can help optimize your
                operations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                  <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-[#F5A623] flex-shrink-0" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Phone</h3>
                    <p className="text-sm sm:text-base text-gray-600">+91 9345792031</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                  <WhatsappIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#F5A623] flex-shrink-0" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">WhatsApp</h3>
                    <p className="text-sm sm:text-base text-gray-600">+91 9345792031</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-[#F5A623] flex-shrink-0" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Email</h3>
                    <p className="text-sm sm:text-base text-gray-600 break-all">abrahamsamuel562004@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-[#F5A623] flex-shrink-0" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Office</h3>
                    <p className="text-sm sm:text-base text-gray-600">Chennai, Tamil Nadu, India</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white shadow-lg border border-gray-200 h-full">
                  <CardContent className="p-0 h-full">
                    <div className="w-full h-full min-h-[300px] sm:min-h-[400px] rounded-lg overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8663719707846!2d80.27080731482226!3d13.044262990788849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267661f0b8b87%3A0x4f74ddbcc0fd9c8b!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1642678901234!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0, minHeight: "300px" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Office Location"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonial Quote Section - Responsive */}
        <section id="testimonial-quote" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative px-4 sm:px-8"
            >
              {/* Quote Text */}
              <div className="relative z-10 py-8 sm:py-12">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 italic font-medium leading-relaxed max-w-3xl mx-auto">
                  " Facilities Managed. Peace Delivered. "
                </p>
              </div>
            </motion.div>

            {/* Stars */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center items-center mt-8 sm:mt-16 space-x-1 sm:space-x-2"
            >
              {[...Array(5)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 fill-[#F5A623] text-[#F5A623]" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Floating Contact Buttons - Responsive */}
        <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 flex flex-col gap-2 sm:gap-3 z-50">
          <a
            href="https://wa.me/919345792031"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14"
            aria-label="Chat on WhatsApp"
          >
            <WhatsappIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href="mailto:abrahamsamuel562004@gmail.com"
            className="bg-[#E6951F] hover:bg-[#D1851C] text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14"
            aria-label="Send an email"
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </motion.div>

    

      {/* Footer Content */}
      <footer className="relative bg-white text-gray-800 z-10 overflow-hidden">
        {/* SVG Background Illustration */}
        <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none select-none">
          <img src="/images/footerGraphic.svg" alt="Facilities Illustration" className="w-full" />
        </div>

        {/* Top Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 lg:pb-60 grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 text-center lg:text-left items-start">
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col items-center lg:items-start">
            <img src="/images/casa-grande-logo.png" alt="Casa Grande PropCare" className="w-32 sm:w-40 mb-4 mx-auto lg:mx-0" />
            <p className="text-sm mb-4">Facilities Managed. Peace Delivered.</p>
            <p className="text-sm text-gray-600">
              Leading facility management company providing comprehensive solutions for optimal building performance and occupant satisfaction.
            </p>
          </div>

          {/* Column 2: Services (No icons) */}
          <div>
            <h4 className="font-semibold mb-2">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>HVAC Management</li>
              <li>Electrical Services</li>
              <li>Plumbing & Water Management</li>
              <li>Building Maintenance</li>
              <li>Security Services</li>
              <li>Housekeeping Services</li>
            </ul>
          </div>

          {/* Column 3: Contact (No icons) */}
          <div>
            <h4 className="font-semibold mb-2">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>+91 9345792031</li>
              <li>abrahamsamuel562004@gmail.com</li>
              <li>Chennai, Tamil Nadu, India</li>
            </ul>
          </div>

          {/* Column 4: Social Media (Icons shown) */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex gap-4 mt-2 justify-center lg:justify-start">
              <Facebook className="w-5 h-5 text-gray-600" />
              <Linkedin className="w-5 h-5 text-gray-600" />
              <Instagram className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>

      </footer>

<style jsx global>{`
  .shimmer-text {
    position: relative;
    overflow: hidden;
  }
  .shimmer-text::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 200%; height: 100%;
    background: linear-gradient(90deg, transparent, #fff7e6 40%, transparent 60%);
    animation: shimmer 2.5s infinite;
    opacity: 0.7;
    pointer-events: none;
  }
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  .service-card {
    position: relative;
    overflow: hidden;
    background: #fff;
    z-index: 1;
    border-radius: 2.5rem; /* More curved, pill-shaped */
    box-shadow: 0 6px 32px 0 rgba(245, 166, 35, 0.08), 0 1.5px 6px 0 rgba(0,0,0,0.04);
    transition: box-shadow 0.3s;
  }
  .service-card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    background: linear-gradient(120deg, #f5a62322 0%, #fff7e6 100%);
    opacity: 0.7;
    transition: opacity 0.4s, filter 0.4s;
    filter: blur(0px) brightness(1.05);
    pointer-events: none;
    border-radius: 2.5rem;
  }
  .service-card:hover::before {
    opacity: 1;
    filter: blur(2px) brightness(1.1);
    background: linear-gradient(120deg, #f5a62355 0%, #fff7e6 100%);
    animation: card-bg-move 2.5s linear infinite alternate;
  }
  @keyframes card-bg-move {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
  .service-card > * {
    position: relative;
    z-index: 1;
  }
`}</style>

    </>
  )
}
