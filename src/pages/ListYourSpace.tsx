import { useState } from 'react';
import { Upload, MapPin, DollarSign, Image as ImageIcon, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const ListYourSpace = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'office',
    description: '',
    price: '',
    capacity: '',
    address: '',
    city: '',
    amenities: [],
    images: [],
    availability: []
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const spaceTypes = [
    { value: 'office', label: 'Office Space' },
    { value: 'kitchen', label: 'Commercial Kitchen' },
    { value: 'studio', label: 'Creative Studio' }
  ];

  const availableAmenities = [
    'WiFi', 'Parking', 'AC', 'Coffee', 'Meeting Room', 'Printer',
    'Whiteboard', 'Projector', 'Natural Light', 'Storage', 'Security', 'Catering'
  ];

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleTimeSlotToggle = (slot) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(slot)
        ? prev.availability.filter(s => s !== slot)
        : [...prev.availability, slot]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you would upload these to a storage service
    console.log('Files to upload:', files);
    
    // Mock image URLs for demo
    const mockUrls = files.map((file, index) => 
      `https://via.placeholder.com/800x600?text=Space+Image+${formData.images.length + index + 1}`
    );
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...mockUrls]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (formData.amenities.length === 0) {
      toast({
        title: "Select amenities",
        description: "Please select at least one amenity.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (formData.availability.length === 0) {
      toast({
        title: "Select availability",
        description: "Please select at least one time slot.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Mock submission
    setTimeout(() => {
      console.log('Space listing created:', formData);
      
      // Save to localStorage for demo
      const existingListings = JSON.parse(localStorage.getItem('userListings') || '[]');
      const newListing = {
        ...formData,
        id: Date.now().toString(),
        owner: 'currentUser',
        rating: 0,
        reviews: 0,
        createdAt: new Date().toISOString()
      };
      existingListings.push(newListing);
      localStorage.setItem('userListings', JSON.stringify(existingListings));
      
      toast({
        title: "Space listed successfully!",
        description: "Your space is now live and available for booking.",
      });
      
      // Reset form
      setFormData({
        title: '',
        type: 'office',
        description: '',
        price: '',
        capacity: '',
        address: '',
        city: '',
        amenities: [],
        images: [],
        availability: []
      });
      
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">List Your Space</h1>
          <p className="text-lg text-muted-foreground">
            Share your space with entrepreneurs and creators. Earn money when you're not using it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Space Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Modern Office Space in Downtown"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="type">Space Type</Label>
                <select
                  id="type"
                  className="w-full p-2 border border-input rounded-md bg-background"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  required
                >
                  {spaceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your space, its features, and what makes it special..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="capacity">Capacity (people)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    max="100"
                    placeholder="10"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price per Hour (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="50"
                    placeholder="200"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin size={20} />
                <span>Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  placeholder="Complete address with landmarks"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <select
                  id="city"
                  className="w-full p-2 border border-input rounded-md bg-background"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required
                >
                  <option value="">Select City</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Noida">Noida</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ImageIcon size={20} />
                <span>Photos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Upload Photos</h3>
                    <p className="text-muted-foreground">Add photos to help renters see your space</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <Button type="button" className="mt-4">
                      Choose Photos
                    </Button>
                  </Label>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Space ${index + 1}`}
                          className="w-full h-32 md:h-40 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableAmenities.map((amenity) => (
                  <label
                    key={amenity}
                    className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.amenities.includes(amenity)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{amenity}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">Select the time slots when your space is available</p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      variant={formData.availability.includes(slot) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleTimeSlotToggle(slot)}
                      className="justify-center"
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign size={20} />
                <span>Pricing Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Your rate per hour</span>
                  <span className="font-medium">₹{formData.price || '0'}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>QuickCoWork service fee (10%)</span>
                  <span>-₹{Math.round((parseInt(formData.price) || 0) * 0.1)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>You earn per hour</span>
                  <span>₹{Math.round((parseInt(formData.price) || 0) * 0.9)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="btn-gradient px-8"
              disabled={loading}
            >
              {loading ? 'Publishing...' : 'Publish Your Space'}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Your listing will be reviewed and go live within 24 hours
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListYourSpace;