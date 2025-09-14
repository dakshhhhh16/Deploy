import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from './DashboardHeader';
import SystemOverview from './admin/SystemOverview';
import UserManagement from './admin/UserManagement';
import ProjectOversight from './admin/ProjectOversight';
import MintingConsole from './admin/MintingConsole';
import { 
  BarChart3, 
  Users, 
  Eye, 
  Coins 
} from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader 
          title="Admin Dashboard" 
          subtitle="NCCR Carbon Credit Management Portal"
        />
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>System Overview</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>User Management</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Project Oversight</span>
            </TabsTrigger>
            <TabsTrigger value="minting" className="flex items-center space-x-2">
              <Coins className="h-4 w-4" />
              <span>Minting Console</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <SystemOverview />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectOversight />
          </TabsContent>
          
          <TabsContent value="minting">
            <MintingConsole />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;