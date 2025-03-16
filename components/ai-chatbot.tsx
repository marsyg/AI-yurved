"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { Loader2, Send, Mic, Paperclip, PlusCircle, ThumbsUp, ThumbsDown } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIChatbot() {
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I am your Ayurvedic AI assistant. I can help you with personalized wellness recommendations, answer questions about Ayurvedic practices, and guide you on your health journey. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (input.trim() === "") return

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsGenerating(true)

    try {
      // Create the prompt from the conversation history
      const historyText = messages
        .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
        .join("\n\n")

      const prompt = `${historyText}\n\nUser: ${input}\n\nAssistant:`

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt,
        system:
          "You are an expert Ayurvedic health assistant that provides personalized advice based on traditional Ayurvedic principles. Provide helpful, accurate information about Ayurvedic practices, herbs, treatments, and lifestyle recommendations. Keep responses concise yet informative, and always prioritize user wellbeing.",
      })

      const aiMessage: Message = {
        role: "assistant",
        content: text,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-white">
      <Card className="lg:col-span-3 bg-slate-800/60 border-slate-700 flex flex-col h-[600px]">
        <CardHeader>
          <CardTitle>AI Health Assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex gap-3 max-w-[80%]">
                  {message.role === "assistant" && (
                    <Avatar>
                      <AvatarFallback className="bg-emerald-800 text-emerald-100">AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`rounded-lg p-4 ${
                        message.role === "user" ? "bg-emerald-600 text-white" : "bg-slate-700 text-slate-100"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    {message.role === "assistant" && (
                      <div className="flex gap-2 mt-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-slate-700">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-slate-700">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {message.role === "user" && (
                    <Avatar>
                      <AvatarFallback className="bg-blue-800 text-blue-100">YOU</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="border-t border-slate-700 pt-4">
          <div className="flex items-center w-full space-x-2">
            <Button variant="outline" size="icon" className="rounded-full border-slate-700 hover:bg-slate-700">
              <PlusCircle className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-slate-700 hover:bg-slate-700">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-slate-900 border-slate-700 focus-visible:ring-emerald-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isGenerating}
            />
            <Button variant="outline" size="icon" className="rounded-full border-slate-700 hover:bg-slate-700">
              <Mic className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={isGenerating || input.trim() === ""}
              className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              {isGenerating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card className="bg-slate-800/60 border-slate-700 h-[600px]">
        <CardHeader>
          <CardTitle>AI Assistant Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="suggestions">
            <TabsList className="bg-slate-900 border border-slate-700 w-full">
              <TabsTrigger value="suggestions" className="flex-1">
                Suggestions
              </TabsTrigger>
              <TabsTrigger value="info" className="flex-1">
                Info
              </TabsTrigger>
            </TabsList>
            <TabsContent value="suggestions" className="space-y-4">
              <p className="text-sm text-slate-400">Try asking about:</p>
              <div className="space-y-2">
                {[
                  "What should I eat to balance my Vata dosha?",
                  "Recommend some morning rituals for my constitution",
                  "How can I improve my sleep naturally?",
                  "What herbs are good for digestive issues?",
                  "Tell me about Panchakarma detoxification",
                  "How can I reduce inflammation with Ayurveda?",
                ].map((suggestion, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="w-full justify-start border-slate-700 hover:bg-slate-700 text-left h-auto"
                    onClick={() => {
                      setInput(suggestion)
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="info">
              <div className="space-y-4 text-sm">
                <p>
                  The AI Assistant provides personalized Ayurvedic guidance based on your constitution and health
                  concerns.
                </p>
                <p>
                  While our AI is trained on traditional Ayurvedic knowledge, it's not a replacement for professional
                  medical advice.
                </p>
                <p>For serious health conditions, please consult with a qualified healthcare practitioner.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

