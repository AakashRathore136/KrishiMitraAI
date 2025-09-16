// "use client"

// import type React from "react"

// import { useState, useRef, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Mic, MicOff, Send, Bot, User, Volume2 } from "lucide-react"

// interface Message {
//   id: string
//   type: "user" | "bot"
//   content: string
//   timestamp: Date
// }

// interface VoiceChatbotProps {
//   language: "hi" | "en" | "bn"
// }

// export default function VoiceChatbot({ language }: VoiceChatbotProps) {
//   const [messages, setMessages] = useState<Message[]>([])
//   const [inputValue, setInputValue] = useState("")
//   const [isListening, setIsListening] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [recognition, setRecognition] = useState<any | null>(null)
//   const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null)
//   const [speechSupported, setSpeechSupported] = useState(false)
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   // Initialize speech recognition and synthesis
//   useEffect(() => {
//     console.log("[v0] Initializing speech recognition...")

//     if (typeof window !== "undefined") {
//       const SpeechRecognitionAPI =
//         (window as any).SpeechRecognition ||
//         (window as any).webkitSpeechRecognition ||
//         (window as any).mozSpeechRecognition ||
//         (window as any).msSpeechRecognition

//       if (SpeechRecognitionAPI) {
//         console.log("[v0] Speech Recognition API found")
//         try {
//           const recognitionInstance = new SpeechRecognitionAPI()
//           recognitionInstance.continuous = false
//           recognitionInstance.interimResults = false
//           recognitionInstance.lang = language === "hi" ? "hi-IN" : language === "bn" ? "bn-BD" : "en-US"

//           recognitionInstance.onresult = (event: any) => {
//             console.log("[v0] Speech recognition result:", event.results[0][0].transcript)
//             const transcript = event.results[0][0].transcript
//             setInputValue(transcript)
//             setIsListening(false)
//           }

//           recognitionInstance.onerror = (event: any) => {
//             console.log("[v0] Speech recognition error:", event.error)
//             setIsListening(false)
//           }

//           recognitionInstance.onend = () => {
//             console.log("[v0] Speech recognition ended")
//             setIsListening(false)
//           }

//           setRecognition(recognitionInstance)
//           setSpeechSupported(true)
//         } catch (error) {
//           console.error("[v0] Error initializing speech recognition:", error)
//           setSpeechSupported(false)
//         }
//       } else {
//         console.log("[v0] Speech Recognition API not supported")
//         setSpeechSupported(false)
//       }

//       // Speech Synthesis
//       if (window.speechSynthesis) {
//         console.log("[v0] Speech Synthesis API found")
//         setSynthesis(window.speechSynthesis)
//       } else {
//         console.log("[v0] Speech Synthesis API not supported")
//       }
//     }
//   }, [language])

//   // Auto-scroll to bottom when new messages arrive
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   // Mock AI responses based on language
//   const getAIResponse = (userMessage: string): string => {
//     const responses = {
//       hi: {
//         weather: "आज का मौसम अच्छा है। तापमान 28°C है और हल्की हवा चल रही है।",
//         crop: "इस मौसम में गेहूं की बुआई के लिए अच्छा समय है। मिट्टी की नमी बनाए रखें।",
//         fertilizer: "आपकी फसल के लिए यूरिया और DAP का उपयोग करें। प्रति एकड़ 50 किलो यूरिया डालें।",
//         default: "मैं आपकी खेती में मदद करने के लिए यहां हूं। कृपया अपना प्रश्न पूछें।",
//       },
//       bn: {
//         weather: "আজকের আবহাওয়া ভালো। তাপমাত্রা ২৬°সে এবং হালকা বাতাস বইছে।",
//         crop: "এই মৌসুমে ধান চাষের জন্য উপযুক্ত সময়। মাটির আর্দ্রতা বজায় রাখুন।",
//         fertilizer: "আপনার ফসলের জন্য ইউরিয়া এবং টিএসপি ব্যবহার করুন। প্রতি বিঘায় ২০ কেজি ইউরিয়া দিন।",
//         default: "আমি আপনার কৃষিকাজে সাহায্য করতে এখানে আছি। অনুগ্রহ করে আপনার প্রশ্ন করুন।",
//       },
//       en: {
//         weather: "Today's weather is good. Temperature is 28°C with light winds.",
//         crop: "This is a good time for wheat sowing. Maintain soil moisture levels.",
//         fertilizer: "Use urea and DAP for your crops. Apply 50kg urea per acre.",
//         default: "I'm here to help with your farming needs. Please ask your question.",
//       },
//     }

