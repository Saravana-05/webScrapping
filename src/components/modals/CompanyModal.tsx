import { X, Building2, MapPin, Calendar, Users, Briefcase, TrendingUp, Award, Heart, Users as Team, Newspaper, DollarSign, ExternalLink } from 'lucide-react';

interface CompanyModalProps {
  company: any;
  language: 'en' | 'ar';
  onClose: () => void;
}

export default function CompanyModal({ company, language, onClose }: CompanyModalProps) {
  const enriched = company.enriched;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/40 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/30 bg-gradient-to-r from-blue-500 to-cyan-500">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Building2 className="w-8 h-8" />
            {company.name[language]}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {enriched?.mantra && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-800">{language === 'en' ? 'Company Mantra' : 'شعار الشركة'}</h3>
              </div>
              <p className="text-gray-700 italic text-lg">"{enriched.mantra}"</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">{language === 'en' ? 'Headquarters' : 'المقر الرئيسي'}</span>
              </div>
              <p className="text-gray-800">{company.headquarters?.[language] || company.headquarters}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">{language === 'en' ? 'Founded' : 'تأسست'}</span>
              </div>
              <p className="text-gray-800">{company.founded}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Briefcase className="w-5 h-5" />
                <span className="font-semibold">{language === 'en' ? 'Industry' : 'الصناعة'}</span>
              </div>
              <p className="text-gray-800">{company.industry?.[language] || company.industry}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Users className="w-5 h-5" />
                <span className="font-semibold">{language === 'en' ? 'CEO' : 'الرئيس التنفيذي'}</span>
              </div>
              <p className="text-gray-800">{company.CEO?.[language] || company.CEO}</p>
            </div>
          </div>

          {enriched?.policy_short && (
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40">
              <h3 className="font-semibold text-gray-800 mb-2">{language === 'en' ? 'Company Policy' : 'سياسة الشركة'}</h3>
              <p className="text-gray-700">{enriched.policy_short}</p>
            </div>
          )}

          {company.profile_brief && (
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40">
              <h3 className="font-semibold text-gray-800 mb-2">{language === 'en' ? 'Company Profile' : 'ملف الشركة'}</h3>
              <p className="text-gray-700 leading-relaxed">{company.profile_brief[language]}</p>
            </div>
          )}

          {enriched?.stock && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-800">{language === 'en' ? 'Stock Information' : 'معلومات الأسهم'}</h3>
              </div>
              <div className="space-y-2">
                {enriched.stock.ticker && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">{language === 'en' ? 'Ticker:' : 'الرمز:'}</span>
                    <span className="px-3 py-1 rounded-lg bg-green-600 text-white font-bold">{enriched.stock.ticker}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">{language === 'en' ? 'Publicly Traded:' : 'متداول علنًا:'}</span>
                  <span className={`px-3 py-1 rounded-lg font-medium ${enriched.stock.publicly_traded ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {enriched.stock.publicly_traded ? (language === 'en' ? 'Yes' : 'نعم') : (language === 'en' ? 'No' : 'لا')}
                  </span>
                </div>
                {enriched.stock.note && (
                  <p className="text-sm text-gray-600 mt-2">{enriched.stock.note}</p>
                )}
              </div>
            </div>
          )}

          {enriched?.leadership_profiles && enriched.leadership_profiles.length > 0 && (
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40">
              <div className="flex items-center gap-2 mb-4">
                <Team className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-800">{language === 'en' ? 'Leadership Team' : 'فريق القيادة'}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {enriched.leadership_profiles.map((leader: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                    <p className="font-semibold text-gray-800">{leader.name}</p>
                    <p className="text-sm text-blue-600">{leader.role}</p>
                    {leader.bio && <p className="text-sm text-gray-600 mt-1">{leader.bio}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {enriched?.partners && enriched.partners.length > 0 && (
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40">
              <h3 className="font-semibold text-gray-800 mb-3">{language === 'en' ? 'Key Partners' : 'الشركاء الرئيسيون'}</h3>
              <div className="flex flex-wrap gap-2">
                {enriched.partners.map((partner: string, idx: number) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium">
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          )}

          {enriched?.investors_major && enriched.investors_major.length > 0 && (
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-800">{language === 'en' ? 'Major Investors' : 'المستثمرون الرئيسيون'}</h3>
              </div>
              <ul className="space-y-1">
                {enriched.investors_major.map((investor: string, idx: number) => (
                  <li key={idx} className="text-gray-700">• {investor}</li>
                ))}
              </ul>
            </div>
          )}

          {enriched?.latest_news_summary && enriched.latest_news_summary.length > 0 && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <Newspaper className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-800">{language === 'en' ? 'Latest News' : 'آخر الأخبار'}</h3>
              </div>
              <div className="space-y-3">
                {enriched.latest_news_summary.map((news: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/70">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-purple-600">{news.date}</span>
                    </div>
                    <p className="font-semibold text-gray-800 mb-1">{news.headline}</p>
                    {news.summary && <p className="text-sm text-gray-600">{news.summary}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {company.source_urls && company.source_urls.length > 0 && (
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/40">
              <h3 className="font-semibold text-gray-800 mb-3">{language === 'en' ? 'Sources' : 'المصادر'}</h3>
              <div className="space-y-2">
                {company.source_urls.map((url: string, idx: number) => (
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
