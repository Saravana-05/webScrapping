import { useState } from 'react';
import EventDashboard from './components/EventDashboard';
import eventData from './data/event_with_company_profiles_enriched.json';


function App() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <div className={`min-h-screen font-sans ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <EventDashboard
        events={eventData.events}
        language={language}
        onLanguageChange={setLanguage}
      />
    </div>
  );
}

export default App;
