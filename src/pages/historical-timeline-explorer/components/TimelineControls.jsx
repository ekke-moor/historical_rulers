import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineControls = ({
  isPlaying,
  onPlayPause,
  currentYear,
  onYearChange,
  zoomLevel,
  onZoomChange,
  onBookmark,
  showEvents,
  onToggleEvents
}) => {
  const zoomLevels = [
    { value: 'centuries', label: 'Centuries', icon: 'ZoomOut' },
    { value: 'decades', label: 'Decades', icon: 'Minus' },
    { value: 'years', label: 'Years', icon: 'ZoomIn' }
  ];

  return (
    <div className="bg-surface border border-earth rounded-card p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Playback Controls */}
        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            iconName={isPlaying ? "Pause" : "Play"}
            onClick={onPlayPause}
            className="px-4"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={18} className="text-text-secondary" />
            <span className="font-data text-lg font-semibold text-primary">
              {currentYear} CE
            </span>
          </div>
          
          <Button
            variant="ghost"
            iconName="Bookmark"
            onClick={onBookmark}
            className="px-3"
          >
            Bookmark
          </Button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary font-body">Zoom:</span>
          {zoomLevels.map((level) => (
            <Button
              key={level.value}
              variant={zoomLevel === level.value ? "primary" : "ghost"}
              iconName={level.icon}
              onClick={() => onZoomChange(level.value)}
              className="px-3"
            >
              {level.label}
            </Button>
          ))}
        </div>

        {/* Display Options */}
        <div className="flex items-center space-x-3">
          <Button
            variant={showEvents ? "primary" : "ghost"}
            iconName="Star"
            onClick={onToggleEvents}
            className="px-3"
          >
            Events
          </Button>
          
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary font-body">
              Drag to pan • Scroll to zoom
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineControls;