
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Index: React.FC = () => {
  useEffect(() => {
    // Smooth scroll effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroContent = document.querySelector('.hero-content');
      const featuresSection = document.querySelector('.features-section');
      
      if (heroContent) {
        (heroContent as HTMLElement).style.transform = `translateY(${scrollY * 0.2}px)`;
        (heroContent as HTMLElement).style.opacity = `${1 - scrollY * 0.002}`;
      }
      
      if (featuresSection && scrollY > 300) {
        featuresSection.classList.add('animate-fade-in');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: 'Team Collaboration',
      description: 'Work together seamlessly with your team members in a shared workspace.',
    },
    {
      title: 'Resource Management',
      description: 'Organize and access all your resources in one centralized location.',
    },
    {
      title: 'Smart Scheduling',
      description: 'Plan your activities efficiently with our intuitive calendar system.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-400/5 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
          <div className="hero-content max-w-3xl">
            <div className="mb-2">
              <span className="text-xs font-medium uppercase tracking-wider text-primary px-2 py-1 bg-primary/10 rounded-full">
                Welcome
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              A beautiful space for your ideas to grow
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover a seamless experience designed with precision and elegance. Collaborate, organize, and create with intuitive tools that adapt to your workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/group"
                className="px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition-colors duration-300 text-center"
              >
                Get Started
              </Link>
              <Link
                to="/resources"
                className="px-6 py-3 rounded-md bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors duration-300 text-center"
              >
                Explore Resources
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      {/* Features Section */}
      <div className="py-24 features-section opacity-0">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Designed for Excellence</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every detail has been carefully considered to provide you with the most intuitive and efficient experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="glass p-8 rounded-xl transform transition-all duration-500 hover:translate-y-[-8px]"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join us today and experience the perfect balance of functionality and aesthetic excellence.
          </p>
          <Link
            to="/group"
            className="inline-block px-8 py-4 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition-colors duration-300"
          >
            Start Exploring
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
