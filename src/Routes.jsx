import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import RulerProfileDetail from "pages/ruler-profile-detail";
import CountryHistoricalMapping from "pages/country-historical-mapping";
import HistoricalTimelineExplorer from "pages/historical-timeline-explorer";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HistoricalTimelineExplorer />} />
        <Route path="/ruler-profile-detail" element={<RulerProfileDetail />} />
        <Route path="/country-historical-mapping" element={<CountryHistoricalMapping />} />
        <Route path="/historical-timeline-explorer" element={<HistoricalTimelineExplorer />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;