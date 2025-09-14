import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CheckCircle, XCircle, MessageSquare, AlertTriangle, TrendingUp } from 'lucide-react';
import DashboardHeader from './DashboardHeader';
import EvidenceHub from './EvidenceHub';

const ProjectVerificationWorkspace = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [projectStatus, setProjectStatus] = useState('Pending');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock project data - in real app this would come from API
  const projectData = {
    id: projectId || '1',
    name: 'Mangrove Restoration Project',
    ngoName: 'Ocean Conservation NGO',
    location: 'Mombasa, Kenya',
    hectares: 150,
    carbonClaim: 2500,
    dateSubmitted: '2024-01-15',
    confidenceScore: 72,
    aiRecommendation: 'Field Visit Recommended',
    aiSummary: `The submitted land ownership deed (doc_1.pdf) was successfully processed via OCR, and the stated coordinates align with the project's geographic boundaries. However, a 15% discrepancy was noted between the claimed biomass density in the northern sector and our analysis of Sentinel-2 satellite imagery from August 2025. The NGO-submitted photos for this region lack clarity. Recommend field verification to confirm biomass estimates and validate the restoration activities claimed in this area.`,
    checklistItems: [
      {
        id: '1',
        label: 'Document Authenticity',
        status: 'completed' as const,
        description: 'OCR data is clear and consistent across all submitted documents'
      },
      {
        id: '2',
        label: 'Geospatial Integrity',
        status: 'completed' as const,
        description: 'Project boundaries match land deeds and official permits'
      },
      {
        id: '3',
        label: 'Visual Evidence Correlation',
        status: 'warning' as const,
        description: 'NGO imagery partially conflicts with satellite data in northern sector'
      },
      {
        id: '4',
        label: 'Methodology Compliance',
        status: 'completed' as const,
        description: 'Submitted methodology aligns with Verra VCS standards'
      },
      {
        id: '5',
        label: 'Temporal Analysis',
        status: 'warning' as const,
        description: 'Growth patterns show expected progression but require field verification'
      }
    ],
    documents: [
      {
        id: '1',
        name: 'land_ownership_deed.pdf',
        type: 'pdf' as const,
        size: '2.4 MB',
        uploadDate: '2024-01-15',
        ocrText: 'REPUBLIC OF KENYA\nMINISTRY OF LANDS\n\nLAND TITLE DEED\n\nTitle Number: KE/MB/2024/001\nRegistered Owner: Ocean Conservation NGO\nLocation: Mombasa County, Kenya\nCoordinates: -4.0435, 39.6682\nArea: 150 hectares\n\nThis certifies that the above named is the registered proprietor of the land described above...',
        ocrAccuracy: 97,
        highlighted_entities: [
          { text: 'Ocean Conservation NGO', type: 'name' as const, confidence: 0.99 },
          { text: '-4.0435, 39.6682', type: 'coordinate' as const, confidence: 0.95 },
          { text: '150 hectares', type: 'legal_clause' as const, confidence: 0.92 }
        ]
      },
      {
        id: '2',
        name: 'project_methodology.docx',
        type: 'docx' as const,
        size: '1.8 MB',
        uploadDate: '2024-01-15',
        ocrText: 'BLUE CARBON METHODOLOGY\nVCS Standard v4.3\n\nProject Title: Mangrove Restoration Initiative\nMethodology: VM0033 - Methodology for Tidal Wetland and Seagrass Restoration\n\nCarbon Pool Analysis:\n- Above-ground biomass\n- Below-ground biomass\n- Soil organic carbon\n\nBaseline Scenario:\nHistorical analysis shows 60% mangrove loss between 2010-2020...',
        ocrAccuracy: 94
      },
      {
        id: '3',
        name: 'field_photos_2024.zip',
        type: 'jpg' as const,
        size: '45.2 MB',
        uploadDate: '2024-01-15'
      }
    ],
    projectBounds: [
      [-4.0435, 39.6682],
      [-4.0445, 39.6692],
      [-4.0455, 39.6685],
      [-4.0450, 39.6675]
    ],
    mapLayers: [
      { id: 'satellite-2024', name: 'Sentinel-2 Latest', type: 'satellite' as const, date: '2024-01-10', enabled: true },
      { id: 'satellite-2023', name: 'Sentinel-2 Baseline', type: 'satellite' as const, date: '2023-01-10', enabled: true },
      { id: 'photos-ngo', name: 'NGO Field Photos', type: 'photo' as const, date: '2024-01-15', enabled: true },
      { id: 'ai-analysis', name: 'AI Analysis Overlay', type: 'analysis' as const, date: '2024-01-16', enabled: true }
    ],
    photoPins: [
      { id: '1', lat: -4.0440, lng: 39.6685, title: 'Northern Sector - Seedlings', date: '2024-01-15', thumbnail: '' },
      { id: '2', lat: -4.0450, lng: 39.6680, title: 'Central Area - Mature Growth', date: '2024-01-15', thumbnail: '' },
      { id: '3', lat: -4.0445, lng: 39.6675, title: 'Southern Boundary', date: '2024-01-15', thumbnail: '' }
    ],
    analysisAreas: [
      {
        id: '1',
        type: 'concern' as const,
        coordinates: [[-4.0435, 39.6685], [-4.0440, 39.6690]],
        description: '15% biomass discrepancy detected in northern sector. Field verification recommended.'
      },
      {
        id: '2',
        type: 'growth' as const,
        coordinates: [[-4.0448, 39.6678], [-4.0452, 39.6682]],
        description: 'Strong growth indicators detected. Satellite data confirms healthy mangrove development.'
      }
    ],
    auditTrail: [
      { id: '1', timestamp: '2024-01-15 11:40 AM', actor: 'Ocean Conservation NGO', action: 'Project Submitted', details: 'Initial project submission with 8 documents' },
      { id: '2', timestamp: '2024-01-15 11:45 AM', actor: 'AI Analysis System', action: 'AI Analysis Started', details: 'Automated verification process initiated' },
      { id: '3', timestamp: '2024-01-15 11:52 AM', actor: 'AI Analysis System', action: 'AI Analysis Complete', details: 'Confidence Score: 72% - Field Visit Recommended' },
      { id: '4', timestamp: '2024-01-16 09:00 AM', actor: 'Senior Verifier', action: 'Project Viewed', details: 'Initial review started by verification team' }
    ],
    messages: [
      { id: '1', sender: 'Ocean Conservation NGO', senderType: 'ngo' as const, message: 'Hello, we have submitted our mangrove restoration project for verification. Please let us know if you need any additional information.', timestamp: '2024-01-15 12:00 PM', read: true },
      { id: '2', sender: 'Verification System', senderType: 'system' as const, message: 'Your project has been assigned to a verifier and is now under review.', timestamp: '2024-01-15 12:05 PM', read: true },
      { id: '3', sender: 'Ocean Conservation NGO', senderType: 'ngo' as const, message: 'We noticed the AI flagged some concerns in the northern sector. We can provide additional drone footage from that area if needed.', timestamp: '2024-01-16 10:30 AM', read: false }
    ]
  };

  const handleApprove = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setProjectStatus('Approved');
      toast({
        title: 'Project Approved',
        description: 'The project has been successfully approved and will proceed to carbon credit issuance.',
        variant: 'default'
      });
      setIsProcessing(false);
    }, 2000);
  };

  const handleReject = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setProjectStatus('Rejected');
      toast({
        title: 'Project Rejected',
        description: 'The project has been rejected. The NGO will be notified with feedback.',
        variant: 'destructive'
      });
      setIsProcessing(false);
    }, 1500);
  };

  const handleRequestInfo = () => {
    toast({
      title: 'Information Request Sent',
      description: 'A message has been sent to the NGO requesting additional information.',
      variant: 'default'
    });
  };

  const getStatusBadge = () => {
    switch (projectStatus) {
      case 'Approved':
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case 'Rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Under Review</Badge>;
    }
  };

  const getAIRecommendationBadge = () => {
    switch (projectData.aiRecommendation) {
      case 'Data Sufficient':
        return <Badge className="bg-success text-success-foreground">🟢 AI: Data Sufficient ({projectData.confidenceScore}%)</Badge>;
      case 'Field Visit Recommended':
        return <Badge variant="secondary">🟡 AI: Field Visit Recommended ({projectData.confidenceScore}%)</Badge>;
      default:
        return <Badge variant="outline">🔵 AI: In Review</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <DashboardHeader 
          title="Project Verification Workspace"
          subtitle="Detailed Evidence Analysis & Decision Making"
        />

        {/* Back Navigation */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/verifier-dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Project Summary Header */}
        <Card className="shadow-lg border-primary/20">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <CardTitle className="text-2xl text-foreground">{projectData.name}</CardTitle>
                <p className="text-muted-foreground mt-1">
                  ID: {projectData.id} • Submitted by {projectData.ngoName}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {getAIRecommendationBadge()}
                {getStatusBadge()}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Carbon Claim</p>
                  <p className="font-medium">{projectData.carbonClaim.toLocaleString()} Tonnes CO₂e</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-success rounded text-success-foreground flex items-center justify-center text-xs">🌱</div>
                <div>
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="font-medium">{projectData.hectares} Hectares</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-accent rounded text-accent-foreground flex items-center justify-center text-xs">📍</div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{projectData.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-secondary rounded text-secondary-foreground flex items-center justify-center text-xs">📅</div>
                <div>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="font-medium">{projectData.dateSubmitted}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="shadow-lg border-accent/20">
          <CardHeader>
            <CardTitle>Verification Decision</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleApprove}
                disabled={isProcessing || projectStatus !== 'Pending'}
                className="bg-success hover:bg-success/90 text-success-foreground"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Project
                  </>
                )}
              </Button>
              
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={isProcessing || projectStatus !== 'Pending'}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject Project
              </Button>
              
              <Button
                variant="outline"
                onClick={handleRequestInfo}
                disabled={isProcessing || projectStatus !== 'Pending'}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Request More Information
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Evidence Hub */}
        <EvidenceHub projectData={projectData} />
      </div>
    </div>
  );
};

export default ProjectVerificationWorkspace;