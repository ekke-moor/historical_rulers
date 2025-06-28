import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import TimelineControls from './components/TimelineControls';
import RegionFilter from './components/RegionFilter';
import TimelineVisualization from './components/TimelineVisualization';
import RulerDetailPopup from './components/RulerDetailPopup';
import MiniMap from './components/MiniMap';
import BookmarkPanel from './components/BookmarkPanel';

import Button from '../../components/ui/Button';

const HistoricalTimelineExplorer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Timeline state
  const [currentYear, setCurrentYear] = useState(1000);
  const [zoomLevel, setZoomLevel] = useState('decades');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [showEvents, setShowEvents] = useState(true);
  
  // UI state
  const [selectedRuler, setSelectedRuler] = useState(null);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  // Mock data for rulers
  const rulers = [
    {
      id: 1,
      name: "Charlemagne",
      reignStart: 768,
      reignEnd: 814,
      region: "europe",
      country: "Frankish Empire",
      countryId: "frankish-empire",
      dynasty: "Carolingian",
      portrait: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      description: `Charlemagne, also known as Charles the Great, was King of the Franks from 768, King of the Lombards from 774, and Emperor of the Romans from 800. He united much of Western and Central Europe during the Early Middle Ages.`,
      achievements: [
        "Crowned Emperor of the Romans by Pope Leo III",
        "Established the Carolingian Renaissance",
        "Expanded the Frankish kingdom into an empire",
        "Promoted education and cultural development"
      ],
      contemporaries: [
        { id: 2, name: "Harun al-Rashid", country: "Abbasid Caliphate" },
        { id: 3, name: "Irene of Athens", country: "Byzantine Empire" }
      ]
    },
    {
      id: 2,
      name: "Harun al-Rashid",
      reignStart: 786,
      reignEnd: 809,
      region: "middle-east",
      country: "Abbasid Caliphate",
      countryId: "abbasid-caliphate",
      dynasty: "Abbasid",
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      description: `Harun al-Rashid was the fifth Abbasid Caliph, ruling during the peak of the Islamic Golden Age. His reign is often considered the height of the Abbasid Caliphate's power and cultural influence.`,
      achievements: [
        "Presided over the Islamic Golden Age",
        "Established the House of Wisdom in Baghdad",
        "Promoted trade and cultural exchange",
        "Featured in the Arabian Nights tales"
      ],
      contemporaries: [
        { id: 1, name: "Charlemagne", country: "Frankish Empire" },
        { id: 3, name: "Irene of Athens", country: "Byzantine Empire" }
      ]
    },
    {
      id: 3,
      name: "William the Conqueror",
      reignStart: 1066,
      reignEnd: 1087,
      region: "europe",
      country: "England",
      countryId: "england",
      dynasty: "Norman",
      portrait: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400",
      description: `William I, usually known as William the Conqueror, was the first Norman King of England, reigning from 1066 until his death in 1087. He was a descendant of Rollo and was Duke of Normandy from 1035 onward.`,
      achievements: [
        "Conquered England at the Battle of Hastings",
        "Commissioned the Domesday Book",
        "Introduced Norman culture to England",
        "Established feudalism in England"
      ],
      contemporaries: [
        { id: 4, name: "Alfonso VI", country: "León and Castile" },
        { id: 5, name: "Alexios I Komnenos", country: "Byzantine Empire" }
      ]
    },
    {
      id: 4,
      name: "Saladin",
      reignStart: 1174,
      reignEnd: 1193,
      region: "middle-east",
      country: "Ayyubid Sultanate",
      countryId: "ayyubid-sultanate",
      dynasty: "Ayyubid",
      portrait: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      description: `Saladin was a Kurdish Muslim leader who became the first sultan of Egypt and Syria and founded the Ayyubid dynasty. He led the Muslim military campaign against the Crusader states in the Levant.`,
      achievements: [
        "Recaptured Jerusalem from the Crusaders",
        "Founded the Ayyubid dynasty",
        "United Egypt and Syria under his rule",
        "Known for his chivalry and military prowess"
      ],
      contemporaries: [
        { id: 6, name: "Richard the Lionheart", country: "England" },
        { id: 7, name: "Frederick Barbarossa", country: "Holy Roman Empire" }
      ]
    },
    {
      id: 5,
      name: "Genghis Khan",
      reignStart: 1206,
      reignEnd: 1227,
      region: "asia",
      country: "Mongol Empire",
      countryId: "mongol-empire",
      dynasty: "Mongol",
      portrait: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      description: `Genghis Khan was the founder and first Great Khan of the Mongol Empire, which became the largest contiguous empire in history after his death. He came to power by uniting many of the nomadic tribes of Northeast Asia.`,
      achievements: [
        "Founded the Mongol Empire",
        "Created the largest contiguous land empire in history",
        "Established the Silk Road trade routes",
        "Implemented religious tolerance across his empire"
      ],
      contemporaries: [
        { id: 8, name: "John of England", country: "England" },
        { id: 9, name: "Philip II Augustus", country: "France" }
      ]
    },
    {
      id: 6,
      name: "Mansa Musa",
      reignStart: 1312,
      reignEnd: 1337,
      region: "africa",
      country: "Mali Empire",
      countryId: "mali-empire",
      dynasty: "Keita",
      portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      description: `Mansa Musa was the tenth mansa of the Mali Empire, a West African empire. He is famous for his wealth and his famous pilgrimage to Mecca, which showcased the wealth of his kingdom.`,
      achievements: [
        "Expanded the Mali Empire significantly",
        "Made famous pilgrimage to Mecca",
        "Established Timbuktu as a center of learning",
        "Considered one of the wealthiest individuals in history"
      ],
      contemporaries: [
        { id: 10, name: "Edward III", country: "England" },
        { id: 11, name: "Philip VI", country: "France" }
      ]
    },
    {
      id: 7,
      name: "Akbar the Great",
      reignStart: 1556,
      reignEnd: 1605,
      region: "asia",
      country: "Mughal Empire",
      countryId: "mughal-empire",
      dynasty: "Mughal",
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      description: `Akbar, known as Akbar the Great, was the third Mughal emperor who reigned from 1556 to 1605. He is widely considered one of the greatest rulers in Indian history.`,
      achievements: [
        "Expanded the Mughal Empire across the Indian subcontinent",
        "Established a centralized government",
        "Promoted religious tolerance and cultural synthesis",
        "Created the Din-i Ilahi religious movement"
      ],
      contemporaries: [
        { id: 12, name: "Elizabeth I", country: "England" },
        { id: 13, name: "Philip II", country: "Spain" }
      ]
    },
    {
      id: 8,
      name: "Montezuma II",
      reignStart: 1502,
      reignEnd: 1520,
      region: "americas",
      country: "Aztec Empire",
      countryId: "aztec-empire",
      dynasty: "Aztec",
      portrait: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400",
      description: `Montezuma II was the ninth Aztec emperor of Mexico, famous for his role in the Spanish conquest of the Aztec Empire. His reign marked the height of Aztec power before the arrival of the Spanish.`,
      achievements: [
        "Expanded Aztec territory to its greatest extent",
        "Built magnificent temples and palaces",
        "Established complex tribute systems",
        "Promoted arts and culture in Tenochtitlan"
      ],
      contemporaries: [
        { id: 14, name: "Henry VIII", country: "England" },
        { id: 15, name: "Charles V", country: "Holy Roman Empire" }
      ]
    }
  ];

  // Animation effect for timeline playback
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentYear(prev => {
          const yearRange = getYearRange();
          if (prev >= yearRange.end) {
            setIsPlaying(false);
            return yearRange.start;
          }
          return prev + (zoomLevel === 'years' ? 1 : zoomLevel === 'decades' ? 10 : 100);
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, zoomLevel]);

  // Initialize from URL parameters
  useEffect(() => {
    const yearParam = searchParams.get('year');
    const regionParam = searchParams.get('region');
    
    if (yearParam) {
      setCurrentYear(parseInt(yearParam));
    }
    if (regionParam) {
      setSelectedRegions([regionParam]);
    }
  }, [searchParams]);

  const getYearRange = () => {
    switch (zoomLevel) {
      case 'centuries':
        return { start: 0, end: 2000, step: 100 };
      case 'decades':
        return { start: Math.max(0, currentYear - 200), end: currentYear + 200, step: 10 };
      case 'years':
        return { start: Math.max(0, currentYear - 50), end: currentYear + 50, step: 1 };
      default:
        return { start: 0, end: 2000, step: 100 };
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleYearChange = (year) => {
    setCurrentYear(year);
    setIsPlaying(false);
  };

  const handleZoomChange = (level) => {
    setZoomLevel(level);
    setIsPlaying(false);
  };

  const handleRegionToggle = (regionId) => {
    setSelectedRegions(prev => 
      prev.includes(regionId)
        ? prev.filter(r => r !== regionId)
        : [...prev, regionId]
    );
  };

  const handleSelectAllRegions = () => {
    const allRegions = ['europe', 'asia', 'africa', 'americas', 'oceania', 'middle-east'];
    setSelectedRegions(allRegions);
  };

  const handleClearAllRegions = () => {
    setSelectedRegions([]);
  };

  const handleRulerClick = (ruler) => {
    setSelectedRuler(ruler);
  };

  const handleViewFullProfile = (ruler) => {
    navigate(`/ruler-profile-detail?id=${ruler.id}`);
  };

  const handleBookmark = () => {
    const newBookmark = {
      id: Date.now(),
      title: `Timeline at ${currentYear} CE`,
      year: currentYear,
      zoomLevel,
      regions: selectedRegions,
      note: `${zoomLevel} view with ${selectedRegions.length || 'all'} regions`,
      timestamp: Date.now()
    };
    setBookmarks(prev => [newBookmark, ...prev]);
  };

  const handleBookmarkSelect = (bookmark) => {
    setCurrentYear(bookmark.year);
    setZoomLevel(bookmark.zoomLevel);
    setSelectedRegions(bookmark.regions);
    setShowBookmarks(false);
  };

  const handleBookmarkDelete = (bookmarkId) => {
    setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
  };

  const handleRegionClickFromMap = (regionId) => {
    if (selectedRegions.includes(regionId)) {
      setSelectedRegions(prev => prev.filter(r => r !== regionId));
    } else {
      setSelectedRegions(prev => [...prev, regionId]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-6 lg:mx-8 py-6">
        <Breadcrumb />
        
        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
            Historical Timeline Explorer
          </h1>
          <p className="text-text-secondary font-body max-w-3xl">
            Explore the chronological progression of rulers and empires across different regions. 
            Visualize concurrent reigns, compare dynasties, and discover historical patterns through 
            an interactive timeline interface.
          </p>
        </div>

        {/* Controls Section */}
        <TimelineControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          currentYear={currentYear}
          onYearChange={handleYearChange}
          zoomLevel={zoomLevel}
          onZoomChange={handleZoomChange}
          onBookmark={handleBookmark}
          showEvents={showEvents}
          onToggleEvents={() => setShowEvents(!showEvents)}
        />

        {/* Filters and Mini Map */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <RegionFilter
              selectedRegions={selectedRegions}
              onRegionToggle={handleRegionToggle}
              onSelectAll={handleSelectAllRegions}
              onClearAll={handleClearAllRegions}
            />
          </div>
          
          <div className="relative">
            <MiniMap
              selectedRegions={selectedRegions}
              currentYear={currentYear}
              onRegionClick={handleRegionClickFromMap}
            />
            
            {/* Bookmarks Toggle */}
            <div className="absolute top-4 right-4">
              <Button
                variant={showBookmarks ? "primary" : "ghost"}
                iconName="Bookmark"
                onClick={() => setShowBookmarks(!showBookmarks)}
                className="p-2"
              >
                {bookmarks.length > 0 && (
                  <span className="ml-1 text-xs">({bookmarks.length})</span>
                )}
              </Button>
            </div>
            
            {/* Bookmarks Panel */}
            {showBookmarks && (
              <div className="absolute top-16 right-0 z-30">
                <BookmarkPanel
                  bookmarks={bookmarks}
                  onBookmarkSelect={handleBookmarkSelect}
                  onBookmarkDelete={handleBookmarkDelete}
                  onClose={() => setShowBookmarks(false)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Main Timeline */}
        <TimelineVisualization
          rulers={rulers}
          selectedRegions={selectedRegions}
          currentYear={currentYear}
          zoomLevel={zoomLevel}
          showEvents={showEvents}
          onRulerClick={handleRulerClick}
          onYearChange={handleYearChange}
        />

        {/* Statistics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface border border-earth rounded-card p-4 text-center">
            <div className="text-2xl font-heading font-bold text-primary">
              {rulers.filter(r => selectedRegions.length === 0 || selectedRegions.includes(r.region)).length}
            </div>
            <div className="text-sm text-text-secondary font-body">Rulers Shown</div>
          </div>
          
          <div className="bg-surface border border-earth rounded-card p-4 text-center">
            <div className="text-2xl font-heading font-bold text-secondary">
              {selectedRegions.length || 6}
            </div>
            <div className="text-sm text-text-secondary font-body">Active Regions</div>
          </div>
          
          <div className="bg-surface border border-earth rounded-card p-4 text-center">
            <div className="text-2xl font-heading font-bold text-accent">
              {getYearRange().end - getYearRange().start}
            </div>
            <div className="text-sm text-text-secondary font-body">Year Span</div>
          </div>
          
          <div className="bg-surface border border-earth rounded-card p-4 text-center">
            <div className="text-2xl font-heading font-bold text-success">
              {bookmarks.length}
            </div>
            <div className="text-sm text-text-secondary font-body">Bookmarks</div>
          </div>
        </div>
      </main>

      {/* Ruler Detail Popup */}
      {selectedRuler && (
        <RulerDetailPopup
          ruler={selectedRuler}
          onClose={() => setSelectedRuler(null)}
          onViewFullProfile={handleViewFullProfile}
        />
      )}
    </div>
  );
};

export default HistoricalTimelineExplorer;