//     const currentResponses = responses[language]
//     const lowerMessage = userMessage.toLowerCase()

//     if (lowerMessage.includes("weather") || lowerMessage.includes("मौसम") || lowerMessage.includes("আবহাওয়া")) {
//       return currentResponses.weather
//     } else if (lowerMessage.includes("crop") || lowerMessage.includes("फसल") || lowerMessage.includes("ফসল")) {
//       return currentResponses.crop
//     } else if (lowerMessage.includes("fertilizer") || lowerMessage.includes("उर्वरक") || lowerMessage.includes("সার")) {
//       return currentResponses.fertilizer
//     } else {
//       return currentResponses.default
//     }
//   }

//   const toggleVoiceRecognition = () => {
//     if (!recognition || !speechSupported) {
//       console.log("[v0] Speech recognition not available")
//       return
//     }

//     if (isListening) {
//       console.log("[v0] Stopping speech recognition")
//       recognition.stop()
//       setIsListening(false)
//     } else {
//       console.log("[v0] Starting speech recognition")
//       try {
//         recognition.start()
//         setIsListening(true)
//       } catch (error) {
//         console.error("[v0] Error starting speech recognition:", error)
//         setIsListening(false)
//       }
//     }
//   }

//   const speakMessage = (text: string) => {
//     if (!synthesis) {
//       console.log("[v0] Speech synthesis not available")
//       return
//     }

//     console.log("[v0] Speaking message:", text)
//     const utterance = new SpeechSynthesisUtterance(text)
//     utterance.lang = language === "hi" ? "hi-IN" : language === "bn" ? "bn-BD" : "en-US"
//     utterance.rate = 0.8
//     synthesis.speak(utterance)
//   }

//   const sendMessage = async () => {
//     if (!inputValue.trim()) return

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       type: "user",
//       content: inputValue,
//       timestamp: new Date(),
//     }

//     setMessages((prev) => [...prev, userMessage])
//     setInputValue("")
//     setIsLoading(true)

//     // Simulate AI processing delay
//     setTimeout(() => {
//       const aiResponse = getAIResponse(inputValue)
//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         type: "bot",
//         content: aiResponse,
//         timestamp: new Date(),
//       }

//       setMessages((prev) => [...prev, botMessage])
//       setIsLoading(false)

//       // Speak the response
//       speakMessage(aiResponse)
//     }, 1000)
//   }

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       sendMessage()
//     }
//   }

//   const labels = {
//     hi: {
//       title: "कृषि सहायक",
//       placeholder: "अपना प्रश्न टाइप करें...",
//       listening: "सुन रहा हूं...",
//       startSpeaking: "बोलना शुरू करें",
//       stopListening: "सुनना बंद करें",
//       send: "भेजें",
//       speak: "बोलें",
//     },
//     bn: {
//       title: "কৃষি সহায়ক",
//       placeholder: "আপনার প্রশ্ন টাইপ করুন...",
//       listening: "শুনছি...",
//       startSpeaking: "কথা বলা শুরু করুন",
//       stopListening: "শোনা বন্ধ করুন",
//       send: "পাঠান",
//       speak: "বলুন",
//     },
//     en: {
//       title: "Farm Assistant",
//       placeholder: "Type your question...",
//       listening: "Listening...",
//       startSpeaking: "Start Speaking",
//       stopListening: "Stop Listening",
//       send: "Send",
//       speak: "Speak",
//     },
//   }

//   const currentLabels = labels[language]

//   return (
//     <Card className="h-[500px] flex flex-col">
//       <CardHeader className="pb-3">
//         <CardTitle className="flex items-center gap-2">
//           <Bot className="h-5 w-5 text-primary" />
//           {currentLabels.title}
//           {!speechSupported && <span className="text-xs text-muted-foreground ml-2">(Text only)</span>}
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col gap-4">
//         {/* Messages */}
//         <ScrollArea className="flex-1 pr-4">
//           <div className="space-y-4">
//             {messages.length === 0 && (
//               <div className="text-center text-muted-foreground py-8">
//                 <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
//                 <p>{currentLabels.title}</p>
//               </div>
//             )}

