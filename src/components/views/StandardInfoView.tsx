import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Tag,
  Building2,
  Award,
  MapPin,
  ChevronDown,
  
} from "lucide-react";

import CategoryIcon from "@mui/icons-material/Category";
import ScienceIcon from "@mui/icons-material/Science";
import SecurityIcon from "@mui/icons-material/Security";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import PublicIcon from "@mui/icons-material/Public";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DevicesIcon from "@mui/icons-material/Devices";
import BoltIcon from "@mui/icons-material/Bolt";
import LanguageIcon from "@mui/icons-material/Language";

interface StandardInfoViewProps {
  event: any;
  language: "en" | "ar";
}

// Reuse the auto icon detector from original component
function getAutoIcon(topic: string) {
  const t = topic.toLowerCase();
  if (t.includes("ai")) return <LightbulbIcon className="text-blue-600 text-3xl" />;
  if (t.includes("tech")) return <DevicesIcon className="text-indigo-600 text-3xl" />;
  if (t.includes("cyber")) return <SecurityIcon className="text-red-500 text-3xl" />;
  if (t.includes("hydrogen")) return <ScienceIcon className="text-emerald-600 text-3xl" />;
  if (t.includes("energy")) return <BoltIcon className="text-yellow-500 text-3xl" />;
  if (t.includes("health")) return <HealthAndSafetyIcon className="text-pink-600 text-3xl" />;
  if (t.includes("global")) return <PublicIcon className="text-blue-700 text-3xl" />;
  if (t.includes("business")) return <BusinessCenterIcon className="text-gray-700 text-3xl" />;
  return <LanguageIcon className="text-gray-500 text-3xl" />;
}

export default function StandardInfoView({ event, language }: StandardInfoViewProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT COLUMN */}
      <div className="space-y-8">
        {/* DESCRIPTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-white/40 backdrop-blur-2xl shadow-xl border border-blue-100"
        >
          <h3 className="text-2xl font-bold text-blue-900 mb-4">
            {language === "en" ? "Description" : "الوصف"}
          </h3>
          <p className="text-blue-700 leading-relaxed text-[16px]">
            {event.description?.[language]}
          </p>
        </motion.div>

        {/* FEATURED SESSIONS */}
        {event.featured_sessions?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-blue-50/60 to-indigo-50/60 backdrop-blur-xl border border-indigo-200 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-indigo-700" size={26} />
              <h3 className="text-2xl font-bold text-blue-900">
                {language === "en" ? "Featured Sessions" : "الجلسات المميزة"}
              </h3>
            </div>

            <div className="space-y-6">
              {event.featured_sessions.map((session: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl bg-white shadow-lg border border-blue-100 hover:shadow-2xl"
                >
                  <h4 className="text-xl font-semibold text-blue-800 mb-2">
                    {session.title?.[language]}
                  </h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* MAJOR TOPICS */}
        {event.major_topics?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl border border-blue-100"
          >
            <h3 className="text-2xl font-bold text-blue-900 mb-6">
              {language === "en" ? "Major Topics" : "المواضيع الرئيسية"}
            </h3>

            <div className="space-y-4">
              {event.major_topics.map((topic: any, idx: number) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-start gap-4">
                      {getAutoIcon(topic.en)}
                      <div>
                        <h4 className="text-xl font-semibold text-blue-800">
                          {topic[language]}
                        </h4>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === idx ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown className="text-blue-700" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-[15px] text-blue-700 leading-relaxed mb-4">
                          {topic.description?.[language]}
                        </p>
                        {topic.media && (
                          <div className="rounded-xl overflow-hidden shadow-md">
                            {topic.media.includes("iframe") ? (
                              <div
                                className="w-full h-64"
                                dangerouslySetInnerHTML={{ __html: topic.media }}
                              />
                            ) : (
                              <img
                                src={topic.media}
                                className="w-full h-64 object-cover"
                                alt={topic[language]}
                              />
                            )}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* RIGHT COLUMN - Same as original */}
      <div className="space-y-8">
        {/* MODE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-blue-50 shadow-lg border border-blue-200"
        >
          <h3 className="text-xl font-bold text-blue-900 mb-3">
            {language === "en" ? "Event Mode" : "نمط الحدث"}
          </h3>
          <div className="px-4 py-2 bg-blue-700 text-white rounded-xl shadow-md font-medium">
            {event.mode?.[language]}
          </div>
        </motion.div>

        {/* TARGET INDUSTRY */}
        {event.target_industry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl border border-blue-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="text-blue-600" />
              <h3 className="text-xl font-bold text-blue-900">
                {language === "en" ? "Target Industry" : "الصناعة المستهدفة"}
              </h3>
            </div>
            <p className="text-blue-700">{event.target_industry[language]}</p>
          </motion.div>
        )}

        {/* TARGET ROLES */}
        {event.target_roles?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl border border-blue-100"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-3">
              {language === "en" ? "Target Roles" : "الأدوار المستهدفة"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {event.target_roles.map((role: any, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 font-medium text-sm"
                >
                  {role[language] || role}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAGS */}
        {event.tags_or_keywords?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-blue-50/70 to-indigo-50/70 shadow-xl border border-blue-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <Tag className="text-blue-600" />
              <h3 className="text-xl font-bold text-blue-900">
                {language === "en" ? "Tags" : "العلامات"}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {event.tags_or_keywords.map((tag: any, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium"
                >
                  {tag[language] || tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* GOVERNMENT ENDORSEMENTS */}
        {event.government_endorsements && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-blue-50 shadow-xl border border-blue-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-blue-700" />
              <h3 className="text-xl font-bold text-blue-900">
                {language === "en" ? "Government Endorsements" : "التأييدات الحكومية"}
              </h3>
            </div>
            <p className="text-blue-700">
              {event.government_endorsements?.[language]}
            </p>
          </motion.div>
        )}

        {/* REGION */}
        {event.region_tag && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-blue-100 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="text-blue-600" />
              <h3 className="text-xl font-bold text-blue-900">
                {language === "en" ? "Region" : "المنطقة"}
              </h3>
            </div>
            <span className="px-4 py-2 rounded-xl bg-indigo-600 text-white shadow-md">
              {event.region_tag?.[language]}
            </span>
          </motion.div>
        )}

        {/* CATEGORIES */}
        {event.category_tags?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-blue-100 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <CategoryIcon className="text-indigo-700" />
              <h3 className="text-xl font-bold text-blue-900">
                {language === "en" ? "Categories" : "الفئات"}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {event.category_tags.map((cat: any, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-indigo-100 text-indigo-700 font-medium"
                >
                  {cat[language] || cat}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}