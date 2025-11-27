import { useState } from 'react';
import HeroSection from './HeroSection';
import OverviewTab from './tabs/OverviewTab';
import AgendaTab from './tabs/AgendaTab';
import ParticipantsTab from './tabs/ParticipantsTab';
import SpeakersTab from './tabs/SpeakersTab';
import OrganizationsTab from './tabs/OrganizationsTab';
import MediaTab from './tabs/MediaTab';
import MetaTab from './tabs/MetaTab';

interface EventDetailProps {
  event: any;
  language: 'en' | 'ar';
}

const tabs = [
  { id: 'overview', label: { en: 'Overview', ar: 'نظرة عامة' } },
  { id: 'agenda', label: { en: 'Agenda', ar: 'الأجندة' } },
  { id: 'participants', label: { en: 'Participants', ar: 'المشاركون' } },
  { id: 'speakers', label: { en: 'Speakers', ar: 'المتحدثون' } },
  { id: 'organizations', label: { en: 'Organizations', ar: 'المنظمات' } },
  { id: 'media', label: { en: 'Media', ar: 'الوسائط' } },
  { id: 'meta', label: { en: 'Meta/Admin', ar: 'بيانات إدارية' } }
];

export default function EventDetail({ event, language }: EventDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-4 sm:p-6 w-full overflow-x-hidden">
      <HeroSection event={event} language={language} />

      <div className="mt-4 sm:mt-6 backdrop-blur-xl bg-white/60 rounded-2xl border border-white/30 shadow-2xl overflow-hidden">
        <div className="flex overflow-x-auto border-b border-white/20 bg-white/40 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-3 sm:py-4 font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-white/60'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/30'
              }`}
            >
              {tab.label[language]}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6 overflow-x-hidden">
          {activeTab === 'overview' && <OverviewTab event={event} language={language} />}
          {activeTab === 'agenda' && <AgendaTab event={event} language={language} />}
          {activeTab === 'participants' && <ParticipantsTab event={event} language={language} />}
          {activeTab === 'speakers' && <SpeakersTab event={event} language={language} />}
          {activeTab === 'organizations' && <OrganizationsTab event={event} language={language} />}
          {activeTab === 'media' && <MediaTab event={event} language={language} />}
          {activeTab === 'meta' && <MetaTab event={event} language={language} />}
        </div>
      </div>
    </div>
  );
}
