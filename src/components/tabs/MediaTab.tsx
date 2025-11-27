import { Image as ImageIcon,ExternalLink,Calendar, Newspaper, Link as LinkIcon } from 'lucide-react';
import { motion } from "framer-motion";


interface MediaTabProps {
  event: any;
  language: 'en' | 'ar';
}

export default function MediaTab({ event, language }: MediaTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {language === 'en' ? 'Media & Press' : 'الوسائط والصحافة'}
      </h2>

      

      {/* ---------------- MEDIA PARTNERS WITH LOGOS & ANIMATION ---------------- */}
{event?.media_partners && event.media_partners.length > 0 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-xl"
  >
    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
      <Newspaper className="w-6 h-6 text-blue-600" />
      {language === "en" ? "Media Partners" : "شركاء الإعلام"}
    </h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {event.media_partners.map((partner: any = {}, idx: number) => {
        const name = partner?.name?.[language] ?? (language === "en" ? "Unnamed Media" : "وسيط غير معروف");
        const desc = partner?.description?.[language] ?? "";
        const type = partner?.type ?? "";
        const url = partner?.profile_link ?? "";
        const logo = partner?.logo_url ?? null;

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
          >
            {/* LOGO OR DEFAULT ICON */}
            <div className="flex items-center justify-between mb-3">
              <div className="w-14 h-14 rounded-xl bg-white shadow-md border border-gray-200 flex items-center justify-center overflow-hidden">
                {logo ? (
                  <img
                    src={logo}
                    alt={name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-blue-600" />
                )}
              </div>

              {type && (
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                  {type}
                </span>
              )}
            </div>

            <h4 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-blue-700 transition-colors">
              {name}
            </h4>

            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {desc}
            </p>

            {url && url.trim() !== "" && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 transition-colors"
              >
                <LinkIcon className="w-4 h-4" />
                {language === "en" ? "Visit Profile" : "زيارة الملف"}
              </a>
            )}
          </motion.div>
        );
      })}
    </div>
  </motion.div>
)}

{/* ---------------- ENHANCED NEWS SECTION ---------------- */}
{event?.news_details && event.news_details.length > 0 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 shadow-lg"
    dir={language === "ar" ? "rtl" : "ltr"}
  >
    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
      <Newspaper className="w-7 h-7 text-purple-600" />
      {language === "en" ? "News & Coverage" : "الأخبار والتغطيات الصحفية"}
    </h3>

    <div className="relative border-s-2 border-purple-300 pl-4 space-y-6">
      {event.news_details.map((news: any = {}, idx: number) => {
        const headline = news?.headline?.[language] ?? "";
        const summary = news?.summary?.[language] ?? "";
        const date = news?.date ?? "";
        const url = news?.url ?? "";
        const source = news?.source?.[language] ?? "";

        // Auto category tag color
        const tagColor =
          source.toLowerCase().includes("press") ||
          source.toLowerCase().includes("ود") ||
          source.toLowerCase().includes("بيان")
            ? "bg-red-100 text-red-700 border-red-200"
            : "bg-purple-100 text-purple-700 border-purple-200";

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="relative p-5 rounded-xl bg-white/90 backdrop-blur-sm border border-purple-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
          >
            {/* Timeline Dot */}
            <span className="absolute -left-3 top-5 w-3 h-3 bg-purple-500 rounded-full border-2 border-white"></span>

            {/* Header Row */}
            <div className="flex items-center justify-between mb-2">
              {/* Date */}
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Calendar className="w-4 h-4 text-purple-500" />
                <span>{date}</span>
              </div>

              {/* Source Tag */}
              <span
                className={`px-2 py-1 text-xs rounded-full border ${tagColor}`}
              >
                {source}
              </span>
            </div>

            {/* Headline */}
            <h4 className="font-semibold text-gray-900 text-lg mb-2 leading-snug">
              {headline}
            </h4>

            {/* Summary */}
            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
              {summary}
            </p>

            {/* Actions */}
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-purple-300 text-purple-700 hover:bg-purple-100 transition"
              >
                <ExternalLink className="w-4 h-4" />
                {language === "en"
                  ? "Read full article"
                  : "قراءة المقال الكامل"}
              </a>
            )}
          </motion.div>
        );
      })}
    </div>
  </motion.div>
)}



     
    </div>
  );
}
