import { useState, useEffect } from 'react';
import officeImage from '@/assets/office-space-1.jpg';
import kitchenImage from '@/assets/kitchen-space-1.jpg';
import studioImage from '@/assets/studio-space-1.jpg';

const mockSpaces = [
  {
    id: '1',
    title: 'Creative Office Downtown',
    type: 'office',
    price: 200,
    location: 'Delhi',
    address: 'Connaught Place, New Delhi',
    images: [officeImage, officeImage, officeImage],
    rating: 4.8,
    reviews: 25,
    description: 'A modern creative office space with floor-to-ceiling windows, exposed brick walls, and contemporary furniture.',
    amenities: ['WiFi', 'Parking', 'Coffee', 'Meeting Room', 'AC'],
    capacity: 10,
    availability: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM']
  },
  {
    id: '2',
    title: 'Modern Kitchen Studio',
    type: 'kitchen',
    price: 300,
    location: 'Mumbai',
    address: 'Bandra West, Mumbai',
    images: [kitchenImage, kitchenImage, kitchenImage],
    rating: 4.7,
    reviews: 18,
    description: 'Professional commercial kitchen with stainless steel appliances and marble countertops.',
    amenities: ['Industrial Stove', 'Refrigeration', 'Dishwasher', 'Storage', 'Parking'],
    capacity: 8,
    availability: ['8:00 AM', '9:00 AM', '1:00 PM', '4:00 PM']
  },
  {
    id: '3',
    title: 'Art Studio Loft',
    type: 'studio',
    price: 150,
    location: 'Bangalore',
    address: 'Koramangala, Bangalore',
    images: [studioImage, studioImage, studioImage],
    rating: 4.9,
    reviews: 32,
    description: 'Spacious art studio with high ceilings, large windows, and creative workspace setup.',
    amenities: ['Natural Light', 'Easels', 'Storage', 'WiFi', 'Parking'],
    capacity: 6,
    availability: ['10:00 AM', '11:00 AM', '2:00 PM', '5:00 PM']
  },
  {
    id: '4',
    title: 'Executive Conference Room',
    type: 'office',
    price: 400,
    location: 'Gurgaon',
    address: 'Cyber City, Gurgaon',
    images: [officeImage, officeImage, officeImage],
    rating: 4.6,
    reviews: 15,
    description: 'Premium executive conference room with state-of-the-art presentation equipment.',
    amenities: ['Projector', 'WiFi', 'Whiteboard', 'AC', 'Parking', 'Catering'],
    capacity: 20,
    availability: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
  },
  {
    id: '5',
    title: 'Culinary Workshop Space',
    type: 'kitchen',
    price: 250,
    location: 'Pune',
    address: 'Koregaon Park, Pune',
    images: [kitchenImage, kitchenImage, kitchenImage],
    rating: 4.8,
    reviews: 22,
    description: 'Perfect for cooking classes and culinary workshops with professional equipment.',
    amenities: ['Cooking Equipment', 'Refrigeration', 'Tables', 'WiFi', 'Parking'],
    capacity: 12,
    availability: ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM']
  },
  {
    id: '6',
    title: 'Photography Studio',
    type: 'studio',
    price: 350,
    location: 'Chennai',
    address: 'T. Nagar, Chennai',
    images: [studioImage, studioImage, studioImage],
    rating: 4.7,
    reviews: 28,
    description: 'Professional photography studio with lighting equipment and backdrop options.',
    amenities: ['Lighting Equipment', 'Backdrops', 'WiFi', 'AC', 'Parking'],
    capacity: 8,
    availability: ['10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM']
  }
];

export const useSpaces = () => {
  const [spaces, setSpaces] = useState(mockSpaces);
  const [loading, setLoading] = useState(false);

  const getSpaceById = (id) => {
    return spaces.find(space => space.id === id);
  };

  const getSpacesByType = (type) => {
    return spaces.filter(space => space.type === type);
  };

  const searchSpaces = (filters) => {
    let filteredSpaces = [...spaces];

    if (filters.type && filters.type !== 'all') {
      filteredSpaces = filteredSpaces.filter(space => space.type === filters.type);
    }

    if (filters.location) {
      filteredSpaces = filteredSpaces.filter(space => 
        space.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filteredSpaces = filteredSpaces.filter(space => space.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      filteredSpaces = filteredSpaces.filter(space => space.price <= filters.maxPrice);
    }

    return filteredSpaces;
  };

  return {
    spaces,
    loading,
    getSpaceById,
    getSpacesByType,
    searchSpaces
  };
};