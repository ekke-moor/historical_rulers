import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const CrossReferenceLink = ({ 
  type, 
  label, 
  entityId = null, 
  className = '', 
  showIcon = true,
  inline = true 
}) => {
  const navigate = useNavigate();

  const getLinkConfig = (type) => {
    const configs = {
      ruler: {
        path: '/ruler-profile-detail',
        icon: 'Crown',
        tooltip: 'View ruler profile',
        color: 'text-primary hover:text-primary'
      },
      country: {
        path: '/country-historical-mapping',
        icon: 'Map',
        tooltip: 'Explore country mapping',
        color: 'text-secondary hover:text-primary'
      },
      timeline: {
        path: '/historical-timeline-explorer',
        icon: 'Clock',
        tooltip: 'Navigate to timeline',
        color: 'text-accent hover:text-primary'
      },
      period: {
        path: '/historical-timeline-explorer',
        icon: 'Calendar',
        tooltip: 'View historical period',
        color: 'text-accent hover:text-primary'
      }
    };

    return configs[type] || configs.ruler;
  };

  const handleClick = (e) => {
    e.preventDefault();
    const config = getLinkConfig(type);
    
    // Navigate to appropriate screen with context
    if (entityId) {
      navigate(`${config.path}?id=${entityId}`);
    } else {
      navigate(config.path);
    }
  };

  const config = getLinkConfig(type);
  const baseClasses = `
    ${config.color} 
    transition-smooth 
    cursor-pointer 
    underline-offset-2 
    hover:underline
    ${inline ? 'inline-flex items-center' : 'flex items-center'}
    ${className}
  `;

  return (
    <button
      onClick={handleClick}
      className={baseClasses}
      title={config.tooltip}
    >
      {showIcon && (
        <Icon 
          name={config.icon} 
          size={14} 
          className={`${inline ? 'mr-1' : 'mr-2'} flex-shrink-0`} 
        />
      )}
      <span className="font-body">{label}</span>
    </button>
  );
};

// Helper component for embedding multiple cross-references
export const CrossReferenceGroup = ({ references, className = '' }) => {
  if (!references || references.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {references.map((ref, index) => (
        <CrossReferenceLink
          key={index}
          type={ref.type}
          label={ref.label}
          entityId={ref.entityId}
          inline={true}
        />
      ))}
    </div>
  );
};

// Helper component for contextual cross-references within text
export const InlineReference = ({ type, label, entityId, children }) => {
  return (
    <CrossReferenceLink
      type={type}
      label={label || children}
      entityId={entityId}
      showIcon={false}
      inline={true}
      className="font-normal"
    />
  );
};

export default CrossReferenceLink;