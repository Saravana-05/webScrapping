import SecurityIcon from '@mui/icons-material/Security';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LinkIcon from '@mui/icons-material/Link';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LaunchIcon from '@mui/icons-material/Launch';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

interface MetaTabProps {
  event: any;
  language: 'en' | 'ar';
}

export default function MetaTab({ event, language }: MetaTabProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-xl">
          <AdminPanelSettingsIcon className="text-white" sx={{ fontSize: 28 }} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {language === 'en' ? 'Meta & Admin Information' : 'المعلومات الإدارية'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {event.source_credibility && (
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 hover:border-emerald-400 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full filter blur-2xl opacity-20 -mr-16 -mt-16" />
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <VerifiedUserIcon className="text-white" sx={{ fontSize: 28 }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {language === 'en' ? 'Source Credibility' : 'مصداقية المصدر'}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{event.source_credibility[language]}</p>
              </div>
            </div>
          </div>
        )}

        {event.last_updated && (
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:border-blue-400 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full filter blur-2xl opacity-20 -mr-16 -mt-16" />
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <CalendarTodayIcon className="text-white" sx={{ fontSize: 24 }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {language === 'en' ? 'Last Updated' : 'آخر تحديث'}
                </h3>
                <p className="text-gray-700 text-xl font-bold">{event.last_updated}</p>
              </div>
            </div>
          </div>
        )}

        {event.impact_score && (
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:border-purple-400 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full filter blur-2xl opacity-20 -mr-16 -mt-16" />
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <AssessmentIcon className="text-white" sx={{ fontSize: 28 }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {language === 'en' ? 'Impact Score' : 'درجة التأثير'}
                </h3>
                <div className="flex items-center gap-3">
                  <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{event.impact_score}</p>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(event.impact_score / 100) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {event.expected_attendees && (
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 hover:border-orange-400 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full filter blur-2xl opacity-20 -mr-16 -mt-16" />
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <PeopleIcon className="text-white" sx={{ fontSize: 28 }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {language === 'en' ? 'Expected Attendees' : 'الحضور المتوقع'}
                </h3>
                <p className="text-gray-700 text-lg font-semibold">{event.expected_attendees[language]}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {event.expected_attendance && (
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 shadow-xl overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-300 rounded-full filter blur-3xl opacity-20 -ml-48 -mb-48" />
          <div className="relative flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg">
              <TrendingUpIcon className="text-white" sx={{ fontSize: 28 }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {language === 'en' ? 'Attendance Details' : 'تفاصيل الحضور'}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">{event.expected_attendance[language]}</p>
            </div>
          </div>
        </div>
      )}

      {event.contact_email && (
        <div className="relative p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-400 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <EmailIcon sx={{ fontSize: 24, color: '#3b82f6' }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {language === 'en' ? 'Contact Email' : 'البريد الإلكتروني'}
              </h3>
              <a
                href={`mailto:${event.contact_email}`}
                className="text-blue-600 hover:text-blue-700 font-medium break-all inline-flex items-center gap-2 group/link"
              >
                <span>{event.contact_email}</span>
                <LaunchIcon sx={{ fontSize: 16 }} className="group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      )}

      {event.registration_url && (
        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 hover:border-rose-400 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-rose-600 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <LinkIcon className="text-white" sx={{ fontSize: 24 }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {language === 'en' ? 'Registration URL' : 'رابط التسجيل'}
              </h3>
              <a
                href={event.registration_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium group/link break-all"
              >
                <LaunchIcon sx={{ fontSize: 18 }} className="flex-shrink-0 group-hover/link:scale-110 transition-transform" />
                <span className="truncate">{event.registration_url}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {event.source_url && (
        <div className="relative p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-gray-400 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PublicIcon sx={{ fontSize: 24, color: '#64748b' }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {language === 'en' ? 'Source URL' : 'رابط المصدر'}
              </h3>
              <a
                href={event.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group/link break-all"
              >
                <LaunchIcon sx={{ fontSize: 18 }} className="flex-shrink-0 group-hover/link:scale-110 transition-transform" />
                <span className="truncate">{event.source_url}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {event.social_links && Object.keys(event.social_links).length > 0 && (
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sky-50 to-cyan-50 border-2 border-sky-200 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-300 rounded-full filter blur-3xl opacity-20 -mr-32 -mt-32" />
          <div className="relative">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {language === 'en' ? 'Social Links' : 'روابط التواصل الاجتماعي'}
            </h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(event.social_links).map(([platform, url]: [string, any]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/social px-5 py-3 rounded-xl bg-white border-2 border-sky-200 hover:border-sky-400 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2">
                    <PublicIcon sx={{ fontSize: 20, color: '#0ea5e9' }} />
                    <span className="font-semibold text-gray-800 capitalize">{platform}</span>
                    <LaunchIcon sx={{ fontSize: 14 }} className="group-hover/social:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {event.sources_for_attendance_and_vips && event.sources_for_attendance_and_vips.length > 0 && (
        <div className="relative p-6 sm:p-8 rounded-3xl bg-white border-2 border-gray-200 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-lg">
              <SecurityIcon className="text-white" sx={{ fontSize: 24 }} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              {language === 'en' ? 'Sources for Attendance & VIPs' : 'مصادر الحضور والشخصيات المهمة'}
            </h3>
          </div>
          <div className="space-y-3">
            {event.sources_for_attendance_and_vips.map((url: string, idx: number) => (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 transition-all group"
              >
                <LaunchIcon sx={{ fontSize: 18, color: '#64748b' }} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700 text-sm truncate flex-1">{url}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {event.tags_or_keywords && event.tags_or_keywords.length > 0 && (
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 shadow-xl overflow-hidden">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-300 rounded-full filter blur-3xl opacity-20 -mr-48 -mb-48" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg">
                <LocalOfferIcon className="text-white" sx={{ fontSize: 24 }} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {language === 'en' ? 'Keywords & Tags' : 'الكلمات المفتاحية والعلامات'}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {event.tags_or_keywords.map((tag: any, idx: number) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-violet-200 text-violet-700 text-sm font-medium hover:border-violet-400 hover:shadow-md transition-all"
                >
                  {typeof tag === 'object' ? tag[language] : tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {event.registration_type && (
        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 hover:border-teal-400 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <AssessmentIcon className="text-white" sx={{ fontSize: 24 }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {language === 'en' ? 'Registration Type' : 'نوع التسجيل'}
              </h3>
              <p className="text-gray-700 text-lg font-semibold">{event.registration_type[language]}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
