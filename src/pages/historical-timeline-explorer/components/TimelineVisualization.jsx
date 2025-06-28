import React, { useRef, useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const TimelineVisualization = ({
  rulers,
  selectedRegions,
  currentYear,
  zoomLevel,
  showEvents,
  onRulerClick,
  onYearChange
}) => {
  const timelineRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });

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

  const yearRange = getYearRange();
  const totalYears = yearRange.end - yearRange.start;
  const pixelsPerYear = zoomLevel === 'years' ? 20 : zoomLevel === 'decades' ? 5 : 2;

  const filteredRulers = rulers.filter(ruler => 
    selectedRegions.length === 0 || selectedRegions.includes(ruler.region)
  );

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.pageX - timelineRef.current.offsetLeft,
      scrollLeft: timelineRef.current.scrollLeft
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - dragStart.x) * 2;
    timelineRef.current.scrollLeft = dragStart.scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    const newYear = Math.max(yearRange.start, Math.min(yearRange.end, currentYear + delta * 5));
    onYearChange(newYear);
  };

  const getRulerPosition = (ruler) => {
    const startX = (ruler.reignStart - yearRange.start) * pixelsPerYear;
    const width = (ruler.reignEnd - ruler.reignStart) * pixelsPerYear;
    return { left: startX, width: Math.max(width, 20) };
  };

  const getRegionColor = (region) => {
    const colors = {
      'europe': '#8B4513',
      'asia': '#CD853F',
      'africa': '#DAA520',
      'americas': '#6B8E23',
      'oceania': '#B8860B',
      'middle-east': '#A0522D'
    };
    return colors[region] || '#8B4513';
  };

  const majorEvents = [
    { year: 476, title: "Fall of Western Roman Empire", type: "political" },
    { year: 1066, title: "Norman Conquest of England", type: "military" },
    { year: 1453, title: "Fall of Constantinople", type: "political" },
    { year: 1492, title: "Columbus reaches Americas", type: "exploration" },
    { year: 1789, title: "French Revolution begins", type: "political" }
  ];

  const visibleEvents = showEvents ? majorEvents.filter(event => 
    event.year >= yearRange.start && event.year <= yearRange.end
  ) : [];

  useEffect(() => {
    const timeline = timelineRef.current;
    if (timeline) {
      timeline.addEventListener('wheel', handleWheel, { passive: false });
      return () => timeline.removeEventListener('wheel', handleWheel);
    }
  }, [currentYear, yearRange]);

  return (
    <div className="bg-background border border-earth rounded-card overflow-hidden">
      {/* Timeline Header */}
      <div className="bg-surface border-b border-earth p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-text-primary">
            Historical Timeline ({yearRange.start} - {yearRange.end} CE)
          </h3>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="MousePointer" size={16} />
            <span>Click rulers for details</span>
          </div>
        </div>
      </div>

      {/* Timeline Container */}
      <div 
        ref={timelineRef}
        className="relative overflow-x-auto overflow-y-hidden h-96 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ userSelect: 'none' }}
      >
        {/* Year Scale */}
        <div className="sticky top-0 bg-surface border-b border-earth-light z-10 h-12 flex items-center">
          <div 
            className="relative h-full"
            style={{ width: totalYears * pixelsPerYear }}
          >
            {Array.from({ length: Math.ceil(totalYears / yearRange.step) }, (_, i) => {
              const year = yearRange.start + (i * yearRange.step);
              return (
                <div
                  key={year}
                  className="absolute top-0 h-full flex items-center"
                  style={{ left: i * yearRange.step * pixelsPerYear }}
                >
                  <div className="border-l border-earth-light h-full"></div>
                  <span className="ml-2 text-xs text-text-secondary font-data">
                    {year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Year Indicator */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary z-20 pointer-events-none"
          style={{ left: (currentYear - yearRange.start) * pixelsPerYear }}
        >
          <div className="absolute -top-1 -left-2 w-4 h-4 bg-primary rounded-full"></div>
        </div>

        {/* Events Layer */}
        {visibleEvents.map((event) => (
          <div
            key={event.year}
            className="absolute top-12 bottom-0 w-0.5 bg-accent opacity-60 z-15"
            style={{ left: (event.year - yearRange.start) * pixelsPerYear }}
          >
            <div className="absolute top-0 left-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs whitespace-nowrap">
              {event.title}
            </div>
          </div>
        ))}

        {/* Rulers Timeline */}
        <div 
          className="relative pt-12"
          style={{ width: totalYears * pixelsPerYear, height: 'calc(100% - 3rem)' }}
        >
          {filteredRulers.map((ruler, index) => {
            const position = getRulerPosition(ruler);
            const yPosition = (index % 8) * 40 + 20;
            
            return (
              <div
                key={ruler.id}
                className="absolute cursor-pointer group transition-smooth hover:z-30"
                style={{
                  left: position.left,
                  top: yPosition,
                  width: position.width,
                  height: 32
                }}
                onClick={() => onRulerClick(ruler)}
              >
                <div
                  className="w-full h-full rounded border-2 border-white shadow-subtle group-hover:shadow-medium transition-smooth flex items-center px-2"
                  style={{ backgroundColor: getRegionColor(ruler.region) }}
                >
                  <span className="text-white text-xs font-body truncate">
                    {ruler.name}
                  </span>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none z-40">
                  <div className="bg-text-primary text-primary-foreground px-3 py-2 rounded text-sm whitespace-nowrap">
                    <div className="font-semibold">{ruler.name}</div>
                    <div className="text-xs opacity-80">
                      {ruler.reignStart} - {ruler.reignEnd} CE
                    </div>
                    <div className="text-xs opacity-80 capitalize">
                      {ruler.region} • {ruler.country}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline Footer */}
      <div className="bg-surface border-t border-earth p-3">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span className="font-body">
            Showing {filteredRulers.length} rulers
          </span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded"></div>
              <span>Current Year</span>
            </div>
            {showEvents && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded"></div>
                <span>Historical Events</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineVisualization;