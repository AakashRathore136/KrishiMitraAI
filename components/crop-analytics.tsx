// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Area,
//   AreaChart,
// } from "recharts"
// import { TrendingUp, BarChart3, PieChartIcon, Activity, Droplets, Thermometer } from "lucide-react"
// import { useState } from "react"

// interface CropAnalyticsProps {
//   language: "hi" | "en" | "bn"
//   selectedCrop: string
// }

// // Mock data for different crops and analytics
// const analyticsData = {
//   wheat: {
//     yieldPrediction: [
//       { month: "Oct", predicted: 2.8, actual: 2.5 },
//       { month: "Nov", predicted: 3.2, actual: 3.0 },
//       { month: "Dec", predicted: 3.8, actual: 3.5 },
//       { month: "Jan", predicted: 4.2, actual: 4.0 },
//       { month: "Feb", predicted: 4.5, actual: null },
//       { month: "Mar", predicted: 4.8, actual: null },
//     ],
//     soilHealth: [
//       { parameter: "pH", value: 6.8, optimal: 7.0 },
//       { parameter: "Nitrogen", value: 85, optimal: 90 },
//       { parameter: "Phosphorus", value: 78, optimal: 80 },
//       { parameter: "Potassium", value: 92, optimal: 85 },
//       { parameter: "Organic Matter", value: 3.2, optimal: 3.5 },
//     ],
//     weatherImpact: [
//       { factor: "Temperature", impact: 85, color: "#f59e0b" },
//       { factor: "Rainfall", impact: 92, color: "#3b82f6" },
//       { factor: "Humidity", impact: 78, color: "#10b981" },
//       { factor: "Sunlight", impact: 88, color: "#f59e0b" },
//     ],
//     monthlyGrowth: [
//       { month: "Oct", growth: 15, temperature: 25, rainfall: 20 },
//       { month: "Nov", growth: 25, temperature: 22, rainfall: 15 },
//       { month: "Dec", growth: 35, temperature: 18, rainfall: 10 },
//       { month: "Jan", growth: 55, temperature: 15, rainfall: 5 },
//       { month: "Feb", growth: 75, temperature: 18, rainfall: 8 },
//       { month: "Mar", growth: 95, temperature: 22, rainfall: 12 },
//     ],
//   },
//   rice: {
//     yieldPrediction: [
//       { month: "Jun", predicted: 1.8, actual: 1.6 },
//       { month: "Jul", predicted: 2.5, actual: 2.3 },
//       { month: "Aug", predicted: 3.2, actual: 3.0 },
//       { month: "Sep", predicted: 4.0, actual: 3.8 },
//       { month: "Oct", predicted: 4.5, actual: null },
//       { month: "Nov", predicted: 5.0, actual: null },
//     ],
//     soilHealth: [
//       { parameter: "pH", value: 6.2, optimal: 6.5 },
//       { parameter: "Nitrogen", value: 78, optimal: 85 },
//       { parameter: "Phosphorus", value: 82, optimal: 80 },
//       { parameter: "Potassium", value: 88, optimal: 90 },
//       { parameter: "Organic Matter", value: 4.1, optimal: 4.0 },
//     ],
//     weatherImpact: [
//       { factor: "Temperature", impact: 78, color: "#f59e0b" },
//       { factor: "Rainfall", impact: 95, color: "#3b82f6" },
//       { factor: "Humidity", impact: 88, color: "#10b981" },
//       { factor: "Sunlight", impact: 82, color: "#f59e0b" },
//     ],
//     monthlyGrowth: [
//       { month: "Jun", growth: 20, temperature: 28, rainfall: 150 },
//       { month: "Jul", growth: 35, temperature: 30, rainfall: 200 },
//       { month: "Aug", growth: 55, temperature: 29, rainfall: 180 },
//       { month: "Sep", growth: 75, temperature: 27, rainfall: 120 },
//       { month: "Oct", growth: 90, temperature: 25, rainfall: 80 },
//       { month: "Nov", growth: 100, temperature: 23, rainfall: 40 },
//     ],
//   },
// }

