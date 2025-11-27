import { useState } from 'react';
import PublicIcon from '@mui/icons-material/Public';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import EventList from './EventList';
import EventDetail from './EventDetail';

interface EventDashboardProps {
  events: any[];
  language: 'en' | 'ar';
  onLanguageChange: (lang: 'en' | 'ar') => void;
}

export default function EventDashboard({
  events,
  language,
  onLanguageChange
}: EventDashboardProps) {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-sky-100 via-white to-blue-50">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">
        <div className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/60 transition-all"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
              <PublicIcon className="text-white" sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </div>

            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {language === 'en' ? 'Event Dashboard' : 'لوحة الأحداث'}
            </h1>
          </div>

          <button
            onClick={() => onLanguageChange(language === 'en' ? 'ar' : 'en')}
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg bg-white/80 
                       backdrop-blur-sm border border-blue-200 hover:border-blue-400 
                       transition-all hover:shadow-lg font-medium text-blue-700"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </header>

      {/* BODY LAYOUT */}
      <div className="flex w-full h-[calc(100vh-65px)] overflow-hidden">

        {/* FIXED SIDEBAR */}
<div
  className={`
    ${isMobileMenuOpen ? "block" : "hidden"}
    lg:block
    fixed
    left-0
    top-[57px] sm:top-[65px] lg:top-[73px]
    w-96
    h-[calc(100vh-57px)] sm:h-[calc(100vh-65px)] lg:h-[calc(100vh-73px)]
    bg-white/60
    overflow-y-auto
    overflow-x-hidden
    z-40
  `}
>
  <EventList
    events={events}
    selectedEvent={selectedEvent}
    onSelectEvent={(event) => {
      setSelectedEvent(event);
      setIsMobileMenuOpen(false);
    }}
    language={language}
    isFilterOpen={isFilterOpen}
    onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
  />
</div>


        {/* MAIN CONTENT */}
        <div
          className="
            flex-1 w-full 
            overflow-y-auto overflow-x-hidden
            lg:ml-96
            scroll-smooth
          "
        >
          <EventDetail event={selectedEvent} language={language} />
          
        </div>

      </div>
    </div>
  );
}
