import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Map, Layers, Image as ImageIcon, AlertTriangle, Camera } from 'lucide-react';

interface MapLayer {
  id: string;
  name: string;
  type: 'satellite' | 'photo' | 'analysis';
  date: string;
  enabled: boolean;
}

interface PhotoPin {
  id: string;
  lat: number;
  lng: number;
  title: string;
  date: string;
  thumbnail: string;
}

interface AnalysisArea {
  id: string;
  type: 'concern' | 'growth' | 'deforestation';
  coordinates: number[][];
  description: string;
}

interface MapComparatorProps {
  projectBounds: number[][];
  layers: MapLayer[];
  photoPins: PhotoPin[];
  analysisAreas: AnalysisArea[];
  onLayerToggle: (layerId: string, enabled: boolean) => void;
}

const MapComparator: React.FC<MapComparatorProps> = ({
  projectBounds,
  layers,
  photoPins,
  analysisAreas,
  onLayerToggle,
}) => {
  const [selectedLayer1, setSelectedLayer1] = useState('satellite-2024');
  const [selectedLayer2, setSelectedLayer2] = useState('satellite-2023');
  const [comparisonMode, setComparisonMode] = useState<'split' | 'slider' | 'overlay'>('split');
  const [opacity, setOpacity] = useState([50]);
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoPin | null>(null);

  const getAnalysisColor = (type: string) => {
    switch (type) {
      case 'concern':
        return 'border-destructive bg-destructive/10';
      case 'growth':
        return 'border-success bg-success/10';
      case 'deforestation':
        return 'border-secondary bg-secondary/10';
      default:
        return 'border-muted bg-muted/10';
    }
  };

  const getAnalysisIcon = (type: string) => {
    switch (type) {
      case 'concern':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'growth':
        return <ImageIcon className="h-4 w-4 text-success" />;
      case 'deforestation':
        return <AlertTriangle className="h-4 w-4 text-secondary" />;
      default:
        return <Map className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layers className="h-5 w-5" />
            <span>Map Controls</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Comparison Mode */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Comparison Mode:</label>
            <Select value={comparisonMode} onValueChange={(value: any) => setComparisonMode(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="split">Split Screen</SelectItem>
                <SelectItem value="slider">Slider</SelectItem>
                <SelectItem value="overlay">Overlay</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Layer Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Layer 1 (Left/Bottom):</label>
              <Select value={selectedLayer1} onValueChange={setSelectedLayer1}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {layers.map((layer) => (
                    <SelectItem key={layer.id} value={layer.id}>
                      {layer.name} ({layer.date})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Layer 2 (Right/Top):</label>
              <Select value={selectedLayer2} onValueChange={setSelectedLayer2}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {layers.map((layer) => (
                    <SelectItem key={layer.id} value={layer.id}>
                      {layer.name} ({layer.date})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Opacity Control */}
          {comparisonMode === 'overlay' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Overlay Opacity:</label>
                <span className="text-sm text-muted-foreground">{opacity[0]}%</span>
              </div>
              <Slider
                value={opacity}
                onValueChange={setOpacity}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          )}

          {/* Analysis Overlay Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Show AI Analysis:</label>
            <Switch
              checked={showAnalysis}
              onCheckedChange={setShowAnalysis}
            />
          </div>
        </CardContent>
      </Card>

      {/* Map Viewer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Map className="h-5 w-5" />
              <span>Satellite & Imagery Comparator</span>
            </div>
            <Badge variant="outline">
              {photoPins.length} Photo Locations
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-[16/10] bg-muted rounded-lg relative border-2 border-dashed border-border overflow-hidden">
            {/* Map Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Map className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium text-muted-foreground">Interactive Map View</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Project Boundaries: {projectBounds.length} coordinates
                </p>
                <p className="text-sm text-muted-foreground">
                  Mode: {comparisonMode} | Analysis: {showAnalysis ? 'ON' : 'OFF'}
                </p>
              </div>
            </div>

            {/* Photo Pins Overlay */}
            {photoPins.slice(0, 3).map((pin, index) => (
              <div
                key={pin.id}
                className="absolute bg-primary text-primary-foreground p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
                style={{
                  left: `${20 + index * 25}%`,
                  top: `${30 + index * 15}%`,
                }}
                onClick={() => setSelectedPhoto(pin)}
              >
                <Camera className="h-4 w-4" />
              </div>
            ))}

            {/* Analysis Areas Overlay */}
            {showAnalysis && analysisAreas.slice(0, 2).map((area, index) => (
              <div
                key={area.id}
                className={`absolute ${getAnalysisColor(area.type)} border-2 rounded p-2 shadow-lg`}
                style={{
                  right: `${15 + index * 20}%`,
                  bottom: `${20 + index * 15}%`,
                  width: '120px',
                  height: '80px',
                }}
              >
                <div className="flex items-center space-x-1">
                  {getAnalysisIcon(area.type)}
                  <span className="text-xs font-medium capitalize">{area.type}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Photo Details */}
      {selectedPhoto && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5" />
              <span>Photo Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">{selectedPhoto.title}</h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Date:</strong> {selectedPhoto.date}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Location:</strong> {selectedPhoto.lat.toFixed(6)}, {selectedPhoto.lng.toFixed(6)}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPhoto(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle>AI Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysisAreas.map((area) => (
              <div key={area.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                {getAnalysisIcon(area.type)}
                <div>
                  <h4 className="font-medium capitalize">{area.type} Detection</h4>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapComparator;