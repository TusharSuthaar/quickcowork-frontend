import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, CreditCard, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const BookingForm = ({ space }) => {
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    guests: 1,
    duration: 1
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return space.price * bookingData.duration;
  };

  const calculateTax = () => {
    return Math.round(calculateTotal() * 0.18); // 18% GST
  };

  const calculateFinalTotal = () => {
    return calculateTotal() + calculateTax();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to make a booking.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    setLoading(true);
    
    // Mock booking process
    setTimeout(() => {
      console.log('Booking created:', {
        spaceId: space.id,
        ...bookingData,
        total: calculateFinalTotal()
      });
      
      toast({
        title: "Booking successful!",
        description: "Your space has been booked successfully.",
      });
      
      // Store booking details for success page
      localStorage.setItem('lastBooking', JSON.stringify({
        space,
        booking: bookingData,
        total: calculateFinalTotal()
      }));
      
      navigate('/booking-success');
      setLoading(false);
    }, 2000);
  };

  const handlePayment = () => {
    // Mock Razorpay integration
    console.log('Payment started with Razorpay');
    console.log('Amount:', calculateFinalTotal());
    
    toast({
      title: "Payment initiated",
      description: "Redirecting to payment gateway...",
    });
    
    // Simulate payment success
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <div className="text-2xl font-bold">₹{space.price}<span className="text-sm font-normal text-muted-foreground">/hour</span></div>
        <div className="flex items-center justify-center space-x-1 mt-1">
          <span className="text-yellow-400">★</span>
          <span className="text-sm">{space.rating} ({space.reviews} reviews)</span>
        </div>
      </div>

      <Separator />

      {/* Date Selection */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate" className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>Start Date</span>
            </Label>
            <input
              id="startDate"
              type="date"
              className="w-full mt-1 p-2 border border-input rounded-md bg-background"
              value={bookingData.startDate}
              onChange={(e) => setBookingData({...bookingData, startDate: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate" className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>End Date</span>
            </Label>
            <input
              id="endDate"
              type="date"
              className="w-full mt-1 p-2 border border-input rounded-md bg-background"
              value={bookingData.endDate}
              onChange={(e) => setBookingData({...bookingData, endDate: e.target.value})}
              min={bookingData.startDate || new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </div>

        {/* Time Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startTime" className="flex items-center space-x-1">
              <Clock size={14} />
              <span>Start Time</span>
            </Label>
            <select
              id="startTime"
              className="w-full mt-1 p-2 border border-input rounded-md bg-background"
              value={bookingData.startTime}
              onChange={(e) => setBookingData({...bookingData, startTime: e.target.value})}
              required
            >
              <option value="">Select time</option>
              {space.availability.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="duration" className="flex items-center space-x-1">
              <Clock size={14} />
              <span>Duration (hours)</span>
            </Label>
            <select
              id="duration"
              className="w-full mt-1 p-2 border border-input rounded-md bg-background"
              value={bookingData.duration}
              onChange={(e) => setBookingData({...bookingData, duration: parseInt(e.target.value)})}
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                <option key={hour} value={hour}>
                  {hour} hour{hour > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Guests */}
        <div>
          <Label htmlFor="guests" className="flex items-center space-x-1">
            <Users size={14} />
            <span>Number of Guests</span>
          </Label>
          <select
            id="guests"
            className="w-full mt-1 p-2 border border-input rounded-md bg-background"
            value={bookingData.guests}
            onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
            required
          >
            {Array.from({ length: space.capacity }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} guest{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Separator />

      {/* Price Breakdown */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>₹{space.price} × {bookingData.duration} hour{bookingData.duration > 1 ? 's' : ''}</span>
          <span>₹{calculateTotal()}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Service fee</span>
          <span>₹{Math.round(calculateTotal() * 0.05)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>GST (18%)</span>
          <span>₹{calculateTax()}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{calculateFinalTotal()}</span>
        </div>
      </div>

      {/* Booking Rules */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Free cancellation up to 24 hours before booking</p>
        <p>• This space has a minimum booking duration of 1 hour</p>
        <p>• Host typically responds within a few hours</p>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <Button
          type="button"
          onClick={handlePayment}
          className="w-full btn-gradient"
          disabled={loading || !bookingData.startDate || !bookingData.startTime}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          {loading ? 'Processing...' : `Reserve & Pay ₹${calculateFinalTotal()}`}
        </Button>
        
        <p className="text-center text-xs text-muted-foreground">
          You won't be charged yet
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline" size="sm">
          Contact Host
        </Button>
        <Button type="button" variant="outline" size="sm">
          Save for Later
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;