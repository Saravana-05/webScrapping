import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

interface ChartsViewProps {
  event: any;
  language: "en" | "ar";
}

export default function ChartsView({ event, language }: ChartsViewProps) {
  // Prepare data for charts
  const topicsData = event.major_topics?.map((topic: any, index: number) => ({
    name: topic[language]?.substring(0, 20) + (topic[language]?.length > 20 ? '...' : ''),
    value: Math.floor(Math.random() * 100) + 50, // Simulated engagement score
    index,
  })) || [];

  const rolesData = event.target_roles?.map((role: any, index: number) => ({
    name: role[language] || role,
    count: Math.floor(Math.random() * 80) + 20, // Simulated attendee count
  })) || [];

  const categoriesData = event.category_tags?.map((cat: any, index: number) => ({
    name: cat[language] || cat,
    sessions: Math.floor(Math.random() * 10) + 1, // Simulated session count
  })) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT COLUMN */}
      <div className="space-y-8">
        {/* MAJOR TOPICS BAR CHART */}
        {topicsData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl border border-blue-100"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">
              {language === "en" ? "Major Topics Engagement" : "مشاركة المواضيع الرئيسية"}
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topicsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" name={language === "en" ? "Engagement Score" : "درجة المشاركة"} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* TARGET ROLES LINE CHART */}
        {rolesData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-gradient-to-br from-blue-50/60 to-indigo-50/60 backdrop-blur-xl shadow-xl border border-indigo-200"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">
              {language === "en" ? "Target Roles Distribution" : "توزيع الأدوار المستهدفة"}
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rolesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#8b5cf6" name={language === "en" ? "Attendee Count" : "عدد الحضور"} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-8">
        {/* CATEGORIES BAR CHART */}
        {categoriesData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl border border-green-200"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">
              {language === "en" ? "Sessions by Category" : "الجلسات حسب الفئة"}
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoriesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sessions" fill="#10b981" name={language === "en" ? "Session Count" : "عدد الجلسات"} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* EVENT MODE & BASIC INFO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl bg-blue-50 shadow-lg border border-blue-200"
        >
          <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">
            {language === "en" ? "Event Summary" : "ملخص الحدث"}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-white rounded-xl shadow-md">
              <div className="text-2xl font-bold text-blue-700">{event.featured_sessions?.length || 0}</div>
              <div className="text-sm text-blue-600">{language === "en" ? "Sessions" : "جلسات"}</div>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-md">
              <div className="text-2xl font-bold text-green-700">{event.major_topics?.length || 0}</div>
              <div className="text-sm text-green-600">{language === "en" ? "Topics" : "مواضيع"}</div>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-md">
              <div className="text-2xl font-bold text-purple-700">{event.target_roles?.length || 0}</div>
              <div className="text-sm text-purple-600">{language === "en" ? "Roles" : "أدوار"}</div>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-md">
              <div className="text-2xl font-bold text-orange-700">{event.category_tags?.length || 0}</div>
              <div className="text-sm text-orange-600">{language === "en" ? "Categories" : "فئات"}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}