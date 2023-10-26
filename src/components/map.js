import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import Main from './main';

const DarkMap = () => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 26.185665924, lng:91.68833058 });
  const [searchBox, setSearchBox] = useState(null);

  const darkMapOptions = {
    styles: [
      {
        featureType: 'all',
        elementType: 'all',
        stylers: [{ invert_lightness: 'true' }, { saturation: -100 }, { lightness: -30 }],
      },
    ],
    disableDefaultUI: true,
    googleLogo: false,
    keyboardShortcuts: false,
    mapTypeControl: false, 
     scaleControl: false,
  };

  const handleOnLoad = (map) => {
    setMap(map);
  };

  const handleOnSearchBoxLoad = (ref) => {
    setSearchBox(ref);
  };

  const handlePlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places.length > 0) {
        const place = places[0];
        const location = place.geometry.location;
        setCenter({ lat: location.lat(), lng: location.lng() });
      }
    }
  };

  useEffect(() => {
    if (map) {
      map.setOptions(darkMapOptions);
    }
  }, [map]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCCpvJNEowk2e6OOkeKWRhaQD-A-8SArSE"
      libraries={['places']}
    >
      <GoogleMap
        mapContainerStyle={{ width: '500px', height: '300px',borderRadius:'15px' }}
        center={center}
        zoom={14}
        onLoad={handleOnLoad}
        
      >
         <style>
          {`
            #dark-map a[href*="termsofservice"] {
              display: none !important;
            }

            #dark-map a[href*="google.com/maps"] {
              display: none !important;
            }
          `}
        </style>
        <StandaloneSearchBox
          onLoad={handleOnSearchBoxLoad}
          onPlacesChanged={handlePlacesChanged}
        >
          <input
            type="text"
            placeholder="Search for a place"
            style={{
              boxSizing: 'border-box',
              border: '1px solid transparent',
              width: '100px',
              height: '32px',
              padding: '0 12px',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              fontSize: '14px',
              outline: 'none',
              textOverflow: 'ellipses',
            }}
          />
        </StandaloneSearchBox>

        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default DarkMap;
