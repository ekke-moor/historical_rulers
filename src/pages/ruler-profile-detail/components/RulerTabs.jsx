import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import BiographyTab from './BiographyTab';
import ReignTab from './ReignTab';
import RelationshipsTab from './RelationshipsTab';
import CountriesTab from './CountriesTab';

const RulerTabs = ({ ruler }) => {
  const [activeTab, setActiveTab] = useState('biography');

  const tabs = [
    {
      id: 'biography',
      label: 'Biography',
      icon: 'User',
      component: BiographyTab
    },
    {
      id: 'reign',
      label: 'Reign',
      icon: 'Crown',
      component: ReignTab
    },
    {
      id: 'relationships',
      label: 'Relationships',
      icon: 'Users',
      component: RelationshipsTab
    },
    {
      id: 'countries',
      label: 'Countries',
      icon: 'Map',
      component: CountriesTab
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="bg-background">
      {/* Desktop Tabs */}
      <div className="hidden md:block">
        <div className="border-b border-earth">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 px-2 border-b-2 font-body transition-smooth
                  ${activeTab === tab.id
                    ? 'border-primary text-primary font-semibold' :'border-transparent text-text-secondary hover:text-primary hover:border-earth'
                  }
                `}
              >
                <Icon name={tab.icon} size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="py-6">
          {ActiveComponent && <ActiveComponent ruler={ruler} />}
        </div>
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden space-y-4">
        {tabs.map((tab) => {
          const TabComponent = tab.component;
          const isActive = activeTab === tab.id;
          
          return (
            <div key={tab.id} className="border border-earth rounded-card overflow-hidden">
              <button
                onClick={() => setActiveTab(isActive ? '' : tab.id)}
                className={`
                  w-full flex items-center justify-between p-4 transition-smooth
                  ${isActive 
                    ? 'bg-surface text-primary' :'bg-background text-text-secondary hover:bg-surface/50'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={tab.icon} size={20} />
                  <span className="font-body font-semibold">{tab.label}</span>
                </div>
                <Icon 
                  name={isActive ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                />
              </button>
              
              {isActive && (
                <div className="p-4 border-t border-earth bg-background">
                  <TabComponent ruler={ruler} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RulerTabs;