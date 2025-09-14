import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  ngoName: string;
  location: string;
  dateSubmitted: string;
  aiRecommendation: 'Data Sufficient' | 'Field Visit Recommended' | 'In Review';
  status: 'Pending' | 'Approved' | 'Rejected' | 'More Info Requested';
  confidenceScore: number;
}

interface ProjectQueueTableProps {
  projects: Project[];
}

const ProjectQueueTable: React.FC<ProjectQueueTableProps> = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [aiFilter, setAiFilter] = useState('all');
  const navigate = useNavigate();

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.ngoName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesAI = aiFilter === 'all' || project.aiRecommendation === aiFilter;
    
    return matchesSearch && matchesStatus && matchesAI;
  });

  const getAIRecommendationBadge = (recommendation: string, confidence: number) => {
    switch (recommendation) {
      case 'Data Sufficient':
        return (
          <Badge className="bg-success text-success-foreground">
            🟢 Data Sufficient ({confidence}%)
          </Badge>
        );
      case 'Field Visit Recommended':
        return (
          <Badge variant="secondary">
            🟡 Field Visit Required ({confidence}%)
          </Badge>
        );
      case 'In Review':
        return (
          <Badge variant="outline">
            🔵 In Review
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case 'Rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'More Info Requested':
        return <Badge variant="secondary">More Info Requested</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Project Verification Queue</span>
          <Badge variant="outline">{filteredProjects.length} Projects</Badge>
        </CardTitle>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects, NGOs, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="More Info Requested">More Info Requested</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={aiFilter} onValueChange={setAiFilter}>
              <SelectTrigger className="w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by AI Rec" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Recommendations</SelectItem>
                <SelectItem value="Data Sufficient">Data Sufficient</SelectItem>
                <SelectItem value="Field Visit Recommended">Field Visit Required</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name / ID</TableHead>
                <TableHead>NGO/Community</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date Submitted</TableHead>
                <TableHead>AI Recommendation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow 
                  key={project.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <TableCell className="font-medium">
                    <div>
                      <div className="text-foreground">{project.name}</div>
                      <div className="text-sm text-muted-foreground">ID: {project.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>{project.ngoName}</TableCell>
                  <TableCell>{project.location}</TableCell>
                  <TableCell>{project.dateSubmitted}</TableCell>
                  <TableCell>
                    {getAIRecommendationBadge(project.aiRecommendation, project.confidenceScore)}
                  </TableCell>
                  <TableCell>{getStatusBadge(project.status)}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project.id);
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectQueueTable;