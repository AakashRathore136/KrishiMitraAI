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
import Mascot from "@/components/mascot"
import ThemeToggle from "@/components/ui/theme-toggle"

// 🌍 Language-specific mock data
const locationData = {
  en: {
    location: "Delhi, India",
    weather: { temp: "28°C", humidity: "65%", wind: "12 km/h", condition: "Sunny" },
    crops: ["Wheat", "Rice", "Maize", "Mustard", "Sugarcane", "Sorghum"],
  },
} as const

type LanguageCode = keyof typeof locationData
const isLangSupported = (lang: string | null): lang is LanguageCode => !!lang && lang in locationData

export default function Dashboard() {
  const [selectedCrop, setSelectedCrop] = useState<string>("")
  const [language, setLanguage] = useState<LanguageCode>("en")
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const raw = params.get("lang")?.toLowerCase() || null
    setLanguage(isLangSupported(raw) ? raw : "en")
  }, [])

  const handleLanguageChange = () => router.push("/")
  const currentData = locationData[language] ?? locationData.en

  const t = {
    changeLang: "Change Language",
    overview: "Overview",
    analytics: "Analytics",
    todayWeather: "Today's Weather",
    selectCrop: "Select Your Crop",
    chooseCrop: "Choose a crop...",
    todayRecs: "Today's Recommendations",
    thisWeek: "This Week",
    rainyDays: "Rainy Days",
    avgTemp: "Avg Temperature",
    soilMoisture: "Soil Moisture",
    friendly: "Simple tips and tools for happier farming",
    ctaTitle: "Meet Mitra — your friendly farm buddy!",
    ctaDesc: "Quick tips, playful guidance, and instant help — in your language.",
    ctaButton: "Show me around",
  }

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
              <ThemeToggle />
              <Button className="playful-button" onClick={handleLanguageChange}>
                {t.changeLang}
              </Button>
            </div>
          </div>
        </div>

        {/* Hero CTA */}
        <div className="container mx-auto px-4">
          <div className="-mt-8 relative">
            <div className="hero-cta playful-card">
              <div>
                <h2 className="text-2xl font-extrabold mb-2">{t.ctaTitle}</h2>
                <p className="text-sm text-muted-foreground mb-4">{t.ctaDesc}</p>
                <div className="flex items-center gap-3">
                  <Button className="playful-button" onClick={() => setActiveTab('overview')}>{t.ctaButton}</Button>
                  <span className="badge-playful">New</span>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="pulse-slow">
                  <Mascot className="h-36 w-36" />
                </div>
                <div className="confetti" aria-hidden>
                  {/* small decorative confetti elements */}
                  <span className="confetti-dot confetti-dot-1" />
                  <span className="confetti-dot confetti-dot-2" />
                  <span className="confetti-dot confetti-dot-3" />
                  <span className="confetti-dot confetti-dot-4" />
                  <span className="confetti-dot confetti-dot-5" />
                </div>
              </div>
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
                        <p className="text-sm text-muted-foreground">Temperature</p>
                      </div>
                      <div className="playful-weather-tile playful-icon">
                        <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{currentData.weather.humidity}</p>
                        <p className="text-sm text-muted-foreground">Humidity</p>
                      </div>
                      <div className="playful-weather-tile playful-icon">
                        <Wind className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{currentData.weather.wind}</p>
                        <p className="text-sm text-muted-foreground">Wind</p>
                      </div>
                      <div className="playful-weather-tile playful-icon">
                        <Sun className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                        <p className="text-lg font-bold">{currentData.weather.condition}</p>
                        <p className="text-sm text-muted-foreground">Condition</p>
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
                        <h4 className="font-semibold mb-2">Recommendations for {selectedCrop}</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Maintain soil moisture</li>
                          <li>• Regular monitoring required</li>
                          <li>• Apply fertilizer as needed</li>
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
                        <h4 className="font-semibold">Weather Alert</h4>
                        <p className="text-sm text-muted-foreground">Rain expected in next 3 days</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/40">
                      <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Sowing Time</h4>
                        <p className="text-sm text-muted-foreground">Optimal time for wheat sowing</p>
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
