import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterControls = ({ onFilterChange, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedEmpire, setSelectedEmpire] = useState('all');
  const [selectedDynasty, setSelectedDynasty] = useState('all');
  const [isExpanded, setIsExpanded] = useState(false);

  const timePeriods = [
    { value: 'all', label: 'All Periods' },
    { value: 'ancient', label: 'Ancient (Before 500 CE)' },
    { value: 'medieval', label: 'Medieval (500-1500 CE)' },
    { value: 'early-modern', label: 'Early Modern (1500-1800 CE)' },
    { value: 'modern', label: 'Modern (1800-Present)' }
  ];

  const empires = [
    { value: 'all', label: 'All Empires' },
    { value: 'roman', label: 'Roman Empire' },
    { value: 'byzantine', label: 'Byzantine Empire' },
    { value: 'ottoman', label: 'Ottoman Empire' },
    { value: 'holy-roman', label: 'Holy Roman Empire' },
    { value: 'british', label: 'British Empire' },
    { value: 'french', label: 'French Empire' }
  ];

  const dynasties = [
    { value: 'all', label: 'All Dynasties' },
    { value: 'constantinian', label: 'Constantinian' },
    { value: 'ottoman', label: 'Ottoman' },
    { value: 'habsburg', label: 'Habsburg' },
    { value: 'bourbon', label: 'Bourbon' },
    { value: 'plantagenet', label: 'Plantagenet' },
    { value: 'tudor', label: 'Tudor' }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (filterType, value) => {
    const filters = {
      period: selectedPeriod,
      empire: selectedEmpire,
      dynasty: selectedDynasty
    };
    
    filters[filterType] = value;
    
    if (filterType === 'period') setSelectedPeriod(value);
    if (filterType === 'empire') setSelectedEmpire(value);
    if (filterType === 'dynasty') setSelectedDynasty(value);
    
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedPeriod('all');
    setSelectedEmpire('all');
    setSelectedDynasty('all');
    onSearch('');
    onFilterChange({
      period: 'all',
      empire: 'all',
      dynasty: 'all'
    });
  };

  const hasActiveFilters = selectedPeriod !== 'all' || selectedEmpire !== 'all' || selectedDynasty !== 'all' || searchQuery;

  return (
    <div className="bg-surface rounded-card border border-earth p-4 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Input
          type="search"
          placeholder="Search countries, rulers, or historical periods..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-3 bg-background border-earth focus:border-primary"
        />
        <Icon
          name="Search"
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="text-text-secondary hover:text-primary"
        >
          Advanced Filters
        </Button>
        
        {hasActiveFilters && (
          <div className="flex items-center space-x-2">
            <span className="text-xs font-body text-text-secondary">
              {[selectedPeriod, selectedEmpire, selectedDynasty].filter(f => f !== 'all').length} active
            </span>
            <Button
              variant="text"
              onClick={handleClearFilters}
              iconName="X"
              iconPosition="left"
              className="text-xs text-error hover:text-error"
            >
              Clear
            </Button>
          </div>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-earth-light">
          {/* Time Period Filter */}
          <div>
            <label className="block text-sm font-body font-semibold text-text-primary mb-2">
              Time Period
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {timePeriods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => handleFilterChange('period', period.value)}
                  className={`text-left px-3 py-2 rounded-subtle text-sm font-body transition-smooth ${
                    selectedPeriod === period.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-text-secondary hover:text-primary hover:bg-surface'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {/* Empire Filter */}
          <div>
            <label className="block text-sm font-body font-semibold text-text-primary mb-2">
              Empire
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {empires.map((empire) => (
                <button
                  key={empire.value}
                  onClick={() => handleFilterChange('empire', empire.value)}
                  className={`text-left px-3 py-2 rounded-subtle text-sm font-body transition-smooth ${
                    selectedEmpire === empire.value
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-background text-text-secondary hover:text-primary hover:bg-surface'
                  }`}
                >
                  {empire.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynasty Filter */}
          <div>
            <label className="block text-sm font-body font-semibold text-text-primary mb-2">
              Dynasty
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {dynasties.map((dynasty) => (
                <button
                  key={dynasty.value}
                  onClick={() => handleFilterChange('dynasty', dynasty.value)}
                  className={`text-left px-3 py-2 rounded-subtle text-sm font-body transition-smooth ${
                    selectedDynasty === dynasty.value
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-background text-text-secondary hover:text-primary hover:bg-surface'
                  }`}
                >
                  {dynasty.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Suggestions */}
      {!isExpanded && (
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-xs font-body text-text-secondary">Quick searches:</span>
          {['Greece', 'Roman Empire', 'Byzantine', 'Medieval'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setSearchQuery(suggestion);
                onSearch(suggestion);
              }}
              className="text-xs font-body text-primary hover:text-primary bg-background hover:bg-surface px-2 py-1 rounded-subtle border border-earth-light transition-smooth"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterControls;