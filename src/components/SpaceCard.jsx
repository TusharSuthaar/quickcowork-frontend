import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Users, Heart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const SpaceCard = ({ space, className }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === space.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? space.images.length - 1 : prev - 1
    );
  };

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
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
    <Link to={`/space/${space.id}`}>
      <div className={cn("group bg-card rounded-xl overflow-hidden border border-border card-hover", className)}>
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={space.images[currentImageIndex]}
            alt={space.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Image Navigation */}
          {space.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                →
              </button>
              
              {/* Image Dots */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {space.images.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    )}
                  />
                ))}
              </div>
            </>
          )}

          {/* Like Button */}
          <button
            onClick={toggleLike}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <Heart 
              size={16} 
              className={cn(
                "transition-colors",
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
              )} 
            />
          </button>

          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <Badge className={getTypeColor(space.type)} variant="secondary">
              {space.type.charAt(0).toUpperCase() + space.type.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Title and Rating */}
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {space.title}
            </h3>
            <div className="flex items-center space-x-1 text-sm">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-muted-foreground">{space.rating}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-1 text-muted-foreground text-sm">
            <MapPin size={14} />
            <span>{space.location}</span>
          </div>

          {/* Capacity and Amenities */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Users size={14} />
              <span>Up to {space.capacity} people</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{space.availability?.length || 0} slots</span>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex justify-between items-center pt-2">
            <div>
              <span className="text-lg font-bold text-foreground">₹{space.price}</span>
              <span className="text-sm text-muted-foreground">/hour</span>
            </div>
            <Button size="sm" className="btn-gradient">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SpaceCard;