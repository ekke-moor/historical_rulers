import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import CrossReferenceLink from '../../../components/ui/CrossReferenceLink';

const RulerSidebar = ({ ruler }) => {
  const relatedRulers = [
    {
      id: 1,
      name: "Henry VIII",
      relationship: "Father",
      portrait: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=80&fit=crop&crop=face",
      reignPeriod: "1509-1547",
      significance: "High"
    },
    {
      id: 2,
      name: "Mary I",
      relationship: "Half-sister",
      portrait: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=80&h=80&fit=crop&crop=face",
      reignPeriod: "1553-1558",
      significance: "Medium"
    },
    {
      id: 3,
      name: "James I",
      relationship: "Successor",
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      reignPeriod: "1603-1625",
      significance: "High"
    }
  ];

  const timelineEvents = [
    {
      year: "1533",
      event: "Birth",
      type: "personal"
    },
    {
      year: "1558",
      event: "Coronation",
      type: "political"
    },
    {
      year: "1588",
      event: "Spanish Armada",
      type: "military"
    },
    {
      year: "1603",
      event: "Death",
      type: "personal"
    }
  ];

  const quickFacts = [
    {
      label: "Full Name",
      value: "Elizabeth Tudor",
      icon: "User"
    },
    {
      label: "House",
      value: "Tudor",
      icon: "Home"
    },
    {
      label: "Religion",
      value: "Protestant",
      icon: "Church"
    },
    {
      label: "Marital Status",
      value: "Never Married",
      icon: "Heart"
    },
    {
      label: "Successor",
      value: "James I",
      icon: "Crown"
    },
    {
      label: "Burial",
      value: "Westminster Abbey",
      icon: "MapPin"
    }
  ];

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'personal': return 'bg-accent';
      case 'political': return 'bg-primary';
      case 'military': return 'bg-error';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Related Rulers */}
      <div className="bg-surface rounded-card p-6">
        <h3 className="text-lg font-heading font-semibold text-primary mb-4 flex items-center">
          <Icon name="Users" size={20} className="mr-2" />
          Related Rulers
        </h3>
        
        <div className="space-y-4">
          {relatedRulers.map((relatedRuler) => (
            <div key={relatedRuler.id} className="flex items-center gap-3 p-3 bg-background rounded-card hover:shadow-subtle transition-smooth">
              <div className="w-12 h-12 overflow-hidden rounded-card flex-shrink-0">
                <Image
                  src={relatedRuler.portrait}
                  alt={`Portrait of ${relatedRuler.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-body font-semibold text-primary text-sm truncate">
                  {relatedRuler.name}
                </h4>
                <p className="text-xs text-text-secondary font-body">
                  {relatedRuler.relationship}
                </p>
                <p className="text-xs text-accent font-body">
                  {relatedRuler.reignPeriod}
                </p>
              </div>
              
              <CrossReferenceLink
                type="ruler"
                label=""
                entityId={relatedRuler.id}
                showIcon={true}
                className="text-text-secondary hover:text-primary p-1"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-earth">
          <CrossReferenceLink
            type="ruler"
            label="View All Related Rulers"
            className="text-sm font-body"
          />
        </div>
      </div>

      {/* Timeline Placement */}
      <div className="bg-surface rounded-card p-6">
        <h3 className="text-lg font-heading font-semibold text-primary mb-4 flex items-center">
          <Icon name="Clock" size={20} className="mr-2" />
          Timeline Placement
        </h3>
        
        <div className="space-y-3">
          {timelineEvents.map((event, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)} flex-shrink-0`}></div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-body text-text-primary">{event.event}</span>
                  <span className="text-xs font-body text-accent font-semibold">{event.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-earth">
          <CrossReferenceLink
            type="timeline"
            label="Explore Full Timeline"
            className="text-sm font-body"
          />
        </div>
      </div>

      {/* Quick Facts */}
      <div className="bg-surface rounded-card p-6">
        <h3 className="text-lg font-heading font-semibold text-primary mb-4 flex items-center">
          <Icon name="Info" size={20} className="mr-2" />
          Quick Facts
        </h3>
        
        <div className="space-y-3">
          {quickFacts.map((fact, index) => (
            <div key={index} className="flex items-start gap-3">
              <Icon name={fact.icon} size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-secondary font-body">{fact.label}</p>
                <p className="text-sm font-body text-text-primary font-semibold truncate">
                  {fact.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Context */}
      <div className="bg-surface rounded-card p-6">
        <h3 className="text-lg font-heading font-semibold text-primary mb-4 flex items-center">
          <Icon name="BookOpen" size={20} className="mr-2" />
          Historical Context
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-body font-semibold text-text-primary mb-2">
              Era: Renaissance England
            </h4>
            <p className="text-xs text-text-secondary font-body leading-relaxed">
              Elizabeth ruled during the English Renaissance, a period of cultural flowering and maritime expansion.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-body font-semibold text-text-primary mb-2">
              Contemporary Rulers
            </h4>
            <ul className="space-y-1">
              <li className="text-xs text-text-secondary font-body">• Philip II of Spain</li>
              <li className="text-xs text-text-secondary font-body">• Catherine de' Medici (France)</li>
              <li className="text-xs text-text-secondary font-body">• Ivan the Terrible (Russia)</li>
            </ul>
          </div>
          
          <div className="pt-3 border-t border-earth">
            <CrossReferenceLink
              type="timeline"
              label="Explore Renaissance Period"
              className="text-sm font-body"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulerSidebar;