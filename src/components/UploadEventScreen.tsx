import { useState } from "react";
import * as XLSX from "xlsx";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface UploadEventScreenProps {
  language: "en" | "ar";
  onBack: () => void;
  onEventsUploaded: (events: any[]) => void;
}

export default function UploadEventScreen({
  language,
  onBack,
  onEventsUploaded,
}: UploadEventScreenProps) {
  const [isDragging, setIsDragging] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [previewEvents, setPreviewEvents] = useState<any[]>([]);
    const [showPreview, setShowPreview] = useState(false);
    
    const confirmSaveEvents = () => {
  const saved = localStorage.getItem("events_data");
  const existing = saved ? JSON.parse(saved) : [];

  const updated = [...existing, ...previewEvents];

  localStorage.setItem("events_data", JSON.stringify(updated));
  onEventsUploaded(updated); // sends to dashboard
  setShowPreview(false);
};


  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      const wb = XLSX.read(evt.target.result, { type: "binary" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(ws);

      const formattedEvents = excelData.map((row: any) => ({
  event_name: {
    en: row["Event Name English"] || "",
    ar: row["Event Name Arabic"] || "",
  },
  city: {
    en: row["City English"] || "",
    ar: row["City Arabic"] || "",
  },
  country: {
    en: row["Country English"] || "",
    ar: row["Country Arabic"] || "",
  },
  venue: {
    en: row["Venue English"] || "",
    ar: row["Venue Arabic"] || "",
  },
  dates: {
    start: row["Start Date"] || "",
    end: row["End Date"] || "",
  },
  event_type: {
    en: row["Event Type English"] || "",
    ar: row["Event Type Arabic"] || "",
  },
  main_sectors: {
    en: row["Main Sectors English"]
      ?.split(",")
      .map((s: string) => s.trim()) || [],
    ar: row["Main Sectors Arabic"]
      ?.split(",")
      .map((s: string) => s.trim()) || [],
  },
  featured_sessions: {
    en: row["Featured Sessions English"]
      ?.split(",")
      .map((s: string) => s.trim()) || [],
    ar: row["Featured Sessions Arabic"]
      ?.split(",")
      .map((s: string) => s.trim()) || [],
  },
  major_topics: {
    en: row["Major Topics English"]
      ?.split(",")
      .map((s: string) => s.trim()) || [],
    ar: row["Major Topics Arabic"]
      ?.split(",")
      .map((s: string) => s.trim()) || [],
  },
  government_endorsements: {
    en: row["Government Endorsements English"] || "",
    ar: row["Government Endorsements Arabic"] || "",
  },
}));

      

      const saved = localStorage.getItem("events_data");
      const oldEvents = saved ? JSON.parse(saved) : [];

      const newEvents = [...oldEvents, ...formattedEvents];
      localStorage.setItem("events_data", JSON.stringify(newEvents));

      setUploadSuccess(true);
      setTimeout(() => {
        onEventsUploaded(newEvents);
      }, 1200);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-sky-100 via-white to-cyan-50">
      
      {/* HEADER */}
      <header className="backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {language === "en" ? "Upload Event Data" : "رفع بيانات الأحداث"}
        </h2>

        <button
          onClick={onBack}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-all"
        >
          <ArrowBackIosNewIcon fontSize="small" />
          {language === "en" ? "Back" : "عودة"}
        </button>
      </header>

      {/* BODY */}
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        
        <div
          className={`w-full max-w-xl border-2 border-dashed rounded-2xl p-10 backdrop-blur-lg shadow-xl 
          transition-all bg-white/50
          ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-blue-200 hover:border-blue-400"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFileUpload(e.dataTransfer.files[0]);
          }}
        >
          {/* ICON */}
          <div className="flex justify-center mb-6">
            <CloudUploadIcon
              className="text-blue-600 opacity-80"
              sx={{ fontSize: 60 }}
            />
          </div>

          {/* TEXT */}
          <p className="text-center text-gray-700 mb-4 font-medium">
            {language === "en"
              ? "Drag & Drop Excel / CSV here"
              : "اسحب و اترك ملف Excel / CSV هنا"}
          </p>

          {/* INPUT */}
          <div className="text-center">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              id="fileUpload"
              onChange={(e) => handleFileUpload(e.target.files![0])}
            />
            <label
              htmlFor="fileUpload"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm 
                         hover:bg-blue-700 transition-all cursor-pointer shadow-md"
            >
              {language === "en" ? "Browse File" : "اختر ملف"}
            </label>
          </div>
        </div>

        {/* SUCCESS MESSAGE */}
        {uploadSuccess && (
          <div className="mt-6 flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg shadow-md">
            <CheckCircleIcon className="text-green-600" />
            <span className="text-green-700 font-medium">
              {language === "en"
                ? "Imported Successfully!"
                : "تم الاستيراد بنجاح!"}
            </span>
          </div>
              )}
              
              {showPreview && (
  <div className="mt-8 w-full max-w-5xl mx-auto">
    <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="p-3 text-left">Event Name</th>
          <th className="p-3 text-left">City</th>
          <th className="p-3 text-left">Start Date</th>
          <th className="p-3 text-left">End Date</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {previewEvents.map((ev: any, index: number) => (
          <tr key={index} className="border-b">
            <td className="p-3">{ev.event_name.en}</td>
            <td className="p-3">{ev.city.en}</td>
            <td className="p-3">{ev.dates.start}</td>
            <td className="p-3">{ev.dates.end}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <button
      onClick={confirmSaveEvents}
      className="mt-4 px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 shadow-md"
    >
      Save Events to Local Storage
    </button>
  </div>
)}


        {/* FORMAT HINT */}
        <p className="mt-8 text-gray-600 text-sm text-center">
          {language === "en"
            ? 'Required Excel Headers: "Event Name English", "City English"'
            : "مطلوب حقول ملف الإكسل: الاسم باللغة الإنجليزية، المدينة باللغة الإنجليزية"}
        </p>
      </div>
    </div>
  );
}
