import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegionFilter = ({ selectedRegions, onRegionToggle, onSelectAll, onClearAll }) => {
  const regions = [
    { id: 'europe', name: 'Europe', color: '#8B4513', icon: 'MapPin' },
    { id: 'asia', name: 'Asia', color: '#CD853F', icon: 'Mountain' },
    { id: 'africa', name: 'Africa', color: '#DAA520', icon: 'Sun' },
    { id: 'americas', name: 'Americas', color: '#6B8E23', icon: 'Trees' },
    { id: 'oceania', name: 'Oceania', color: '#B8860B', icon: 'Waves' },
    { id: 'middle-east', name: 'Middle East', color: '#A0522D', icon: 'Compass' }
  ];

  const isAllSelected = selectedRegions.length === regions.length;
  const isNoneSelected = selectedRegions.length === 0;

  return (
    <div className="bg-surface border border-earth rounded-card p-4 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={18} className="text-text-secondary" />
          <h3 className="font-heading font-semibold text-text-primary">
            Filter by Region
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={isAllSelected ? "primary" : "ghost"}
            onClick={onSelectAll}
            className="px-3 py-1 text-sm"
          >
            All
          </Button>
          <Button
            variant="ghost"
            onClick={onClearAll}
            disabled={isNoneSelected}
            className="px-3 py-1 text-sm"
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {regions.map((region) => {
          const isSelected = selectedRegions.includes(region.id);
          return (
            <button
              key={region.id}
              onClick={() => onRegionToggle(region.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-subtle border transition-smooth
                ${isSelected
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-text-secondary border-earth hover:border-primary hover:text-primary'
                }
              `}
            >
              <Icon 
                name={region.icon} 
                size={16} 
                style={{ color: isSelected ? 'currentColor' : region.color }}
              />
              <span className="font-body text-sm">{region.name}</span>
            </button>
          );
        })}
      </div>

      {selectedRegions.length > 0 && (
        <div className="mt-3 text-sm text-text-secondary font-body">
          Showing {selectedRegions.length} of {regions.length} regions
        </div>
      )}
    </div>
  );
};

export default RegionFilter;