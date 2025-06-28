import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      id: 'rulers',
      label: 'Rulers',
      path: '/ruler-profile-detail',
      icon: 'Crown',
      tooltip: 'Explore individual ruler profiles and biographical details'
    },
    {
      id: 'countries',
      label: 'Countries',
      path: '/country-historical-mapping',
      icon: 'Map',
      tooltip: 'Discover historical territories and modern nation connections'
    },
    {
      id: 'timeline',
      label: 'Timeline',
      path: '/historical-timeline-explorer',
      icon: 'Clock',
      tooltip: 'Navigate chronological periods and concurrent reigns'
    }
  ];

  const handleTabClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search query:', searchQuery);
      setIsSearchOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };

  const isActiveTab = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-navigation bg-background border-b border-earth shadow-subtle">
      <div className="mx-6 lg:mx-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-card flex items-center justify-center">
                <Icon name="Crown" size={20} color="white" />
              </div>
              <h1 className="text-xl font-heading font-semibold text-primary hidden sm:block">
                Historical Rulers
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.path)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-subtle transition-smooth
                  ${isActiveTab(item.path)
                    ? 'bg-surface text-primary font-semibold' :'text-text-secondary hover:text-primary hover:bg-surface/50'
                  }
                `}
                title={item.tooltip}
              >
                <Icon name={item.icon} size={18} />
                <span className="font-body">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Desktop Search */}
            <div className="hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  type="search"
                  placeholder="Search rulers, countries, periods..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-64 pl-10 pr-4 py-2 bg-surface border-earth focus:border-primary"
                />
                <Icon
                  name="Search"
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                />
              </form>
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={toggleSearch}
              className="md:hidden p-2 text-text-secondary hover:text-primary transition-smooth"
            >
              <Icon name="Search" size={20} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-text-secondary hover:text-primary transition-smooth"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-earth shadow-medium z-search-overlay">
            <div className="p-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  id="search-input"
                  type="search"
                  placeholder="Search rulers, countries, periods..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 bg-surface border-earth focus:border-primary"
                />
                <Icon
                  name="Search"
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                />
              </form>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-earth shadow-medium z-search-overlay">
            <nav className="py-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.path)}
                  className={`
                    w-full flex items-center space-x-3 px-6 py-3 transition-smooth
                    ${isActiveTab(item.path)
                      ? 'bg-surface text-primary font-semibold border-r-2 border-primary' :'text-text-secondary hover:text-primary hover:bg-surface/50'
                    }
                  `}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-body">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;