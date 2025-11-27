import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {

  BarChart3,
  PieChart,
  Cuboid,
  TimerIcon,
  LayoutGrid,
} from "lucide-react";



// Chart components
import StandardInfoView from "../views/StandardInfoView";
import ChartsView from "../views/ChartsView";
import PieChartsView from "../views/PieChartsView";
import ThreeDInfographicsView from "../views/ThreeDInfographicsViews";
import TimelineChartsView from "../views/TimelineChartsView";

interface OverviewTabProps {
  event: any;
  language: "en" | "ar";
}

export type ViewMode = "standard" | "charts" | "pie" | "3d" | "timeline";

interface ViewOption {
  id: ViewMode;
  label: { en: string; ar: string };
  icon: React.ReactNode;
  color: string;
}

export default function OverviewTab({ event, language }: OverviewTabProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("standard");

  const viewOptions: ViewOption[] = [
    {
      id: "standard",
      label: { en: "Standard View", ar: "العرض القياسي" },
      icon: <LayoutGrid size={20} />,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "charts",
      label: { en: "Charts", ar: "الرسوم البيانية" },
      icon: <BarChart3 size={20} />,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      id: "pie",
      label: { en: "Pie Charts", ar: "مخططات دائرية" },
      icon: <PieChart size={20} />,
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      id: "3d",
      label: { en: "3D Charts", ar: "مخططات ثلاثية الأبعاد" },
      icon: <Cuboid size={20} />,
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      id: "timeline",
      label: { en: "Timeline", ar: "الجدول الزمني" },
      icon: <TimerIcon size={20} />,
      color: "bg-red-500 hover:bg-red-600",
    },
  ];

  const renderView = () => {
    const commonProps = { event, language };
    
    switch (viewMode) {
      case "standard":
        return <StandardInfoView {...commonProps} />;
      case "charts":
        return <ChartsView {...commonProps} />;
      case "pie":
        return <PieChartsView {...commonProps} />;
      case "3d":
        return <ThreeDInfographicsView {...commonProps} />;
      case "timeline":
        return <TimelineChartsView {...commonProps} />;
      default:
        return <StandardInfoView {...commonProps} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-blue-100">
          <div className="flex flex-wrap gap-2 justify-center">
            {viewOptions.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode(option.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-white font-medium transition-all duration-200 ${
                  viewMode === option.id
                    ? option.color + " shadow-lg"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
                aria-label={option.label[language]}
              >
                {option.icon}
                <span className="text-sm">{option.label[language]}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}