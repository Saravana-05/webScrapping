import {
  CalendarToday as CalendarTodayIcon,
  LocalOffer as LocalOfferIcon,
  AccessTime as AccessTimeIcon,
  TipsAndUpdates as TipsAndUpdatesIcon,
  CheckCircle as CheckCircleIcon,
  PlayCircleFilled as PlayCircleFilledIcon,
  Flag as FlagIcon,
  Schedule as ScheduleIcon,
  EventAvailable as EventAvailableIcon,
} from "@mui/icons-material";

import { motion } from "framer-motion";

interface AgendaTabProps {
  event: any;
  language: "en" | "ar";
}

export default function AgendaTab({ event, language }: AgendaTabProps) {
  const sessions = event.featured_sessions || [];
  const topics = event.key_topics || [];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Enhanced timeline data with more details
  const timelineData = [
    {
      icon: <EventAvailableIcon />,
      title: language === "en" ? "Registration Opens" : "فتح التسجيل",
      time: "08:00 AM",
      duration: "30 min",
      type: "registration",
      description: language === "en" ? "Welcome and check-in" : "الترحيب والتسجيل"
    },
    {
      icon: <PlayCircleFilledIcon />,
      title: language === "en" ? "Opening Keynote" : "الجلسة الافتتاحية",
      time: "08:30 AM",
      duration: "45 min",
      type: "keynote",
      description: language === "en" ? "Future of Technology" : "مستقبل التكنولوجيا"
    },
    {
      icon: <TipsAndUpdatesIcon />,
      title: language === "en" ? "Innovation Workshop" : "ورشة الابتكار",
      time: "09:30 AM",
      duration: "1.5 hrs",
      type: "workshop",
      description: language === "en" ? "Hands-on session" : "جلسة عملية"
    },
    {
      icon: <LocalOfferIcon />,
      title: language === "en" ? "Networking Break" : "استراحة التواصل",
      time: "11:00 AM",
      duration: "30 min",
      type: "break",
      description: language === "en" ? "Coffee & networking" : "قهوة وتواصل"
    }
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      registration: "from-blue-500 to-cyan-500",
      keynote: "from-purple-500 to-pink-500",
      workshop: "from-green-500 to-emerald-500",
      break: "from-orange-500 to-amber-500",
      default: "from-gray-500 to-gray-600"
    };
    return colors[type as keyof typeof colors] || colors.default;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      registration: <EventAvailableIcon sx={{ fontSize: 20 }} />,
      keynote: <PlayCircleFilledIcon sx={{ fontSize: 20 }} />,
      workshop: <TipsAndUpdatesIcon sx={{ fontSize: 20 }} />,
      break: <LocalOfferIcon sx={{ fontSize: 20 }} />,
    };
    return icons[type as keyof typeof icons] || <AccessTimeIcon sx={{ fontSize: 20 }} />;
  };

  return (
    <div className="space-y-12">

      {/* HEADER */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex items-center gap-4"
      >
        <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 
        flex items-center justify-center shadow-lg shadow-blue-300/40 backdrop-blur-xl border border-white/20">
          <CalendarTodayIcon className="text-white" />
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {language === "en" ? "Event Agenda" : "أجندة الحدث"}
        </h2>
      </motion.div>

      {/* AGENDA SUMMARY */}
      {event.agenda_summary && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative p-8 rounded-3xl bg-white/30 backdrop-blur-2xl 
          shadow-2xl border border-white/40 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-20 -mr-32 -mt-32" />

          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 
            flex items-center justify-center shadow-lg border border-white/40">
              <TipsAndUpdatesIcon className="text-white" sx={{ fontSize: 32 }} />
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {language === "en" ? "Agenda Summary" : "ملخص الأجندة"}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {event.agenda_summary[language]}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ENHANCED TIMELINE SECTION */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 
          flex items-center justify-center shadow-lg">
            <ScheduleIcon className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {language === "en" ? "Detailed Timeline" : "الجدول الزمني التفصيلي"}
          </h3>
        </div>

        {/* COMPACT TIMELINE CARDS */}
        <div className="space-y-4">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              {/* Timeline connector line */}
              {index < timelineData.length - 1 && (
                <div className="absolute left-6 top-14 w-0.5 h-8 bg-gradient-to-b from-blue-300 to-cyan-300 group-hover:from-blue-400 group-hover:to-cyan-400 transition-all z-0" />
              )}

              <div className="relative flex items-start gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-gray-200/60 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:border-cyan-300/60">
                {/* Timeline dot */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTypeColor(item.type)} flex items-center justify-center shadow-lg z-10 flex-shrink-0`}>
                  {getTypeIcon(item.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-cyan-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">
                        <AccessTimeIcon sx={{ fontSize: 16 }} />
                        {item.duration}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <AccessTimeIcon sx={{ fontSize: 16 }} />
                      <span className="font-medium">{item.time}</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span className="capitalize px-2 py-1 bg-gray-100 rounded-md text-xs font-medium">
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FEATURED SESSIONS */}
      {sessions.length > 0 && (
        <div className="space-y-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 
            flex items-center justify-center shadow-lg shadow-purple-300/40">
              <PlayCircleFilledIcon className="text-white" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              {language === "en" ? "Featured Sessions" : "الجلسات المميزة"}
            </h3>
          </motion.div>

          <div className="space-y-6">
            {sessions.map((session: any, idx: number) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                whileHover={{ scale: 1.01 }}
                className="p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-purple-200 
                hover:border-purple-400 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 
                  flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {idx + 1}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircleIcon sx={{ fontSize: 20, color: "#a855f7" }} />
                      <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                        {language === "en" ? "Session" : "جلسة"} {idx + 1}
                      </span>
                    </div>

                    {/* SESSION TITLE */}
                    <p className="font-semibold text-gray-800 text-lg leading-relaxed mb-2">
                      {session.title[language]}
                    </p>

                    {/* SESSION DESCRIPTION */}
                    {session.description && (
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {session.description[language]}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* KEY TOPICS */}
      {topics.length > 0 && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="p-8 rounded-3xl bg-white/20 backdrop-blur-xl border border-gray-200 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-gray-900 
            flex items-center justify-center shadow-lg">
              <LocalOfferIcon className="text-white" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              {language === "en" ? "Key Topics" : "المواضيع الرئيسية"}
            </h3>
          </div>

          <div className="flex flex-wrap gap-4">
            {topics.map((topic: any, idx: number) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.06 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 
                text-white shadow-md hover:shadow-2xl transition-all cursor-pointer"
              >
                <span className="text-sm sm:text-base font-medium">
                  {typeof topic === "object" ? topic[language] : topic}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ENHANCED EVENT TIMELINE - COMPACT DESIGN */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 
        text-white shadow-2xl overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -ml-36 -mt-36" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl -mr-36 -mb-36" />
        
        <div className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm 
            flex items-center justify-center border border-white/20">
              <AccessTimeIcon className="text-white" sx={{ fontSize: 28 }} />
            </div>

            <h3 className="text-2xl font-bold">
              {language === "en" ? "Event Schedule" : "جدول الحدث"}
            </h3>
          </div>

          {/* COMPACT TIMELINE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Start Date */}
            <motion.div 
              whileHover={{ scale: 1.03, y: -2 }}
              className="p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/30 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <EventAvailableIcon sx={{ fontSize: 20, color: "#10b981" }} />
                </div>
                <div>
                  <p className="text-sm opacity-80 font-medium">{language === "en" ? "Start Date" : "تاريخ البدء"}</p>
                  <p className="text-lg font-bold text-white group-hover:text-green-300 transition-colors">
                    {event.start_date}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* End Date */}
            <motion.div 
              whileHover={{ scale: 1.03, y: -2 }}
              className="p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/30 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <FlagIcon sx={{ fontSize: 20, color: "#ef4444" }} />
                </div>
                <div>
                  <p className="text-sm opacity-80 font-medium">{language === "en" ? "End Date" : "تاريخ الانتهاء"}</p>
                  <p className="text-lg font-bold text-white group-hover:text-red-300 transition-colors">
                    {event.end_date}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Duration */}
            <motion.div 
              whileHover={{ scale: 1.03, y: -2 }}
              className="p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/30 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <AccessTimeIcon sx={{ fontSize: 20, color: "#3b82f6" }} />
                </div>
                <div>
                  <p className="text-sm opacity-80 font-medium">{language === "en" ? "Duration" : "المدة"}</p>
                  <p className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {event.duration?.[language] || "1 Day"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional timeline info */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{language === "en" ? "Active" : "نشط"}</span>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <span>{language === "en" ? "Multiple sessions" : "جلسات متعددة"}</span>
                <span>•</span>
                <span>{language === "en" ? "Networking events" : "فعاليات التواصل"}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}