//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
//               >
//                 {message.type === "bot" && (
//                   <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
//                     <Bot className="h-4 w-4 text-primary-foreground" />
//                   </div>
//                 )}

//                 <div
//                   className={`max-w-[80%] rounded-lg px-3 py-2 ${
//                     message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
//                   }`}
//                 >
//                   <p className="text-sm">{message.content}</p>
//                   {message.type === "bot" && synthesis && (
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="h-6 w-6 p-0 mt-1 hover:bg-transparent"
//                       onClick={() => speakMessage(message.content)}
//                     >
//                       <Volume2 className="h-3 w-3" />
//                     </Button>
//                   )}
//                 </div>

//                 {message.type === "user" && (
//                   <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
//                     <User className="h-4 w-4 text-secondary-foreground" />
//                   </div>
//                 )}
//               </div>
//             ))}

//             {isLoading && (
//               <div className="flex gap-3 justify-start">
//                 <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
//                   <Bot className="h-4 w-4 text-primary-foreground" />
//                 </div>
//                 <div className="bg-muted rounded-lg px-3 py-2">
//                   <div className="flex gap-1">
//                     <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
//                     <div
//                       className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
//                       style={{ animationDelay: "0.1s" }}
//                     ></div>
//                     <div
//                       className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
//                       style={{ animationDelay: "0.2s" }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div ref={messagesEndRef} />
//           </div>
//         </ScrollArea>

//         {/* Input Area */}
//         <div className="flex gap-2">
//           <div className="flex-1 relative">
//             <Input
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder={isListening ? currentLabels.listening : currentLabels.placeholder}
//               className={isListening ? "border-red-500" : ""}
//               disabled={isListening}
//             />
//             {isListening && (
//               <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
//               </div>
//             )}
//           </div>

//           <Button
//             onClick={toggleVoiceRecognition}
//             variant={isListening ? "destructive" : "outline"}
//             size="icon"
//             disabled={!speechSupported}
//             title={!speechSupported ? "Speech recognition not supported in this browser" : ""}
//           >
//             {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
//           </Button>

//           <Button onClick={sendMessage} disabled={!inputValue.trim() || isLoading}>
//             <Send className="h-4 w-4" />
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }



"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, MicOff, Send, Bot, User, Volume2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

interface VoiceChatbotProps {
  language: "hi" | "en" | "bn" | "te" | "ta" | "mr" | "gu" | "kn"
}

