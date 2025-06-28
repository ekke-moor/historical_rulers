import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import RulerHeroSection from './components/RulerHeroSection';
import RulerTabs from './components/RulerTabs';
import RulerSidebar from './components/RulerSidebar';

const RulerProfileDetail = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock ruler data
  const ruler = {
    id: 1,
    name: "Elizabeth I",
    title: "Queen of England and Ireland",
    reignPeriod: "1558 - 1603",
    dynasty: "House of Tudor",
    primaryTerritory: "Kingdom of England",
    era: "Renaissance",
    portrait: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=500&fit=crop&crop=face",
    biography: `Elizabeth I was Queen of England and Ireland from 17 November 1558 until her death in 1603. Sometimes called the Virgin Queen, Gloriana or Good Queen Bess, Elizabeth was the last of the five monarchs of the House of Tudor.\n\nElizabeth was the daughter of Henry VIII and Anne Boleyn, his second wife, who was executed when Elizabeth was two years old. Anne's marriage to Henry VIII was annulled, and Elizabeth was declared illegitimate. Her half-brother, Edward VI, ruled until his death in 1553, bequeathing the crown to Lady Jane Grey and ignoring the claims of his two half-sisters, Elizabeth and the Catholic Mary, in spite of statute law to the contrary.\n\nElizabeth's 45-year reign is known as the Elizabethan Age, a period of English cultural flowering and maritime expansion. It was marked by the defeat of the Spanish Armada in 1588, and by the flourishing of English drama, led by playwrights such as William Shakespeare and Christopher Marlowe.`
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${ruler.name} - Historical Rulers`,
        text: `Learn about ${ruler.name}, ${ruler.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary font-body">Loading ruler profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-6 lg:mx-8 py-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb customPath="/ruler-profile-detail" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-8">
              {/* Hero Section */}
              <RulerHeroSection
                ruler={ruler}
                onBookmark={handleBookmark}
                onShare={handleShare}
                isBookmarked={isBookmarked}
              />
              
              {/* Tabbed Content */}
              <RulerTabs ruler={ruler} />
            </div>
            
            {/* Sidebar */}
            <div className="xl:col-span-4">
              <div className="sticky top-24">
                <RulerSidebar ruler={ruler} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RulerProfileDetail;