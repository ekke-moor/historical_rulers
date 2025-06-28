import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import CrossReferenceLink from '../../../components/ui/CrossReferenceLink';

const CountryDetailsPanel = ({ selectedCountry }) => {
  const [activeTab, setActiveTab] = useState('current');

  const mockCountryData = {
    greece: {
      modern: {
        name: 'Greece',
        capital: 'Athens',
        population: '10.7 million',
        area: '131,957 km²',
        government: 'Parliamentary Republic',
        established: '1821 (Independence)',
        flag: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&h=250&fit=crop',
        description: `Modern Greece is a parliamentary republic located in Southeast Europe. The country has a rich cultural heritage spanning thousands of years and is considered the cradle of Western civilization and democracy.\n\nGreece is known for its ancient history, beautiful islands, and significant contributions to philosophy, arts, and sciences.`
      },
      historical: [
        {
          id: 1,
          period: 'Byzantine Empire',
          years: '330-1453 CE',
          ruler: 'Constantine I',
          dynasty: 'Constantinian',
          description: 'Eastern Roman Empire with Constantinople as capital',
          significance: 'Preserved Greek and Roman traditions through the Middle Ages'
        },
        {
          id: 2,
          period: 'Ottoman Greece',
          years: '1453-1821 CE',
          ruler: 'Mehmed II',
          dynasty: 'Ottoman',
          description: 'Greek territories under Ottoman rule',
          significance: 'Period of cultural preservation and eventual independence movement'
        },
        {
          id: 3,
          period: 'Ancient Greece',
          years: '800-146 BCE',
          ruler: 'Various City-States',
          dynasty: 'Multiple',
          description: 'Classical period of Greek civilization',
          significance: 'Foundation of democracy, philosophy, and Western culture'
        }
      ],
      timeline: [
        {
          year: '800 BCE',
          event: 'Rise of Greek City-States',
          type: 'political'
        },
        {
          year: '508 BCE',
          event: 'Athenian Democracy Established',
          type: 'political'
        },
        {
          year: '146 BCE',
          event: 'Roman Conquest',
          type: 'conquest'
        },
        {
          year: '330 CE',
          event: 'Byzantine Empire Begins',
          type: 'political'
        },
        {
          year: '1453 CE',
          event: 'Ottoman Conquest',
          type: 'conquest'
        },
        {
          year: '1821 CE',
          event: 'Greek Independence',
          type: 'independence'
        }
      ]
    }
  };

  if (!selectedCountry) {
    return (
      <div className="bg-surface rounded-card border border-earth p-8 text-center">
        <Icon name="Map" size={48} className="mx-auto text-text-secondary mb-4" />
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          Select a Country
        </h3>
        <p className="text-text-secondary font-body">
          Click on a region in the map to explore its historical connections and modern details.
        </p>
      </div>
    );
  }

  const countryData = mockCountryData[selectedCountry.id] || mockCountryData.greece;

  const tabs = [
    { id: 'current', label: 'Current Country', icon: 'Flag' },
    { id: 'historical', label: 'Historical Rulers', icon: 'Crown' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' }
  ];

  const renderCurrentCountry = () => (
    <div className="space-y-6">
      {/* Country Header */}
      <div className="flex items-start space-x-4">
        <Image
          src={countryData.modern.flag}
          alt={`${countryData.modern.name} flag`}
          className="w-24 h-16 object-cover rounded-subtle border border-earth-light"
        />
        <div className="flex-1">
          <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
            {countryData.modern.name}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm font-body">
            <div>
              <span className="text-text-secondary">Capital:</span>
              <span className="ml-2 text-text-primary font-semibold">{countryData.modern.capital}</span>
            </div>
            <div>
              <span className="text-text-secondary">Population:</span>
              <span className="ml-2 text-text-primary font-semibold">{countryData.modern.population}</span>
            </div>
            <div>
              <span className="text-text-secondary">Area:</span>
              <span className="ml-2 text-text-primary font-semibold">{countryData.modern.area}</span>
            </div>
            <div>
              <span className="text-text-secondary">Government:</span>
              <span className="ml-2 text-text-primary font-semibold">{countryData.modern.government}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-background rounded-subtle p-4 border border-earth-light">
        <h4 className="font-heading font-semibold text-text-primary mb-3">About</h4>
        <p className="text-text-secondary font-body leading-relaxed whitespace-pre-line">
          {countryData.modern.description}
        </p>
      </div>

      {/* Quick Facts */}
      <div className="bg-background rounded-subtle p-4 border border-earth-light">
        <h4 className="font-heading font-semibold text-text-primary mb-3">Quick Facts</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-text-secondary font-body">Established:</span>
            <span className="text-text-primary font-body font-semibold">{countryData.modern.established}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary font-body">Historical Periods:</span>
            <span className="text-text-primary font-body font-semibold">{countryData.historical.length}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHistoricalRulers = () => (
    <div className="space-y-4">
      {countryData.historical.map((period) => (
        <div key={period.id} className="bg-background rounded-subtle border border-earth-light p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-heading font-semibold text-text-primary">{period.period}</h4>
              <p className="text-sm text-text-secondary font-body">{period.years}</p>
            </div>
            <CrossReferenceLink
              type="ruler"
              label="View Profile"
              entityId={period.ruler}
              className="text-xs"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-3 text-sm font-body">
            <div>
              <span className="text-text-secondary">Ruler:</span>
              <span className="ml-2 text-text-primary font-semibold">{period.ruler}</span>
            </div>
            <div>
              <span className="text-text-secondary">Dynasty:</span>
              <span className="ml-2 text-text-primary font-semibold">{period.dynasty}</span>
            </div>
          </div>
          
          <p className="text-text-secondary font-body text-sm mb-2">{period.description}</p>
          
          <div className="bg-surface rounded-subtle p-3 border-l-4 border-primary">
            <p className="text-text-primary font-body text-sm">
              <strong>Historical Significance:</strong> {period.significance}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTimeline = () => (
    <div className="space-y-4">
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
        
        {countryData.timeline.map((event, index) => (
          <div key={index} className="relative flex items-start space-x-4 pb-6">
            {/* Timeline Dot */}
            <div className={`relative z-10 w-8 h-8 rounded-full border-2 border-background flex items-center justify-center ${
              event.type === 'political' ? 'bg-primary' :
              event.type === 'conquest' ? 'bg-error' :
              event.type === 'independence' ? 'bg-success' : 'bg-secondary'
            }`}>
              <Icon 
                name={
                  event.type === 'political' ? 'Crown' :
                  event.type === 'conquest' ? 'Sword' :
                  event.type === 'independence' ? 'Flag' : 'Calendar'
                } 
                size={14} 
                color="white" 
              />
            </div>
            
            {/* Event Content */}
            <div className="flex-1 bg-background rounded-subtle border border-earth-light p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-heading font-semibold text-text-primary">{event.event}</h4>
                <span className="text-sm font-body text-text-secondary bg-surface px-2 py-1 rounded-subtle">
                  {event.year}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-block w-2 h-2 rounded-full ${
                  event.type === 'political' ? 'bg-primary' :
                  event.type === 'conquest' ? 'bg-error' :
                  event.type === 'independence' ? 'bg-success' : 'bg-secondary'
                }`}></span>
                <span className="text-sm font-body text-text-secondary capitalize">{event.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-surface rounded-card border border-earth p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Country Details
        </h3>
        <div className="flex items-center space-x-2 text-sm font-body text-text-secondary">
          <Icon name="MapPin" size={16} />
          <span>{selectedCountry.modernName}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-background rounded-subtle p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-subtle transition-smooth font-body text-sm ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-text-secondary hover:text-primary hover:bg-surface'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {activeTab === 'current' && renderCurrentCountry()}
        {activeTab === 'historical' && renderHistoricalRulers()}
        {activeTab === 'timeline' && renderTimeline()}
      </div>
    </div>
  );
};

export default CountryDetailsPanel;