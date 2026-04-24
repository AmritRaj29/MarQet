"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Store, MapPin, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

// Fix Leaflet's default icon issue with Webpack/Next.js
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// A custom icon for the user's location
const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to dynamically adjust map center when location changes
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

interface ShopMapProps {
  location: { lat: number; lng: number } | null;
  shops: any[];
}

export default function ShopMap({ location, shops }: ShopMapProps) {
  // Default to a central location if none provided (e.g., center of India or user's city)
  const defaultCenter: [number, number] = [20.5937, 78.9629]; 
  const center: [number, number] = location ? [location.lat, location.lng] : defaultCenter;
  const zoom = location ? 13 : 5;

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative z-0">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Dark mode friendly map tiles from Carto */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <MapController center={center} />

        {/* User Location Marker */}
        {location && (
          <Marker position={[location.lat, location.lng]} icon={userIcon}>
            <Popup className="custom-popup">
              <div className="font-bold text-black">Your Location</div>
            </Popup>
          </Marker>
        )}

        {/* Shop Markers */}
        {shops.map((shop) => {
          if (!shop.location || !shop.location.coordinates) return null;
          // MongoDB coordinates are [lng, lat]
          const position: [number, number] = [
            shop.location.coordinates[1], 
            shop.location.coordinates[0]
          ];
          
          return (
            <Marker key={shop._id} position={position} icon={customIcon}>
              <Popup className="custom-popup min-w-[200px]">
                <div className="flex flex-col gap-2">
                  {shop.banner ? (
                    <div className="w-full h-24 rounded-t-lg overflow-hidden -mt-3 -mx-3 mb-2 relative">
                       <img src={shop.banner} alt={shop.shopName} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-full h-24 bg-gray-200 rounded-t-lg flex items-center justify-center -mt-3 -mx-3 mb-2">
                       <Store className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <h3 className="font-bold text-lg text-black leading-tight">{shop.shopName}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>{shop.city || "Local"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-yellow-600 mb-2">
                    <Star className="w-3 h-3 fill-yellow-600" />
                    <span>{shop.rating?.toFixed(1) || "New"}</span>
                  </div>
                  <Link 
                    href={`/shops/${shop._id}`} 
                    className="w-full bg-primary text-primary-foreground text-center py-2 rounded-md text-sm font-medium flex items-center justify-center gap-1 hover:bg-primary/90 transition-colors"
                  >
                    Visit Shop <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <style jsx global>{`
        .leaflet-container {
          background-color: #0f111a;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 0.75rem;
          overflow: hidden;
          padding: 0;
        }
        .leaflet-popup-content {
          margin: 12px;
        }
        .leaflet-popup-tip {
          background: white;
        }
      `}</style>
    </div>
  );
}
