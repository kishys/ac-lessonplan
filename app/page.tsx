"use client"

import { useState, useMemo } from "react"
import { Search, Download, FileText, Plane } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import Fuse from "fuse.js"

// Mock data for lesson plans
const lessonPlans = [
  {
    id: 1,
    name: "Basic Drill Movements",
    category: "Drill",
    level: "Level 1",
    fileUrl: "/files/basic-drill-movements.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-15",
    tags: ["drill", "basic", "movements"],
    icon: "🚶",
    instructionType: "EOM",
  },
  {
    id: 2,
    name: "Advanced Formation Drill",
    category: "Drill",
    level: "Level 2",
    fileUrl: "/files/formation-drill.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-20",
    tags: ["drill", "formation", "advanced"],
    icon: "🔄",
    instructionType: "EOC",
  },
  {
    id: 3,
    name: "Ceremonial Drill Procedures",
    category: "Drill",
    level: "Level 3",
    fileUrl: "/files/ceremonial-drill.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-18",
    tags: ["drill", "ceremonial", "procedures"],
    icon: "🎖️",
    instructionType: "EOM",
  },
  {
    id: 4,
    name: "Competition Drill Standards",
    category: "Drill",
    level: "Level 4",
    fileUrl: "/files/competition-drill.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-22",
    tags: ["drill", "competition", "standards"],
    icon: "🏆",
    instructionType: "EOC",
  },
  {
    id: 5,
    name: "Introduction to Aviation",
    category: "Aviation",
    level: "Level 1",
    fileUrl: "/files/intro-aviation.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-10",
    tags: ["aviation", "introduction", "basics"],
    icon: "✈️",
    instructionType: "EOM",
  },
  {
    id: 6,
    name: "Aircraft Systems Overview",
    category: "Aviation",
    level: "Level 2",
    fileUrl: "/files/aircraft-systems.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-25",
    tags: ["aircraft", "systems", "overview"],
    icon: "⚙️",
    instructionType: "EOC",
  },
  {
    id: 7,
    name: "Navigation Principles",
    category: "Aviation",
    level: "Level 3",
    fileUrl: "/files/navigation-principles.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-12",
    tags: ["navigation", "principles", "theory"],
    icon: "🧭",
    instructionType: "EOM",
  },
  {
    id: 8,
    name: "Advanced Flight Theory",
    category: "Aviation",
    level: "Level 4",
    fileUrl: "/files/advanced-flight.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-23",
    tags: ["flight", "theory", "advanced"],
    icon: "🚀",
    instructionType: "EOC",
  },
  {
    id: 9,
    name: "Uniform Standards and Care",
    category: "Dress",
    level: "Level 1",
    fileUrl: "/files/uniform-standards.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-14",
    tags: ["uniform", "dress", "standards"],
    icon: "👔",
    instructionType: "EOM",
  },
  {
    id: 10,
    name: "Ceremonial Dress Procedures",
    category: "Dress",
    level: "Level 2",
    fileUrl: "/files/ceremonial-dress.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-19",
    tags: ["ceremonial", "dress", "procedures"],
    icon: "🎩",
    instructionType: "EOC",
  },
  {
    id: 11,
    name: "Basic Leadership Skills",
    category: "Leadership",
    level: "Level 1",
    fileUrl: "/files/basic-leadership.docx",
    fileType: "PDF",
    lastUpdated: "2024-01-21",
    tags: ["leadership", "basic", "skills"],
    icon: "👥",
    instructionType: "EOM",
  },
  {
    id: 12,
    name: "Team Management",
    category: "Leadership",
    level: "Level 2",
    fileUrl: "/files/team-management.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-24",
    tags: ["team", "management", "leadership"],
    icon: "🤝",
    instructionType: "EOC",
  },
  {
    id: 13,
    name: "Command and Control",
    category: "Leadership",
    level: "Level 3",
    fileUrl: "/files/command-control.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-16",
    tags: ["command", "control", "leadership"],
    icon: "📋",
    instructionType: "EOM",
  },
  {
    id: 14,
    name: "Strategic Leadership",
    category: "Leadership",
    level: "Level 4",
    fileUrl: "/files/strategic-leadership.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-17",
    tags: ["strategic", "leadership", "advanced"],
    icon: "🎯",
    instructionType: "EOC",
  },
  {
    id: 15,
    name: "Basic Survival Skills",
    category: "Survival",
    level: "Level 1",
    fileUrl: "/files/basic-survival.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-26",
    tags: ["survival", "basic", "skills"],
    icon: "🏕️",
    instructionType: "EOM",
  },
  {
    id: 16,
    name: "Wilderness Navigation",
    category: "Survival",
    level: "Level 2",
    fileUrl: "/files/wilderness-navigation.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-27",
    tags: ["survival", "navigation", "wilderness"],
    icon: "🗺️",
    instructionType: "EOC",
  },
  {
    id: 17,
    name: "Emergency Shelter Building",
    category: "Survival",
    level: "Level 3",
    fileUrl: "/files/emergency-shelter.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-28",
    tags: ["survival", "shelter", "emergency"],
    icon: "⛺",
    instructionType: "EOM",
  },
  {
    id: 18,
    name: "Advanced Survival Techniques",
    category: "Survival",
    level: "Level 4",
    fileUrl: "/files/advanced-survival.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-29",
    tags: ["survival", "advanced", "techniques"],
    icon: "🔥",
    instructionType: "EOC",
  },
  {
    id: 19,
    name: "Air Cadet History",
    category: "Cadet Knowledge",
    level: "Level 1",
    fileUrl: "/files/cadet-history.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-15",
    tags: ["history", "cadet", "knowledge"],
    icon: "📚",
    instructionType: "EOM",
  },
  {
    id: 20,
    name: "Military Ranks and Structure",
    category: "Cadet Knowledge",
    level: "Level 2",
    fileUrl: "/files/military-ranks.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-20",
    tags: ["ranks", "military", "structure"],
    icon: "🎖️",
    instructionType: "EOC",
  },
  {
    id: 21,
    name: "Canadian Armed Forces Overview",
    category: "Cadet Knowledge",
    level: "Level 3",
    fileUrl: "/files/caf-overview.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-22",
    tags: ["caf", "armed forces", "overview"],
    icon: "🇨🇦",
    instructionType: "EOM",
  },
  {
    id: 22,
    name: "Military Traditions and Customs",
    category: "Cadet Knowledge",
    level: "Level 4",
    fileUrl: "/files/military-traditions.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-25",
    tags: ["traditions", "customs", "military"],
    icon: "🏛️",
    instructionType: "EOC",
  },
  {
    id: 23,
    name: "Basic Fitness Assessment",
    category: "Physical Fitness",
    level: "Level 1",
    fileUrl: "/files/basic-fitness.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-18",
    tags: ["fitness", "assessment", "basic"],
    icon: "🏃",
    instructionType: "EOM",
  },
  {
    id: 24,
    name: "Strength Training Program",
    category: "Physical Fitness",
    level: "Level 2",
    fileUrl: "/files/strength-training.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-21",
    tags: ["strength", "training", "program"],
    icon: "💪",
    instructionType: "EOC",
  },
  {
    id: 25,
    name: "Endurance Training Methods",
    category: "Physical Fitness",
    level: "Level 3",
    fileUrl: "/files/endurance-training.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-24",
    tags: ["endurance", "training", "methods"],
    icon: "🏃‍♂️",
    instructionType: "EOM",
  },
  {
    id: 26,
    name: "Advanced Fitness Programming",
    category: "Physical Fitness",
    level: "Level 4",
    fileUrl: "/files/advanced-fitness.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-27",
    tags: ["advanced", "fitness", "programming"],
    icon: "🏋️",
    instructionType: "EOC",
  },
  {
    id: 27,
    name: "Basic Teaching Techniques",
    category: "Instructing",
    level: "Level 1",
    fileUrl: "/files/basic-teaching.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-16",
    tags: ["teaching", "basic", "techniques"],
    icon: "👨‍🏫",
    instructionType: "EOM",
  },
  {
    id: 28,
    name: "Lesson Planning Methods",
    category: "Instructing",
    level: "Level 2",
    fileUrl: "/files/lesson-planning.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-19",
    tags: ["lesson", "planning", "methods"],
    icon: "📝",
    instructionType: "EOC",
  },
  {
    id: 29,
    name: "Advanced Instructional Design",
    category: "Instructing",
    level: "Level 3",
    fileUrl: "/files/instructional-design.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-23",
    tags: ["instructional", "design", "advanced"],
    icon: "🎨",
    instructionType: "EOM",
  },
  {
    id: 30,
    name: "Training Program Development",
    category: "Instructing",
    level: "Level 4",
    fileUrl: "/files/training-development.pdf",
    fileType: "PDF",
    lastUpdated: "2024-01-26",
    tags: ["training", "program", "development"],
    icon: "📊",
    instructionType: "EOC",
  },
]

