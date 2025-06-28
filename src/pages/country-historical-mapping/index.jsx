import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MapView from './components/MapView';
import CountryDetailsPanel from './components/CountryDetailsPanel';
import FilterControls from './components/FilterControls';

const CountryHistoricalMapping = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [mapMode, setMapMode] = useState('modern');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    period: 'all',
    empire: 'all',
    dynasty: 'all'
  });

  // Auto-select Greece as default for demonstration
  useEffect(() => {
    const defaultCountry = {
      id: 'greece',
      name: 'Greece',
      modernName: 'Greece',
      historicalNames: ['Byzantine Empire', 'Ottoman Greece', 'Ancient Greece']
    };
    setSelectedCountry(defaultCountry);
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleMapModeChange = (mode) => {
    setMapMode(mode);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // In a real application, this would filter the map regions and country data
    console.log('Search query:', query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // In a real application, this would filter the displayed data
    console.log('Filters changed:', newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-6 lg:mx-8 py-6">
        <Breadcrumb />
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-3">
            Country Historical Mapping
          </h1>
          <p className="text-text-secondary font-body text-lg leading-relaxed max-w-4xl">
            Explore the fascinating connections between modern nations and their historical predecessors. 
            Discover how territories evolved through time and trace the lineage of governance from ancient 
            empires to contemporary countries.
          </p>
        </div>

        {/* Filter Controls */}
        <FilterControls 
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Map Section - Left Panel (5 cols on desktop) */}
          <div className="xl:col-span-5">
            <MapView
              selectedCountry={selectedCountry}
              onCountrySelect={handleCountrySelect}
              mapMode={mapMode}
              onMapModeChange={handleMapModeChange}
            />
          </div>

          {/* Details Section - Right Panel (7 cols on desktop) */}
          <div className="xl:col-span-7">
            <CountryDetailsPanel selectedCountry={selectedCountry} />
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-surface rounded-card border border-earth p-6">
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
            About Historical Mapping
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-text-primary">Territorial Evolution</h3>
              <p className="text-text-secondary font-body text-sm">
                Understand how modern borders emerged from historical empires, kingdoms, and city-states 
                through conquest, diplomacy, and cultural transformation.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-text-primary">Governance Lineage</h3>
              <p className="text-text-secondary font-body text-sm">
                Trace the succession of rulers and governing systems that shaped each region, 
                from ancient monarchies to modern democratic institutions.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-text-primary">Cultural Continuity</h3>
              <p className="text-text-secondary font-body text-sm">
                Discover how cultural traditions, languages, and customs persisted or evolved 
                through different historical periods and political changes.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CountryHistoricalMapping;