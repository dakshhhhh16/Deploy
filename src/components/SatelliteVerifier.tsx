import React, { useState } from 'react';

// Define the expected structure of the props for this component
interface SatelliteVerifierProps {
  lat: number;
  lon: number;
}

// Define the expected structure of the API response from your backend
interface ApiResponse {
  imageUrl: string;
  // You can add other fields here if your backend sends more data
}

const SatelliteVerifier: React.FC<SatelliteVerifierProps> = ({ lat, lon }) => {
  // State to hold the satellite image URL
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // State to manage loading status
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // State to hold any error messages
  const [error, setError] = useState<string | null>(null);

  // Function to fetch the image from your backend
  const fetchSatelliteImage = async () => {
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    const apiUrl = `http://localhost:3001/api/satellite/image?lat=${lat}&lon=${lon}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch image from the server.');
      }
      const data: ApiResponse = await response.json();
      setImageUrl(data.imageUrl);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
      <h4>Satellite Image Verification</h4>
      <p>Coordinates: {lat.toFixed(4)}° N, {lon.toFixed(4)}° E</p>
      
      <button onClick={fetchSatelliteImage} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Satellite Image'}
      </button>

      <div style={{ marginTop: '16px' }}>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {imageUrl && !error && (
          <div>
            <p>Image loaded successfully.</p>
            <img 
              src={imageUrl} 
              alt={`Satellite view of ${lat}, ${lon}`} 
              style={{ maxWidth: '100%', border: '1px solid black' }} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SatelliteVerifier;