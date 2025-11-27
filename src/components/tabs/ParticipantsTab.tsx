import { useState } from 'react';
import { 
  Building2, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Calendar, 
  Users, 
  Briefcase, 
  Award, 
  ExternalLink, 
  TrendingUp,
  Target,
  Crown,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CompanyModal from '../modals/CompanyModal';

interface ParticipantsTabProps {
  event: any;
  language: 'en' | 'ar';
}

export default function ParticipantsTab({ event, language }: ParticipantsTabProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const participants = event.participants_details || [];

  const getSponsorshipColor = (role: string) => {
    const roles = {
      'platinum': 'from-purple-500 to-pink-500',
      'gold': 'from-yellow-500 to-orange-500',
      'silver': 'from-blue-400 to-cyan-400',
      'bronze': 'from-amber-600 to-orange-600',
      'partner': 'from-green-500 to-emerald-500',
      'default': 'from-blue-500 to-cyan-500'
    };
    return roles[role as keyof typeof roles] || roles.default;
  };

  const getIndustryIcon = (industry: string) => {
    const industries: { [key: string]: JSX.Element } = {
      'technology': <TrendingUp className="w-4 h-4" />,
      'energy': <Sparkles className="w-4 h-4" />,
      'finance': <Briefcase className="w-4 h-4" />,
      'healthcare': <Users className="w-4 h-4" />,
      'manufacturing': <Building2 className="w-4 h-4" />,
      'default': <Building2 className="w-4 h-4" />
    };
    
    const industryKey = industry?.toLowerCase().includes('tech') ? 'technology' : 
                      industry?.toLowerCase().includes('energy') ? 'energy' :
                      industry?.toLowerCase().includes('finance') ? 'finance' :
                      industry?.toLowerCase().includes('health') ? 'healthcare' :
                      industry?.toLowerCase().includes('manufactur') ? 'manufacturing' : 'default';
    
    return industries[industryKey];
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              {language === 'en' ? 'Event Participants' : 'المشاركون في الحدث'}
            </h2>
            <p className="text-blue-700">
              {language === 'en' 
                ? `${participants.length} companies participating` 
                : `${participants.length} شركة مشاركة`}
            </p>
          </div>
        </div>

        {/* Participants List */}
        <div className="space-y-4">
          {participants.map((participant: any, index: number) => {
            const isExpanded = expandedIndex === index;
            const companyProfile = event.company_profiles_enriched?.[participant.name.en];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="backdrop-blur-xl bg-white/80 rounded-2xl border border-blue-200/60 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Header - Always Visible */}
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getSponsorshipColor(participant.sponsorship_role)} flex items-center justify-center shadow-md flex-shrink-0`}>
                        {getIndustryIcon(participant.industry?.en)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-blue-900 truncate">
                            {participant.name[language]}
                          </h3>
                          {participant.sponsorship_role && (
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getSponsorshipColor(participant.sponsorship_role)} shadow-sm`}>
                              {participant.sponsorship_role[language]}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 text-sm text-blue-700">
                          <div className="flex items-center gap-1">
                            {getIndustryIcon(participant.industry?.en)}
                            <span>{participant.industry?.[language] || participant.industry}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{participant.headquarters?.[language] || participant.headquarters}</span>
                          </div>
                          {participant.founded && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{participant.founded}</span>
                              </div>
                            </>
                          )}
                        </div>

                        {participant.CEO && (
                          <div className="flex items-center gap-2 mt-2">
                            <Users className="w-3 h-3 text-blue-500" />
                            <span className="text-sm text-blue-700">
                              CEO: {participant.CEO[language] || participant.CEO}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors ml-4 flex-shrink-0"
                    >
                      {isExpanded ? (
                        <>
                          <span className="text-sm font-medium text-blue-700">{language === 'en' ? 'Less' : 'أقل'}</span>
                          <ChevronUp className="w-4 h-4 text-blue-600" />
                        </>
                      ) : (
                        <>
                          <span className="text-sm font-medium text-blue-700">{language === 'en' ? 'More' : 'المزيد'}</span>
                          <ChevronDown className="w-4 h-4 text-blue-600" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Expandable Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-blue-200/60"
                    >
                      <div className="p-5 space-y-4">
                        {/* Profile Brief */}
                        {participant.profile_brief && (
                          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200">
                            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-blue-600" />
                              {language === 'en' ? 'Company Profile' : 'ملف الشركة'}
                            </h4>
                            <p className="text-blue-800 text-sm leading-relaxed">
                              {participant.profile_brief[language]}
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Why They Attend */}
                          {participant.why_attend && (
                            <div className="p-4 rounded-xl bg-green-50/80 border border-green-200">
                              <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                                <Target className="w-4 h-4 text-green-600" />
                                {language === 'en' ? 'Why They Attend' : 'لماذا يحضرون'}
                              </h4>
                              <p className="text-green-800 text-sm leading-relaxed">
                                {participant.why_attend[language]}
                              </p>
                            </div>
                          )}

                          {/* Their Contribution */}
                          {participant.what_they_contributed && (
                            <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-200">
                              <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                                <Crown className="w-4 h-4 text-purple-600" />
                                {language === 'en' ? 'Their Contribution' : 'مساهمتهم'}
                              </h4>
                              <p className="text-purple-800 text-sm leading-relaxed">
                                {participant.what_they_contributed[language]}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Products & Services */}
                        {participant.products && participant.products.length > 0 && (
                          <div className="p-4 rounded-xl bg-orange-50/80 border border-orange-200">
                            <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-orange-600" />
                              {language === 'en' ? 'Products & Services' : 'المنتجات والخدمات'}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {participant.products.map((product: any, idx: number) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-medium shadow-sm"
                                >
                                  {typeof product === 'object' ? product[language] : product}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${getSponsorshipColor(participant.sponsorship_role)} text-white text-sm font-medium shadow-sm flex items-center gap-1.5`}>
                              <Award className="w-3 h-3" />
                              {participant.sponsorship_role?.[language] || participant.sponsorship_role}
                            </span>
                          </div>

                          {companyProfile && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedCompany({ ...participant, enriched: companyProfile })}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium text-sm hover:shadow-lg transition-all"
                            >
                              <ExternalLink className="w-4 h-4" />
                              {language === 'en' ? 'Full Profile' : 'الملف الكامل'}
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {participants.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-blue-500 bg-blue-50/50 rounded-2xl border border-blue-200"
          >
            <Building2 className="w-16 h-16 text-blue-300 mx-auto mb-4" />
            <p className="text-lg font-medium text-blue-600">
              {language === 'en' 
                ? 'No participant details available' 
                : 'لا توجد تفاصيل المشاركين متاحة'}
            </p>
          </motion.div>
        )}

        {/* Summary Stats */}
        {participants.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-center">
              <div className="text-2xl font-bold text-blue-600">{participants.length}</div>
              <div className="text-sm text-blue-700 font-medium">
                {language === 'en' ? 'Total Participants' : 'إجمالي المشاركين'}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-green-50/80 border border-green-200 text-center">
              <div className="text-2xl font-bold text-green-600">
                {participants.filter((p: any) => p.sponsorship_role).length}
              </div>
              <div className="text-sm text-green-700 font-medium">
                {language === 'en' ? 'Sponsors' : 'الرعاة'}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-200 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(participants.map((p: any) => p.industry?.en)).size}
              </div>
              <div className="text-sm text-purple-700 font-medium">
                {language === 'en' ? 'Industries' : 'القطاعات'}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-orange-50/80 border border-orange-200 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {participants.filter((p: any) => p.products).length}
              </div>
              <div className="text-sm text-orange-700 font-medium">
                {language === 'en' ? 'With Products' : 'بمنتجات'}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {selectedCompany && (
        <CompanyModal
          company={selectedCompany}
          language={language}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </>
  );
}