// const labels = {
//   hi: {
//     yieldPrediction: "उत्पादन पूर्वानुमान",
//     soilHealth: "मिट्टी का स्वास्थ्य",
//     weatherImpact: "मौसम का प्रभाव",
//     monthlyGrowth: "मासिक वृद्धि",
//     predicted: "पूर्वानुमानित",
//     actual: "वास्तविक",
//     optimal: "आदर्श",
//     current: "वर्तमान",
//     selectTimeframe: "समय सीमा चुनें",
//     last6months: "पिछले 6 महीने",
//     last12months: "पिछले 12 महीने",
//     thisYear: "इस साल",
//     tons: "टन/हेक्टेयर",
//     percentage: "प्रतिशत",
//     growth: "वृद्धि",
//     temperature: "तापमान",
//     rainfall: "बारिश",
//   },
//   bn: {
//     yieldPrediction: "ফলন পূর্বাভাস",
//     soilHealth: "মাটির স্বাস্থ্য",
//     weatherImpact: "আবহাওয়ার প্রভাব",
//     monthlyGrowth: "মাসিক বৃদ্ধি",
//     predicted: "পূর্বাভাসিত",
//     actual: "প্রকৃত",
//     optimal: "সর্বোত্তম",
//     current: "বর্তমান",
//     selectTimeframe: "সময়সীমা নির্বাচন করুন",
//     last6months: "গত ৬ মাস",
//     last12months: "গত ১২ মাস",
//     thisYear: "এই বছর",
//     tons: "টন/হেক্টর",
//     percentage: "শতাংশ",
//     growth: "বৃদ্ধি",
//     temperature: "তাপমাত্রা",
//     rainfall: "বৃষ্টিপাত",
//   },
//   en: {
//     yieldPrediction: "Yield Prediction",
//     soilHealth: "Soil Health",
//     weatherImpact: "Weather Impact",
//     monthlyGrowth: "Monthly Growth",
//     predicted: "Predicted",
//     actual: "Actual",
//     optimal: "Optimal",
//     current: "Current",
//     selectTimeframe: "Select Timeframe",
//     last6months: "Last 6 Months",
//     last12months: "Last 12 Months",
//     thisYear: "This Year",
//     tons: "Tons/Hectare",
//     percentage: "Percentage",
//     growth: "Growth",
//     temperature: "Temperature",
//     rainfall: "Rainfall",
//   },
// }

// export default function CropAnalytics({ language, selectedCrop }: CropAnalyticsProps) {
//   const [timeframe, setTimeframe] = useState("last6months")
//   const currentLabels = labels[language]

//   // Get data for selected crop (default to wheat if crop not found)
//   const cropKey = selectedCrop?.toLowerCase() === "rice" || selectedCrop?.toLowerCase() === "ধান" ? "rice" : "wheat"
//   const data = analyticsData[cropKey]

//   if (!selectedCrop) {
//     return (
//       <div className="text-center py-12">
//         <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
//         <p className="text-muted-foreground">
//           {language === "hi"
//             ? "एनालिटिक्स देखने के लिए कोई फसल चुनें"
//             : language === "bn"
//               ? "বিশ্লেষণ দেখতে একটি ফসল নির্বাচন করুন"
//               : "Select a crop to view analytics"}
//         </p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header with timeframe selector */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold flex items-center gap-2">
//           <BarChart3 className="h-6 w-6 text-primary" />
//           {language === "hi"
//             ? `${selectedCrop} एनालिटिक्स`
//             : language === "bn"
//               ? `${selectedCrop} বিশ্লেষণ`
//               : `${selectedCrop} Analytics`}
//         </h2>

