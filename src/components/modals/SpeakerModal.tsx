import { X, User, Briefcase, GraduationCap, Award, Users, Newspaper, ExternalLink } from 'lucide-react';

interface SpeakerModalProps {
  speaker: any;
  language: 'en' | 'ar';
  onClose: () => void;
}

export default function SpeakerModal({ speaker, language, onClose }: SpeakerModalProps) {
  const profile = speaker.enriched_profile;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/40 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/30 bg-gradient-to-r from-purple-500 to-pink-500">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <User className="w-8 h-8" />
              {speaker.name[language]}
            </h2>
            <p className="text-white/90 mt-1">{speaker.role_title_at_organization[language]}</p>
            <p className="text-white/80 text-sm">{speaker.organization[language]}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800">{language === 'en' ? 'Session' : 'الجلسة'}</h3>
            </div>
            <p className="text-lg font-semibold text-gray-800 mb-1">{speaker.assigned_session_title[language]}</p>
            <div className="flex items-center gap-3 mt-3">
              <span className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-sm font-medium">
                {speaker.session_type[language]}
              </span>
              <span className="text-gray-600">
                {speaker.planned_session_length_minutes} {language === 'en' ? 'minutes' : 'دقيقة'}
              </span>
            </div>
          </div>

          {profile?.bio && (
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40">
              <h3 className="font-semibold text-gray-800 mb-3">{language === 'en' ? 'Biography' : 'السيرة الذاتية'}</h3>
              <p className="text-gray-700 leading-relaxed">{profile.bio[language]}</p>
            </div>
          )}

          {speaker.background_long && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
              <h3 className="font-semibold text-gray-800 mb-2">{language === 'en' ? 'Background' : 'الخلفية'}</h3>
              <p className="text-gray-700">{speaker.background_long[language]}</p>
            </div>
          )}

          {profile?.education && (
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-800">{language === 'en' ? 'Education' : 'التعليم'}</h3>
              </div>
              <p className="text-gray-700">{profile.education[language]}</p>
            </div>
          )}

          {profile?.career_history && (
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40">
              <h3 className="font-semibold text-gray-800 mb-3">{language === 'en' ? 'Career History' : 'التاريخ المهني'}</h3>

              {profile.career_history.current_roles && profile.career_history.current_roles.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">{language === 'en' ? 'Current Roles' : 'الأدوار الحالية'}</p>
                  <ul className="space-y-1">
                    {profile.career_history.current_roles.map((role: string, idx: number) => (
                      <li key={idx} className="text-gray-700 flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {profile.career_history.past_roles && profile.career_history.past_roles.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">{language === 'en' ? 'Past Roles' : 'الأدوار السابقة'}</p>
                  <ul className="space-y-1">
                    {profile.career_history.past_roles.map((role: string, idx: number) => (
                      <li key={idx} className="text-gray-700 flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {profile.career_history.board_memberships && profile.career_history.board_memberships.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">{language === 'en' ? 'Board Memberships' : 'عضويات المجالس'}</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.career_history.board_memberships.map((board: string, idx: number) => (
                      <span key={idx} className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium">
                        {board}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {profile?.notable_achievements && profile.notable_achievements.length > 0 && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-800">{language === 'en' ? 'Notable Achievements' : 'الإنجازات البارزة'}</h3>
              </div>
              <ul className="space-y-2">
                {profile.notable_achievements.map((achievement: string, idx: number) => (
                  <li key={idx} className="text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {profile?.team_senior && profile.team_senior.length > 0 && (
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-800">{language === 'en' ? 'Senior Team Members' : 'كبار أعضاء الفريق'}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {profile.team_senior.map((member: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                    <p className="font-semibold text-gray-800">{member.name}</p>
                    <p className="text-sm text-blue-600">{member.role}</p>
                    {member.note && <p className="text-xs text-gray-600 mt-1">{member.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {profile?.recent_news && profile.recent_news.length > 0 && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-4">
                <Newspaper className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-gray-800">{language === 'en' ? 'Recent News' : 'الأخبار الأخيرة'}</h3>
              </div>
              <div className="space-y-3">
                {profile.recent_news.map((news: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/70">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-orange-600">{news.date}</span>
                      {news.source && <span className="text-xs text-gray-500">{news.source}</span>}
                    </div>
                    <p className="text-gray-800">{news.headline}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {speaker.in_person_details && (
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40">
              <h3 className="font-semibold text-gray-800 mb-3">{language === 'en' ? 'Attendance Details' : 'تفاصيل الحضور'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {speaker.in_person_details.speaking_mode && (
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Mode' : 'النمط'}</p>
                    <p className="font-semibold text-gray-800">{speaker.in_person_details.speaking_mode[language]}</p>
                  </div>
                )}
                {speaker.in_person_details.arrival_city && (
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                    <p className="text-sm text-gray-600">{language === 'en' ? 'City' : 'المدينة'}</p>
                    <p className="font-semibold text-gray-800">{speaker.in_person_details.arrival_city[language]}</p>
                  </div>
                )}
                {speaker.in_person_details.arrival_date && (
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Arrival' : 'الوصول'}</p>
                    <p className="font-semibold text-gray-800">{speaker.in_person_details.arrival_date}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {profile?.sources && profile.sources.length > 0 && (
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40">
              <h3 className="font-semibold text-gray-800 mb-3">{language === 'en' ? 'Sources' : 'المصادر'}</h3>
              <div className="space-y-2">
                {profile.sources.map((url: string, idx: number) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm group"
                  >
                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="truncate">{url}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