const categories = [
  "All",
  "Drill",
  "Aviation",
  "Dress",
  "Leadership",
  "Survival",
  "Cadet Knowledge",
  "Physical Fitness",
  "Instructing",
]
const levels = ["All", "Level 1", "Level 2", "Level 3", "Level 4"]
const instructionTypes = ["All", "EOM", "EOC"]

export default function LessonPlanDistribution() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [selectedInstructionType, setSelectedInstructionType] = useState("All")

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(lessonPlans, {
      keys: ["name", "category", "tags"],
      threshold: 0.3,
      includeScore: true,
    })
  }, [])

  // Filter and search lesson plans
  const filteredPlans = useMemo(() => {
    let plans = lessonPlans

    // Apply category filter
    if (selectedCategory !== "All") {
      plans = plans.filter((plan) => plan.category === selectedCategory)
    }

    // Apply level filter
    if (selectedLevel !== "All") {
      plans = plans.filter((plan) => plan.level === selectedLevel)
    }

    // Apply instruction type filter
    if (selectedInstructionType !== "All") {
      plans = plans.filter((plan) => plan.instructionType === selectedInstructionType)
    }

    // Apply search
    if (searchQuery.trim()) {
      const searchResults = fuse.search(searchQuery)
      const searchedPlans = searchResults.map((result) => result.item)

      // Filter searched results by category, level, and instruction type
      plans = searchedPlans.filter((plan) => {
        const categoryMatch = selectedCategory === "All" || plan.category === selectedCategory
        const levelMatch = selectedLevel === "All" || plan.level === selectedLevel
        const instructionTypeMatch =
          selectedInstructionType === "All" || plan.instructionType === selectedInstructionType
        return categoryMatch && levelMatch && instructionTypeMatch
      })
    }

    return plans
  }, [searchQuery, selectedCategory, selectedLevel, selectedInstructionType, fuse])

  const handleDownload = (plan: (typeof lessonPlans)[0]) => {
    // Immediately trigger file download
    const link = document.createElement("a")
    link.href = plan.fileUrl
    link.download = plan.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Drill: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      Aviation: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Dress: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Leadership: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Survival: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      "Cadet Knowledge": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
      "Physical Fitness": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      Instructing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }

  const getLevelColor = (level: string) => {
    const colors = {
      "Level 1": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "Level 2": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      "Level 3": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      "Level 4": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    }
    return colors[level as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }

  const getInstructionTypeColor = (instructionType: string) => {
    const colors = {
      EOM: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
      EOC: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
    }
    return (
      colors[instructionType as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <Plane className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Air Cadet Resources</h1>
                  <p className="text-sm text-muted-foreground">Lesson Plan Distribution Center</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search lesson plans... (supports fuzzy matching)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-base"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-muted-foreground">Level:</span>
                {levels.map((level) => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level}
                  </Button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-muted-foreground">Category:</span>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-muted-foreground">Type:</span>
                {instructionTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedInstructionType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedInstructionType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPlans.length} of {lessonPlans.length} lesson plans
            </p>
          </div>

          {/* Templates Section - Hide when searching */}
          {!searchQuery.trim() && (
            <div className="mb-6">
              <h2 className="text-lg font-medium text-foreground mb-3">📋 Templates</h2>
              <div className="grid gap-3 md:grid-cols-2 max-w-2xl mx-auto">
                {/* Template 1 */}
                <Card className="hover:shadow-md transition-shadow duration-200 border border-dashed border-primary/40">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
                        <span className="text-lg">📝</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground text-sm leading-tight">Lesson Plan Template</h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 text-xs">
                        Template
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs">
                        Universal
                      </Badge>
                    </div>

                    <Button
                      onClick={() => {
                        const link = document.createElement("a")
                        link.href = "/files/lesson-plan-template.pdf"
                        link.download = "Lesson Plan Template.pdf"
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                      }}
                      className="w-full"
                      size="sm"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </CardContent>
                </Card>

                {/* Template 2 */}
                <Card className="hover:shadow-md transition-shadow duration-200 border border-dashed border-primary/40">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
                        <span className="text-lg">📊</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground text-sm leading-tight">Assessment Template</h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 text-xs">
                        Template
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs">
                        Universal
                      </Badge>
                    </div>

                    <Button
                      onClick={() => {
                        const link = document.createElement("a")
                        link.href = "/files/assessment-template.pdf"
                        link.download = "Assessment Template.pdf"
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                      }}
                      className="w-full"
                      size="sm"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Lesson Plans Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {searchQuery.trim() ? "🔍 Search Results" : "📚 Lesson Plans"}
            </h2>
          </div>

          {/* Lesson Plans Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlans.map((plan) => {
              return (
                <Card key={plan.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg">
                          <span className="text-xl">{plan.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground leading-tight">{plan.name}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={getCategoryColor(plan.category)}>{plan.category}</Badge>
                      <Badge className={getLevelColor(plan.level)}>{plan.level}</Badge>
                      <Badge className={getInstructionTypeColor(plan.instructionType)}>{plan.instructionType}</Badge>
                    </div>

                    <div className="text-xs text-muted-foreground mb-4">
                      Last updated: {formatDate(plan.lastUpdated)}
                    </div>

                    <Button onClick={() => handleDownload(plan)} className="w-full" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* No Results */}
          {filteredPlans.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No lesson plans found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t bg-card mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-sm text-muted-foreground">
              <p>&copy; 2024 Air Cadet Resources. All rights reserved.</p>
              <p className="mt-2">For support or to submit new lesson plans, contact your unit administrator.</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