//         <Select value={timeframe} onValueChange={setTimeframe}>
//           <SelectTrigger className="w-48">
//             <SelectValue placeholder={currentLabels.selectTimeframe} />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="last6months">{currentLabels.last6months}</SelectItem>
//             <SelectItem value="last12months">{currentLabels.last12months}</SelectItem>
//             <SelectItem value="thisYear">{currentLabels.thisYear}</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-6">
//         {/* Yield Prediction Chart */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <TrendingUp className="h-5 w-5 text-primary" />
//               {currentLabels.yieldPrediction}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={data.yieldPrediction}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip
//                   formatter={(value, name) => [
//                     `${value} ${currentLabels.tons}`,
//                     name === "predicted" ? currentLabels.predicted : currentLabels.actual,
//                   ]}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="predicted"
//                   stroke="hsl(var(--primary))"
//                   strokeWidth={2}
//                   strokeDasharray="5 5"
//                 />
//                 <Line type="monotone" dataKey="actual" stroke="hsl(var(--chart-1))" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//             <div className="flex justify-center gap-4 mt-4">
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-0.5 bg-primary"></div>
//                 <span className="text-sm text-muted-foreground">{currentLabels.predicted}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-0.5 bg-chart-1"></div>
//                 <span className="text-sm text-muted-foreground">{currentLabels.actual}</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Soil Health */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Activity className="h-5 w-5 text-primary" />
//               {currentLabels.soilHealth}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={data.soilHealth} layout="horizontal">
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis type="number" />
//                 <YAxis dataKey="parameter" type="category" width={80} />
//                 <Tooltip
//                   formatter={(value, name) => [value, name === "value" ? currentLabels.current : currentLabels.optimal]}
//                 />
//                 <Bar dataKey="value" fill="hsl(var(--chart-1))" />
//                 <Bar dataKey="optimal" fill="hsl(var(--chart-2))" opacity={0.6} />
//               </BarChart>
//             </ResponsiveContainer>
//             <div className="flex justify-center gap-4 mt-4">
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 bg-chart-1 rounded"></div>
//                 <span className="text-sm text-muted-foreground">{currentLabels.current}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 bg-chart-2 opacity-60 rounded"></div>
//                 <span className="text-sm text-muted-foreground">{currentLabels.optimal}</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Weather Impact */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <PieChartIcon className="h-5 w-5 text-primary" />
//               {currentLabels.weatherImpact}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={data.weatherImpact}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={100}
//                   paddingAngle={5}
//                   dataKey="impact"
//                 >
//                   {data.weatherImpact.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(value) => [`${value}%`, currentLabels.percentage]} />
//               </PieChart>
//             </ResponsiveContainer>
//             <div className="grid grid-cols-2 gap-2 mt-4">
//               {data.weatherImpact.map((item, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
//                   <span className="text-sm text-muted-foreground">
//                     {item.factor} ({item.impact}%)
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Monthly Growth with Weather Correlation */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Activity className="h-5 w-5 text-primary" />
//               {currentLabels.monthlyGrowth}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <AreaChart data={data.monthlyGrowth}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip
//                   formatter={(value, name) => {
//                     if (name === "growth") return [`${value}%`, currentLabels.growth]
//                     if (name === "temperature") return [`${value}°C`, currentLabels.temperature]
//                     if (name === "rainfall") return [`${value}mm`, currentLabels.rainfall]
//                     return [value, name]
//                   }}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="growth"
//                   stackId="1"
//                   stroke="hsl(var(--chart-1))"
//                   fill="hsl(var(--chart-1))"
//                   fillOpacity={0.6}
//                 />
//                 <Line type="monotone" dataKey="temperature" stroke="hsl(var(--chart-4))" strokeWidth={2} />
//               </AreaChart>
//             </ResponsiveContainer>
//             <div className="flex justify-center gap-4 mt-4">
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 bg-chart-1 rounded"></div>
//                 <span className="text-sm text-muted-foreground">{currentLabels.growth}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-0.5 bg-chart-4"></div>
//                 <span className="text-sm text-muted-foreground">{currentLabels.temperature}</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Key Insights */}
//       <Card>
//         <CardHeader>
//           <CardTitle>
//             {language === "hi" ? "मुख्य अंतर्दृष्टि" : language === "bn" ? "মূল অন্তর্দৃষ্টি" : "Key Insights"}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid md:grid-cols-3 gap-4">
//             <div className="text-center p-4 bg-green-50 rounded-lg">
//               <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
//               <p className="font-semibold text-green-800">
//                 {language === "hi" ? "अच्छी वृद्धि" : language === "bn" ? "ভাল বৃদ্ধি" : "Good Growth"}
//               </p>
//               <p className="text-sm text-green-600">
//                 {language === "hi"
//                   ? "पिछले महीने की तुलना में 15% बेहतर"
//                   : language === "bn"
//                     ? "গত মাসের তুলনায় ১৫% ভাল"
//                     : "15% better than last month"}
//               </p>
//             </div>

