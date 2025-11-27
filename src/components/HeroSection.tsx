import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkIcon from '@mui/icons-material/Link';
import DescriptionIcon from '@mui/icons-material/Description';

interface HeroSectionProps {
  event: any;
  language: "en" | "ar";
}

export default function HeroSection({ event, language }: HeroSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax layers
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yFg = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div ref={ref} className="relative w-full rounded-3xl overflow-hidden shadow-xl">

      {/* 🔵 PREMIUM GRADIENT BACKGROUND */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600"
      />

      {/* 🔵 EVENT POSTER AS SOFT PARALLAX BACKGROUND */}
      {event.event_poster_url && (
        <motion.img
          style={{ y: yBg }}
          src={event.event_poster_url}
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
        />
      )}

      {/* 🔵 LIGHT BEAMS */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-blue-300/10" />

      {/* 🔵 FROSTED GLASS FOREGROUND CARD */}
      <motion.div
        style={{ y: yFg }}
        className="
          relative z-10 p-6 sm:p-8 lg:p-10 
          bg-white/10 backdrop-blur-2xl
          rounded-3xl border border-white/20
          shadow-[0_8px_32px_rgba(0,0,0,0.15)]
        "
      >

        {/* 🎭 TOP SECTION */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-6">

          {/* 🎯 EVENT TITLE + ORGANIZER */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
              bg-white/10 text-blue-100 border border-white/20 backdrop-blur-lg text-sm font-medium mb-4"
            >
              {event.event_type[language]}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-md">
              {event.event_name[language]}
            </h1>

            <p className="text-lg sm:text-xl text-blue-100/80 mt-1">
              {event.organizer[language]}
            </p>
          </div>

          {/* 🎯 POSTER PREVIEW */}
          {event.event_poster_url && (
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={event.event_poster_url}
              className="w-full sm:w-52 h-36 object-cover rounded-2xl shadow-xl border border-white/30"
            />
          )}
        </div>

        {/* 🔹 INFO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">

          {[
            {
              icon: <CalendarTodayIcon sx={{ fontSize: 22, color: "#93c5fd" }} />,
              label: language === "en" ? "Dates" : "التواريخ",
              value: `${event.start_date} – ${event.end_date}`,
            },
            {
              icon: <AccessTimeIcon sx={{ fontSize: 22, color: "#93c5fd" }} />,
              label: language === "en" ? "Duration" : "المدة",
              value: event.duration[language],
            },
            {
              icon: <LocationOnIcon sx={{ fontSize: 22, color: "#93c5fd" }} />,
              label: language === "en" ? "Location" : "الموقع",
              value: `${event.city[language]}, ${event.country[language]}`,
            },
            {
              icon: <PublicIcon sx={{ fontSize: 22, color: "#93c5fd" }} />,
              label: language === "en" ? "Region" : "المنطقة",
              value: event.region[language],
            },
            {
              icon: <GroupIcon sx={{ fontSize: 22, color: "#93c5fd" }} />,
              label: language === "en" ? "Mode" : "النمط",
              value: event.mode[language],
            },
            {
              icon: <CalendarTodayIcon sx={{ fontSize: 22, color: "#93c5fd" }} />,
              label: language === "en" ? "Frequency" : "التكرار",
              value: event.frequency[language],
            }
          ].map((item, index) => (
            <div
              key={index}
              className="
                flex items-center gap-4 p-4 rounded-xl 
                bg-white/5 border border-white/10 backdrop-blur-xl
                text-blue-50 hover:bg-white/10 transition-all
              "
            >
              {item.icon}
              <div>
                <div className="text-xs text-blue-200">{item.label}</div>
                <div className="font-semibold text-sm sm:text-base text-white">
                  {item.value}
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* 🔹 ACTION BUTTONS */}
        <div className="flex flex-wrap gap-3">

          {event.official_website && (
            <a
              href={event.official_website}
              target="_blank"
              className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                bg-blue-500/20 border border-blue-300/30 
                text-blue-200 hover:bg-blue-400/20 hover:scale-105 
                backdrop-blur-xl transition-all shadow-lg
              "
            >
              <PublicIcon sx={{ fontSize: 20 }} />
              {language === "en" ? "Website" : "الموقع"}
            </a>
          )}

          {event.registration_url && (
            <a
              href={event.registration_url}
              target="_blank"
              className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                bg-blue-500/20 border border-blue-300/30 
                text-blue-200 hover:bg-blue-400/20 hover:scale-105 
                backdrop-blur-xl transition-all shadow-lg
              "
            >
              <LinkIcon sx={{ fontSize: 20 }} />
              {language === "en" ? "Register" : "التسجيل"}
            </a>
          )}

          {event.brochure_link && (
            <a
              href={event.brochure_link}
              target="_blank"
              className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                bg-white/10 border border-white/20 
                text-white hover:bg-white/20 hover:scale-105 
                backdrop-blur-xl transition-all shadow-lg
              "
            >
              <DescriptionIcon sx={{ fontSize: 20 }} />
              {language === "en" ? "Brochure" : "الكتيب"}
            </a>
          )}

        </div>
      </motion.div>
    </div>
  );
}
