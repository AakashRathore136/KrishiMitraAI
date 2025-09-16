



"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Sprout,
  TrendingUp,
  Calendar,
  AlertTriangle,
  BarChart3,
} from "lucide-react"
import VoiceChatbot from "@/components/voice-chatbot"
import CropAnalytics from "@/components/crop-analytics"

// 🌍 Location + crop + weather data for each language

// const locationData: Record<string, any> = {
//   hi: { location: "दिल्ली, भारत", weather: { temp: "28°C", humidity: "65%", wind: "12 km/h", condition: "धूप" }, crops: ["गेहूं", "धान", "मक्का"] },
//   en: { location: "Delhi, India", weather: { temp: "28°C", humidity: "65%", wind: "12 km/h", condition: "Sunny" }, crops: ["Wheat", "Rice", "Maize"] },
//   bn: { location: "ঢাকা, বাংলাদেশ", weather: { temp: "26°C", humidity: "72%", wind: "10 km/h", condition: "রৌদ্রোজ্জ্বল" }, crops: ["ধান", "গম", "ভুট্টা"] },
//   te: { location: "హైదరాబాద్, భారతదేశం", weather: { temp: "30°C", humidity: "60%", wind: "15 km/h", condition: "ఎండ" }, crops: ["బియ్యం", "గోధుమలు", "మొక్కజొన్న"] },
//   ta: { location: "சென்னை, இந்தியா", weather: { temp: "32°C", humidity: "70%", wind: "14 km/h", condition: "வெயில்" }, crops: ["அரிசி", "கோதுமை", "சோளம்"] },
//   mr: { location: "पुणे, भारत", weather: { temp: "29°C", humidity: "68%", wind: "11 km/h", condition: "सूर्यप्रकाश" }, crops: ["तांदूळ", "गहू", "मका"] },
//   gu: { location: "અમદાવાદ, ભારત", weather: { temp: "31°C", humidity: "62%", wind: "13 km/h", condition: "ધુપછાંવ" }, crops: ["ચોખા", "ગહું", "મકાઈ"] },
//   kn: { location: "ಬೆಂಗಳೂರು, ಭಾರತ", weather: { temp: "27°C", humidity: "75%", wind: "9 km/h", condition: "ಬಿಸಿಲು" }, crops: ["ಅಕ್ಕಿ", "ಗೋಧಿ", "ಮೆಕ್ಕೆಜೋಳ"] },
// }

  // 🌍 Language-specific mock data
  const locationData: Record<string, any> = {
    hi: {
      location: "दिल्ली, भारत",
      weather: { temp: "28°C", humidity: "65%", wind: "12 km/h", condition: "धूप" },
      crops: ["गेहूं", "धान", "मक्का", "सरसों", "गन्ना", "ज्वार"],
    },
    en: {
      location: "Delhi, India",
      weather: { temp: "28°C", humidity: "65%", wind: "12 km/h", condition: "Sunny" },
      crops: ["Wheat", "Rice", "Maize", "Mustard", "Sugarcane", "Sorghum"],
    },
    bn: {
      location: "ঢাকা, বাংলাদেশ",
      weather: { temp: "26°C", humidity: "72%", wind: "10 km/h", condition: "রৌদ্রোজ্জ্বল" },
      crops: ["ধান", "গম", "ভুট্টা", "পাট", "আখ", "সরিষা"],
    },
    te: {
      location: "హైదరాబాద్, భారతదేశం",
      weather: { temp: "30°C", humidity: "60%", wind: "15 km/h", condition: "ఎండ" },
      crops: ["బియ్యం", "గోధుమలు", "మొక్కజొన్న", "పత్తి", "చెరకు", "జొన్న"],
    },
    ta: {
      location: "சென்னை, இந்தியா",
      weather: { temp: "32°C", humidity: "70%", wind: "14 km/h", condition: "வெயில்" },
      crops: ["அரிசி", "கோதுமை", "சோளம்", "கரும்பு", "பருத்தி", "சோயாபீன்"],
    },
    mr: {
      location: "पुणे, भारत",
      weather: { temp: "29°C", humidity: "68%", wind: "11 km/h", condition: "सूर्यप्रकाश" },
      crops: ["तांदूळ", "गहू", "मका", "ऊस", "सोयाबीन", "कापूस"],
    },
    gu: {
      location: "અમદાવાદ, ભારત",
      weather: { temp: "31°C", humidity: "62%", wind: "13 km/h", condition: "ધુપછાંવ" },
      crops: ["ચોખા", "ગહું", "મકાઈ", "કપાસ", "શેરડી", "જ્વાર"],
    },
    kn: {
      location: "ಬೆಂಗಳೂರು, ಭಾರತ",
      weather: { temp: "27°C", humidity: "75%", wind: "9 km/h", condition: "ಬಿಸಿಲು" },
      crops: ["ಅಕ್ಕಿ", "ಗೋಧಿ", "ಮೆಕ್ಕೆಜೋಳ", "ಹತ್ತಿ", "ಕಬ್ಬು", "ಜೋಳ"],
    },
  }


