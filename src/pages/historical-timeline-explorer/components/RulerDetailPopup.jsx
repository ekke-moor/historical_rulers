import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import CrossReferenceLink from '../../../components/ui/CrossReferenceLink';

const RulerDetailPopup = ({ ruler, onClose, onViewFullProfile }) => {
  if (!ruler) return null;

  const getReignDuration = () => {
    return ruler.reignEnd - ruler.reignStart;
  };

  const getRegionIcon = (region) => {
    const icons = {
      'europe': 'MapPin',
      'asia': 'Mountain',
      'africa': 'Sun',
      'americas': 'Trees',
      'oceania': 'Waves',
      'middle-east': 'Compass'
    };
    return icons[region] || 'MapPin';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-earth rounded-card max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-strong">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-earth">
          <div className="flex items-center space-x-3">
            <Icon 
              name={getRegionIcon(ruler.region)} 
              size={24} 
              className="text-primary" 
            />
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              {ruler.name}
            </h2>
          </div>
          <Button
            variant="ghost"
            iconName="X"
            onClick={onClose}
            className="p-2"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Portrait */}
            <div className="md:col-span-1">
              <div className="aspect-square rounded-card overflow-hidden bg-surface border border-earth">
                <Image
                  src={ruler.portrait}
                  alt={`Portrait of ${ruler.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-2 space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-heading font-semibold text-text-primary mb-1">
                    Reign Period
                  </h4>
                  <p className="text-text-secondary font-data">
                    {ruler.reignStart} - {ruler.reignEnd} CE
                  </p>
                  <p className="text-sm text-text-secondary font-body">
                    ({getReignDuration()} years)
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-text-primary mb-1">
                    Dynasty
                  </h4>
                  <p className="text-text-secondary font-body">
                    {ruler.dynasty}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div>
                <h4 className="font-heading font-semibold text-text-primary mb-2">
                  Territory
                </h4>
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Map" size={16} className="text-text-secondary" />
                  <span className="text-text-secondary font-body capitalize">
                    {ruler.region}
                  </span>
                </div>
                <CrossReferenceLink
                  type="country"
                  label={ruler.country}
                  entityId={ruler.countryId}
                  className="text-sm"
                />
              </div>

              {/* Key Achievements */}
              <div>
                <h4 className="font-heading font-semibold text-text-primary mb-2">
                  Notable Achievements
                </h4>
                <ul className="space-y-1">
                  {ruler.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Star" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary font-body text-sm">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brief Description */}
              <div>
                <h4 className="font-heading font-semibold text-text-primary mb-2">
                  Overview
                </h4>
                <p className="text-text-secondary font-body text-sm leading-relaxed">
                  {ruler.description}
                </p>
              </div>
            </div>
          </div>

          {/* Contemporary Rulers */}
          {ruler.contemporaries && ruler.contemporaries.length > 0 && (
            <div className="mt-6 pt-6 border-t border-earth">
              <h4 className="font-heading font-semibold text-text-primary mb-3">
                Contemporary Rulers
              </h4>
              <div className="flex flex-wrap gap-2">
                {ruler.contemporaries.map((contemporary, index) => (
                  <CrossReferenceLink
                    key={index}
                    type="ruler"
                    label={`${contemporary.name} (${contemporary.country})`}
                    entityId={contemporary.id}
                    className="text-sm"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 pt-6 border-t border-earth flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              iconName="User"
              onClick={() => onViewFullProfile(ruler)}
              className="flex-1"
            >
              View Full Profile
            </Button>
            <Button
              variant="secondary"
              iconName="Clock"
              onClick={onClose}
              className="flex-1"
            >
              Back to Timeline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulerDetailPopup;