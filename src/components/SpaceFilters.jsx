import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const SpaceFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const spaceTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'office', label: 'Office Spaces' },
    { value: 'kitchen', label: 'Commercial Kitchens' },
    { value: 'studio', label: 'Creative Studios' }
  ];

  const amenities = [
    'WiFi',
    'Parking',
    'AC',
    'Coffee',
    'Meeting Room',
    'Printer',
    'Whiteboard',
    'Projector',
    'Natural Light',
    'Storage',
    'Security',
    'Catering'
  ];

  const locations = [
    'Delhi',
    'Mumbai',
    'Bangalore',
    'Chennai',
    'Hyderabad',
    'Pune',
    'Gurgaon',
    'Noida',
    'Kolkata',
    'Ahmedabad'
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleAmenityChange = (amenity, checked) => {
    const updatedAmenities = checked
      ? [...localFilters.amenities, amenity]
      : localFilters.amenities.filter(a => a !== amenity);
    
    handleFilterChange('amenities', updatedAmenities);
  };

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Space Type */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Space Type</Label>
          <div className="space-y-2">
            {spaceTypes.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={type.value}
                  name="spaceType"
                  value={type.value}
                  checked={localFilters.type === type.value}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-4 h-4 text-primary"
                />
                <Label htmlFor={type.value} className="text-sm font-normal cursor-pointer">
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Location */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Location</Label>
          <select
            className="w-full p-2 border border-input rounded-md bg-background text-sm"
            value={localFilters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="">Any Location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Price Range (per hour)</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="minPrice" className="text-xs text-muted-foreground">Min</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="₹0"
                value={localFilters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="maxPrice" className="text-xs text-muted-foreground">Max</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="₹1000"
                value={localFilters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Amenities */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Amenities</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {amenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={localFilters.amenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked)}
                />
                <Label htmlFor={amenity} className="text-sm font-normal cursor-pointer">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Quick Filters */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Quick Filters</Label>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleFilterChange('maxPrice', '200')}
            >
              Under ₹200/hour
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                handleFilterChange('amenities', ['WiFi', 'AC', 'Parking']);
              }}
            >
              Essential Amenities
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleFilterChange('type', 'office')}
            >
              Meeting Spaces
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpaceFilters;