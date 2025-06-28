import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customPath = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getNavigationContext = () => {
    const path = customPath || location.pathname;
    
    const routeMap = {
      '/ruler-profile-detail': {
        label: 'Rulers',
        icon: 'Crown',
        segments: ['Rulers']
      },
      '/country-historical-mapping': {
        label: 'Countries',
        icon: 'Map',
        segments: ['Countries']
      },
      '/historical-timeline-explorer': {
        label: 'Timeline',
        icon: 'Clock',
        segments: ['Timeline']
      }
    };

    return routeMap[path] || { label: 'Home', icon: 'Home', segments: ['Home'] };
  };

  const handleBreadcrumbClick = (index) => {
    const context = getNavigationContext();
    if (index === 0) {
      // Navigate to home or main section
      const routePaths = {
        'Rulers': '/ruler-profile-detail',
        'Countries': '/country-historical-mapping',
        'Timeline': '/historical-timeline-explorer'
      };
      const targetPath = routePaths[context.segments[0]];
      if (targetPath) {
        navigate(targetPath);
      }
    }
  };

  const context = getNavigationContext();
  
  if (!context.segments || context.segments.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-body mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {context.segments.map((segment, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="mx-2 text-text-secondary" 
              />
            )}
            
            {index === 0 && (
              <Icon 
                name={context.icon} 
                size={16} 
                className="mr-2 text-text-secondary" 
              />
            )}
            
            {index < context.segments.length - 1 ? (
              <button
                onClick={() => handleBreadcrumbClick(index)}
                className="text-text-secondary hover:text-primary transition-smooth font-normal"
              >
                {segment}
              </button>
            ) : (
              <span className="text-primary font-semibold" aria-current="page">
                {segment}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;