//             <div className="text-center p-4 bg-blue-50 rounded-lg">
//               <Droplets className="h-8 w-8 text-blue-600 mx-auto mb-2" />
//               <p className="font-semibold text-blue-800">
//                 {language === "hi" ? "पानी की स्थिति" : language === "bn" ? "পানির অবস্থা" : "Water Status"}
//               </p>
//               <p className="text-sm text-blue-600">
//                 {language === "hi"
//                   ? "सिंचाई की आवश्यकता 3 दिनों में"
//                   : language === "bn"
//                     ? "৩ দিনের মধ্যে সেচের প্রয়োজন"
//                     : "Irrigation needed in 3 days"}
//               </p>
//             </div>

//             <div className="text-center p-4 bg-orange-50 rounded-lg">
//               <Thermometer className="h-8 w-8 text-orange-600 mx-auto mb-2" />
//               <p className="font-semibold text-orange-800">
//                 {language === "hi" ? "तापमान चेतावनी" : language === "bn" ? "তাপমাত্রা সতর্কতা" : "Temperature Alert"}
//               </p>
//               <p className="text-sm text-orange-600">
//                 {language === "hi"
//                   ? "अगले सप्ताह गर्मी बढ़ सकती है"
//                   : language === "bn"
//                     ? "পরের সপ্তাহে তাপমাত্রা বাড়তে পারে"
//                     : "Heat may increase next week"}
//               </p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }




"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, BarChart3, PieChartIcon, Activity, Droplets, Thermometer } from "lucide-react"
import { useState } from "react"

interface CropAnalyticsProps {
  language: "hi" | "en" | "bn" | "te" | "ta" | "mr" | "gu" | "kn"
  selectedCrop: string
}

// 📊 Mock data
const analyticsData = {
  wheat: {
    yieldPrediction: [
      { month: "Oct", predicted: 2.8, actual: 2.5 },
      { month: "Nov", predicted: 3.2, actual: 3.0 },
      { month: "Dec", predicted: 3.8, actual: 3.5 },
      { month: "Jan", predicted: 4.2, actual: 4.0 },
      { month: "Feb", predicted: 4.5, actual: null },
      { month: "Mar", predicted: 4.8, actual: null },
    ],
    soilHealth: [
      { parameter: "pH", value: 6.8, optimal: 7.0 },
      { parameter: "Nitrogen", value: 85, optimal: 90 },
      { parameter: "Phosphorus", value: 78, optimal: 80 },
      { parameter: "Potassium", value: 92, optimal: 85 },
      { parameter: "Organic Matter", value: 3.2, optimal: 3.5 },
    ],
    weatherImpact: [
      { factor: "Temperature", impact: 85, color: "#f59e0b" },
      { factor: "Rainfall", impact: 92, color: "#3b82f6" },
      { factor: "Humidity", impact: 78, color: "#10b981" },
      { factor: "Sunlight", impact: 88, color: "#f59e0b" },
    ],
    monthlyGrowth: [
      { month: "Oct", growth: 15, temperature: 25, rainfall: 20 },
      { month: "Nov", growth: 25, temperature: 22, rainfall: 15 },
      { month: "Dec", growth: 35, temperature: 18, rainfall: 10 },
      { month: "Jan", growth: 55, temperature: 15, rainfall: 5 },
      { month: "Feb", growth: 75, temperature: 18, rainfall: 8 },
      { month: "Mar", growth: 95, temperature: 22, rainfall: 12 },
    ],
  },
  rice: {
    yieldPrediction: [
      { month: "Jun", predicted: 1.8, actual: 1.6 },
      { month: "Jul", predicted: 2.5, actual: 2.3 },
      { month: "Aug", predicted: 3.2, actual: 3.0 },
      { month: "Sep", predicted: 4.0, actual: 3.8 },
      { month: "Oct", predicted: 4.5, actual: null },
      { month: "Nov", predicted: 5.0, actual: null },
    ],
    soilHealth: [
      { parameter: "pH", value: 6.2, optimal: 6.5 },
      { parameter: "Nitrogen", value: 78, optimal: 85 },
      { parameter: "Phosphorus", value: 82, optimal: 80 },
      { parameter: "Potassium", value: 88, optimal: 90 },
      { parameter: "Organic Matter", value: 4.1, optimal: 4.0 },
    ],
    weatherImpact: [
      { factor: "Temperature", impact: 78, color: "#f59e0b" },
      { factor: "Rainfall", impact: 95, color: "#3b82f6" },
      { factor: "Humidity", impact: 88, color: "#10b981" },
      { factor: "Sunlight", impact: 82, color: "#f59e0b" },
    ],
    monthlyGrowth: [
      { month: "Jun", growth: 20, temperature: 28, rainfall: 150 },
      { month: "Jul", growth: 35, temperature: 30, rainfall: 200 },
      { month: "Aug", growth: 55, temperature: 29, rainfall: 180 },
      { month: "Sep", growth: 75, temperature: 27, rainfall: 120 },
      { month: "Oct", growth: 90, temperature: 25, rainfall: 80 },
      { month: "Nov", growth: 100, temperature: 23, rainfall: 40 },
    ],
  },
}

