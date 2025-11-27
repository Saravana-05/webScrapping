import { useState } from 'react';
import {
  User,
  Briefcase,
  Clock,
  MapPin,
  Calendar,
  Video,
  Users as UsersIcon,
  ExternalLink,
  Award,
  Star,
  Sparkles,
  Mic,
  Mic2,
  TrendingUp,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SpeakerModal from '../modals/SpeakerModal';

interface SpeakersTabProps {
  event: any;
  language: 'en' | 'ar';
}

export default function SpeakersTab({ event, language }: SpeakersTabProps) {
  const [selectedSpeaker, setSelectedSpeaker] = useState<any>(null);

  const speakers = event?.speakers ?? [];

  const getSessionTypeColor = (type: string = '') => {
    const colors: { [key: string]: string } = {
      Keynote: 'from-purple-500 to-pink-500',
      Panel: 'from-blue-500 to-cyan-500',
      'Tech Talk': 'from-green-500 to-emerald-500',
      'Fireside Chat': 'from-orange-500 to-red-500',
      'Virtual Keynote': 'from-indigo-500 to-purple-500',
      Workshop: 'from-teal-500 to-blue-500',
      'Roundtable': 'from-amber-500 to-orange-500',
      'Masterclass': 'from-violet-500 to-purple-500'
    };
    return colors[type] || 'from-rose-500 to-pink-500';
  };

  const getSessionTypeIcon = (type: string = '') => {
    const icons: { [key: string]: JSX.Element } = {
      Keynote: <Mic className="w-4 h-4" />,
      Panel: <UsersIcon className="w-4 h-4" />,
      'Tech Talk': <TrendingUp className="w-4 h-4" />,
      'Fireside Chat': <Sparkles className="w-4 h-4" />,
      'Virtual Keynote': <Video className="w-4 h-4" />,
      Workshop: <Briefcase className="w-4 h-4" />,
      'Roundtable': <Globe className="w-4 h-4" />,
      'Masterclass': <Award className="w-4 h-4" />
    };
    return icons[type] || <Mic2 className="w-4 h-4" />;
  };

  const getExpertiseColor = (index: number) => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-amber-500',
      'from-indigo-500 to-blue-500',
      'from-rose-500 to-pink-500'
    ];
    return colors[index % colors.length];
  };

  const SpeakerCard = ({ speaker, index }: { speaker: any; index: number }) => {
    const name = speaker?.name?.[language] ?? (language === 'en' ? 'Unnamed Speaker' : 'متحدث غير معروف');
    const role = speaker?.role_title_at_organization?.[language] ?? '';
    const org = speaker?.organization?.[language] ?? '';
    const sessionTypeEn = speaker?.session_type?.en ?? '';
    const sessionTypeLabel = speaker?.session_type?.[language] ?? (language === 'en' ? 'No session type' : 'لا يوجد نوع الجلسة');
    const sessionTitle = speaker?.assigned_session_title?.[language] ?? '';
    const speakingModeEn = speaker?.in_person_details?.speaking_mode?.en;
    const speakingModeLabel = speaker?.in_person_details?.speaking_mode?.[language] ?? '';
    const arrivalCity = speaker?.in_person_details?.arrival_city?.[language] ?? '';
    const arrivalDate = speaker?.in_person_details?.arrival_date ?? '';
    const background = speaker?.background_short?.[language] ?? '';
    const expertise = speaker?.expertise?.slice(0, 3) || [];

    return (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="relative group cursor-pointer"
      >
        {/* Background Glow Effect */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${getSessionTypeColor(sessionTypeEn)} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
        
        <div className="relative backdrop-blur-xl bg-white/90 rounded-3xl border border-blue-100/60 shadow-2xl overflow-hidden transition-all duration-500 group-hover:shadow-3xl group-hover:border-blue-200">
          {/* Header with Gradient */}
          <div className={`relative h-32 bg-gradient-to-br ${getSessionTypeColor(sessionTypeEn)} overflow-hidden`}>
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/30" />
              <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-white/40" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20" />
            </div>
            
            {/* Speaker Avatar */}
            <div className="absolute -bottom-6 left-6">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative"
              >
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 shadow-2xl flex items-center justify-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                {/* Online Status Indicator */}
                {speakingModeEn === 'Virtual' && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-white shadow-lg" />
                )}
              </motion.div>
            </div>

            {/* Session Type Badge */}
            <div className="absolute top-4 right-4">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold`}>
                {getSessionTypeIcon(sessionTypeEn)}
                {sessionTypeLabel}
              </div>
            </div>

            {/* Mock Generated Badge */}
            {speaker?.mock_generated && (
              <div className="absolute bottom-4 right-4">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-200 text-xs font-medium">
                  <Sparkles className="w-3 h-3" />
                  {language === 'en' ? 'AI' : 'ذكاء'}
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="pt-8 pb-6 px-6">
            {/* Name and Title */}
            <div className="mb-4">
              <motion.h3 
                className="text-xl font-bold text-blue-900 mb-1 group-hover:text-blue-800 transition-colors"
                whileHover={{ x: 2 }}
              >
                {name}
              </motion.h3>
              
              <div className="flex items-center gap-2 text-blue-700 mb-1">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm font-medium">{role}</span>
              </div>
              
              <p className="text-sm text-cyan-600 font-semibold">{org}</p>
            </div>

            {/* Session Info */}
            {sessionTitle && (
              <div className="mb-4 p-3 rounded-xl bg-blue-50/80 border border-blue-200">
                <p className="text-sm font-medium text-blue-800 line-clamp-2">{sessionTitle}</p>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <Clock className="w-4 h-4" />
                <span className="font-medium">
                  {speaker?.planned_session_length_minutes ?? 0}{' '}
                  {language === 'en' ? 'min' : 'د'}
                </span>
              </div>

              {speakingModeEn && (
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  {speakingModeEn === 'Virtual' ? (
                    <Video className="w-4 h-4" />
                  ) : (
                    <UsersIcon className="w-4 h-4" />
                  )}
                  <span className="font-medium">{speakingModeLabel}</span>
                </div>
              )}

              {arrivalCity && (
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{arrivalCity}</span>
                </div>
              )}

              {arrivalDate && (
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{arrivalDate}</span>
                </div>
              )}
            </div>

            {/* Expertise Tags */}
            {expertise.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {expertise.map((exp: any, expIndex: number) => (
                    <span
                      key={expIndex}
                      className={`px-2.5 py-1 rounded-lg bg-gradient-to-r ${getExpertiseColor(expIndex)} text-white text-xs font-medium shadow-sm`}
                    >
                      {typeof exp === 'object' ? exp[language] : exp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Background Preview */}
            {background && (
              <div className="mb-4 p-3 rounded-xl bg-gradient-to-br from-cyan-50/80 to-blue-50/80 border border-cyan-200">
                <p className="text-sm text-blue-800 line-clamp-3 leading-relaxed">{background}</p>
              </div>
            )}

            {/* Action Button */}
            {speaker?.enriched_profile && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSpeaker(speaker);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg transition-all group/btn overflow-hidden relative"
              >
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                
                <ExternalLink className="w-4 h-4 relative z-10" />
                <span className="relative z-10">
                  {language === 'en' ? 'View Full Profile' : 'عرض الملف الكامل'}
                </span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <div className="space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Mic2 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {language === 'en' ? 'Featured Speakers' : 'المتحدثون المميزون'}
            </h2>
          </div>
          
          <p className="text-blue-700 text-lg max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Meet the industry leaders and innovators shaping the future' 
              : 'تعرف على قادة الصناعة والمبتكرين الذين يصنعون المستقبل'}
          </p>
        </motion.div>

        {/* Stats Bar */}
        {speakers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="p-4 rounded-2xl bg-blue-50/90 border border-blue-200 text-center">
              <div className="text-2xl font-bold text-blue-600">{speakers.length}</div>
              <div className="text-sm text-blue-700 font-medium">
                {language === 'en' ? 'Total Speakers' : 'إجمالي المتحدثين'}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50/90 border border-purple-200 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {speakers.filter(s => s.in_person_details?.speaking_mode?.en === 'Virtual').length}
              </div>
              <div className="text-sm text-purple-700 font-medium">
                {language === 'en' ? 'Virtual' : 'افتراضي'}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-green-50/90 border border-green-200 text-center">
              <div className="text-2xl font-bold text-green-600">
                {speakers.filter(s => s.session_type?.en === 'Keynote').length}
              </div>
              <div className="text-sm text-green-700 font-medium">
                {language === 'en' ? 'Keynotes' : 'جلسات رئيسية'}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-orange-50/90 border border-orange-200 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {new Set(speakers.map(s => s.organization?.en)).size}
              </div>
              <div className="text-sm text-orange-700 font-medium">
                {language === 'en' ? 'Companies' : 'شركات'}
              </div>
            </div>
          </motion.div>
        )}

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {speakers.map((speaker: any, index: number) => (
            <SpeakerCard key={index} speaker={speaker} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {speakers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mx-auto mb-6">
              <Mic2 className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-blue-600 mb-3">
              {language === 'en' ? 'No Speakers Yet' : 'لا يوجد متحدثون بعد'}
            </h3>
            <p className="text-blue-500 max-w-md mx-auto">
              {language === 'en' 
                ? 'Speaker details will be available soon. Stay tuned for updates!' 
                : 'سيتم توفير تفاصيل المتحدثين قريبًا. ترقبوا التحديثات!'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Speaker Modal */}
      <AnimatePresence>
        {selectedSpeaker && (
          <SpeakerModal
            speaker={selectedSpeaker}
            language={language}
            onClose={() => setSelectedSpeaker(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}