export default function VoiceChatbot({ language }: VoiceChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [recognition, setRecognition] = useState<any | null>(null)
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null)
  const [speechSupported, setSpeechSupported] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 🎤 Initialize speech recognition + synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionAPI =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition ||
        (window as any).mozSpeechRecognition ||
        (window as any).msSpeechRecognition

      if (SpeechRecognitionAPI) {
        try {
          const recognitionInstance = new SpeechRecognitionAPI()
          recognitionInstance.continuous = false
          recognitionInstance.interimResults = false

          const langMap: Record<string, string> = {
            hi: "hi-IN",
            en: "en-US",
            bn: "bn-BD",
            te: "te-IN",
            ta: "ta-IN",
            mr: "mr-IN",
            gu: "gu-IN",
            kn: "kn-IN",
          }
          recognitionInstance.lang = langMap[language] || "en-US"

          recognitionInstance.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript
            setInputValue(transcript)
            setIsListening(false)
          }
          recognitionInstance.onerror = () => setIsListening(false)
          recognitionInstance.onend = () => setIsListening(false)

          setRecognition(recognitionInstance)
          setSpeechSupported(true)
        } catch {
          setSpeechSupported(false)
        }
      } else {
        setSpeechSupported(false)
      }

      if (window.speechSynthesis) {
        setSynthesis(window.speechSynthesis)
      }
    }
  }, [language])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 🤖 Mock AI responses for all languages
  const getAIResponse = (userMessage: string): string => {
    const responses: any = {
      hi: {
        weather: "आज का मौसम अच्छा है। तापमान 28°C है और हल्की हवा चल रही है।",
        crop: "इस मौसम में गेहूं की बुआई के लिए अच्छा समय है। मिट्टी की नमी बनाए रखें।",
        fertilizer: "आपकी फसल के लिए यूरिया और DAP का उपयोग करें। प्रति एकड़ 50 किलो यूरिया डालें।",
        default: "मैं आपकी खेती में मदद करने के लिए यहां हूं। कृपया अपना प्रश्न पूछें।",
      },
      en: {
        weather: "Today's weather is good. Temperature is 28°C with light winds.",
        crop: "This is a good time for wheat sowing. Maintain soil moisture levels.",
        fertilizer: "Use urea and DAP for your crops. Apply 50kg urea per acre.",
        default: "I'm here to help with your farming needs. Please ask your question.",
      },
      bn: {
        weather: "আজকের আবহাওয়া ভালো। তাপমাত্রা ২৬°সে এবং হালকা বাতাস বইছে।",
        crop: "এই মৌসুমে ধান চাষের জন্য উপযুক্ত সময়। মাটির আর্দ্রতা বজায় রাখুন।",
        fertilizer: "আপনার ফসলের জন্য ইউরিয়া এবং টিএসপি ব্যবহার করুন। প্রতি বিঘায় ২০ কেজি ইউরিয়া দিন।",
        default: "আমি আপনার কৃষিকাজে সাহায্য করতে এখানে আছি। অনুগ্রহ করে আপনার প্রশ্ন করুন।",
      },
      te: {
        weather: "ఈరోజు వాతావరణం బాగుంది. ఉష్ణోగ్రత 28°C ఉంది మరియు తేలికపాటి గాలి వీస్తోంది.",
        crop: "ఇది గోధుమల విత్తనానికి మంచి సమయం. మట్టి తేమను ఉంచండి.",
        fertilizer: "మీ పంటలకు యూరియా మరియు DAP వాడండి. ఎకరానికి 50kg యూరియా వేయండి.",
        default: "నేను మీ వ్యవసాయ అవసరాలకు సహాయం చేయడానికి ఇక్కడ ఉన్నాను. దయచేసి మీ ప్రశ్న అడగండి.",
      },
      ta: {
        weather: "இன்றைய வானிலை நல்லது. வெப்பநிலை 28°C மற்றும் மெதுவான காற்று உள்ளது.",
        crop: "இது கோதுமை விதைப்பதற்கு சிறந்த நேரம். மண் ஈரப்பதத்தை பராமரிக்கவும்.",
        fertilizer: "உங்கள் பயிர்களுக்கு யூரியா மற்றும் DAP பயன்படுத்தவும். ஏக்கருக்கு 50கிலோ யூரியா இடவும்.",
        default: "உங்கள் விவசாய தேவைகளுக்கு உதவ நான் இங்கே இருக்கிறேன். தயவுசெய்து உங்கள் கேள்வியை கேளுங்கள்.",
      },
      mr: {
        weather: "आजचे हवामान छान आहे. तापमान 28°C असून हलकी हवा वाहत आहे.",
        crop: "ही गव्हाची पेरणी करण्यासाठी योग्य वेळ आहे. मातीतील ओलावा टिकवा.",
        fertilizer: "तुमच्या पिकांसाठी युरिया आणि DAP वापरा. प्रति एकर 50 किलो युरिया टाका.",
        default: "मी तुमच्या शेतीस मदत करण्यासाठी येथे आहे. कृपया तुमचा प्रश्न विचारा.",
      },
      gu: {
        weather: "આજનું હવામાન સારું છે. તાપમાન 28°C છે અને હળવો પવન ફૂંકાઈ રહ્યો છે.",
        crop: "આ ગહૂં વાવણી માટેનો સારો સમય છે. માટીનો ભેજ જાળવો.",
        fertilizer: "તમારા પાક માટે યુરિયા અને DAP નો ઉપયોગ કરો. પ્રતિ એકર 50 કિલો યુરિયા આપો.",
        default: "હું તમારી ખેતીમાં મદદ કરવા માટે અહીં છું. કૃપા કરીને તમારો પ્રશ્ન પૂછો.",
      },
      kn: {
        weather: "ಇಂದಿನ ಹವಾಮಾನ ಉತ್ತಮವಾಗಿದೆ. ತಾಪಮಾನ 28°C ಇದೆ ಮತ್ತು ಹಗುರವಾದ ಗಾಳಿ ಬೀಸುತ್ತಿದೆ.",
        crop: "ಇದು ಗೋಧಿ ಬಿತ್ತನೆಗೆ ಉತ್ತಮ ಸಮಯ. ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಕಾಪಾಡಿ.",
        fertilizer: "ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ಯೂರಿಯಾ ಮತ್ತು DAP ಬಳಸಿ. ಎಕರೆಗೆ 50 ಕಿಲೋ ಯೂರಿಯಾ ಹಾಕಿ.",
        default: "ನಾನು ನಿಮ್ಮ ಕೃಷಿಗೆ ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ.",
      },
    }

    const current = responses[language]
    const msg = userMessage.toLowerCase()
    if (msg.includes("weather") || msg.includes("मौसम") || msg.includes("আবহাওয়া") || msg.includes("వాతావరణం") || msg.includes("வானிலை") || msg.includes("हवामान") || msg.includes("હવામાન") || msg.includes("ಹವಾಮಾನ"))
      return current.weather
    if (msg.includes("crop") || msg.includes("फसल") || msg.includes("ফসল") || msg.includes("పంట") || msg.includes("பயிர்") || msg.includes("पिक") || msg.includes("પાક") || msg.includes("ಬೆಳೆ"))
      return current.crop
    if (msg.includes("fertilizer") || msg.includes("उर्वरक") || msg.includes("সার") || msg.includes("ఎరువు") || msg.includes("உரம்") || msg.includes("खत") || msg.includes("ખાતર") || msg.includes("ರಸಗೊಬ್ಬರ"))
      return current.fertilizer
    return current.default
  }

  const toggleVoiceRecognition = () => {
    if (!recognition || !speechSupported) return
    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      try {
        recognition.start()
        setIsListening(true)
      } catch {
        setIsListening(false)
      }
    }
  }

  const speakMessage = (text: string) => {
    if (!synthesis) return
    const utterance = new SpeechSynthesisUtterance(text)

    const langMap: Record<string, string> = {
      hi: "hi-IN",
      en: "en-US",
      bn: "bn-BD",
      te: "te-IN",
      ta: "ta-IN",
      mr: "mr-IN",
      gu: "gu-IN",
      kn: "kn-IN",
    }
    utterance.lang = langMap[language] || "en-US"
    utterance.rate = 0.9
    synthesis.speak(utterance)
  }

  const sendMessage = async () => {
    if (!inputValue.trim()) return
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage.content)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: aiResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
      speakMessage(aiResponse)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage()
  }

  // 🌐 UI labels
  const labels: any = {
    hi: { title: "कृषि सहायक", placeholder: "अपना प्रश्न टाइप करें...", listening: "सुन रहा हूं..." },
    en: { title: "Farm Assistant", placeholder: "Type your question...", listening: "Listening..." },
    bn: { title: "কৃষি সহায়ক", placeholder: "আপনার প্রশ্ন টাইপ করুন...", listening: "শুনছি..." },
    te: { title: "వ్యవసాయ సహాయకుడు", placeholder: "మీ ప్రశ్నను టైప్ చేయండి...", listening: "వినుతున్నాను..." },
    ta: { title: "விவசாய உதவியாளர்", placeholder: "உங்கள் கேள்வியை தட்டச்சு செய்யவும்...", listening: "கேட்கிறேன்..." },
    mr: { title: "कृषी सहाय्यक", placeholder: "तुमचा प्रश्न टाइप करा...", listening: "ऐकत आहे..." },
    gu: { title: "કૃષિ સહાયક", placeholder: "તમારો પ્રશ્ન લખો...", listening: "સાંભળું છું..." },
    kn: { title: "ಕೃಷಿ ಸಹಾಯಕ", placeholder: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...", listening: "ಕೇಳುತ್ತಿದ್ದೇನೆ..." },
  }
  const currentLabels = labels[language]

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          {currentLabels.title}
          {!speechSupported && <span className="text-xs text-muted-foreground ml-2">(Text only)</span>}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4">
        {/* Messages */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>{currentLabels.title}</p>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                {message.type === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.type === "bot" && synthesis && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 mt-1 hover:bg-transparent"
                      onClick={() => speakMessage(message.content)}
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                {message.type === "user" && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isListening ? currentLabels.listening : currentLabels.placeholder}
              className={isListening ? "border-red-500" : ""}
              disabled={isListening}
            />
            {isListening && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>

          <Button
            onClick={toggleVoiceRecognition}
            variant={isListening ? "destructive" : "outline"}
            size="icon"
            disabled={!speechSupported}
            title={!speechSupported ? "Speech recognition not supported in this browser" : ""}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>

          <Button onClick={sendMessage} disabled={!inputValue.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
