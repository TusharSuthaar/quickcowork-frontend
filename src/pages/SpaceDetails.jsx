import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Users, Wifi, Car, Coffee, ArrowLeft, Heart, Share2, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useSpaces } from '@/hooks/useSpaces';
import BookingForm from '@/components/BookingForm';

const SpaceDetails = () => {
  const { id } = useParams();
  const { getSpaceById } = useSpaces();
  const space = getSpaceById(id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!space) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Space not found</h1>
          <Link to="/browse">
            <Button>Browse Other Spaces</Button>
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === space.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? space.images.length - 1 : prev - 1
    );
  };

  const amenityIcons = {
    'WiFi': Wifi,
    'Parking': Car,
    'Coffee': Coffee,
    'Meeting Room': Users,
    'AC': '❄️',
    'Projector': '📽️',
    'Whiteboard': '📋',
    'Natural Light': '☀️',
    'Storage': '📦',
    'Security': '🔒',
    'Catering': '🍽️'
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'office':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'kitchen':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'studio':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/browse" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft size={20} className="mr-2" />
            Back to Browse
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <img
                  src={space.images[currentImageIndex]}
                  alt={space.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Navigation */}
              {space.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    →
                  </button>
                  
                  {/* Image Thumbnails */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {space.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="p-3 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <Heart 
                    size={20} 
                    className={isLiked ? "fill-red-500 text-red-500" : "text-gray-600"} 
                  />
                </button>
                <button className="p-3 rounded-full bg-white/80 hover:bg-white transition-colors">
                  <Share2 size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Space Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge className={getTypeColor(space.type)} variant="secondary">
                      {space.type.charAt(0).toUpperCase() + space.type.slice(1)}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{space.rating}</span>
                      <span className="text-muted-foreground">({space.reviews} reviews)</span>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold">{space.title}</h1>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin size={16} />
                    <span>{space.address}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users size={16} />
                      <span>Up to {space.capacity} people</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{space.availability?.length || 0} time slots available</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">₹{space.price}</div>
                  <div className="text-muted-foreground">per hour</div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-3">About this space</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {space.description}
                </p>
              </div>

              <Separator />

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {space.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity];
                    return (
                      <div key={amenity} className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                        {typeof Icon === 'string' ? (
                          <span className="text-lg">{Icon}</span>
                        ) : Icon ? (
                          <Icon size={18} className="text-primary" />
                        ) : (
                          <span className="w-4 h-4 bg-primary rounded-full"></span>
                        )}
                        <span className="text-sm font-medium">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Available Times */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {space.availability.map((time) => (
                    <Badge key={time} variant="outline" className="justify-center py-2">
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <BookingForm space={space} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetails;