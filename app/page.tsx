"use client";
import React from "react";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Image,
  Divider,
  Link,
} from "@nextui-org/react";
import {
  TruckIcon,
  ClockIcon,
  MapPinIcon,
  ChartBarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  CogIcon,
  ArrowRightIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import NextLink from "next/link";
import {
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <TruckIcon className="w-8 h-8 text-primary" />,
      title: "Fleet Management",
      description:
        "Comprehensive vehicle tracking and maintenance scheduling for your entire fleet.",
    },
    {
      icon: <ClockIcon className="w-8 h-8 text-success" />,
      title: "Hours of Service",
      description:
        "Automated HOS tracking and compliance monitoring to keep drivers within legal limits.",
    },
    {
      icon: <MapPinIcon className="w-8 h-8 text-warning" />,
      title: "Route Optimization",
      description:
        "Smart routing with real-time traffic updates to maximize efficiency and reduce costs.",
    },
    {
      icon: <ChartBarIcon className="w-8 h-8 text-secondary" />,
      title: "Analytics Dashboard",
      description:
        "Detailed reporting and analytics to track performance and identify improvement areas.",
    },
    {
      icon: <UserGroupIcon className="w-8 h-8 text-danger" />,
      title: "Driver Management",
      description:
        "Complete driver profiles with performance tracking and certification management.",
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-primary" />,
      title: "Compliance Monitoring",
      description:
        "Automated compliance checking for DOT regulations and safety requirements.",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Miles Tracked Daily", color: "primary" },
    { value: "500+", label: "Active Drivers", color: "success" },
    { value: "99.9%", label: "System Uptime", color: "warning" },
    { value: "24/7", label: "Support Available", color: "secondary" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fleet Manager",
      company: "TransLogistics Inc.",
      content:
        "This platform has revolutionized how we manage our fleet. The real-time tracking and automated compliance monitoring have saved us countless hours.",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      name: "Mike Rodriguez",
      role: "Owner-Operator",
      company: "Rodriguez Trucking",
      content:
        "As a small business owner, this system helps me stay compliant and efficient. The mobile app is incredibly user-friendly.",
      avatar: "https://i.pravatar.cc/150?u=mike",
    },
    {
      name: "Jennifer Chen",
      role: "Safety Director",
      company: "Mountain Express",
      content:
        "The safety features and compliance monitoring have significantly improved our safety ratings. Highly recommended!",
      avatar: "https://i.pravatar.cc/150?u=jennifer",
    },
  ];

  return (
    <div className="min-h-screen">
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1492168732976-2676c584c675?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="container mx-auto px-6 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <Chip variant="flat" color="primary" size="lg" className="mb-6">
              🚛 Professional Fleet Management
            </Chip>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Drive Your Business
              <span className="text-primary"> Forward</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Streamline your trucking operations with comprehensive fleet
              management, automated compliance tracking, and real-time
              analytics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                as={NextLink}
                href="/trips"
                size="lg"
                color="primary"
                className="text-lg px-8 py-6"
                endContent={<ArrowRightIcon className="w-5 h-5" />}
              >
                Get Started
              </Button>

              <Button
                size="lg"
                variant="bordered"
                className="text-white border-white hover:bg-white hover:text-black text-lg px-8 py-6"
                startContent={<PlayIcon className="w-5 h-5" />}
              >
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Chip variant="flat" color="primary" size="lg" className="mb-4">
              Features
            </Chip>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools necessary to
              manage your trucking business efficiently and profitably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="h-full hover:shadow-lg transition-shadow"
              >
                <CardBody className="p-8">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              as={NextLink}
              href="/features"
              size="lg"
              color="primary"
              variant="ghost"
              endContent={<ArrowRightIcon className="w-5 h-5" />}
            >
              View All Features
            </Button>
          </div>
        </div>
      </section>

      <section
        className="py-20 bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.9), rgba(59, 130, 246, 0.9)), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="container mx-auto px-6 text-white">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of trucking professionals who trust our platform to
              keep their operations running smoothly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardBody className="text-center p-8">
                <CalendarDaysIcon className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">2M+</h3>
                <p className="text-blue-100">Trips Completed</p>
              </CardBody>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardBody className="text-center p-8">
                <DocumentTextIcon className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">100%</h3>
                <p className="text-blue-100">DOT Compliant</p>
              </CardBody>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardBody className="text-center p-8">
                <CogIcon className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">24/7</h3>
                <p className="text-blue-100">System Monitoring</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Chip variant="flat" color="success" size="lg" className="mb-4">
              Testimonials
            </Chip>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what real customers have
              to say about our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardBody className="p-8">
                  <div className="flex flex-col h-full">
                    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Fleet?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
            Join thousands of trucking professionals who have streamlined their
            operations and increased profitability with our platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={NextLink}
              href="/signup"
              size="lg"
              color="secondary"
              className="text-lg px-8 py-6"
            >
              Start Free Trial
            </Button>
            <Button
              as={NextLink}
              href="/contact"
              size="lg"
              variant="bordered"
              className="text-white border-white hover:bg-white hover:text-primary text-lg px-8 py-6"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <TruckIcon className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold">FleetTracker</span>
              </div>
              <p className="text-gray-400 mb-6">
                Professional trucking management platform designed to streamline
                your operations and ensure compliance.
              </p>

              <div className="flex space-x-4">
                <Link
                  href="https://github.com/HilqiaKenda"
                  isExternal
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <GithubIcon className="w-6 h-6" />
                </Link>
                <Link
                  href="https://twitter.com"
                  isExternal
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <TwitterIcon className="w-6 h-6" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  isExternal
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <LinkedinIcon className="w-6 h-6" />
                </Link>
                <Link
                  href="https://instagram.com"
                  isExternal
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <InstagramIcon className="w-6 h-6" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    as={NextLink}
                    href="/features"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    as={NextLink}
                    href="/pricing"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    as={NextLink}
                    href="/integrations"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    as={NextLink}
                    href="/api"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    API Documentation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    as={NextLink}
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    as={NextLink}
                    href="/careers"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    as={NextLink}
                    href="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    as={NextLink}
                    href="/press"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    as={NextLink}
                    href="/help"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    as={NextLink}
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    as={NextLink}
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    as={NextLink}
                    href="/terms"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Divider className="mb-8" />

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 FleetTracker. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Built with</span>
              <Chip size="sm" variant="flat" color="primary">
                NextJS
              </Chip>
              <span className="text-gray-400 text-sm">and</span>
              <Chip size="sm" variant="flat" color="secondary">
                heroUI
              </Chip>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
