"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sprout, Globe, Users, Smartphone } from "lucide-react"

const languages = [
  { code: "hi", name: "हिंदी", flag: "Hin" },
  { code: "en", name: "English", flag: "Eng" },
  { code: "bn", name: "বাংলা", flag: "Ben" },
  { code: "te", name: "తెలుగు", flag: "Tel" },
  { code: "ta", name: "தமிழ்", flag: "Tam" },
  { code: "mr", name: "मराठी", flag: "Mar" },
  { code: "gu", name: "ગુજરાતી", flag: "Guj" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "Kan" },
]

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode)
    // In a real app, this would redirect to the dashboard with the selected language
    window.location.href = `/dashboard?lang=${langCode}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-primary rounded-full">
              <Sprout className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-primary">KrishiMitraAI</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Your intelligent farming companion powered by AI. Get personalized crop advice, weather insights, and yield
            predictions in your local language.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Voice Assistant</h3>
              <p className="text-muted-foreground">
                Ask questions and get answers in your native language using voice commands
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Local Insights</h3>
              <p className="text-muted-foreground">
                Location-based crop recommendations and weather forecasts for your region
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
              <p className="text-muted-foreground">
                Learn from fellow farmers and share your experiences with the community
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Language Selection */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8 text-balance">
            Choose your preferred language to get started
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={selectedLanguage === lang.code ? "default" : "outline"}
                className="h-20 flex flex-col items-center justify-center gap-2 text-lg"
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </Button>
            ))}
          </div>

          {selectedLanguage && (
            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">Language selected! Redirecting to your dashboard...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-border">
          <p className="text-muted-foreground">Empowering small-scale farmers with AI-driven agricultural insights</p>
        </div>
      </div>
    </div>
  )
}
