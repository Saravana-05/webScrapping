import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface PieChartsViewProps {
  event: any;
  language: "en" | "ar";
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

export default function PieChartsView({ event, language }: PieChartsViewProps) {
  // Prepare data for pie charts
  const topicsData = event.major_topics?.map((topic: any, index: number) => ({
    name: topic[language]?.substring(0, 15) + (topic[language]?.length > 15 ? '...' : ''),
    value: Math.floor(Math.random() * 100) + 20,
  })) || [];

  const categoriesData = event.category_tags?.map((cat: any, index: number) => ({
    name: cat[language] || cat,
    value: Math.floor(Math.random() * 50) + 10,
  })) || [];

  const sessionsData = event.featured_sessions?.map((session: any, index: number) => ({
    name: session.title?.[language]?.substring(0, 15) + (session.title?.[language]?.length > 15 ? '...' : ''),
    value: Math.floor(Math.random() * 30) + 5,
  })) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {/* MAJOR TOPICS PIE CHART */}
      {topicsData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl border border-blue-100"
        >
          <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">
            {language === "en" ? "Topics Distribution" : "توزيع المواضيع"}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topicsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {topicsData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* CATEGORIES DONUT CHART */}
      {categoriesData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-3xl bg-gradient-to-br from-green-50/60 to-emerald-50/60 backdrop-blur-xl shadow-xl border border-green-200"
        >
          <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">
            {language === "en" ? "Categories Breakdown" : "تفصيل الفئات"}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoriesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {categoriesData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* SESSIONS PIE CHART */}
      {sessionsData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-3xl bg-gradient-to-br from-purple-50/60 to-pink-50/60 backdrop-blur-xl shadow-xl border border-purple-200"
        >
          <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">
            {language === "en" ? "Sessions Focus" : "تركيز الجلسات"}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sessionsData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {sessionsData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 4) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}
    </div>
  );
}