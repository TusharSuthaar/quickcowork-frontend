import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, DollarSign, Star, Edit2, Trash2, Eye, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, isOwner, isRenter } = useAuth();
  const [userListings, setUserListings] = useState([]);
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    // Load user's listings and bookings from localStorage (mock data)
    const listings = JSON.parse(localStorage.getItem('userListings') || '[]');
    const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    
    setUserListings(listings);
    setUserBookings(bookings);
  }, []);

  // Mock booking data if none exists
  const mockBookings = [
    {
      id: '1',
      spaceTitle: 'Creative Office Downtown',
      spaceImage: 'https://via.placeholder.com/400x300',
      date: '2024-02-15',
      startTime: '9:00 AM',
      duration: 4,
      total: 800,
      status: 'confirmed',
      location: 'Delhi'
    },
    {
      id: '2',
      spaceTitle: 'Modern Kitchen Studio',
      spaceImage: 'https://via.placeholder.com/400x300',
      date: '2024-02-18',
      startTime: '2:00 PM',
      duration: 3,
      total: 900,
      status: 'pending',
      location: 'Mumbai'
    },
    {
      id: '3',
      spaceTitle: 'Art Studio Loft',
      spaceImage: 'https://via.placeholder.com/400x300',
      date: '2024-02-10',
      startTime: '10:00 AM',
      duration: 6,
      total: 900,
      status: 'completed',
      location: 'Bangalore'
    }
  ];

  const displayBookings = userBookings.length > 0 ? userBookings : mockBookings;

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const deleteListing = (id) => {
    const updatedListings = userListings.filter(listing => listing.id !== id);
    setUserListings(updatedListings);
    localStorage.setItem('userListings', JSON.stringify(updatedListings));
  };

  const totalEarnings = userListings.reduce((sum, listing) => sum + (listing.totalEarnings || 0), 0);
  const totalBookings = displayBookings.length;
  const confirmedBookings = displayBookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">
            {isOwner ? 'Manage your listings and track your earnings' : 'View your bookings and find new spaces'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Bookings</p>
                  <p className="text-2xl font-bold">{totalBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">
                    {isOwner ? 'Active Listings' : 'Confirmed Bookings'}
                  </p>
                  <p className="text-2xl font-bold">
                    {isOwner ? userListings.length : confirmedBookings}
                  </p>
                </div>
                {isOwner ? (
                  <MapPin className="w-8 h-8 text-primary" />
                ) : (
                  <Clock className="w-8 h-8 text-primary" />
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">
                    {isOwner ? 'Total Earnings' : 'Total Spent'}
                  </p>
                  <p className="text-2xl font-bold">
                    ₹{isOwner ? totalEarnings : displayBookings.reduce((sum, b) => sum + b.total, 0)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue={isOwner ? "listings" : "bookings"} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            {isOwner && <TabsTrigger value="listings">My Listings</TabsTrigger>}
            <TabsTrigger value="bookings">
              {isOwner ? 'Booking Requests' : 'My Bookings'}
            </TabsTrigger>
          </TabsList>

          {/* Listings Tab (Owner only) */}
          {isOwner && (
            <TabsContent value="listings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Listings</h2>
                <Link to="/list-space">
                  <Button className="btn-gradient">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Space
                  </Button>
                </Link>
              </div>

              {userListings.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start earning by listing your first space
                    </p>
                    <Link to="/list-space">
                      <Button className="btn-gradient">List Your Space</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {userListings.map((listing) => (
                    <Card key={listing.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full md:w-48 h-32 md:h-40 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                            {listing.images && listing.images[0] ? (
                              <img
                                src={listing.images[0]}
                                alt={listing.title}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <MapPin className="w-8 h-8 text-muted-foreground" />
                            )}
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold">{listing.title}</h3>
                                <p className="text-muted-foreground">{listing.address}, {listing.city}</p>
                              </div>
                              <Badge className={`bg-green-100 text-green-800`}>
                                Active
                              </Badge>
                            </div>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span>₹{listing.price}/hour</span>
                              <span>{listing.capacity} people</span>
                              <span>{listing.type}</span>
                            </div>
                            
                            <div className="flex gap-2 pt-2">
                              <Button size="sm" variant="outline">
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit2 className="mr-2 h-4 w-4" />
                                Edit
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => deleteListing(listing.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          )}

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <h2 className="text-2xl font-bold">
              {isOwner ? 'Booking Requests' : 'My Bookings'}
            </h2>

            <div className="grid gap-6">
              {displayBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-48 h-32 md:h-40 bg-muted rounded-lg overflow-hidden">
                        <img
                          src={booking.spaceImage}
                          alt={booking.spaceTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{booking.spaceTitle}</h3>
                            <div className="flex items-center text-muted-foreground text-sm">
                              <MapPin size={14} className="mr-1" />
                              {booking.location}
                            </div>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Date</span>
                            <div className="font-medium">{new Date(booking.date).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Time</span>
                            <div className="font-medium">{booking.startTime}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Duration</span>
                            <div className="font-medium">{booking.duration} hours</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total</span>
                            <div className="font-medium">₹{booking.total}</div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          {booking.status === 'confirmed' && (
                            <Button size="sm" variant="outline">
                              Contact Host
                            </Button>
                          )}
                          {booking.status === 'pending' && (
                            <Button size="sm" variant="outline">
                              Cancel
                            </Button>
                          )}
                          {booking.status === 'completed' && (
                            <Button size="sm" variant="outline">
                              <Star className="mr-2 h-4 w-4" />
                              Rate & Review
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;