// 🌐 Labels in 8 languages
const labels: Record<string, any> = {
  hi: {
    yieldPrediction: "उत्पादन पूर्वानुमान",
    soilHealth: "मिट्टी का स्वास्थ्य",
    weatherImpact: "मौसम का प्रभाव",
    monthlyGrowth: "मासिक वृद्धि",
    predicted: "पूर्वानुमानित",
    actual: "वास्तविक",
    optimal: "आदर्श",
    current: "वर्तमान",
    selectTimeframe: "समय सीमा चुनें",
    last6months: "पिछले 6 महीने",
    last12months: "पिछले 12 महीने",
    thisYear: "इस साल",
    tons: "टन/हेक्टेयर",
    percentage: "प्रतिशत",
    growth: "वृद्धि",
    temperature: "तापमान",
    rainfall: "बारिश",
    insights: "मुख्य अंतर्दृष्टि",
    goodGrowth: "अच्छी वृद्धि",
    waterStatus: "पानी की स्थिति",
    tempAlert: "तापमान चेतावनी",
  },
  en: {
    yieldPrediction: "Yield Prediction",
    soilHealth: "Soil Health",
    weatherImpact: "Weather Impact",
    monthlyGrowth: "Monthly Growth",
    predicted: "Predicted",
    actual: "Actual",
    optimal: "Optimal",
    current: "Current",
    selectTimeframe: "Select Timeframe",
    last6months: "Last 6 Months",
    last12months: "Last 12 Months",
    thisYear: "This Year",
    tons: "Tons/Hectare",
    percentage: "Percentage",
    growth: "Growth",
    temperature: "Temperature",
    rainfall: "Rainfall",
    insights: "Key Insights",
    goodGrowth: "Good Growth",
    waterStatus: "Water Status",
    tempAlert: "Temperature Alert",
  },
  bn: {
    yieldPrediction: "ফলন পূর্বাভাস",
    soilHealth: "মাটির স্বাস্থ্য",
    weatherImpact: "আবহাওয়ার প্রভাব",
    monthlyGrowth: "মাসিক বৃদ্ধি",
    predicted: "পূর্বাভাসিত",
    actual: "প্রকৃত",
    optimal: "সর্বোত্তম",
    current: "বর্তমান",
    selectTimeframe: "সময়সীমা নির্বাচন করুন",
    last6months: "গত ৬ মাস",
    last12months: "গত ১২ মাস",
    thisYear: "এই বছর",
    tons: "টন/হেক্টর",
    percentage: "শতাংশ",
    growth: "বৃদ্ধি",
    temperature: "তাপমাত্রা",
    rainfall: "বৃষ্টিপাত",
    insights: "মূল অন্তর্দৃষ্টি",
    goodGrowth: "ভাল বৃদ্ধি",
    waterStatus: "পানির অবস্থা",
    tempAlert: "তাপমাত্রা সতর্কতা",
  },
  te: {
    yieldPrediction: "ఉత్పత్తి అంచనా",
    soilHealth: "మట్టి ఆరోగ్యం",
    weatherImpact: "వాతావరణ ప్రభావం",
    monthlyGrowth: "నెలవారీ వృద్ధి",
    predicted: "అంచనా",
    actual: "నిజమైనది",
    optimal: "అత్యుత్తమం",
    current: "ప్రస్తుతం",
    selectTimeframe: "సమయాన్ని ఎంచుకోండి",
    last6months: "గత 6 నెలలు",
    last12months: "గత 12 నెలలు",
    thisYear: "ఈ సంవత్సరం",
    tons: "టన్నులు/హెక్టారుకు",
    percentage: "శాతం",
    growth: "వృద్ధి",
    temperature: "ఉష్ణోగ్రత",
    rainfall: "వర్షపాతం",
    insights: "ప్రధాన అంతర్దృష్టులు",
    goodGrowth: "మంచి వృద్ధి",
    waterStatus: "నీటి స్థితి",
    tempAlert: "ఉష్ణోగ్రత హెచ్చరిక",
  },
  ta: {
    yieldPrediction: "விளைச்சல் கணிப்பு",
    soilHealth: "மண்ணின் ஆரோக்கியம்",
    weatherImpact: "வானிலை தாக்கம்",
    monthlyGrowth: "மாதாந்திர வளர்ச்சி",
    predicted: "முன்னறிவிப்பு",
    actual: "உண்மையானது",
    optimal: "சிறந்தது",
    current: "தற்போது",
    selectTimeframe: "காலவரம்பை தேர்வு செய்க",
    last6months: "கடைசி 6 மாதங்கள்",
    last12months: "கடைசி 12 மாதங்கள்",
    thisYear: "இந்த ஆண்டு",
    tons: "டன்/ஹெக்டேர்",
    percentage: "சதவீதம்",
    growth: "வளர்ச்சி",
    temperature: "வெப்பநிலை",
    rainfall: "மழை",
    insights: "முக்கிய பார்வைகள்",
    goodGrowth: "நல்ல வளர்ச்சி",
    waterStatus: "நீரின் நிலை",
    tempAlert: "வெப்பநிலை எச்சரிக்கை",
  },
  mr: {
    yieldPrediction: "उत्पन्न अंदाज",
    soilHealth: "मातीचे आरोग्य",
    weatherImpact: "हवामानाचा प्रभाव",
    monthlyGrowth: "मासिक वाढ",
    predicted: "अंदाज",
    actual: "प्रत्यक्ष",
    optimal: "आदर्श",
    current: "सध्याचे",
    selectTimeframe: "कालावधी निवडा",
    last6months: "मागील 6 महिने",
    last12months: "मागील 12 महिने",
    thisYear: "या वर्षी",
    tons: "टन/हेक्टर",
    percentage: "टक्केवारी",
    growth: "वाढ",
    temperature: "तापमान",
    rainfall: "पाऊस",
    insights: "मुख्य अंतर्दृष्टी",
    goodGrowth: "चांगली वाढ",
    waterStatus: "पाण्याची स्थिती",
    tempAlert: "तापमान चेतावणी",
  },
  gu: {
    yieldPrediction: "ઉત્પાદન આગાહી",
    soilHealth: "માટીનું આરોગ્ય",
    weatherImpact: "હવામાનનો અસર",
    monthlyGrowth: "માસિક વૃદ્ધિ",
    predicted: "અનુમાનિત",
    actual: "વાસ્તવિક",
    optimal: "સર્વોત્તમ",
    current: "વર્તમાન",
    selectTimeframe: "સમયફ્રેમ પસંદ કરો",
    last6months: "છેલ્લા 6 મહિના",
    last12months: "છેલ્લા 12 મહિના",
    thisYear: "આ વર્ષ",
    tons: "ટન/હેક્ટર",
    percentage: "ટકાવારી",
    growth: "વિકાસ",
    temperature: "તાપમાન",
    rainfall: "વરસાદ",
    insights: "મુખ્ય સમજણ",
    goodGrowth: "સારી વૃદ્ધિ",
    waterStatus: "પાણીની સ્થિતિ",
    tempAlert: "તાપમાન ચેતવણી",
  },
  kn: {
    yieldPrediction: "ಉತ್ಪಾದನೆ ಮುನ್ಸೂಚನೆ",
    soilHealth: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ",
    weatherImpact: "ಹವಾಮಾನದ ಪರಿಣಾಮ",
    monthlyGrowth: "ಮಾಸಿಕ ಬೆಳವಣಿಗೆ",
    predicted: "ಅಂದಾಜು",
    actual: "ವಾಸ್ತವಿಕ",
    optimal: "ಅತ್ಯುತ್ತಮ",
    current: "ಪ್ರಸ್ತುತ",
    selectTimeframe: "ಕಾಲಾವಧಿ ಆಯ್ಕೆಮಾಡಿ",
    last6months: "ಕಳೆದ 6 ತಿಂಗಳು",
    last12months: "ಕಳೆದ 12 ತಿಂಗಳು",
    thisYear: "ಈ ವರ್ಷ",
    tons: "ಟನ್/ಹೆಕ್ಟೇರ್",
    percentage: "ಶೇಕಡಾವಾರು",
    growth: "ಬೆಳವಣಿಗೆ",
    temperature: "ತಾಪಮಾನ",
    rainfall: "ಮಳೆ",
    insights: "ಮುಖ್ಯ ಅಂತರ್ದೃಷ್ಠಿಗಳು",
    goodGrowth: "ಉತ್ತಮ ಬೆಳವಣಿಗೆ",
    waterStatus: "ನೀರಿನ ಸ್ಥಿತಿ",
    tempAlert: "ತಾಪಮಾನ ಎಚ್ಚರಿಕೆ",
  },
}

