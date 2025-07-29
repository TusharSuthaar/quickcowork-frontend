import { Link } from 'react-router-dom';
import { Search, Building2, ChefHat, Palette, ArrowRight, Star, Users, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSpaces } from '@/hooks/useSpaces';
import SpaceCard from '@/components/SpaceCard';
import heroImage from '@/assets/hero-image.jpg';

const Home = () => {
  const { spaces } = useSpaces();
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
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-accent/10 text-accent border-accent/20">
                  🚀 Now serving 25+ cities across India
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="gradient-text">Rent Shared</span><br />
                  Commercial Spaces<br />
                  <span className="text-muted-foreground text-2xl lg:text-3xl">by the hour</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Access professional offices, commercial kitchens, and creative studios 
                  without long-term commitments. Pay only for what you use.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/browse">
                  <Button size="lg" className="btn-gradient w-full sm:w-auto">
                    <Search className="mr-2 h-5 w-5" />
                    Find a Space
                  </Button>
                </Link>
                <Link to="/list-space">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    List Your Space
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-bold text-xl text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img
                src={heroImage}
                alt="Modern shared workspace"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-xl shadow-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Book in minutes</div>
                    <div className="text-sm text-muted-foreground">Instant confirmation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Find Your Perfect <span className="gradient-text">Space</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you need a professional office, commercial kitchen, or creative studio, 
              we have the perfect space for your business needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/browse?type=${category.type}`}
                className="group"
              >
                <div className="bg-card rounded-2xl p-8 border border-border card-hover h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center text-primary font-medium pt-2">
                      Browse spaces
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How <span className="gradient-text">It Works</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in just a few simple steps and access professional spaces instantly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-accent transform translate-x-2"></div>
                )}
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full text-white font-bold text-lg mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spaces Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                <span className="gradient-text">Featured</span> Spaces
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover our most popular and highly-rated spaces
              </p>
            </div>
            <Link to="/browse">
              <Button variant="outline" className="hidden sm:flex">
                View All Spaces
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
          
          <div className="text-center mt-8 sm:hidden">
            <Link to="/browse">
              <Button variant="outline">
                View All Spaces
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What Our <span className="gradient-text">Users Say</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from entrepreneurs, freelancers, and creators who've grown their businesses with QuickCoWork.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 border border-border card-hover">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Space?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs, freelancers, and creators who trust QuickCoWork 
            for their space needs. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Search className="mr-2 h-5 w-5" />
                Browse Spaces
              </Button>
            </Link>
            <Link to="/list-space">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                List Your Space
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;