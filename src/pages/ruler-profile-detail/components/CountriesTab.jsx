import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import CrossReferenceLink from '../../../components/ui/CrossReferenceLink';

const CountriesTab = ({ ruler }) => {
  const [selectedTerritory, setSelectedTerritory] = useState(null);

  const territories = [
    {
      id: 1,
      name: "Kingdom of England",
      modernEquivalent: "England, United Kingdom",
      status: "Primary Domain",
      acquisitionYear: "1558",
      acquisitionMethod: "Inheritance",
      area: "130,279 km²",
      population: "~4 million",
      capital: "London",
      description: `The Kingdom of England was Elizabeth's primary domain, inherited upon her accession to the throne. During her reign, England transformed from a relatively minor European power into a major maritime and commercial force.\n\nElizabeth's England saw unprecedented economic growth, cultural flowering, and military success. The defeat of the Spanish Armada in 1588 established England as a major naval power.`,
      keyFeatures: [
        "Westminster Palace - Seat of government",
        "Tower of London - Royal fortress and prison",
        "Greenwich Palace - Elizabeth\'s birthplace",
        "Hampton Court - Royal residence"
      ],
      economicImportance: "Very High",
      strategicValue: "Critical"
    },
    {
      id: 2,
      name: "Principality of Wales",
      modernEquivalent: "Wales, United Kingdom",
      status: "Incorporated Territory",
      acquisitionYear: "1558",
      acquisitionMethod: "Inheritance",
      area: "20,779 km²",
      population: "~300,000",
      capital: "Caernarfon",
      description: `Wales had been incorporated into the Kingdom of England by the Laws in Wales Acts of 1535 and 1542, during the reign of Elizabeth's father, Henry VIII.\n\nDuring Elizabeth's reign, Wales was administered as part of England, with English law and administration extending throughout the principality. The Welsh gentry largely supported Elizabeth's rule.`,
      keyFeatures: [
        "Caernarfon Castle - Administrative center",
        "Conwy Castle - Strategic fortress",
        "Cardiff - Major port town",
        "Anglesey - Agricultural region"
      ],
      economicImportance: "Medium",
      strategicValue: "Medium"
    },
    {
      id: 3,
      name: "Pale of Calais",
      modernEquivalent: "Calais, France",
      status: "Lost Territory",
      acquisitionYear: "Lost 1558",
      acquisitionMethod: "Lost to France",
      area: "~200 km²",
      population: "~10,000",
      capital: "Calais",
      description: `The Pale of Calais was England's last continental possession, lost to France in January 1558, just before Elizabeth's accession. The loss occurred during the reign of her predecessor, Mary I.\n\nCalais had been in English hands since 1347 and was considered the 'brightest jewel in the English crown.' Its loss was a significant blow to English prestige and marked the end of English territorial holdings in continental Europe.`,
      keyFeatures: [
        "Calais Castle - Former English stronghold",
        "Port of Calais - Strategic harbor",
        "English Pale - Fortified territory",
        "Guînes - Subsidiary fortress"
      ],
      economicImportance: "High",
      strategicValue: "Very High"
    },
    {
      id: 4,
      name: "Kingdom of Ireland",
      modernEquivalent: "Republic of Ireland, Northern Ireland",
      status: "Contested Territory",
      acquisitionYear: "1171",
      acquisitionMethod: "Conquest/Inheritance",
      area: "84,421 km²",
      population: "~1 million",
      capital: "Dublin",
      description: `Ireland was a constant challenge during Elizabeth's reign. The Nine Years' War (1594-1603) saw major Irish lords rebel against English rule, supported by Spain.\n\nElizabeth's forces, led by Lord Mountjoy, eventually defeated the rebellion at the Battle of Kinsale in 1601. The war was costly and consumed much of Elizabeth's later reign.`,
      keyFeatures: [
        "Dublin Castle - English administrative center",
        "Cork - Major port city",
        "Ulster - Rebellious northern province",
        "Munster - Plantation region"
      ],
      economicImportance: "Medium",
      strategicValue: "High"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Primary Domain': return 'bg-success text-success-foreground';
      case 'Incorporated Territory': return 'bg-accent text-accent-foreground';
      case 'Lost Territory': return 'bg-error text-error-foreground';
      case 'Contested Territory': return 'bg-warning text-warning-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'Very High': return 'text-success';
      case 'High': return 'text-accent';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface rounded-card p-4 text-center">
          <Icon name="Map" size={24} className="text-accent mx-auto mb-2" />
          <p className="text-xl font-heading font-bold text-primary">4</p>
          <p className="text-sm text-text-secondary font-body">Territories</p>
        </div>
        
        <div className="bg-surface rounded-card p-4 text-center">
          <Icon name="Users" size={24} className="text-accent mx-auto mb-2" />
          <p className="text-xl font-heading font-bold text-primary">5.3M</p>
          <p className="text-sm text-text-secondary font-body">Total Population</p>
        </div>
        
        <div className="bg-surface rounded-card p-4 text-center">
          <Icon name="Maximize" size={24} className="text-accent mx-auto mb-2" />
          <p className="text-xl font-heading font-bold text-primary">235K</p>
          <p className="text-sm text-text-secondary font-body">Area (km²)</p>
        </div>
        
        <div className="bg-surface rounded-card p-4 text-center">
          <Icon name="Crown" size={24} className="text-accent mx-auto mb-2" />
          <p className="text-xl font-heading font-bold text-primary">45</p>
          <p className="text-sm text-text-secondary font-body">Years Ruled</p>
        </div>
      </div>

      {/* Territories List */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-primary mb-6">
          Territories and Domains
        </h3>
        
        <div className="space-y-4">
          {territories.map((territory) => (
            <div
              key={territory.id}
              className={`
                bg-surface rounded-card p-6 cursor-pointer transition-smooth border-2
                ${selectedTerritory === territory.id 
                  ? 'border-primary shadow-medium' 
                  : 'border-transparent hover:border-earth'
                }
              `}
              onClick={() => setSelectedTerritory(
                selectedTerritory === territory.id ? null : territory.id
              )}
            >
              {/* Territory Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-heading font-semibold text-primary">
                      {territory.name}
                    </h4>
                    <span className={`px-2 py-1 rounded-subtle text-xs font-body font-semibold ${getStatusColor(territory.status)}`}>
                      {territory.status}
                    </span>
                  </div>
                  
                  <p className="text-text-secondary font-body mb-2">
                    Modern equivalent: <span className="text-primary font-semibold">{territory.modernEquivalent}</span>
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-text-secondary font-body">
                      <strong>Capital:</strong> {territory.capital}
                    </span>
                    <span className="text-text-secondary font-body">
                      <strong>Area:</strong> {territory.area}
                    </span>
                    <span className="text-text-secondary font-body">
                      <strong>Population:</strong> {territory.population}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Icon 
                    name={selectedTerritory === territory.id ? "ChevronUp" : "ChevronDown"} 
                    size={20} 
                    className="text-text-secondary"
                  />
                </div>
              </div>

              {/* Expanded Content */}
              {selectedTerritory === territory.id && (
                <div className="pt-4 border-t border-earth space-y-6">
                  {/* Description */}
                  <div>
                    <h5 className="font-body font-semibold text-text-primary mb-3">
                      Historical Context
                    </h5>
                    <p className="text-text-primary font-body leading-relaxed whitespace-pre-line">
                      {territory.description}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Key Features */}
                    <div>
                      <h5 className="font-body font-semibold text-text-primary mb-3">
                        Key Features & Locations
                      </h5>
                      <ul className="space-y-2">
                        {territory.keyFeatures.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Icon name="MapPin" size={14} className="text-accent mt-1 flex-shrink-0" />
                            <span className="text-text-primary font-body text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Strategic Information */}
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-body font-semibold text-text-primary mb-3">
                          Strategic Assessment
                        </h5>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-text-secondary font-body text-sm">Economic Importance:</span>
                            <span className={`font-body font-semibold text-sm ${getImportanceColor(territory.economicImportance)}`}>
                              {territory.economicImportance}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-text-secondary font-body text-sm">Strategic Value:</span>
                            <span className={`font-body font-semibold text-sm ${getImportanceColor(territory.strategicValue)}`}>
                              {territory.strategicValue}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-text-secondary font-body text-sm">Acquisition:</span>
                            <span className="text-text-primary font-body font-semibold text-sm">
                              {territory.acquisitionMethod} ({territory.acquisitionYear})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Cross Reference */}
                      <div className="pt-3 border-t border-earth-light">
                        <CrossReferenceLink
                          type="country"
                          label={`Explore ${territory.name} History`}
                          entityId={territory.id}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="bg-background rounded-card p-4">
                    <h5 className="font-body font-semibold text-text-primary mb-3">
                      Territory Map
                    </h5>
                    <div className="w-full h-48 bg-earth-light rounded-card flex items-center justify-center">
                      <div className="text-center">
                        <Icon name="Map" size={32} className="text-text-secondary mx-auto mb-2" />
                        <p className="text-text-secondary font-body text-sm">
                          Interactive map of {territory.name}
                        </p>
                        <p className="text-text-secondary font-body text-xs">
                          (Historical boundaries and modern overlay)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Historical Context */}
      <div className="bg-surface rounded-card p-6">
        <h3 className="text-lg font-heading font-semibold text-primary mb-4">
          Territorial Legacy
        </h3>
        <p className="text-text-primary font-body leading-relaxed">
          Elizabeth I's territorial holdings formed the foundation of what would become the British Empire. 
          While she lost Calais and faced constant challenges in Ireland, her successful defense of England 
          and the defeat of the Spanish Armada established England as a major European power. The economic 
          and cultural growth during her reign set the stage for England's later colonial expansion under 
          the Stuart and Hanoverian monarchs.
        </p>
      </div>
    </div>
  );
};

export default CountriesTab;