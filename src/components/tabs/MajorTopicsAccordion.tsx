import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import DevicesIcon from "@mui/icons-material/Devices";
import PublicIcon from "@mui/icons-material/Public";
import SecurityIcon from "@mui/icons-material/Security";
import ScienceIcon from "@mui/icons-material/Science";
import BoltIcon from "@mui/icons-material/Bolt";

// Auto icon resolver for Major Topics
const resolveTopicIcon = (topic: string) => {
  const lower = topic.toLowerCase();

  if (lower.includes("ai") || lower.includes("tech")) return <ScienceIcon className="text-blue-500" />;
  if (lower.includes("cyber") || lower.includes("security")) return <SecurityIcon className="text-red-500" />;
  if (lower.includes("digital") || lower.includes("cloud")) return <DevicesIcon className="text-indigo-500" />;
  if (lower.includes("global") || lower.includes("public")) return <PublicIcon className="text-emerald-500" />;

  return <BoltIcon className="text-yellow-500" />;
};

interface Props {
  majorTopics: {
    topic: string;
    description?: string;
    image?: string;
    video?: string;
  }[];
}

const MajorTopicsAccordion: React.FC<Props> = ({ majorTopics }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="space-y-4">
      {majorTopics.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="backdrop-blur-xl bg-white/40 shadow-xl rounded-2xl border border-white/30 overflow-hidden"
        >
          {/* Accordion Header */}
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/60 transition rounded-2xl"
          >
            <div className="flex items-center gap-3">
              {resolveTopicIcon(item.topic)}
              <span className="text-lg font-semibold text-gray-800">{item.topic}</span>
            </div>

            <motion.span
              initial={false}
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-gray-500"
            >
              ▼
            </motion.span>
          </button>

          {/* Accordion Body */}
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="px-5 pb-5"
              >
                {/* Description */}
                {item.description && (
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {item.description}
                  </p>
                )}

                {/* Image */}
                {item.image && (
                  <img
                    src={item.image}
                    alt="topic"
                    className="rounded-xl shadow-md w-full mb-4"
                  />
                )}

                {/* Video */}
                {item.video && (
                  <div className="w-full">
                    <iframe
                      src={item.video}
                      className="w-full h-64 rounded-xl shadow-lg"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default MajorTopicsAccordion;
