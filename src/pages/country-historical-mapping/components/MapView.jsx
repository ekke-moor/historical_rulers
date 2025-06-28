import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MapView = ({ selectedCountry, onCountrySelect, mapMode, onMapModeChange }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const mapRegions = [
    {
      id: 'greece',
      name: 'Greece',
      modernName: 'Greece',
      historicalNames: ['Byzantine Empire', 'Ottoman Greece', 'Ancient Greece'],
      coordinates: { x: 55, y: 45 },
      color: 'bg-primary'
    },
    {
      id: 'italy',
      name: 'Italy',
      modernName: 'Italy',
      historicalNames: ['Roman Empire', 'Papal States', 'Kingdom of Italy'],
      coordinates: { x: 50, y: 42 },
      color: 'bg-secondary'
    },
    {
      id: 'france',
      name: 'France',
      modernName: 'France',
      historicalNames: ['Frankish Kingdom', 'Kingdom of France', 'French Empire'],
      coordinates: { x: 45, y: 38 },
      color: 'bg-accent'
    },
    {
      id: 'spain',
      name: 'Spain',
      modernName: 'Spain',
      historicalNames: ['Visigothic Kingdom', 'Al-Andalus', 'Kingdom of Castile'],
      coordinates: { x: 40, y: 45 },
      color: 'bg-success'
    },
    {
      id: 'england',
      name: 'England',
      modernName: 'United Kingdom',
      historicalNames: ['Anglo-Saxon Kingdoms', 'Norman England', 'Kingdom of England'],
      coordinates: { x: 42, y: 30 },
      color: 'bg-warning'
    },
    {
      id: 'germany',
      name: 'Germany',
      modernName: 'Germany',
      historicalNames: ['Holy Roman Empire', 'Prussia', 'German Confederation'],
      coordinates: { x: 52, y: 35 },
      color: 'bg-error'
    }
  ];

  const handleRegionClick = (region) => {
    onCountrySelect(region);
  };

  const handleRegionHover = (region) => {
    setHoveredRegion(region);
  };

  const handleRegionLeave = () => {
    setHoveredRegion(null);
  };

  return (
    <div className="bg-surface rounded-card border border-earth p-6">
      {/* Map Controls */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Interactive Historical Map
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onMapModeChange('modern')}
            className={`px-4 py-2 rounded-subtle text-sm font-body transition-smooth ${
              mapMode === 'modern' ?'bg-primary text-primary-foreground' :'bg-background text-text-secondary hover:text-primary'
            }`}
          >
            Modern View
          </button>
          <button
            onClick={() => onMapModeChange('historical')}
            className={`px-4 py-2 rounded-subtle text-sm font-body transition-smooth ${
              mapMode === 'historical' ?'bg-primary text-primary-foreground' :'bg-background text-text-secondary hover:text-primary'
            }`}
          >
            Historical View
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-background rounded-card border border-earth-light overflow-hidden">
        {/* Map Background */}
        <div className="w-full h-96 relative bg-gradient-to-br from-blue-50 to-blue-100">
          {/* Simplified World Map Outline */}
          <svg
            viewBox="0 0 100 60"
            className="w-full h-full absolute inset-0"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Europe Outline */}
            <path
              d="M35 25 L65 25 L65 50 L35 50 Z"
              fill="rgba(139, 69, 19, 0.1)"
              stroke="var(--color-border)"
              strokeWidth="0.5"
            />
          </svg>

          {/* Interactive Regions */}
          {mapRegions.map((region) => (
            <div
              key={region.id}
              className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-200 ${
                selectedCountry?.id === region.id
                  ? `${region.color} scale-150 shadow-medium`
                  : hoveredRegion?.id === region.id
                  ? `${region.color} scale-125 shadow-subtle`
                  : `${region.color} opacity-80 hover:opacity-100`
              }`}
              style={{
                left: `${region.coordinates.x}%`,
                top: `${region.coordinates.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handleRegionClick(region)}
              onMouseEnter={() => handleRegionHover(region)}
              onMouseLeave={handleRegionLeave}
              title={mapMode === 'modern' ? region.modernName : region.historicalNames[0]}
            >
              {/* Pulse Animation for Selected */}
              {selectedCountry?.id === region.id && (
                <div className={`absolute inset-0 ${region.color} rounded-full animate-ping opacity-75`} />
              )}
            </div>
          ))}

          {/* Hover Tooltip */}
          {hoveredRegion && (
            <div
              className="absolute z-10 bg-background border border-earth rounded-subtle px-3 py-2 shadow-medium pointer-events-none"
              style={{
                left: `${hoveredRegion.coordinates.x}%`,
                top: `${hoveredRegion.coordinates.y - 8}%`,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="text-sm font-body">
                <div className="font-semibold text-text-primary">
                  {mapMode === 'modern' ? hoveredRegion.modernName : hoveredRegion.historicalNames[0]}
                </div>
                {mapMode === 'historical' && (
                  <div className="text-text-secondary text-xs">
                    Modern: {hoveredRegion.modernName}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-subtle border border-earth-light p-3">
          <div className="flex items-center space-x-2 text-xs font-body text-text-secondary">
            <Icon name="Info" size={14} />
            <span>Click regions to explore historical connections</span>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-1">
          <button className="w-8 h-8 bg-background border border-earth rounded-subtle flex items-center justify-center hover:bg-surface transition-smooth">
            <Icon name="Plus" size={16} className="text-text-secondary" />
          </button>
          <button className="w-8 h-8 bg-background border border-earth rounded-subtle flex items-center justify-center hover:bg-surface transition-smooth">
            <Icon name="Minus" size={16} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="bg-background rounded-subtle p-3 border border-earth-light">
          <div className="text-lg font-heading font-semibold text-primary">
            {mapRegions.length}
          </div>
          <div className="text-xs font-body text-text-secondary">
            Mapped Regions
          </div>
        </div>
        <div className="bg-background rounded-subtle p-3 border border-earth-light">
          <div className="text-lg font-heading font-semibold text-secondary">
            {mapRegions.reduce((acc, region) => acc + region.historicalNames.length, 0)}
          </div>
          <div className="text-xs font-body text-text-secondary">
            Historical Names
          </div>
        </div>
        <div className="bg-background rounded-subtle p-3 border border-earth-light">
          <div className="text-lg font-heading font-semibold text-accent">
            {selectedCountry ? '1' : '0'}
          </div>
          <div className="text-xs font-body text-text-secondary">
            Selected
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;