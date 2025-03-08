import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from './navbar';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import './mapStyles.css';


const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 11, { animate: true });
  }, [map, position]);

  return null;
};

const SearchControl = ({ provider }) => {
  const map = useMap();

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      autoClose: true,
      showMarker: false,
      maxMarkers: 1,
    });

    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map, provider]);

  return null;
};

const Maps = () => {
  const initialPosition = [14.5995, 120.9842];
  const provider = new OpenStreetMapProvider();

  return (
    <div className="bg-CA h-screen">
      <div className="flex px-5 h-screen">
        <Navbar />
        <div className="flex-1 m-5 mt-16 lg:mt-5">
          <div className="w-full h-full relative">
            <MapContainer
              center={initialPosition}
              zoom={11}
              style={{ width: '100%', height: '100%', zIndex: 10 }}
              zoomControl={false} // Disable default zoom control
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapUpdater position={initialPosition} />
              <SearchControl provider={provider} />
              <ZoomControl position="bottomright" />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;
