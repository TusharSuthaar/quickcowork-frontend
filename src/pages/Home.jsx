import { Link } from 'react-router-dom';
import { Search, Building2, ChefHat, Palette, ArrowRight, Star, Users, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSpaces } from '@/hooks/useSpaces';
import SpaceCard from '@/components/SpaceCard';
import { useTheme } from '@/contexts/ThemeContext';


const Home = () => {
  const { spaces } = useSpaces();
  const { theme } = useTheme();
  const featuredSpaces = spaces.slice(0, 3);

  const categories = [
    {
      name: 'Office Spaces',
      description: 'Professional workspaces for meetings and productivity',
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      count: '150+',
      type: 'office'
    },
    {
      name: 'Commercial Kitchens',
      description: 'Fully equipped kitchens for culinary ventures',
      icon: ChefHat,
      color: 'from-green-500 to-green-600',
      count: '80+',
      type: 'kitchen'
    },
    {
      name: 'Creative Studios',
      description: 'Inspiring spaces for artists and creators',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      count: '120+',
      type: 'studio'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Search & Browse',
      description: 'Find the perfect space that matches your needs and budget'
    },
    {
      number: '02',
      title: 'Book Instantly',
      description: 'Select your preferred time slots and confirm your booking'
    },
    {
      number: '03',
      title: 'Access & Work',
      description: 'Get access details and start using your booked space'
    },
    {
      number: '04',
      title: 'Rate & Review',
      description: 'Share your experience to help other users'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Food Entrepreneur',
      content: 'QuickCoWork helped me launch my catering business without the overhead of a permanent kitchen. The booking process is seamless!',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      rating: 5
    },
    {
      name: 'Raj Patel',
      role: 'Freelance Designer',
      content: 'As a freelancer, I love having access to professional office spaces when I need them. Great value for money!',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Raj',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'Artist',
      content: 'The art studios are amazing! Natural light, all the equipment I need, and I only pay for the hours I use.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      rating: 5
    }
  ];

  const stats = [
    { label: 'Active Spaces', value: '500+', icon: Building2 },
    { label: 'Happy Users', value: '10K+', icon: Users },
    { label: 'Cities', value: '25+', icon: Search },
    { label: 'Uptime', value: '99.9%', icon: Shield }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-desktop section-elegant">
        <div className="hero-content">
          <div className="grid-hero">
            <div className="space-desktop text-center lg:text-left">
              <div className="space-y-8 lg:space-y-12">
                <Badge className="badge-large animate-float">
                  🚀 Now serving 25+ cities across India
                </Badge>
                <h1 className="heading-xl">
                  <span className="gradient-text">Rent Shared</span><br />
                  Commercial Spaces<br />
                  <span className="text-muted-foreground text-xl-desktop">by the hour</span>
                </h1>
                
                {/* QuickCoWork Logo */}
                <div className="flex items-center justify-center lg:justify-start mt-8 mb-6">
                  <div className="w-[64px] h-[64px] lg:w-[80px] lg:h-[80px] flex items-center justify-center text-foreground">
                    <img 
                      src="/QuickCoWork_Logo_Transparent.svg" 
                      alt="QuickCoWork Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <p className="text-lg-desktop text-muted-foreground leading-relaxed max-w-3xl">
                  Access professional offices, commercial kitchens, and creative studios 
                  without long-term commitments. Pay only for what you use.
                </p>
              </div>
              
              <div className="flex flex-row gap-6 lg:gap-8 justify-center lg:justify-start">
                <Link to="/browse">
                  <Button size="lg" className="btn-gradient">
                    <Search className="mr-3 h-6 w-6" />
                    Find a Space
                  </Button>
                </Link>
                <Link to="/list-space">
                  <Button size="lg" className="btn-outline-beautiful">
                    List Your Space
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-12 lg:pt-16 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center floating-card p-6 card-hover">
                    <stat.icon className={`icon-glow icon-large mx-auto mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`} />
                    <div className="font-bold text-2xl lg:text-3xl text-foreground">{stat.value}</div>
                    <div className="text-sm lg:text-base text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative order-first lg:order-last">
              <div className="floating-card-elegant p-8 text-center card-hover transition-all duration-500 hover:shadow-2xl">
                <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-2xl">
                  <Building2 className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-3 text-foreground">
                  Professional Spaces
                </h3>
                <p className="text-muted-foreground text-sm lg:text-base max-w-xs mx-auto">
                  Access premium workspaces designed for productivity and collaboration
                </p>
                <div className="flex justify-center space-x-4 mt-6">
                  <div className="flex items-center space-x-2 text-xs lg:text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Available 24/7</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs lg:text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Instant Booking</span>
                  </div>
                </div>
                
                {/* Floating Tiles Inside the Main Floating Card */}
                <div className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto">
                  {[
                    {
                      title: "Smart Booking",
                      description: "AI-powered recommendations",
                      icon: Search,
                      color: "from-blue-500 to-blue-600"
                    },
                    {
                      title: "Secure Access",
                      description: "Digital key management",
                      icon: Shield,
                      color: "from-green-500 to-green-600"
                    },
                    {
                      title: "Real-time Analytics",
                      description: "Usage insights & reports",
                      icon: Users,
                      color: "from-purple-500 to-purple-600"
                    },
                    {
                      title: "24/7 Support",
                      description: "Always here to help",
                      icon: Clock,
                      color: "from-orange-500 to-orange-600"
                    }
                  ].map((tile, index) => (
                    <div 
                      key={index} 
                      className={`floating-card-elegant p-4 card-hover h-full transition-all duration-500 ${
                        theme === 'dark' 
                          ? 'hover:shadow-2xl hover:shadow-primary/20' 
                          : 'hover:shadow-2xl hover:shadow-gray-200'
                      }`}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${tile.color} rounded-xl flex items-center justify-center mb-3 transition-all duration-500 ${
                        theme === 'dark' 
                          ? 'filter-none' 
                          : 'filter grayscale hover:filter-none'
                      }`}>
                        <tile.icon className={`w-6 h-6 transition-all duration-500 ${
                          theme === 'dark' 
                            ? 'text-white' 
                            : 'text-gray-800'
                        }`} />
                      </div>
                      <h3 className="text-sm font-bold mb-1 text-foreground">
                        {tile.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {tile.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Tiles Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container-desktop">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">
              <span className="gradient-text">Floating</span> Features
            </h2>
            <p className="text-lg-desktop text-muted-foreground max-w-2xl mx-auto">
              Discover our dynamic floating tiles that adapt to your theme preference
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Smart Booking",
                description: "AI-powered recommendations",
                icon: Search,
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Secure Access",
                description: "Digital key management",
                icon: Shield,
                color: "from-green-500 to-green-600"
              },
              {
                title: "Real-time Analytics",
                description: "Usage insights & reports",
                icon: Users,
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "24/7 Support",
                description: "Always here to help",
                icon: Clock,
                color: "from-orange-500 to-orange-600"
              }
            ].map((tile, index) => (
              <div 
                key={index} 
                className={`floating-card-elegant p-6 card-hover h-full transition-all duration-500 ${
                  theme === 'dark' 
                    ? 'hover:shadow-2xl hover:shadow-primary/20' 
                    : 'hover:shadow-2xl hover:shadow-gray-200'
                }`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${tile.color} rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
                  theme === 'dark' 
                    ? 'filter-none' 
                    : 'filter grayscale hover:filter-none'
                }`}>
                  <tile.icon className={`w-8 h-8 transition-all duration-500 ${
                    theme === 'dark' 
                      ? 'text-white' 
                      : 'text-gray-800'
                  }`} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {tile.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tile.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Background floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className={`absolute top-20 left-10 w-20 h-20 rounded-full transition-all duration-1000 ${
            theme === 'dark' 
              ? 'bg-primary/10 animate-pulse' 
              : 'bg-gray-200/50'
          }`}></div>
          <div className={`absolute top-40 right-20 w-16 h-16 rounded-full transition-all duration-1000 delay-300 ${
            theme === 'dark' 
              ? 'bg-accent/10 animate-pulse' 
              : 'bg-gray-300/50'
          }`}></div>
          <div className={`absolute bottom-20 left-1/4 w-12 h-12 rounded-full transition-all duration-1000 delay-500 ${
            theme === 'dark' 
              ? 'bg-primary/5 animate-pulse' 
              : 'bg-gray-100/50'
          }`}></div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-elegant section-padding">
        <div className="container-desktop">
          <div className="text-center margin-desktop">
            <h2 className="heading-lg mb-6 lg:mb-8">
              Find Your Perfect <span className="gradient-text">Space</span>
            </h2>
            <p className="text-lg-desktop text-muted-foreground max-w-4xl mx-auto">
              Whether you need a professional office, commercial kitchen, or creative studio, 
              we have the perfect space for your business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/browse?type=${category.type}`}
                className="group"
              >
                <div className="floating-card-elegant p-6 card-hover h-full">
                  <div className={`w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xl`}>
                    <category.icon className={`w-6 h-6 lg:w-7 lg:h-7 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`} />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg lg:text-xl font-bold group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <Badge className="badge-elegant">{category.count}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center text-primary font-semibold pt-3">
                      Browse spaces
                      <ArrowRight className={`ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-8 sm:py-12">
        <div className="container-desktop">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              How <span className="gradient-text">It Works</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Get started in just a few simple steps and access professional spaces instantly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-primary to-accent transform translate-x-2"></div>
                )}
                <div className="relative inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary to-accent rounded-full text-white font-bold text-sm sm:text-base mb-3">
                  {step.number}
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spaces Section */}
      <section className="py-8 sm:py-12 bg-muted/30">
        <div className="container-desktop">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
                <span className="gradient-text">Featured</span> Spaces
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                Discover our most popular and highly-rated spaces
              </p>
            </div>
            <Link to="/browse">
              <Button variant="outline" className="hidden sm:flex text-sm">
                View All Spaces
                <ArrowRight className={`ml-2 h-4 w-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`} />
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-row gap-4 sm:gap-6 overflow-x-auto pb-4 max-w-6xl mx-auto">
            {featuredSpaces.map((space) => (
              <div key={space.id} className="flex-shrink-0 w-80 sm:w-96">
                <SpaceCard space={space} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6 sm:hidden">
            <Link to="/browse">
              <Button variant="outline" className="text-sm">
                View All Spaces
                <ArrowRight className={`ml-2 h-4 w-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              What Our <span className="gradient-text">Users Say</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Hear from entrepreneurs, freelancers, and creators who've grown their businesses with QuickCoWork.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="floating-card p-4 sm:p-5 card-hover">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed text-xs sm:text-sm">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-xs sm:text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Ready to Find Your Perfect Space?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of entrepreneurs, freelancers, and creators who trust QuickCoWork 
            for their space needs. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-sm sm:text-base">
                <Search className={`mr-2 h-4 w-4 sm:h-5 sm:w-5 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`} />
                Browse Spaces
              </Button>
            </Link>
            <Link to="/list-space">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20 text-sm sm:text-base">
                List Your Space
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;