// const locationData: Record<
//   string,
//   { location: string; crops: string[]; weather: { temp: string; humidity: string; wind: string; condition: string } }
// > = {
//   hi: {
//     location: "पंजाब, भारत",
//     crops: ["गेहूं", "धान", "मक्का", "कपास", "गन्ना"],
//     weather: { temp: "28°C", humidity: "65%", wind: "12 km/h", condition: "धूप" },
//   },
//   en: {
//     location: "Punjab, India",
//     crops: ["Wheat", "Rice", "Corn", "Cotton", "Sugarcane"],
//     weather: { temp: "28°C", humidity: "65%", wind: "12 km/h", condition: "Sunny" },
//   },
//   bn: {
//     location: "পশ্চিমবঙ্গ, ভারত",
//     crops: ["ধান", "পাট", "আলু", "গম", "সরিষা"],
//     weather: { temp: "26°C", humidity: "78%", wind: "8 km/h", condition: "মেঘলা" },
//   },
//   te: {
//     location: "తెలంగాణ, భారతదేశం",
//     crops: ["బియ్యం", "పత్తి", "మొక్కజొన్న", "మిరపకాయ", "చెరకు"],
//     weather: { temp: "30°C", humidity: "60%", wind: "10 km/h", condition: "ఎండ" },
//   },
//   ta: {
//     location: "தமிழ்நாடு, இந்தியா",
//     crops: ["அரிசி", "பருத்தி", "கரும்பு", "சோளம்", "மிளகாய்"],
//     weather: { temp: "32°C", humidity: "70%", wind: "9 km/h", condition: "வெயில்" },
//   },
//   mr: {
//     location: "महाराष्ट्र, भारत",
//     crops: ["ज्वारी", "कापूस", "ऊस", "तूर", "सोयाबीन"],
//     weather: { temp: "29°C", humidity: "68%", wind: "11 km/h", condition: "सूर्यप्रकाश" },
//   },
//   gu: {
//     location: "ગુજરાત, ભારત",
//     crops: ["કપાસ", "જ્વાર", "ઘઉં", "બાજરી", "શાકભાજી"],
//     weather: { temp: "31°C", humidity: "64%", wind: "13 km/h", condition: "ધુપાળું" },
//   },
//   kn: {
//     location: "ಕರ್ನಾಟಕ, ಭಾರತ",
//     crops: ["ಅಕ್ಕಿ", "ಜೋಳ", "ಕಬ್ಬು", "ಕಾಫಿ", "ಹತ್ತಿ"],
//     weather: { temp: "27°C", humidity: "72%", wind: "10 km/h", condition: "ಸೂರ್ಯನ ಬೆಳಕು" },
//   },
// }

