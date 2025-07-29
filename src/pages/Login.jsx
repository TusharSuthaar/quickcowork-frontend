import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Building2, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'renter'
  });
  
  const roles = [
    {
      id: 'renter',
      title: 'Space Renter',
      description: 'Access to book and manage spaces',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'owner',
      title: 'Space Owner',
      description: 'Manage your listed spaces',
      icon: Building2,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Platform management and oversight',
      icon: Shield,
      color: 'from-purple-500 to-purple-600'
    }
  ];
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    
    try {
      await login(formData.email, formData.password, formData.role);
      toast({
        title: "Login successful!",
        description: "Welcome back to QuickCoWork.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    toast({
      title: "Coming soon!",
      description: "Google login will be available soon.",
    });
  };

  return (
    <div className="floating-card-elegant w-full p-8 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="heading-md gradient-text">Welcome back</h1>
          <p className="text-lg-desktop text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Enter your password"
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

          <div className="space-y-3">
            <Label className="text-sm">Select your role</Label>
            <div className="grid grid-cols-1 gap-2">
              {roles.map((role) => (
                <Card 
                  key={role.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    formData.role === role.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setFormData({...formData, role: role.id})}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${role.color} text-white`}>
                        <role.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{role.title}</h3>
                        <p className="text-xs text-muted-foreground">{role.description}</p>
                      </div>
                      {formData.role === role.id && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-1.5">
              <input type="checkbox" className="rounded" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full compact-button btn-gradient" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
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
          onClick={handleGoogleLogin}
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
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
  );
};

export default Login;