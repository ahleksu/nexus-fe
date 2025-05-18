/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, useRef } from "react"
import { Headphones, Play, Pause, Volume2, VolumeX, RefreshCw, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/progress"
import { toast } from "sonner"

interface PerformanceFeedbackButtonProps {
  agent: {
    id: string | number
    name: string
    email: string
  }
  kpiData: {
    totalInteractions: number
    avgHandleTime: string
    avgQaScore: string
    avgCsatScore: string
    fcrRate: string
    aiSummariesUtilized: number
    docSearches: number
    aiSuggestionsAccepted: number
    sentimentData: Array<{ sentiment: string; value: number }>
    recentInteractions: any[]
  }
  dateRange?: {
    from: Date
    to: Date
  }
}

export function PerformanceFeedbackButton({ agent, kpiData, dateRange }: PerformanceFeedbackButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(80)
  const [feedback, setFeedback] = useState<{
    text: string
    audioUrl: string
  } | null>(null)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressMessage, setProgressMessage] = useState("")
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const wsRef = useRef<WebSocket | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Close WebSocket connection
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }

      // Clear any intervals
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }

      // Clean up audio
      if (audio) {
        audio.pause()
        audio.src = ""
      }
    }
  }, [audio])

  // Set up audio time update listener
  useEffect(() => {
    if (audio) {
      const updateTime = () => {
        setCurrentTime(audio?.currentTime || 0)
        setDuration(audio?.duration || 0)
      }

      audio.addEventListener("timeupdate", updateTime)
      audio.addEventListener("loadedmetadata", updateTime)
      audio.addEventListener("ended", () => setIsPlaying(false))

      return () => {
        audio.removeEventListener("timeupdate", updateTime)
        audio.removeEventListener("loadedmetadata", updateTime)
        audio.removeEventListener("ended", () => setIsPlaying(false))
      }
    }
  }, [audio])

  const connectWebSocket = () => {
    // Close existing connection if any
    if (wsRef.current) {
      wsRef.current.close()
    }

    // Use secure WebSocket if on HTTPS
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
    const wsUrl = `${protocol}//${window.location.host}/api/ws`

    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => {
      console.log("WebSocket connection established")
      // Send initial message with session ID
      ws.send(
        JSON.stringify({
          type: "init",
          agentId: agent.id,
          sessionId: Date.now().toString(),
        }),
      )
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.type === "progress") {
          setProgress(data.value)
          setProgressMessage(data.message || "")
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error)
      }
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
      // Fall back to simulated progress if WebSocket fails
      simulateProgress()
    }

    ws.onclose = () => {
      console.log("WebSocket connection closed")
    }
  }

  // Fallback for when WebSocket isn't available
  const simulateProgress = () => {
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    setProgress(10)
    setProgressMessage("Analyzing agent performance data...")

    const steps = [
      { progress: 25, message: "Generating feedback script..." },
      { progress: 50, message: "Creating audio response..." },
      { progress: 75, message: "Finalizing feedback..." },
      { progress: 95, message: "Almost ready..." },
    ]

    let stepIndex = 0

    progressIntervalRef.current = setInterval(() => {
      if (stepIndex < steps.length) {
        const { progress, message } = steps[stepIndex]
        setProgress(progress)
        setProgressMessage(message)
        stepIndex++
      } else {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
          progressIntervalRef.current = null
        }
      }
    }, 2000)
  }

  const generateFeedback = async () => {
    try {
      setIsLoading(true)
      setProgress(5)
      setProgressMessage("Initializing feedback generation...")

      // Connect WebSocket for real-time updates
      connectWebSocket()

      // Prepare the data to send to the API
      const agentData = {
        name: agent.name,
        totalInteractions: kpiData.totalInteractions,
        avgHandleTime: kpiData.avgHandleTime,
        avgQaScore: kpiData.avgQaScore,
        avgCsatScore: kpiData.avgCsatScore,
        fcrRate: kpiData.fcrRate,
        aiSummariesUtilized: kpiData.aiSummariesUtilized,
        docSearches: kpiData.docSearches,
        aiSuggestionsAccepted: kpiData.aiSuggestionsAccepted,
        sentimentData: kpiData.sentimentData,
        recentInteractions: kpiData.recentInteractions,
      }

      // Call the API to generate feedback
      const response = await fetch("/api/gemini-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agentData,
          dateRange,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate feedback")
      }

      const data = await response.json()
      setFeedback(data)
      setProgress(100)
      setProgressMessage("Feedback ready!")

      // Create audio element
      if (data.audioUrl) {
        const audioElement = new Audio(data.audioUrl)
        audioElement.volume = volume / 100

        // Add event listeners
        audioElement.addEventListener("ended", () => {
          setIsPlaying(false)
        })

        audioElement.addEventListener("error", (e) => {
          console.error("Audio playback error:", e)
          toast.error("Error playing audio. Please try again.")
          setIsPlaying(false)
        })

        setAudio(audioElement)
      }

      // Show success toast
      toast.success("Performance feedback generated successfully!")
    } catch (error) {
      console.error("Error generating feedback:", error)
      toast.error(error instanceof Error ? error.message : "Failed to generate performance feedback")
      setProgress(0)
      setProgressMessage("")
    } finally {
      setIsLoading(false)

      // Clear any intervals
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }

      // Close WebSocket connection
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
    }
  }

  const handleDialogChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      // Stop audio when dialog is closed
      if (audio && isPlaying) {
        audio.pause()
        setIsPlaying(false)
      }
    }
  }

  const togglePlayback = () => {
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error)
        toast.error("There was an error playing the audio. Please try again.")
      })
    }

    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!audio) return

    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)

    if (audio) {
      audio.volume = newVolume / 100
    }
  }

  const handleRegenerateFeedback = () => {
    // Stop audio if playing
    if (audio && isPlaying) {
      audio.pause()
      setIsPlaying(false)
    }

    setFeedback(null)
    setAudio(null)
    generateFeedback()
  }

  const downloadAudio = () => {
    if (!feedback?.audioUrl) return

    // Create an anchor element and trigger download
    const a = document.createElement("a")
    a.href = feedback.audioUrl
    a.download = `${agent.name.replace(/\s+/g, "_")}_feedback_${new Date().toISOString().split("T")[0]}.mp3`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const downloadTranscript = () => {
    if (!feedback?.text) return

    // Create a blob with the text content
    const blob = new Blob([feedback.text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    // Create an anchor element and trigger download
    const a = document.createElement("a")
    a.href = url
    a.download = `${agent.name.replace(/\s+/g, "_")}_feedback_transcript_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    // Clean up
    URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  // Format time in MM:SS format
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-gradient-to-r from-violet-600 to-violet-800 hover:from-violet-700 hover:to-violet-900"
          onClick={() => {
            if (!feedback) {
              setOpen(true)
              setTimeout(() => {
                generateFeedback()
              }, 100)
            } else {
              setOpen(true)
            }
          }}
        >
          <Headphones className="mr-2 h-4 w-4" />
          Get Performance Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>AI Performance Feedback</DialogTitle>
          <DialogDescription>Personalized audio feedback for {agent.name} based on current KPI data.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative mb-4 w-20 h-20">
                <Progress
                  type="circle"
                  value={progress}
                  strokeWidth={6}
                  strokeColor="oklch(0.5 0.25 280)"
                  trailColor="hsl(var(--secondary))"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {progressMessage || "Generating personalized feedback..."}
              </p>
            </div>
          ) : feedback ? (
            <div className="space-y-4">
              <div className="rounded-lg border p-4 bg-muted/50 max-h-[300px] overflow-y-auto">
                <p className="text-sm whitespace-pre-line">{feedback.text}</p>
              </div>

              <div className="space-y-2">
                {/* Audio progress bar */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <Progress
                  value={(currentTime / duration) * 100 || 0}
                  className="w-full"
                  strokeWidth={2}
                  strokeColor="oklch(0.5 0.25 280)"
                  trailColor="hsl(var(--secondary))"
                />

                {/* Audio controls */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={togglePlayback}
                      disabled={!feedback.audioUrl}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={toggleMute}
                      disabled={!feedback.audioUrl}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
                    </Button>

                    <div className="w-24">
                      <Slider
                        value={[volume]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={handleVolumeChange}
                        disabled={!feedback.audioUrl}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={downloadAudio}
                      disabled={!feedback.audioUrl}
                      title="Download audio"
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download Audio</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={handleRegenerateFeedback}
                      disabled={isLoading}
                      title="Regenerate feedback"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span className="sr-only">Regenerate</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-sm text-muted-foreground">Click the button below to generate personalized feedback.</p>
              <Button variant="default" className="mt-4 bg-violet-600 hover:bg-violet-700" onClick={generateFeedback}>
                Generate Feedback
              </Button>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center">
          {feedback && (
            <Button variant="outline" size="sm" onClick={downloadTranscript} className="text-xs">
              Download Transcript
            </Button>
          )}
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
