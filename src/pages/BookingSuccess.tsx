import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Users, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const BookingSuccess = () => {
  const [bookingData, setBookingData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get booking data from localStorage
    const lastBooking = localStorage.getItem('lastBooking');
    if (lastBooking) {
      setBookingData(JSON.parse(lastBooking));
    } else {
      // If no booking data, redirect to browse
      navigate('/browse');
    }
  }, [navigate]);

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { space, booking, total } = bookingData;

  const handleDownloadReceipt = () => {
    console.log('Downloading receipt...');
    // In a real app, this would generate and download a PDF receipt
  };

  const handleShare = () => {
    console.log('Sharing booking...');
    // In a real app, this would open share dialog
    if (navigator.share) {
      navigator.share({
        title: 'QuickCoWork Booking Confirmation',
        text: `I just booked ${space.title} for ${booking.duration} hours!`,
        url: window.location.href,
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Your space has been successfully reserved
          </p>
        </div>

        {/* Booking Details Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Space Info */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-32 h-24 md:h-28 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={space.images?.[0] || 'https://via.placeholder.com/300x200'}
                    alt={space.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">{space.title}</h2>
                  <div className="flex items-center text-muted-foreground text-sm mb-2">
                    <MapPin size={14} className="mr-1" />
                    {space.address || space.location}
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    ₹{space.price}/hour
                  </div>
                </div>
              </div>

              <Separator />

              {/* Booking Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Date</div>
                      <div className="text-muted-foreground">
                        {booking.startDate ? formatDate(booking.startDate) : 'Date not specified'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Time</div>
                      <div className="text-muted-foreground">
                        {booking.startTime || 'Time not specified'} ({booking.duration} hours)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Guests</div>
                      <div className="text-muted-foreground">
                        {booking.guests || 1} {(booking.guests || 1) === 1 ? 'person' : 'people'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">Status</div>
                      <div className="text-green-600">Confirmed</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Summary */}
              <div className="space-y-3">
                <h3 className="font-semibold">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Space rental ({booking.duration} hours)</span>
                    <span>₹{space.price * booking.duration}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Service fee</span>
                    <span>₹{Math.round(space.price * booking.duration * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>GST (18%)</span>
                    <span>₹{Math.round(space.price * booking.duration * 0.18)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Paid</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">What happens next?</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                <div>
                  <div className="font-medium">Confirmation Email</div>
                  <div className="text-muted-foreground text-sm">
                    You'll receive a confirmation email with all booking details
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                <div>
                  <div className="font-medium">Access Instructions</div>
                  <div className="text-muted-foreground text-sm">
                    You'll get access details 24 hours before your booking
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                <div>
                  <div className="font-medium">Enjoy Your Space</div>
                  <div className="text-muted-foreground text-sm">
                    Show up at your booked time and start working!
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button variant="outline" onClick={handleDownloadReceipt} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
          <Button variant="outline" onClick={handleShare} className="w-full">
            <Share2 className="mr-2 h-4 w-4" />
            Share Booking
          </Button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/dashboard" className="flex-1">
            <Button className="w-full btn-gradient">
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/browse" className="flex-1">
            <Button variant="outline" className="w-full">
              Browse More Spaces
            </Button>
          </Link>
        </div>

        {/* Support */}
        <div className="text-center mt-8 p-4 bg-muted rounded-lg">
          <p className="text-muted-foreground text-sm mb-2">
            Need help with your booking?
          </p>
          <Button variant="link" className="p-0 h-auto">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;