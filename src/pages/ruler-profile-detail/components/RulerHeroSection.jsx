import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RulerHeroSection = ({ ruler, onBookmark, onShare, isBookmarked }) => {
  return (
    <div className="bg-surface rounded-card p-6 lg:p-8 shadow-subtle mb-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Portrait */}
        <div className="flex-shrink-0">
          <div className="w-48 h-64 lg:w-56 lg:h-72 mx-auto lg:mx-0 overflow-hidden rounded-card shadow-medium">
            <Image
              src={ruler.portrait}
              alt={`Portrait of ${ruler.name}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Biographical Information */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-2">
              {ruler.name}
            </h1>
            <p className="text-lg text-text-secondary font-body">
              {ruler.title}
            </p>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={18} className="text-accent" />
                <div>
                  <p className="text-sm text-text-secondary font-body">Reign Period</p>
                  <p className="font-semibold text-text-primary">{ruler.reignPeriod}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Crown" size={18} className="text-accent" />
                <div>
                  <p className="text-sm text-text-secondary font-body">Dynasty</p>
                  <p className="font-semibold text-text-primary">{ruler.dynasty}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={18} className="text-accent" />
                <div>
                  <p className="text-sm text-text-secondary font-body">Primary Territory</p>
                  <p className="font-semibold text-text-primary">{ruler.primaryTerritory}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={18} className="text-accent" />
                <div>
                  <p className="text-sm text-text-secondary font-body">Era</p>
                  <p className="font-semibold text-text-primary">{ruler.era}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Button
              variant={isBookmarked ? "primary" : "outline"}
              iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
              iconPosition="left"
              onClick={onBookmark}
            >
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
            
            <Button
              variant="secondary"
              iconName="Share2"
              iconPosition="left"
              onClick={onShare}
            >
              Share Profile
            </Button>
            
            <Button
              variant="ghost"
              iconName="ExternalLink"
              iconPosition="right"
            >
              View Timeline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulerHeroSection;