import { useAuth } from '@/hooks/useAuth';
import RoleBasedDashboard from '@/components/RoleBasedDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RoleBasedDashboard />
      </div>
    </div>
  );
};

export default Dashboard;