export default function CropAnalytics({ language, selectedCrop }: CropAnalyticsProps) {
  const [timeframe, setTimeframe] = useState("last6months")
  const currentLabels = labels[language]

  const cropKey = selectedCrop?.toLowerCase().includes("rice") ||
    selectedCrop?.toLowerCase().includes("धान") ||
    selectedCrop?.toLowerCase().includes("బియ్యం") ||
    selectedCrop?.toLowerCase().includes("அரிசி") ||
    selectedCrop?.toLowerCase().includes("तांदूळ") ||
    selectedCrop?.toLowerCase().includes("ચોખા") ||
    selectedCrop?.toLowerCase().includes("ಅಕ್ಕಿ")
    ? "rice" : "wheat"

  const data = analyticsData[cropKey]

  if (!selectedCrop) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
        <p className="text-muted-foreground">
          {language === "hi" ? "एनालिटिक्स देखने के लिए कोई फसल चुनें" :
           language === "bn" ? "বিশ্লেষণ দেখতে একটি ফসল নির্বাচন করুন" :
           language === "te" ? "విశ్లేషణ చూడటానికి పంటను ఎంచుకోండి" :
           language === "ta" ? "பகுப்பாய்வைக் காண ஒரு பயிரைத் தேர்ந்தெடுக்கவும்" :
           language === "mr" ? "विश्लेषण पाहण्यासाठी पिक निवडा" :
           language === "gu" ? "વિશ્લેષણ જોવા માટે પાક પસંદ કરો" :
           language === "kn" ? "ವಿಶ್ಲೇಷಣೆ ನೋಡಲು ಬೆಳೆ ಆರಿಸಿ" :
           "Select a crop to view analytics"}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          {`${selectedCrop} ${currentLabels.monthlyGrowth}`}
        </h2>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder={currentLabels.selectTimeframe} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last6months">{currentLabels.last6months}</SelectItem>
            <SelectItem value="last12months">{currentLabels.last12months}</SelectItem>
            <SelectItem value="thisYear">{currentLabels.thisYear}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Yield Prediction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              {currentLabels.yieldPrediction}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.yieldPrediction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    `${value} ${currentLabels.tons}`,
                    name === "predicted" ? currentLabels.predicted : currentLabels.actual,
                  ]}
                />
                <Line type="monotone" dataKey="predicted" stroke="hsl(var(--primary))" strokeWidth={2} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="actual" stroke="hsl(var(--chart-1))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Soil Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" /> {currentLabels.soilHealth}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.soilHealth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="parameter" type="category" width={80} />
                <Tooltip formatter={(value, name) => [value, name === "value" ? currentLabels.current : currentLabels.optimal]} />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" />
                <Bar dataKey="optimal" fill="hsl(var(--chart-2))" opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weather Impact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" /> {currentLabels.weatherImpact}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={data.weatherImpact} dataKey="impact" nameKey="factor" cx="50%" cy="50%" outerRadius={100} label>
                  {data.weatherImpact.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" /> {currentLabels.monthlyGrowth}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`${value} ${name === "growth" ? "%" : name === "rainfall" ? "mm" : "°C"}`, currentLabels[name] || name]} />
                <Area type="monotone" dataKey="growth" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" opacity={0.3} />
                <Line type="monotone" dataKey="temperature" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                <Line type="monotone" dataKey="rainfall" stroke="hsl(var(--chart-3))" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>{currentLabels.insights}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>{currentLabels.goodGrowth}: {selectedCrop}</li>
            <li>{currentLabels.waterStatus}: {cropKey === "rice" ? "High" : "Moderate"}</li>
            <li>{currentLabels.tempAlert}: 2 days next week</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
