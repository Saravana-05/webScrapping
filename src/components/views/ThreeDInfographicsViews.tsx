import { motion } from "framer-motion";

interface ThreeDInfographicsViewProps {
  event: any;
  language: "en" | "ar";
}

export default function ThreeDInfographicsView({ event, language }: ThreeDInfographicsViewProps) {
  const topics = event.major_topics || [];
  const sessions = event.featured_sessions || [];
  const categories = event.category_tags || [];

  return (
    <div className="space-y-8">
      {/* 3D STYLE INFO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* TOTAL TOPICS */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateY: -15 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          whileHover={{ scale: 1.05, rotateY: 5 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-2xl transform-gpu"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 10px 30px -5px rgba(59, 130, 246, 0.5)',
          }}
        >
          <div className="text-4xl font-bold mb-2">{topics.length}</div>
          <div className="text-blue-100 font-medium">
            {language === "en" ? "Major Topics" : "المواضيع الرئيسية"}
          </div>
        </motion.div>

        {/* FEATURED SESSIONS */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateY: -15 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05, rotateY: 5 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-2xl transform-gpu"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 10px 30px -5px rgba(139, 92, 246, 0.5)',
          }}
        >
          <div className="text-4xl font-bold mb-2">{sessions.length}</div>
          <div className="text-purple-100 font-medium">
            {language === "en" ? "Featured Sessions" : "الجلسات المميزة"}
          </div>
        </motion.div>

        {/* CATEGORIES */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateY: -15 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05, rotateY: 5 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl transform-gpu"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 10px 30px -5px rgba(16, 185, 129, 0.5)',
          }}
        >
          <div className="text-4xl font-bold mb-2">{categories.length}</div>
          <div className="text-green-100 font-medium">
            {language === "en" ? "Categories" : "الفئات"}
          </div>
        </motion.div>

        {/* TARGET ROLES */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateY: -15 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05, rotateY: 5 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-2xl transform-gpu"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 10px 30px -5px rgba(249, 115, 22, 0.5)',
          }}
        >
          <div className="text-4xl font-bold mb-2">{event.target_roles?.length || 0}</div>
          <div className="text-orange-100 font-medium">
            {language === "en" ? "Target Roles" : "الأدوار المستهدفة"}
          </div>
        </motion.div>
      </div>

      {/* 3D STYLE TOPICS GRID */}
      {topics.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50/30 backdrop-blur-xl shadow-2xl border border-blue-200"
        >
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            {language === "en" ? "3D Topics Overview" : "نظرة عامة ثلاثية الأبعاد للمواضيع"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateX: -45 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 10,
                  transition: { duration: 0.2 }
                }}
                className="p-6 rounded-xl bg-white shadow-lg border border-blue-100 transform-gpu"
                style={{
                  transformStyle: 'preserve-3d',
                  background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <h4 className="font-bold text-blue-800 text-lg">
                    {topic[language]}
                  </h4>
                </div>
                <p className="text-blue-600 text-sm leading-relaxed">
                  {topic.description?.[language]?.substring(0, 100)}
                  {topic.description?.[language]?.length > 100 ? '...' : ''}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* INTERACTIVE SESSIONS TIMELINE */}
      {sessions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50/30 backdrop-blur-xl shadow-2xl border border-purple-200"
        >
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            {language === "en" ? "Sessions Timeline" : "الجدول الزمني للجلسات"}
          </h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-400 to-blue-400 rounded-full"></div>
            {sessions.map((session: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`flex items-center mb-8 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="w-1/2 px-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-white shadow-lg border border-purple-100"
                  >
                    <h4 className="font-bold text-purple-800 text-lg mb-2">
                      {session.title?.[language]}
                    </h4>
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mb-2"></div>
                    <p className="text-purple-600 text-sm">
                      {language === "en" ? "Session" : "جلسة"} {index + 1}
                    </p>
                  </motion.div>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-500 border-4 border-white shadow-lg z-10"></div>
                <div className="w-1/2 px-6"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}