export default function Dashboard() {
  const [selectedCrop, setSelectedCrop] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [language, setLanguage] = useState<
    "hi" | "en" | "bn" | "te" | "ta" | "mr" | "gu" | "kn"
  >("en")
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "prompt">("prompt")
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    // Get language from URL params
    const urlParams = new URLSearchParams(window.location.search)
    const lang = (urlParams.get("lang") as typeof language) || "en"
    setLanguage(lang)

    // Request location permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationPermission("granted")
          setLocation(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`)
        },
        () => {
          setLocationPermission("denied")
        },
      )
    }
  }, [])

  const handleLanguageChange = () => {
    router.push("/")
  }

  const currentData = locationData[language]

  // 🌐 UI text translations
  const labels: any = {
    hi: {
      changeLang: "भाषा बदलें",
      overview: "अवलोकन",
      analytics: "एनालिटिक्स",
      todayWeather: "आज का मौसम",
      temp: "तापमान",
      humidity: "नमी",
      wind: "हवा",
      condition: "स्थिति",
      selectCrop: "अपनी फसल चुनें",
      chooseCrop: "फसल चुनें...",
      recFor: (crop: string) => `${crop} के लिए सुझाव`,
      rec1: "मिट्टी की नमी बनाए रखें",
      rec2: "नियमित निरीक्षण करें",
      rec3: "उर्वरक का उपयोग करें",
      todayRecs: "आज की सिफारिशें",
      weatherAlert: "मौसम चेतावनी",
      rain: "अगले 3 दिनों में बारिश की संभावना",
      sowing: "बुआई का समय",
      wheatSowing: "गेहूं बुआई के लिए उपयुक्त समय",
      thisWeek: "इस सप्ताह",
      rainyDays: "बारिश के दिन",
      avgTemp: "औसत तापमान",
      soilMoisture: "मिट्टी की नमी",
    },
    en: {
      changeLang: "Change Language",
      overview: "Overview",
      analytics: "Analytics",
      todayWeather: "Today's Weather",
      temp: "Temperature",
      humidity: "Humidity",
      wind: "Wind",
      condition: "Condition",
      selectCrop: "Select Your Crop",
      chooseCrop: "Choose a crop...",
      recFor: (crop: string) => `Recommendations for ${crop}`,
      rec1: "Maintain soil moisture",
      rec2: "Regular monitoring required",
      rec3: "Apply fertilizer as needed",
      todayRecs: "Today's Recommendations",
      weatherAlert: "Weather Alert",
      rain: "Rain expected in next 3 days",
      sowing: "Sowing Time",
      wheatSowing: "Optimal time for wheat sowing",
      thisWeek: "This Week",
      rainyDays: "Rainy Days",
      avgTemp: "Avg Temperature",
      soilMoisture: "Soil Moisture",
    },
    bn: {
      changeLang: "ভাষা পরিবর্তন",
      overview: "সংক্ষিপ্ত বিবরণ",
      analytics: "বিশ্লেষণ",
      todayWeather: "আজকের আবহাওয়া",
      temp: "তাপমাত্রা",
      humidity: "আর্দ্রতা",
      wind: "বাতাস",
      condition: "অবস্থা",
      selectCrop: "আপনার ফসল নির্বাচন করুন",
      chooseCrop: "ফসল নির্বাচন করুন...",
      recFor: (crop: string) => `${crop} এর জন্য পরামর্শ`,
      rec1: "মাটির আর্দ্রতা বজায় রাখুন",
      rec2: "নিয়মিত পরিদর্শন করুন",
      rec3: "সার প্রয়োগ করুন",
      todayRecs: "আজকের সুপারিশ",
      weatherAlert: "আবহাওয়া সতর্কতা",
      rain: "পরবর্তী ৩ দিনে বৃষ্টির সম্ভাবনা",
      sowing: "বপনের সময়",
      wheatSowing: "গমের জন্য উপযুক্ত বপনের সময়",
      thisWeek: "এই সপ্তাহে",
      rainyDays: "বৃষ্টির দিন",
      avgTemp: "গড় তাপমাত্রা",
      soilMoisture: "মাটির আর্দ্রতা",
    },
    te: {
      changeLang: "భాష మార్చండి",
      overview: "అవలోకనం",
      analytics: "విశ్లేషణ",
      todayWeather: "ఈరోజు వాతావరణం",
      temp: "ఉష్ణోగ్రత",
      humidity: "ఆర్ద్రత",
      wind: "గాలి",
      condition: "స్థితి",
      selectCrop: "మీ పంటను ఎంచుకోండి",
      chooseCrop: "పంటను ఎంచుకోండి...",
      recFor: (crop: string) => `${crop} కోసం సూచనలు`,
      rec1: "మట్టి తేమను ఉంచండి",
      rec2: "క్రమం తప్పకుండా పర్యవేక్షించండి",
      rec3: "అవసరమైతే ఎరువులు వాడండి",
      todayRecs: "ఈరోజు సిఫారసులు",
      weatherAlert: "వాతావరణ హెచ్చరిక",
      rain: "తదుపరి 3 రోజుల్లో వర్షం అవకాశం ఉంది",
      sowing: "విత్తన సమయం",
      wheatSowing: "గోధుమల విత్తనానికి అనుకూల సమయం",
      thisWeek: "ఈ వారం",
      rainyDays: "వర్షపు రోజులు",
      avgTemp: "సగటు ఉష్ణోగ్రత",
      soilMoisture: "మట్టి తేమ",
    },
    ta: {
      changeLang: "மொழி மாற்று",
      overview: "மேலோட்டம்",
      analytics: "பகுப்பாய்வு",
      todayWeather: "இன்றைய வானிலை",
      temp: "வெப்பநிலை",
      humidity: "ஈரப்பதம்",
      wind: "காற்று",
      condition: "நிலை",
      selectCrop: "உங்கள் பயிரைத் தேர்வுசெய்க",
      chooseCrop: "பயிரைத் தேர்ந்தெடுக்கவும்...",
      recFor: (crop: string) => `${crop} பரிந்துரைகள்`,
      rec1: "மண் ஈரப்பதத்தை பராமரிக்கவும்",
      rec2: "தொடர்ந்து கண்காணிக்கவும்",
      rec3: "தேவையெனில் உரங்களைப் பயன்படுத்தவும்",
      todayRecs: "இன்றைய பரிந்துரைகள்",
      weatherAlert: "வானிலை எச்சரிக்கை",
      rain: "அடுத்த 3 நாட்களில் மழை வாய்ப்பு",
      sowing: "விதைப்பு நேரம்",
      wheatSowing: "கோதுமை விதைப்பதற்கு சிறந்த நேரம்",
      thisWeek: "இந்த வாரம்",
      rainyDays: "மழை நாட்கள்",
      avgTemp: "சராசரி வெப்பநிலை",
      soilMoisture: "மண் ஈரப்பதம்",
    },
    mr: {
      changeLang: "भाषा बदला",
      overview: "आढावा",
      analytics: "विश्लेषण",
      todayWeather: "आजचे हवामान",
      temp: "तापमान",
      humidity: "आर्द्रता",
      wind: "वारा",
      condition: "स्थिती",
      selectCrop: "तुमची पिके निवडा",
      chooseCrop: "पिक निवडा...",
      recFor: (crop: string) => `${crop} साठी सूचना`,
      rec1: "मातीतील ओलावा टिकवा",
      rec2: "नियमित तपासणी करा",
      rec3: "आवश्यकतेनुसार खत द्या",
      todayRecs: "आजच्या शिफारसी",
      weatherAlert: "हवामान सूचना",
      rain: "पुढील ३ दिवसात पावसाची शक्यता",
      sowing: "पेरणीचा काळ",
      wheatSowing: "गव्हाच्या पेरणीसाठी योग्य वेळ",
      thisWeek: "या आठवड्यात",
      rainyDays: "पावसाचे दिवस",
      avgTemp: "सरासरी तापमान",
      soilMoisture: "मातीतील ओलावा",
    },
    gu: {
      changeLang: "ભાષા બદલો",
      overview: "ઝાંખી",
      analytics: "વિશ્લેષણ",
      todayWeather: "આજનું હવામાન",
      temp: "તાપમાન",
      humidity: "ભેજ",
      wind: "પવન",
      condition: "પરિસ્થિતિ",
      selectCrop: "તમારી પાક પસંદ કરો",
      chooseCrop: "પાક પસંદ કરો...",
      recFor: (crop: string) => `${crop} માટે ભલામણો`,
      rec1: "માટીનો ભેજ જાળવો",
      rec2: "નિયમિત નિરીક્ષણ કરો",
      rec3: "જરૂર મુજબ ખાતર આપો",
      todayRecs: "આજની ભલામણો",
      weatherAlert: "હવામાન ચેતવણી",
      rain: "આગામી 3 દિવસમાં વરસાદની સંભાવના",
      sowing: "વાવણી સમય",
      wheatSowing: "ગહૂં વાવણી માટે યોગ્ય સમય",
      thisWeek: "આ અઠવાડિયે",
      rainyDays: "વરસાદના દિવસો",
      avgTemp: "સરેરાશ તાપમાન",
      soilMoisture: "માટીનો ભેજ",
    },
    kn: {
      changeLang: "ಭಾಷೆ ಬದಲಾಯಿಸಿ",
      overview: "ಅವಲೋಕನ",
      analytics: "ವಿಶ್ಲೇಷಣೆ",
      todayWeather: "ಇಂದಿನ ಹವಾಮಾನ",
      temp: "ತಾಪಮಾನ",
      humidity: "ಆದ್ರತೆ",
      wind: "ಗಾಳಿ",
      condition: "ಸ್ಥಿತಿ",
      selectCrop: "ನಿಮ್ಮ ಬೆಳೆ ಆರಿಸಿ",
      chooseCrop: "ಬೆಳೆ ಆರಿಸಿ...",
      recFor: (crop: string) => `${crop} ಶಿಫಾರಸುಗಳು`,
      rec1: "ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಕಾಪಾಡಿ",
      rec2: "ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ",
      rec3: "ಅವಶ್ಯಕತೆ ಇದ್ದರೆ ರಸಗೊಬ್ಬರ ಬಳಸಿ",
      todayRecs: "ಇಂದಿನ ಶಿಫಾರಸುಗಳು",
      weatherAlert: "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ",
      rain: "ಮುಂದಿನ 3 ದಿನಗಳಲ್ಲಿ ಮಳೆ ಸಾಧ್ಯತೆ",
      sowing: "ಬಿತ್ತನೆ ಸಮಯ",
      wheatSowing: "ಗೋಧಿ ಬಿತ್ತನೆಗೆ ಉತ್ತಮ ಸಮಯ",
      thisWeek: "ಈ ವಾರ",
      rainyDays: "ಮಳೆ ದಿನಗಳು",
      avgTemp: "ಸರಾಸರಿ ತಾಪಮಾನ",
      soilMoisture: "ಮಣ್ಣಿನ ತೇವಾಂಶ",
    },
  }

  const t = labels[language]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Sprout className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-primary">KrishiMitraAI</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{currentData.location}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLanguageChange}>
                {t.changeLang}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Sprout className="h-4 w-4" /> {t.overview}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> {t.analytics}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Weather */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sun className="h-5 w-5" /> {t.todayWeather}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <Thermometer className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{currentData.weather.temp}</p>
                        <p className="text-sm text-muted-foreground">{t.temp}</p>
                      </div>
                      <div className="text-center">
                        <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{currentData.weather.humidity}</p>
                        <p className="text-sm text-muted-foreground">{t.humidity}</p>
                      </div>
                      <div className="text-center">
                                                <Wind className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{currentData.weather.wind}</p>
                        <p className="text-sm text-muted-foreground">{t.wind}</p>
                      </div>
                      <div className="text-center">
                        <Sun className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                        <p className="text-lg font-bold">{currentData.weather.condition}</p>
                        <p className="text-sm text-muted-foreground">{t.condition}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Crop Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sprout className="h-5 w-5" /> {t.selectCrop}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t.chooseCrop} />
                      </SelectTrigger>
                      <SelectContent>
                        {currentData.crops.map((crop: string, index: number) => (
                          <SelectItem key={index} value={crop}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {selectedCrop && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2">{t.recFor(selectedCrop)}</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• {t.rec1}</li>
                          <li>• {t.rec2}</li>
                          <li>• {t.rec3}</li>
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" /> {t.todayRecs}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg border">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">{t.weatherAlert}</h4>
                        <p className="text-sm text-muted-foreground">{t.rain}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border">
                      <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">{t.sowing}</h4>
                        <p className="text-sm text-muted-foreground">{t.wheatSowing}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Voice Assistant */}
                <VoiceChatbot language={language} />

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" /> {t.thisWeek}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{t.rainyDays}</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{t.avgTemp}</span>
                      <span className="font-semibold">26°C</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{t.soilMoisture}</span>
                      <span className="font-semibold text-green-600">Good</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <CropAnalytics language={language} selectedCrop={selectedCrop} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}



  // "use client"

  // import { useEffect, useState } from "react"
  // import { useSearchParams } from "next/navigation"
  // import { Button } from "@/components/ui/button"
  // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  // import { Input } from "@/components/ui/input"
  // import {
  //   MapPin,
  //   Sprout,
  //   Cloud,
  //   Droplets,
  //   Wind,
  //   Sun,
  //   TrendingUp,
  //   AlertTriangle,
  //   Calendar,
  // } from "lucide-react"
  // import CropAnalytics from "@/components/crop-analytics"
  // import VoiceChatbot from "@/components/voice-chatbot"

  // // 🌍 Language-specific mock data
  // const locationData: Record<string, any> = {
  //   hi: {
  //     location: "दिल्ली, भारत",
  //     weather: { temp: "28°C", humidity: "65%", wind: "12 km/h", condition: "धूप" },
  //     crops: ["गेहूं", "धान", "मक्का", "सरसों", "गन्ना", "ज्वार"],
  //   },
  //   en: {
  //     location: "Delhi, India",
  //     weather: { temp: "28°C", humidity: "65%", wind: "12 km/h", condition: "Sunny" },
  //     crops: ["Wheat", "Rice", "Maize", "Mustard", "Sugarcane", "Sorghum"],
  //   },
  //   bn: {
  //     location: "ঢাকা, বাংলাদেশ",
  //     weather: { temp: "26°C", humidity: "72%", wind: "10 km/h", condition: "রৌদ্রোজ্জ্বল" },
  //     crops: ["ধান", "গম", "ভুট্টা", "পাট", "আখ", "সরিষা"],
  //   },
  //   te: {
  //     location: "హైదరాబాద్, భారతదేశం",
  //     weather: { temp: "30°C", humidity: "60%", wind: "15 km/h", condition: "ఎండ" },
  //     crops: ["బియ్యం", "గోధుమలు", "మొక్కజొన్న", "పత్తి", "చెరకు", "జొన్న"],
  //   },
  //   ta: {
  //     location: "சென்னை, இந்தியா",
  //     weather: { temp: "32°C", humidity: "70%", wind: "14 km/h", condition: "வெயில்" },
  //     crops: ["அரிசி", "கோதுமை", "சோளம்", "கரும்பு", "பருத்தி", "சோயாபீன்"],
  //   },
  //   mr: {
  //     location: "पुणे, भारत",
  //     weather: { temp: "29°C", humidity: "68%", wind: "11 km/h", condition: "सूर्यप्रकाश" },
  //     crops: ["तांदूळ", "गहू", "मका", "ऊस", "सोयाबीन", "कापूस"],
  //   },
  //   gu: {
  //     location: "અમદાવાદ, ભારત",
  //     weather: { temp: "31°C", humidity: "62%", wind: "13 km/h", condition: "ધુપછાંવ" },
  //     crops: ["ચોખા", "ગહું", "મકાઈ", "કપાસ", "શેરડી", "જ્વાર"],
  //   },
  //   kn: {
  //     location: "ಬೆಂಗಳೂರು, ಭಾರತ",
  //     weather: { temp: "27°C", humidity: "75%", wind: "9 km/h", condition: "ಬಿಸಿಲು" },
  //     crops: ["ಅಕ್ಕಿ", "ಗೋಧಿ", "ಮೆಕ್ಕೆಜೋಳ", "ಹತ್ತಿ", "ಕಬ್ಬು", "ಜೋಳ"],
  //   },
  // }

  // export default function DashboardPage() {
  //   const searchParams = useSearchParams()
  //   const language = (searchParams.get("lang") || "en") as keyof typeof locationData

  //   const [selectedCrop, setSelectedCrop] = useState<string>("")
  //   const [userLocation, setUserLocation] = useState<string>("")
  //   const [manualLocation, setManualLocation] = useState<string>("")
  //   const [locationPermissionDenied, setLocationPermissionDenied] = useState<boolean>(false)

  //   const currentData = locationData[language] || locationData["en"]

  //   // 📍 Geolocation on mount
  //   useEffect(() => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (pos) => {
  //           const { latitude, longitude } = pos.coords
  //           setUserLocation(`Lat: ${latitude.toFixed(2)}, Lng: ${longitude.toFixed(2)}`)
  //         },
  //         () => {
  //           setLocationPermissionDenied(true)
  //         }
  //       )
  //     } else {
  //       setLocationPermissionDenied(true)
  //     }
  //   }, [])

  //   const handleManualSubmit = () => {
  //     if (manualLocation.trim()) {
  //       setUserLocation(manualLocation)
  //     }
  //   }

  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
  //       <div className="container mx-auto px-4 py-8">
  //         {/* Header */}
  //         <div className="flex justify-between items-center mb-8">
  //           <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
  //             <Sprout className="h-8 w-8" /> KrishiMitraAI
  //           </h1>

  //           {/* 📍 Location with geolocation + manual input fallback */}
  //           <div className="flex items-center gap-2 text-sm text-muted-foreground">
  //             <MapPin className="h-4 w-4" />
  //             {userLocation ? (
  //               <span>{userLocation}</span>
  //             ) : locationPermissionDenied ? (
  //               <div className="flex gap-2">
  //                 <Input
  //                   placeholder="Enter your location..."
  //                   value={manualLocation}
  //                   onChange={(e) => setManualLocation(e.target.value)}
  //                   className="h-8"
  //                 />
  //                 <Button size="sm" onClick={handleManualSubmit}>
  //                   Save
  //                 </Button>
  //               </div>
  //             ) : (
  //               <span>Detecting location...</span>
  //             )}
  //           </div>
  //         </div>

  //         {/* Tabs */}
  //         <Tabs defaultValue="overview">
  //           <TabsList>
  //             <TabsTrigger value="overview">Overview</TabsTrigger>
  //             <TabsTrigger value="analytics">Analytics</TabsTrigger>
  //           </TabsList>

  //           {/* Overview Tab */}
  //           <TabsContent value="overview">
  //             <div className="grid md:grid-cols-3 gap-6">
  //               <div className="space-y-6 md:col-span-2">
  //                 {/* Weather Card */}
  //                 <Card>
  //                   <CardHeader>
  //                     <CardTitle className="flex items-center gap-2">
  //                       <Cloud className="h-5 w-5" /> Weather
  //                     </CardTitle>
  //                   </CardHeader>
  //                   <CardContent>
  //                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  //                       <div className="text-center">
  //                         <Sun className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
  //                         <p className="text-2xl font-bold">{currentData.weather.temp}</p>
  //                         <p className="text-sm text-muted-foreground">Temp</p>
  //                       </div>
  //                       <div className="text-center">
  //                         <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
  //                         <p className="text-2xl font-bold">{currentData.weather.humidity}</p>
  //                         <p className="text-sm text-muted-foreground">Humidity</p>
  //                       </div>
  //                       <div className="text-center">
  //                         <Wind className="h-8 w-8 text-gray-500 mx-auto mb-2" />
  //                         <p className="text-2xl font-bold">{currentData.weather.wind}</p>
  //                         <p className="text-sm text-muted-foreground">Wind</p>
  //                       </div>
  //                       <div className="text-center">
  //                         <Sun className="h-8 w-8 text-orange-500 mx-auto mb-2" />
  //                         <p className="text-lg font-bold">{currentData.weather.condition}</p>
  //                         <p className="text-sm text-muted-foreground">Condition</p>
  //                       </div>
  //                     </div>
  //                   </CardContent>
  //                 </Card>

  //                 {/* Crop Selection */}
  //                 <Card>
  //                   <CardHeader>
  //                     <CardTitle className="flex items-center gap-2">
  //                       <Sprout className="h-5 w-5" /> Select Crop
  //                     </CardTitle>
  //                   </CardHeader>
  //                   <CardContent>
  //                     <Select value={selectedCrop} onValueChange={setSelectedCrop}>
  //                       <SelectTrigger className="w-full">
  //                         <SelectValue placeholder="Choose a crop" />
  //                       </SelectTrigger>
  //                       <SelectContent>
  //                         {currentData.crops.map((crop: string, index: number) => (
  //                           <SelectItem key={index} value={crop}>
  //                             {crop}
  //                           </SelectItem>
  //                         ))}
  //                       </SelectContent>
  //                     </Select>

  //                     {selectedCrop && (
  //                       <div className="mt-4 p-4 bg-muted rounded-lg">
  //                         <h4 className="font-semibold mb-2">Recommendations for {selectedCrop}</h4>
  //                         <ul className="space-y-1 text-sm text-muted-foreground">
  //                           <li>• Maintain proper irrigation schedule.</li>
  //                           <li>• Use organic manure for better soil health.</li>
  //                           <li>• Monitor pest attacks regularly.</li>
  //                         </ul>
  //                       </div>
  //                     )}
  //                   </CardContent>
  //                 </Card>

  //                 {/* Recommendations */}
  //                 <Card>
  //                   <CardHeader>
  //                     <CardTitle className="flex items-center gap-2">
  //                       <TrendingUp className="h-5 w-5" /> Today's Recommendations
  //                     </CardTitle>
  //                   </CardHeader>
  //                   <CardContent className="space-y-4">
  //                     <div className="flex items-start gap-3 p-3 rounded-lg border">
  //                       <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
  //                       <div>
  //                         <h4 className="font-semibold">Weather Alert</h4>
  //                         <p className="text-sm text-muted-foreground">Rain expected tomorrow. Avoid irrigation today.</p>
  //                       </div>
  //                     </div>
  //                     <div className="flex items-start gap-3 p-3 rounded-lg border">
  //                       <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
  //                       <div>
  //                         <h4 className="font-semibold">Sowing Advisory</h4>
  //                         <p className="text-sm text-muted-foreground">Best time to sow wheat seeds this week.</p>
  //                       </div>
  //                     </div>
  //                   </CardContent>
  //                 </Card>
  //               </div>

  //               {/* Sidebar */}
  //               <div className="space-y-6">
  //                 <VoiceChatbot language={language as "hi" | "en" | "bn" | "te" | "ta" | "mr" | "gu" | "kn"} />

  //                 {/* Quick Stats */}
  //                 <Card>
  //                   <CardHeader>
  //                     <CardTitle className="flex items-center gap-2">
  //                       <Calendar className="h-5 w-5" /> This Week
  //                     </CardTitle>
  //                   </CardHeader>
  //                   <CardContent className="space-y-4">
  //                     <div className="flex justify-between items-center">
  //                       <span className="text-sm text-muted-foreground">Rainy Days</span>
  //                       <span className="font-semibold">3</span>
  //                     </div>
  //                     <div className="flex justify-between items-center">
  //                       <span className="text-sm text-muted-foreground">Avg Temp</span>
  //                       <span className="font-semibold">26°C</span>
  //                     </div>
  //                     <div className="flex justify-between items-center">
  //                       <span className="text-sm text-muted-foreground">Soil Moisture</span>
  //                       <span className="font-semibold text-green-600">Good</span>
  //                     </div>
  //                   </CardContent>
  //                 </Card>
  //               </div>
  //             </div>
  //           </TabsContent>

  //           {/* Analytics Tab */}
  //           <TabsContent value="analytics">
  //             <CropAnalytics language={language as "hi" | "en" | "bn" | "te" | "ta" | "mr" | "gu" | "kn"} selectedCrop={selectedCrop} />
  //           </TabsContent>
  //         </Tabs>
  //       </div>
  //     </div>
  //   )
  // }
