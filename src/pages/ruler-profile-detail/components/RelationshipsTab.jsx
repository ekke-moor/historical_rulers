import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import CrossReferenceLink from '../../../components/ui/CrossReferenceLink';

const RelationshipsTab = ({ ruler }) => {
  const [selectedRelationshipType, setSelectedRelationshipType] = useState('family');

  const familyRelationships = [
    {
      id: 1,
      name: "Henry VIII",
      relationship: "Father",
      portrait: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=face",
      reignPeriod: "1509-1547",
      description: "King of England, founder of the Church of England. Elizabeth\'s relationship with her father was complex, as he had her mother executed and declared Elizabeth illegitimate.",
      significance: "High"
    },
    {
      id: 2,
      name: "Anne Boleyn",
      relationship: "Mother",
      portrait: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=150&h=150&fit=crop&crop=face",
      reignPeriod: "1533-1536",
      description: "Second wife of Henry VIII and Queen of England. Executed on charges of treason when Elizabeth was two years old. Her death profoundly affected Elizabeth's views on marriage.",
      significance: "Very High"
    },
    {
      id: 3,
      name: "Mary I",
      relationship: "Half-sister",
      portrait: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
      reignPeriod: "1553-1558",
      description: "Catholic Queen who preceded Elizabeth. Known as 'Bloody Mary' for her persecution of Protestants. Elizabeth inherited the throne upon Mary's death.",
      significance: "High"
    },
    {
      id: 4,
      name: "Edward VI",
      relationship: "Half-brother",
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      reignPeriod: "1547-1553",
      description: "Protestant King who ruled before Mary I. Elizabeth was close to Edward and shared his Protestant faith. His early death led to the succession crisis.",
      significance: "Medium"
    }
  ];

  const politicalAlliances = [
    {
      id: 1,
      name: "William Cecil",
      title: "Chief Advisor",
      portrait: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      period: "1558-1598",
      description: "Elizabeth's most trusted advisor and Secretary of State. He helped establish the Elizabethan religious settlement and guided foreign policy throughout most of her reign.",
      relationship: "Trusted Advisor",
      significance: "Very High"
    },
    {
      id: 2,
      name: "Robert Dudley",
      title: "Earl of Leicester",
      portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      period: "1558-1588",
      description: "Elizabeth\'s closest friend and rumored romantic interest. Master of the Horse and later Earl of Leicester. Their relationship was the subject of much court gossip.",
      relationship: "Close Friend",
      significance: "High"
    },
    {
      id: 3,
      name: "Francis Walsingham",
      title: "Spymaster",
      portrait: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      period: "1573-1590",
      description: "Elizabeth's intelligence chief who uncovered numerous Catholic plots against her life. His spy network was crucial in protecting Elizabeth and gathering foreign intelligence.",
      relationship: "Security Advisor",
      significance: "High"
    }
  ];

  const diplomaticRelations = [
    {
      id: 1,
      country: "Spain",
      ruler: "Philip II",
      portrait: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
      relationship: "Adversary",
      period: "1556-1598",
      description: "Former brother-in-law who became Elizabeth\'s greatest enemy. Their conflict culminated in the Spanish Armada invasion attempt of 1588.",
      keyEvents: ["Spanish Armada", "Netherlands Intervention", "Trade Wars"]
    },
    {
      id: 2,
      country: "France",
      ruler: "Catherine de\' Medici",
      portrait: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=150&h=150&fit=crop&crop=face",
      relationship: "Cautious Ally",
      period: "1560-1589",
      description: "Queen Mother of France with whom Elizabeth maintained complex diplomatic relations. Both were powerful women navigating male-dominated politics.",
      keyEvents: ["Marriage Negotiations", "Religious Wars", "Scottish Affairs"]
    },
    {
      id: 3,
      country: "Scotland",
      ruler: "Mary Queen of Scots",
      portrait: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
      relationship: "Rival/Cousin",
      period: "1542-1587",
      description: "Elizabeth\'s cousin and rival claimant to the English throne. Their relationship was marked by political intrigue and ended with Mary\'s execution.",
      keyEvents: ["Babington Plot", "Execution", "Succession Claims"]
    }
  ];

  const relationshipTypes = [
    { id: 'family', label: 'Family', icon: 'Users', data: familyRelationships },
    { id: 'political', label: 'Political Allies', icon: 'Handshake', data: politicalAlliances },
    { id: 'diplomatic', label: 'Diplomatic Relations', icon: 'Globe', data: diplomaticRelations }
  ];

  const currentData = relationshipTypes.find(type => type.id === selectedRelationshipType)?.data || [];

  const getSignificanceColor = (significance) => {
    switch (significance) {
      case 'Very High': return 'text-success';
      case 'High': return 'text-accent';
      case 'Medium': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getRelationshipColor = (relationship) => {
    if (relationship.includes('Adversary') || relationship.includes('Rival')) return 'text-error';
    if (relationship.includes('Ally') || relationship.includes('Friend')) return 'text-success';
    return 'text-primary';
  };

  return (
    <div className="space-y-6">
      {/* Relationship Type Selector */}
      <div className="flex flex-wrap gap-2">
        {relationshipTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedRelationshipType(type.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-card transition-smooth
              ${selectedRelationshipType === type.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface text-text-secondary hover:bg-surface/80 hover:text-primary'
              }
            `}
          >
            <Icon name={type.icon} size={18} />
            <span className="font-body">{type.label}</span>
          </button>
        ))}
      </div>

      {/* Relationships Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentData.map((person) => (
          <div key={person.id} className="bg-surface rounded-card p-6 shadow-subtle">
            <div className="flex gap-4 mb-4">
              {/* Portrait */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 overflow-hidden rounded-card">
                  <Image
                    src={person.portrait}
                    alt={`Portrait of ${person.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-heading font-semibold text-primary">
                      {person.name}
                    </h4>
                    {person.title && (
                      <p className="text-sm text-text-secondary font-body">
                        {person.title}
                      </p>
                    )}
                  </div>
                  
                  {person.significance && (
                    <span className={`text-xs font-body font-semibold ${getSignificanceColor(person.significance)}`}>
                      {person.significance}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <p className={`text-sm font-body font-semibold ${getRelationshipColor(person.relationship)}`}>
                    {person.relationship}
                  </p>
                  <p className="text-sm text-text-secondary font-body">
                    {person.reignPeriod || person.period}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-text-primary font-body text-sm leading-relaxed mb-4">
              {person.description}
            </p>

            {/* Key Events (for diplomatic relations) */}
            {person.keyEvents && (
              <div>
                <h5 className="font-body font-semibold text-text-primary mb-2 text-sm">
                  Key Events
                </h5>
                <div className="flex flex-wrap gap-1">
                  {person.keyEvents.map((event, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-background text-text-secondary rounded-subtle text-xs font-body"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Cross-reference link */}
            <div className="mt-4 pt-4 border-t border-earth">
              <CrossReferenceLink
                type="ruler"
                label={`View ${person.name}'s Profile`}
                entityId={person.id}
                className="text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Family Tree Visualization (for family relationships) */}
      {selectedRelationshipType === 'family' && (
        <div className="bg-surface rounded-card p-6">
          <h3 className="text-lg font-heading font-semibold text-primary mb-4">
            Tudor Family Tree
          </h3>
          
          <div className="text-center space-y-4">
            <div className="text-sm text-text-secondary font-body">
              Simplified family relationships showing direct lineage
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              {/* Henry VIII */}
              <div className="bg-background rounded-card p-3 border-2 border-primary">
                <span className="font-body font-semibold text-primary">Henry VIII</span>
                <span className="text-xs text-text-secondary block">Father</span>
              </div>
              
              {/* Children */}
              <div className="flex justify-center space-x-8">
                <div className="bg-background rounded-card p-2 border border-earth">
                  <span className="font-body text-sm text-text-primary">Mary I</span>
                  <span className="text-xs text-text-secondary block">Half-sister</span>
                </div>
                
                <div className="bg-accent rounded-card p-2 border-2 border-accent">
                  <span className="font-body text-sm text-accent-foreground font-semibold">Elizabeth I</span>
                  <span className="text-xs text-accent-foreground block">Current</span>
                </div>
                
                <div className="bg-background rounded-card p-2 border border-earth">
                  <span className="font-body text-sm text-text-primary">Edward VI</span>
                  <span className="text-xs text-text-secondary block">Half-brother</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelationshipsTab;