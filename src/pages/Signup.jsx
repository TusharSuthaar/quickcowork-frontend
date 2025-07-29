import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'renter'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    console.log('Signup attempt:', formData);
    
    try {
      await signup(formData.email, formData.password, formData.role, formData.name);
      toast({
        title: "Account created successfully!",
        description: "Welcome to QuickCoWork.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please try again with different details.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
    toast({
      title: "Coming soon!",
      description: "Google signup will be available soon.",
    });
  };

  return (
    <div className="floating-container">
      <div className="floating-card-elegant w-full max-w-lg lg:max-w-xl p-12 lg:p-16 space-y-8 lg:space-y-12">
        <div className="text-center space-y-4">
          <h1 className="heading-md gradient-text">Create account</h1>
          <p className="text-lg-desktop text-muted-foreground">
            Join QuickCoWork and start your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-sm">Full Name</Label>
            <div className="relative">
              <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="compact-input pl-8"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm">Email</Label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="compact-input pl-8"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="text-sm">Password</Label>
            <div className="relative">
              <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className="compact-input pl-8 pr-8"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                className="compact-input pl-8 pr-8"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="role" className="text-sm">I want to</Label>
            <select
              id="role"
              className="w-full h-9 px-2 text-sm border border-input rounded-md bg-background"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="renter">Rent spaces</option>
              <option value="owner">List my spaces</option>
            </select>
          </div>

          <div className="flex items-start space-x-1.5 text-xs">
            <input type="checkbox" className="rounded mt-0.5" required />
            <span className="text-muted-foreground">
              I agree to the{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Terms
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </span>
          </div>

          <Button type="submit" className="w-full compact-button btn-gradient" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          className="w-full compact-button"
          onClick={handleGoogleSignup}
        >
          <svg className="mr-2 h-3 w-3" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;