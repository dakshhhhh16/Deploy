import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Leaf, Waves, User, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ngoData = {
  name: "Green Future Initiative",
  initials: "GF"
};

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode; // Add children prop
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle, children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userEmail = localStorage.getItem('userEmail');
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of your account",
    });
    navigate('/');
  };

  return (
    // Outer div for spacing from the top and sides of the screen
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-4">
      {/* This div handles the hover-zoom effect */}
      <div className="w-full transition-all duration-300 ease-in-out hover:scale-[1.01]">
        {/* 1. The Gradient Border: A div with padding and a gradient background */}
        <div className="rounded-2xl bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-700 p-[1px] shadow-lg transition-all duration-300 hover:from-neutral-600 hover:via-neutral-700 hover:to-neutral-600">
          {/* 2. The Main Header Content Area */}
          <div className="w-full rounded-[23px] bg-neutral-950/80 backdrop-blur-sm">
            <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
              
              {/* Left Side: Title and Branding */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 group cursor-pointer">
                  <Waves className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <Leaf className="h-8 w-8 text-secondary transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-100">{title}</h1>
                  <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>
                </div>
              </div>

              {/* Right Side: User Actions */}
              <div className="flex items-center space-x-4">
                {/* Render children here */}
                {children}

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="transition-all duration-300 ease-in-out group hover:bg-destructive/90 hover:text-destructive-foreground hover:border-destructive/90 hover:shadow-md hover:shadow-destructive/40"
                >
                  <LogOut className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:rotate-6" />
                  Logout
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full transition-transform duration-300 ease-in-out hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{ngoData.initials}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{ngoData.name}</p>
                        <p className="text-xs leading-none text-muted-foreground pt-1">
                          {userEmail}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="group cursor-pointer transition-colors">
                      <User className="mr-2 h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-primary" />
                      <span className="transition-all duration-300 group-hover:text-primary">Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="group cursor-pointer transition-colors">
                      <Settings className="mr-2 h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-primary" />
                      <span className="transition-all duration-300 group-hover:text-primary">Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;