import { useState } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

interface EventListProps {
  events: any[];
  selectedEvent: any;
  onSelectEvent: (event: any) => void;
  language: 'en' | 'ar';
  isFilterOpen: boolean;
  onToggleFilter: () => void;
}

export default function EventList({
  events,
  selectedEvent,
  onSelectEvent,
  language,
  isFilterOpen,
  onToggleFilter
}: EventListProps) {

  const [filters, setFilters] = useState({
    region: 'all',
    type: 'all'
  });

  const allRegions = Array.from(new Set(events.map(e => e.region[language])));
  const allTypes = Array.from(new Set(events.map(e => e.event_type[language])));

  const filteredEvents = events.filter(event => {
    if (filters.region !== 'all' && event.region[language] !== filters.region) return false;
    if (filters.type !== 'all' && event.event_type[language] !== filters.type) return false;
    return true;
  });

  return (
    <div className="
      w-full lg:w-96 
      bg-white/60 backdrop-blur-2xl 
      border-r border-white/30
      shadow-[4px_0_20px_rgba(0,0,0,0.06)]
      h-[calc(100vh-57px)] sm:h-[calc(100vh-65px)] lg:h-[calc(100vh-73px)]
      overflow-y-auto overflow-x-hidden
    ">
      
      {/* HEADER */}
      <div className="p-4 sm:p-6 sticky top-0 bg-white/70 backdrop-blur-xl border-b border-white/30 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {language === 'en' ? 'Events' : 'الأحداث'}
          </h2>

          <button
            onClick={onToggleFilter}
            className="p-2 rounded-xl bg-white/80 hover:bg-white shadow-sm transition-all"
          >
            {isFilterOpen ? <CloseIcon /> : <FilterListIcon />}
          </button>
        </div>

        {/* FILTER PANEL */}
        {isFilterOpen && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top duration-300">

            {/* Region filter */}
            <div>
              <label className="text-sm text-gray-700 font-medium mb-1 block">
                {language === 'en' ? 'Region' : 'المنطقة'}
              </label>
              <select
                value={filters.region}
                onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                className="
                  w-full px-3 py-2 text-sm rounded-lg 
                  bg-white border border-gray-200 
                  focus:border-blue-400 focus:ring-2 
                  focus:ring-blue-100 transition-all
                "
              >
                <option value="all">{language === 'en' ? 'All Regions' : 'كل المناطق'}</option>
                {allRegions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Type filter */}
            <div>
              <label className="text-sm text-gray-700 font-medium mb-1 block">
                {language === 'en' ? 'Type' : 'النوع'}
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="
                  w-full px-3 py-2 text-sm rounded-lg 
                  bg-white border border-gray-200 
                  focus:border-blue-400 focus:ring-2 
                  focus:ring-blue-100 transition-all
                "
              >
                <option value="all">{language === 'en' ? 'All Types' : 'كل الأنواع'}</option>
                {allTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

          </div>
        )}
      </div>

      {/* EVENT LIST */}
      <div className="p-4 space-y-4 overflow-x-hidden">
        {filteredEvents.map(event => (
          <button
            key={event.event_name[language]}
            onClick={() => onSelectEvent(event)}
            className={`
              w-full text-left p-4 rounded-2xl transition-all duration-300 
              hover:scale-[1.02] shadow-md hover:shadow-xl
              ${
                selectedEvent === event
                  ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-xl'
                  : 'bg-white/90 backdrop-blur-sm border border-gray-200'
              }
            `}
          >

            {/* EVENT POSTER */}
            {event.event_poster_url && (
              <img
                src={event.event_poster_url}
                className="w-full h-32 object-cover rounded-xl mb-3 overflow-hidden"
                alt=""
              />
            )}

            {/* EVENT NAME */}
            <h3 className={`font-semibold text-base mb-2 line-clamp-2 ${
              selectedEvent === event ? 'text-white' : 'text-gray-800'
            }`}>
              {event.event_name[language]}
            </h3>

            {/* DATE */}
            <div className="flex items-center gap-2 text-sm mb-1 opacity-80">
              <CalendarTodayIcon sx={{ fontSize: 16 }} />
              <span>{event.start_date} - {event.end_date}</span>
            </div>

            {/* CITY */}
            <div className="flex items-center gap-2 text-sm opacity-80">
              <LocationOnIcon sx={{ fontSize: 16 }} />
              <span>{event.city[language]}</span>
            </div>

          </button>
        ))}
      </div>

    </div>
  );
}
