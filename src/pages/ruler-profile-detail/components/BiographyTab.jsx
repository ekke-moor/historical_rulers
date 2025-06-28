import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BiographyTab = ({ ruler }) => {
  const [expandedEvents, setExpandedEvents] = useState(new Set());

  const toggleEvent = (eventId) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedEvents(newExpanded);
  };

  const lifeEvents = [
    {
      id: 1,
      year: "1533",
      title: "Birth",
      summary: "Born in Greenwich Palace, England",
      details: `Elizabeth was born at Greenwich Palace on 7 September 1533, the daughter of Henry VIII and his second wife, Anne Boleyn. Her birth was a disappointment to Henry VIII, who had desperately wanted a male heir to secure the Tudor succession.\n\nDespite being declared illegitimate when her mother was executed in 1536, Elizabeth received an excellent education. She was tutored by leading scholars of the time and became fluent in French, Italian, Latin, and Greek.`
    },
    {
      id: 2,
      year: "1558",
      title: "Ascension to Throne",
      summary: "Became Queen of England at age 25",
      details: `Elizabeth ascended to the throne on 17 November 1558 upon the death of her half-sister Mary I. At 25 years old, she inherited a country that was religiously divided, financially struggling, and threatened by foreign powers.\n\nHer coronation took place on 15 January 1559 at Westminster Abbey. She was crowned by Owen Oglethorpe, the Bishop of Carlisle, as most bishops refused to perform the ceremony due to religious differences.`
    },
    {
      id: 3,
      year: "1588",
      title: "Spanish Armada Victory",
      summary: "Defeated the Spanish invasion fleet",
      details: `The defeat of the Spanish Armada in 1588 was one of Elizabeth's greatest triumphs. Philip II of Spain had assembled a massive fleet to invade England and restore Catholic rule.\n\nElizabeth's famous speech to the troops at Tilbury demonstrated her courage and leadership: "I know I have the body of a weak, feeble woman; but I have the heart and stomach of a king, and of a king of England too."`
    },
    {
      id: 4,
      year: "1603",
      title: "Death",
      summary: "Died at Richmond Palace, aged 69",
      details: `Elizabeth I died on 24 March 1603 at Richmond Palace, aged 69. She had reigned for 45 years, transforming England into a major European power and ushering in a golden age of English culture.\n\nShe never married and had no children, earning her the nickname "The Virgin Queen." The throne passed to James VI of Scotland, who became James I of England, uniting the English and Scottish crowns.`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-surface rounded-card p-6">
        <h3 className="text-xl font-heading font-semibold text-primary mb-4">
          Overview
        </h3>
        <p className="text-text-primary font-body leading-relaxed">
          {ruler.biography}
        </p>
      </div>

      {/* Life Events Timeline */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-primary mb-6">
          Life Events
        </h3>
        
        <div className="space-y-4">
          {lifeEvents.map((event, index) => {
            const isExpanded = expandedEvents.has(event.id);
            
            return (
              <div key={event.id} className="relative">
                {/* Timeline Line */}
                {index < lifeEvents.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-border-light"></div>
                )}
                
                <div className="flex gap-4">
                  {/* Timeline Dot */}
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-body font-semibold text-sm">
                      {event.year.slice(-2)}
                    </span>
                  </div>
                  
                  {/* Event Content */}
                  <div className="flex-1 bg-surface rounded-card p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-heading font-semibold text-primary">
                          {event.title}
                        </h4>
                        <p className="text-sm text-accent font-body font-semibold">
                          {event.year}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => toggleEvent(event.id)}
                        className="p-1 text-text-secondary hover:text-primary transition-smooth"
                      >
                        <Icon 
                          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                          size={20} 
                        />
                      </button>
                    </div>
                    
                    <p className="text-text-primary font-body mb-3">
                      {event.summary}
                    </p>
                    
                    {isExpanded && (
                      <div className="pt-3 border-t border-earth">
                        <p className="text-text-primary font-body leading-relaxed whitespace-pre-line">
                          {event.details}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personal Characteristics */}
      <div className="bg-surface rounded-card p-6">
        <h3 className="text-xl font-heading font-semibold text-primary mb-4">
          Personal Characteristics
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-body font-semibold text-text-primary mb-3">
              Physical Description
            </h4>
            <ul className="space-y-2 text-text-primary font-body">
              <li>• Tall and slender build</li>
              <li>• Red-gold hair (inherited from Henry VIII)</li>
              <li>• Pale complexion with high cheekbones</li>
              <li>• Known for elaborate court dress and jewelry</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-body font-semibold text-text-primary mb-3">
              Personality Traits
            </h4>
            <ul className="space-y-2 text-text-primary font-body">
              <li>• Highly intelligent and well-educated</li>
              <li>• Politically astute and diplomatic</li>
              <li>• Strong-willed and independent</li>
              <li>• Patron of arts and literature</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiographyTab;