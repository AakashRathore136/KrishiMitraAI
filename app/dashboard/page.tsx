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
import { Badge } from "@/components/ui/badge"

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
    location: "హైదరాబాదు, भारत",
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
    const urlParams = new URLSearchParams(window.location.search)
    const lang = (urlParams.get("lang") as typeof language) || "en"
    setLanguage(lang)

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
      friendly: "Simple tips and tools for happier farming",
    },
  }

  const t = labels[language] || labels.en

  return (
    <div className="min-h-screen bg-background playful-gradient-bg">
      {/* Header */}
      <div className="border-b bg-card relative overflow-visible">
        <div className="container mx-auto px-4 py-5 relative">
          <div className="absolute -left-8 -top-6 playful-blob pointer-events-none hidden lg:block" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg playful-icon">
                <Sprout className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">KrishiMitraAI</h1>
                <p className="text-sm text-muted-foreground">{t.friendly}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 playful-icon" />
                <span>{currentData.location}</span>
              </div>
              <Button className="playful-button" onClick={handleLanguageChange}>
                {t.changeLang}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-muted/60 rounded-xl p-1">
            <TabsTrigger value="overview" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-card">
              <Sprout className="h-4 w-4 playful-icon" /> {t.overview}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-card">
              <BarChart3 className="h-4 w-4 playful-icon" /> {t.analytics}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Weather */}
                <Card className="playful-card hover:shadow-sm transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sun className="h-5 w-5 playful-icon" /> {t.todayWeather}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="playful-weather-tile playful-icon">
                        <Thermometer className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{currentData.weather.temp}</p>
                        <p className="text-sm text-muted-foreground">{t.temp}</p>
                      </div>
                      <div className="playful-weather-tile playful-icon">
                        <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{currentData.weather.humidity}</p>
                        <p className="text-sm text-muted-foreground">{t.humidity}</p>
                      </div>
                      <div className="playful-weather-tile playful-icon">
                        <Wind className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{currentData.weather.wind}</p>
                        <p className="text-sm text-muted-foreground">{t.wind}</p>
                      </div>
                      <div className="playful-weather-tile playful-icon">
                        <Sun className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                        <p className="text-lg font-bold">{currentData.weather.condition}</p>
                        <p className="text-sm text-muted-foreground">{t.condition}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Crop Selection */}
                <Card className="playful-card hover:shadow-sm transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sprout className="h-5 w-5 playful-icon" /> {t.selectCrop}
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
                <Card className="playful-card hover:shadow-sm transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 playful-icon" /> {t.todayRecs}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/40">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">{t.weatherAlert}</h4>
                        <p className="text-sm text-muted-foreground">{t.rain}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/40">
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
                <Card className="playful-card hover:shadow-sm transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 playful-icon" /> {t.thisWeek}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t.rainyDays}</span>
                      <Badge variant="secondary">3</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t.avgTemp}</span>
                      <Badge variant="secondary">26°C</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t.soilMoisture}</span>
                      <Badge>Good</Badge>
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
