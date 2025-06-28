import React from 'react';
import Icon from '../../../components/AppIcon';

const MiniMap = ({ selectedRegions, currentYear, onRegionClick }) => {
  const regionCoordinates = {
    'europe': { x: 50, y: 25, width: 25, height: 20 },
    'asia': { x: 60, y: 20, width: 35, height: 30 },
    'africa': { x: 45, y: 45, width: 20, height: 25 },
    'americas': { x: 15, y: 25, width: 25, height: 40 },
    'oceania': { x: 85, y: 60, width: 12, height: 15 },
    'middle-east': { x: 55, y: 35, width: 15, height: 12 }
  };

  const getRegionColor = (regionId) => {
    const colors = {
      'europe': '#8B4513',
      'asia': '#CD853F',
      'africa': '#DAA520',
      'americas': '#6B8E23',
      'oceania': '#B8860B',
      'middle-east': '#A0522D'
    };
    return colors[regionId] || '#8B4513';
  };

  const isRegionActive = (regionId) => {
    return selectedRegions.length === 0 || selectedRegions.includes(regionId);
  };

  return (
    <div className="bg-surface border border-earth rounded-card p-4 w-80 h-64">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-heading font-semibold text-text-primary">
          World Map
        </h4>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Calendar" size={14} />
          <span className="font-data">{currentYear} CE</span>
        </div>
      </div>

      <div className="relative w-full h-40 bg-gradient-to-b from-blue-100 to-blue-50 rounded border border-earth-light overflow-hidden">
        {/* World Map Background */}
        <svg
          viewBox="0 0 100 80"
          className="w-full h-full"
          style={{ background: 'linear-gradient(to bottom, #e0f2fe, #b3e5fc)' }}
        >
          {/* Continents as simplified shapes */}
          {Object.entries(regionCoordinates).map(([regionId, coords]) => (
            <rect
              key={regionId}
              x={coords.x}
              y={coords.y}
              width={coords.width}
              height={coords.height}
              fill={getRegionColor(regionId)}
              opacity={isRegionActive(regionId) ? 0.8 : 0.3}
              stroke="#fff"
              strokeWidth="0.5"
              rx="2"
              className="cursor-pointer transition-all duration-200 hover:opacity-100"
              onClick={() => onRegionClick(regionId)}
            />
          ))}
        </svg>

        {/* Region Labels */}
        <div className="absolute inset-0 pointer-events-none">
          {Object.entries(regionCoordinates).map(([regionId, coords]) => (
            <div
              key={`label-${regionId}`}
              className="absolute text-xs font-body text-white font-semibold"
              style={{
                left: `${coords.x + coords.width / 2}%`,
                top: `${coords.y + coords.height / 2}%`,
                transform: 'translate(-50%, -50%)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
              }}
            >
              {regionId.charAt(0).toUpperCase() + regionId.slice(1).replace('-', ' ')}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 text-xs text-text-secondary font-body">
        <div className="flex items-center justify-between">
          <span>Click regions to filter timeline</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMap;