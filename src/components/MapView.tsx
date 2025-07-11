import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { Homestay } from '../types';

interface MapViewProps {
  stays: Homestay[];
  onStaySelect?: (stay: Homestay) => void;
}

const MapView: React.FC<MapViewProps> = ({ stays, onStaySelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Load Google Maps API
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && stays.length > 0) {
      updateMarkers();
    }
  }, [stays]);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    // Center map on India
    const center = { lat: 20.5937, lng: 78.9629 };
    
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      zoom: 5,
      center,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    updateMarkers();
  };

  const updateMarkers = () => {
    if (!mapInstanceRef.current || !window.google) return;

    // Clear existing markers
    // In a real implementation, you'd track markers to clear them

    const bounds = new window.google.maps.LatLngBounds();

    stays.forEach((stay) => {
      const position = {
        lat: stay.location.coordinates[0],
        lng: stay.location.coordinates[1]
      };

      const marker = new window.google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: stay.title,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#16a34a" stroke="white" stroke-width="4"/>
              <text x="20" y="25" text-anchor="middle" fill="white" font-size="12" font-weight="bold">₹${Math.round(stay.pricing.perNight/1000)}k</text>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 200px;">
            <img src="${stay.images[0]}" alt="${stay.title}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;">
            <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold;">${stay.title}</h3>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${stay.location.village}, ${stay.location.state}</p>
            <p style="margin: 0; font-size: 12px; font-weight: bold; color: #16a34a;">₹${stay.pricing.perNight}/night</p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
        if (onStaySelect) {
          onStaySelect(stay);
        }
      });

      bounds.extend(position);
    });

    if (stays.length > 0) {
      mapInstanceRef.current.fitBounds(bounds);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="h-96 rounded-xl overflow-hidden">
        <div ref={mapRef} className="w-full h-full">
          {!window.google && (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Loading interactive map...</p>
                <p className="text-sm text-gray-500 mt-2">
                  Showing {stays.length} homestays
                </p>
              </div>
            </div>
          )}
          <div className="text-sm text-gray-500">
            <p>Features will include:</p>
            <ul className="mt-2 space-y-1">
              <li>• Interactive markers for each homestay</li>
              <li>• Cluster view for nearby properties</li>
              <li>• Quick preview on marker hover</li>
              <li>• Filter by price and amenities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;