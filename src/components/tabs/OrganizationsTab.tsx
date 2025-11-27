import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import HandshakeIcon from '@mui/icons-material/Handshake';
import StarsIcon from '@mui/icons-material/Stars';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VerifiedIcon from '@mui/icons-material/Verified';

interface OrganizationsTabProps {
  event: any;
  language: 'en' | 'ar';
}

export default function OrganizationsTab({ event, language }: OrganizationsTabProps) {
  const organizations = event.represented_organizations || [];
  const sponsors = event.sponsors || [];
  const strategicPartners = event.strategic_partners || [];
  const leadingPartners = event.leading_partners || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-xl">
          <BusinessIcon className="text-white" sx={{ fontSize: 28 }} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {language === 'en' ? 'Organizations & Partners' : 'المنظمات والشركاء'}
        </h2>
      </div>

      {organizations.length > 0 && (
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 border-2 border-blue-200 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-20 -mr-48 -mt-48" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                <BusinessIcon className="text-white" sx={{ fontSize: 24 }} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                {language === 'en' ? 'Represented Organizations' : 'المنظمات الممثلة'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {organizations.map((org: any, idx: number) => (
                <div
                  key={idx}
                  className="group relative p-5 rounded-2xl bg-white border-2 border-blue-200 hover:border-blue-400 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                        <BusinessIcon className="text-white" sx={{ fontSize: 28 }} />
                      </div>
                    </div>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base leading-tight">
                      {typeof org === 'object' ? org[language] : org}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2">
                    <VerifiedIcon sx={{ fontSize: 16, color: '#3b82f6' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {sponsors.length > 0 && (
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-200 shadow-xl overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-300 rounded-full filter blur-3xl opacity-20 -ml-48 -mb-48" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <EmojiEventsIcon className="text-white" sx={{ fontSize: 24 }} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                {language === 'en' ? 'Sponsors' : 'الرعاة'}
              </h3>
            </div>

            <div className="space-y-3">
              {sponsors.map((sponsor: any, idx: number) => (
                <div
                  key={idx}
                  className="group relative p-5 rounded-2xl bg-white border-2 border-amber-200 hover:border-amber-400 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <StarsIcon sx={{ fontSize: 24, color: '#f59e0b' }} />
                    </div>
                    <p className="text-gray-800 font-semibold text-base sm:text-lg">
                      {typeof sponsor === 'object' ? sponsor[language] : sponsor}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {strategicPartners.length > 0 && (
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50 border-2 border-emerald-200 shadow-xl overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-300 rounded-full filter blur-3xl opacity-20 -ml-48 -mt-48" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center shadow-lg">
                <HandshakeIcon className="text-white" sx={{ fontSize: 24 }} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                {language === 'en' ? 'Strategic Partners' : 'الشركاء الاستراتيجيون'}
              </h3>
            </div>

            <div className="space-y-3">
              {strategicPartners.map((partner: any, idx: number) => (
                <div
                  key={idx}
                  className="group relative p-5 rounded-2xl bg-white border-2 border-emerald-200 hover:border-emerald-400 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <HandshakeIcon sx={{ fontSize: 24, color: '#10b981' }} />
                    </div>
                    <p className="text-gray-800 font-semibold text-base sm:text-lg">
                      {typeof partner === 'object' ? partner[language] : partner}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/5 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {leadingPartners.length > 0 && (
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-50 via-purple-50 to-violet-50 border-2 border-violet-200 shadow-xl overflow-hidden">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-300 rounded-full filter blur-3xl opacity-20 -mr-48 -mb-48" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg">
                <GroupsIcon className="text-white" sx={{ fontSize: 24 }} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                {language === 'en' ? 'Leading Partners' : 'الشركاء الرائدون'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {leadingPartners.map((partner: string, idx: number) => (
                <div
                  key={idx}
                  className="group relative p-5 rounded-2xl bg-white border-2 border-violet-200 hover:border-violet-400 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <GroupsIcon sx={{ fontSize: 28, color: '#8b5cf6' }} />
                    </div>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">{partner}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-400/0 via-violet-400/10 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {organizations.length === 0 && sponsors.length === 0 && strategicPartners.length === 0 && leadingPartners.length === 0 && (
        <div className="text-center py-16 px-4 rounded-3xl bg-gray-50 border-2 border-gray-200">
          <BusinessIcon sx={{ fontSize: 64, color: '#9ca3af' }} />
          <p className="mt-4 text-gray-500 text-lg">
            {language === 'en' ? 'No organizations or partners information available' : 'لا توجد معلومات عن المنظمات أو الشركاء'}
          </p>
        </div>
      )}
    </div>
  );
}
