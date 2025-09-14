import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import KPICards from './KPICards';
import ProjectQueueTable from './ProjectQueueTable';

const VerifierDashboard = () => {
  // KPI Data
  const kpiData = {
    projectsPending: 12,
    projectsRequiringVisit: 4,
    approvedLast30Days: 28,
    totalHectaresVerified: 15420
  };

  // Mock project queue data
  const projects = [
    {
      id: 'BCR-001',
      name: 'Mangrove Restoration Project',
      ngoName: 'Ocean Conservation NGO',
      location: 'Mombasa, Kenya',
      dateSubmitted: '2024-01-15',
      aiRecommendation: 'Field Visit Recommended' as const,
      status: 'Pending' as const,
      confidenceScore: 72
    },
    {
      id: 'BCR-002',
      name: 'Coastal Wetland Protection',
      ngoName: 'Marine Life Foundation',
      location: 'Lamu, Kenya', 
      dateSubmitted: '2024-01-10',
      aiRecommendation: 'Data Sufficient' as const,
      status: 'Pending' as const,
      confidenceScore: 94
    },
    {
      id: 'BCR-003',
      name: 'Seagrass Restoration Initiative',
      ngoName: 'Blue Ocean Trust',
      location: 'Kilifi, Kenya',
      dateSubmitted: '2024-01-08',
      aiRecommendation: 'Data Sufficient' as const,
      status: 'Approved' as const,
      confidenceScore: 96
    },
    {
      id: 'BCR-004',
      name: 'Saltmarsh Conservation Project',
      ngoName: 'Coastal Guardians',
      location: 'Tana Delta, Kenya',
      dateSubmitted: '2024-01-12',
      aiRecommendation: 'In Review' as const,
      status: 'More Info Requested' as const,
      confidenceScore: 0
    },
    {
      id: 'BCR-005',
      name: 'Mangrove Nursery Initiative',
      ngoName: 'EcoRestore Africa',
      location: 'Malindi, Kenya',
      dateSubmitted: '2024-01-14',
      aiRecommendation: 'Field Visit Recommended' as const,
      status: 'Pending' as const,
      confidenceScore: 68
    },
    {
      id: 'BCR-006',
      name: 'Blue Carbon Sequestration',
      ngoName: 'Carbon Coast Initiative',
      location: 'Watamu, Kenya',
      dateSubmitted: '2024-01-11',
      aiRecommendation: 'Data Sufficient' as const,
      status: 'Pending' as const,
      confidenceScore: 89
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader 
          title="Blue Carbon Verifier Portal" 
          subtitle="AI-Powered Environmental Data Verification Dashboard"
        />
        
        {/* KPI Cards */}
        <KPICards data={kpiData} />
        
        {/* Project Queue Table */}
        <ProjectQueueTable projects={projects} />
      </div>
    </div>
  );
};

export default VerifierDashboard;