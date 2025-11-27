import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";

interface TimelineChartsViewProps {
  event: any;
  language: "en" | "ar";
}

export default function TimelineChartsView({ event, language }: TimelineChartsViewProps) {
  const sessions = event.featured_sessions || [];

  // Sample timeline data - you would replace this with actual event timeline data
  const timelineData = [
    { time: "09:00", title: { en: "Opening Keynote", ar: "الجلسة الافتتاحية" }, type: "keynote" },
    { time: "10:30", title: { en: "Tech Innovation Panel", ar: "لوحة الابتكار التقني" }, type: "panel" },
    { time: "12:00", title: { en: "Networking Lunch", ar: "غداء التواصل" }, type: "break" },
    { time: "14:00", title: { en: "AI Workshop", ar: "ورشة الذكاء الاصطناعي" }, type: "workshop" },
    { time: "16:00", title: { en: "Closing Remarks", ar: "الكلمات الختامية" }, type: "closing" },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "keynote": return "bg-blue-500";
      case "panel": return "bg-green-500";
      case "workshop": return "bg-purple-500";
      case "break": return "bg-yellow-500";
      case "closing": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      keynote: { en: "Keynote", ar: "جلسة رئيسية" },
      panel: { en: "Panel", ar: "لوحة نقاش" },
      workshop: { en: "Workshop", ar: "ورشة عمل" },
      break: { en: "Break", ar: "استراحة" },
      closing: { en: "Closing", ar: "ختامية" },
    };
    return labels[type as keyof typeof labels]?.[language] || type;
  };

  return (
    <div className="space-y-8">
      {/* VERTICAL TIMELINE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl bg-gradient-to-br from-blue-50/60 to-indigo-50/60 backdrop-blur-xl shadow-xl border border-indigo-200"
      >
        <h3 className="text-2xl font-bold text-blue-900 mb-8 text-center">
          {language === "en" ? "Event Timeline" : "الجدول الزمني للحدث"}
        </h3>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
          
          <div className="space-y-6">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start gap-6"
              >
                {/* Timeline dot */}
                <div className={`w-6 h-6 rounded-full ${getTypeColor(item.type)} border-4 border-white shadow-lg z-10 relative`}></div>
                
                {/* Content */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 bg-white p-6 rounded-2xl shadow-lg border border-blue-100"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Clock size={18} />
                      <span className="font-semibold">{item.time}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getTypeColor(item.type)}`}>
                      {getTypeLabel(item.type)}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-blue-800 mb-2">
                    {item.title[language]}
                  </h4>
                  <p className="text-blue-600">
                    {language === "en" 
                      ? "Important session covering key topics and innovations"
                      : "جلسة مهمة تغطي المواضيع الرئيسية والابتكارات"}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* HORIZONTAL TIMELINE FOR FEATURED SESSIONS */}
      {sessions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl border border-green-200"
        >
          <h3 className="text-2xl font-bold text-blue-900 mb-8 text-center">
            {language === "en" ? "Featured Sessions Timeline" : "الجدول الزمني للجلسات المميزة"}
          </h3>

          <div className="relative">
            {/* Horizontal timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full transform -translate-y-1/2"></div>
            
            <div className="flex justify-between relative">
              {sessions.slice(0, 5).map((session: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="relative flex flex-col items-center"
                >
                  {/* Timeline dot */}
                  <div className="w-6 h-6 rounded-full bg-green-500 border-4 border-white shadow-lg mb-4 z-10"></div>
                  
                  {/* Session card */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="w-48 bg-white p-4 rounded-xl shadow-lg border border-green-100 text-center"
                  >
                    <div className="text-sm text-green-600 font-semibold mb-2">
                      {language === "en" ? `Session ${index + 1}` : `الجلسة ${index + 1}`}
                    </div>
                    <h4 className="font-bold text-blue-800 text-sm mb-2 leading-tight">
                      {session.title?.[language]?.substring(0, 40)}
                      {session.title?.[language]?.length > 40 ? '...' : ''}
                    </h4>
                    <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mb-2"></div>
                    <div className="text-xs text-blue-600">
                      {language === "en" ? "45 min" : "٤٥ دقيقة"}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TIMELINE STATS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <div className="p-6 rounded-2xl bg-blue-50 text-center border border-blue-200">
          <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-700">{timelineData.length}</div>
          <div className="text-blue-600 font-medium">
            {language === "en" ? "Total Sessions" : "إجمالي الجلسات"}
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-green-50 text-center border border-green-200">
          <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-700">1</div>
          <div className="text-green-600 font-medium">
            {language === "en" ? "Event Day" : "يوم الحدث"}
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-purple-50 text-center border border-purple-200">
          <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-700">
            {event.mode?.[language] === "Virtual" || event.mode?.[language] === "افتراضي" ? "Virtual" : "In-Person"}
          </div>
          <div className="text-purple-600 font-medium">
            {language === "en" ? "Format" : "الشكل"}
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-orange-50 text-center border border-orange-200">
          <div className="w-8 h-8 text-orange-600 mx-auto mb-2 font-bold text-xl">⏱️</div>
          <div className="text-2xl font-bold text-orange-700">8h</div>
          <div className="text-orange-600 font-medium">
            {language === "en" ? "Duration" : "المدة"}
          </div>
        </div>
      </motion.div>
    </div>
  );
}