import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import CrossReferenceLink from '../../../components/ui/CrossReferenceLink';

const ReignTab = ({ ruler }) => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const achievements = [
    {
      id: 1,
      category: "Military",
      title: "Defeat of Spanish Armada",
      year: "1588",
      impact: "High",
      description: `The defeat of the Spanish Armada was Elizabeth's greatest military triumph. The victory established England as a major naval power and protected Protestant England from Catholic invasion.\n\nThe English fleet, led by Sir Francis Drake and Lord Howard, used superior tactics and favorable weather to defeat the much larger Spanish force. This victory marked the beginning of English naval supremacy.`,
      territories: ["English Channel", "North Sea"],
      allies: ["Dutch Republic", "French Huguenots"]
    },
    {
      id: 2,
      category: "Economic",
      title: "Trade Expansion",
      year: "1560-1603",
      impact: "High",
      description: `Elizabeth's reign saw unprecedented expansion of English trade. She chartered the Muscovy Company, the Eastland Company, and the Levant Company, opening new markets across Europe and beyond.\n\nThe establishment of the East India Company in 1600 laid the foundation for England's later colonial empire. Trade revenues increased dramatically during her reign.`,
      territories: ["Russia", "Baltic States", "Ottoman Empire", "India"],
      allies: ["Merchant Guilds", "Trading Companies"]
    },
    {
      id: 3,
      category: "Cultural",
      title: "Elizabethan Golden Age",
      year: "1558-1603",
      impact: "Very High",
      description: `The Elizabethan era is considered a golden age of English culture. Literature, theater, and music flourished under Elizabeth's patronage.\n\nWilliam Shakespeare, Christopher Marlowe, and Edmund Spenser produced their greatest works during this period. The Globe Theatre became the center of English drama.`,
      territories: ["London", "Stratford-upon-Avon", "Canterbury"],
      allies: ["Court Artists", "Theater Companies", "Musicians"]
    }
  ];

  const territorialChanges = [
    {
      year: "1558",
      action: "Inherited",
      territory: "Kingdom of England",
      details: "Inherited the throne with existing English territories including Wales"
    },
    {
      year: "1560",
      action: "Secured",
      territory: "Northern England",
      details: "Strengthened border defenses against Scottish incursions"
    },
    {
      year: "1585",
      action: "Supported",
      territory: "Dutch Provinces",
      details: "Provided military support to Dutch rebels against Spanish rule"
    },
    {
      year: "1601",
      action: "Suppressed",
      territory: "Ireland",
      details: "Defeated the Nine Years\' War rebellion led by Hugh O\'Neill"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Reign Overview */}
      <div className="bg-surface rounded-card p-6">
        <h3 className="text-xl font-heading font-semibold text-primary mb-4">
          Reign Overview
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-background rounded-card">
            <Icon name="Calendar" size={32} className="text-accent mx-auto mb-2" />
            <p className="text-2xl font-heading font-bold text-primary">45</p>
            <p className="text-text-secondary font-body">Years Reigned</p>
          </div>
          
          <div className="text-center p-4 bg-background rounded-card">
            <Icon name="Sword" size={32} className="text-accent mx-auto mb-2" />
            <p className="text-2xl font-heading font-bold text-primary">12</p>
            <p className="text-text-secondary font-body">Major Conflicts</p>
          </div>
          
          <div className="text-center p-4 bg-background rounded-card">
            <Icon name="TrendingUp" size={32} className="text-accent mx-auto mb-2" />
            <p className="text-2xl font-heading font-bold text-primary">300%</p>
            <p className="text-text-secondary font-body">Trade Growth</p>
          </div>
        </div>
      </div>

      {/* Major Achievements */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-primary mb-6">
          Major Achievements
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`
                bg-surface rounded-card p-4 cursor-pointer transition-smooth border-2
                ${selectedAchievement === achievement.id 
                  ? 'border-primary shadow-medium' 
                  : 'border-transparent hover:border-earth'
                }
              `}
              onClick={() => setSelectedAchievement(
                selectedAchievement === achievement.id ? null : achievement.id
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className={`
                    inline-block px-2 py-1 rounded-subtle text-xs font-body font-semibold mb-2
                    ${achievement.category === 'Military' ? 'bg-error text-error-foreground' :
                      achievement.category === 'Economic' ? 'bg-success text-success-foreground' :
                      'bg-accent text-accent-foreground'}
                  `}>
                    {achievement.category}
                  </span>
                  <h4 className="font-heading font-semibold text-primary">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-text-secondary font-body">
                    {achievement.year}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`
                    text-xs font-body font-semibold
                    ${achievement.impact === 'Very High' ? 'text-success' :
                      achievement.impact === 'High'? 'text-accent' : 'text-text-secondary'}
                  `}>
                    {achievement.impact} Impact
                  </span>
                  <Icon 
                    name={selectedAchievement === achievement.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-text-secondary"
                  />
                </div>
              </div>
              
              {selectedAchievement === achievement.id && (
                <div className="pt-3 border-t border-earth space-y-4">
                  <p className="text-text-primary font-body leading-relaxed whitespace-pre-line">
                    {achievement.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-body font-semibold text-text-primary mb-2">
                        Affected Territories
                      </h5>
                      <div className="space-y-1">
                        {achievement.territories.map((territory, index) => (
                          <CrossReferenceLink
                            key={index}
                            type="country"
                            label={territory}
                            className="block text-sm"
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-body font-semibold text-text-primary mb-2">
                        Key Allies
                      </h5>
                      <ul className="space-y-1">
                        {achievement.allies.map((ally, index) => (
                          <li key={index} className="text-sm text-text-primary font-body">
                            • {ally}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Territorial Changes */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-primary mb-6">
          Territorial Changes
        </h3>
        
        <div className="bg-surface rounded-card p-6">
          <div className="space-y-4">
            {territorialChanges.map((change, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-earth last:border-b-0 last:pb-0">
                <div className="flex-shrink-0 w-16 text-center">
                  <span className="text-accent font-body font-semibold">
                    {change.year}
                  </span>
                </div>
                
                <div className="flex-shrink-0">
                  <span className={`
                    inline-block px-2 py-1 rounded-subtle text-xs font-body font-semibold
                    ${change.action === 'Inherited' ? 'bg-accent text-accent-foreground' :
                      change.action === 'Secured' ? 'bg-success text-success-foreground' :
                      change.action === 'Supported' ? 'bg-secondary text-secondary-foreground' :
                      'bg-warning text-warning-foreground'}
                  `}>
                    {change.action}
                  </span>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-body font-semibold text-primary mb-1">
                    {change.territory}
                  </h4>
                  <p className="text-text-primary font-body text-sm">
                    {change.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReignTab;