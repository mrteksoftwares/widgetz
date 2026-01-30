import { useState } from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'

interface NumerologyProps {
  className?: string
}

interface NumerologyResult {
  number: number
  title: string
  type: string
  description: string
  traits: string[]
  color: string
}

const numerologyMeanings: Record<number, Omit<NumerologyResult, 'type'>> = {
  1: {
    number: 1,
    title: "Leader",
    description: "Independent, strong and creative",
    traits: ["Leadership", "Creativity", "Independence", "Innovation"],
    color: "bg-red-500"
  },
  2: {
    number: 2,
    title: "Cooperator",
    description: "Harmonious, diplomatic and empathetic",
    traits: ["Cooperation", "Diplomacy", "Empathy", "Balance"],
    color: "bg-orange-500"
  },
  3: {
    number: 3,
    title: "Creative",
    description: "Strong communication skills, creative and social",
    traits: ["Creativity", "Communication", "Optimism", "Artistic"],
    color: "bg-yellow-500"
  },
  4: {
    number: 4,
    title: "Organizer",
    description: "Systematic, reliable and hardworking",
    traits: ["Discipline", "Reliability", "System", "Hard work"],
    color: "bg-green-500"
  },
  5: {
    number: 5,
    title: "Adventurer",
    description: "Free-spirited, adventure-loving and open to change",
    traits: ["Freedom", "Adventure", "Curiosity", "Versatility"],
    color: "bg-blue-500"
  },
  6: {
    number: 6,
    title: "Nurturer",
    description: "Responsible, protective and family-oriented",
    traits: ["Compassion", "Responsibility", "Protection", "Family"],
    color: "bg-indigo-500"
  },
  7: {
    number: 7,
    title: "Seeker",
    description: "Analytical, spiritual and wisdom-seeking",
    traits: ["Analysis", "Spirituality", "Wisdom", "Introspection"],
    color: "bg-purple-500"
  },
  8: {
    number: 8,
    title: "Achiever",
    description: "Power-focused, successful and financially talented",
    traits: ["Success", "Power", "Money", "Management"],
    color: "bg-pink-500"
  },
  9: {
    number: 9,
    title: "Humanitarian",
    description: "Universal love, sacrifice and service to humanity focused",
    traits: ["Humanitarianism", "Compassion", "Wisdom", "Service"],
    color: "bg-rose-500"
  }
}

export function Numerology({ className = '' }: NumerologyProps) {
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [results, setResults] = useState<NumerologyResult[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Türkçe harfleri İngilizce karşılıklarına çevir
  const turkishToEnglish = (text: string): string => {
    const charMap: { [key: string]: string } = {
      'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
      'Ç': 'C', 'Ğ': 'G', 'I': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
    }
    return text.split('').map(char => charMap[char] || char).join('')
  }

  // Harfleri sayılara çevir (Pythagorean sistem)
  const letterToNumber = (letter: string): number => {
    const letterValues: { [key: string]: number } = {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
      's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    }
    return letterValues[letter.toLowerCase()] || 0
  }

  // Tek haneye indir
  const reduceToSingleDigit = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num.toString().split('').map(Number).reduce((sum, digit) => sum + digit, 0)
    }
    return num > 9 ? Math.floor(num / 11) : num
  }

  // Yaşam Yolu (Life Path) - Doğum tarihinden
  const calculateLifePath = (date: string): number => {
    const numbers = date.replace(/\D/g, '').split('').map(Number)
    const sum = numbers.reduce((acc, num) => acc + num, 0)
    return reduceToSingleDigit(sum)
  }

  // Kader Sayısı (Destiny) - Tam isimden
  const calculateDestiny = (name: string): number => {
    const cleanName = turkishToEnglish(name).replace(/[^a-zA-Z]/g, '')
    const sum = cleanName.split('').reduce((acc, char) => acc + letterToNumber(char), 0)
    return reduceToSingleDigit(sum)
  }

  // Ruhsal Arzu (Soul Urge) - Sesli harflerden
  const calculateSoulUrge = (name: string): number => {
    const vowels = 'aeiouAEIOU'
    const cleanName = turkishToEnglish(name)
    const sum = cleanName.split('').reduce((acc, char) => {
      return vowels.includes(char) ? acc + letterToNumber(char) : acc
    }, 0)
    return reduceToSingleDigit(sum)
  }

  // Kişilik Sayısı (Personality) - Sessiz harflerden
  const calculatePersonality = (name: string): number => {
    const vowels = 'aeiouAEIOU'
    const cleanName = turkishToEnglish(name).replace(/[^a-zA-Z]/g, '')
    const sum = cleanName.split('').reduce((acc, char) => {
      return !vowels.includes(char) ? acc + letterToNumber(char) : acc
    }, 0)
    return reduceToSingleDigit(sum)
  }

  const handleCalculate = () => {
    if (!fullName.trim() || !birthDate) return
    
    setIsLoading(true)
    
    setTimeout(() => {
      const lifePath = calculateLifePath(birthDate)
      const destiny = calculateDestiny(fullName)
      const soulUrge = calculateSoulUrge(fullName)
      const personality = calculatePersonality(fullName)

      const results: NumerologyResult[] = [
        { ...numerologyMeanings[lifePath], type: "Life Path" },
        { ...numerologyMeanings[destiny], type: "Destiny" },
        { ...numerologyMeanings[soulUrge], type: "Soul Urge" },
        { ...numerologyMeanings[personality], type: "Personality" }
      ]

      setResults(results)
      setIsLoading(false)
    }, 1500)
  }

  const resetCalculation = () => {
    setFullName('')
    setBirthDate('')
    setResults(null)
  }

  return (
    <div className={`w-full max-w-lg mx-auto ${className}`}>
      <Card className="p-6 mb-6">
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">✨</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Numerology Calculator
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Discover the hidden meanings of your name and birth date
          </p>
        </div>

        {!results ? (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label 
                htmlFor="fullName" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500"
              />
            </div>
            
            <div>
              <label 
                htmlFor="birthDate" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Birth Date
              </label>
              <input
                type="date"
                id="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        ) : null}
        
        {!results ? (
          <Button
            onClick={handleCalculate}
            disabled={!fullName.trim() || !birthDate || isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            size="lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Calculating...
              </div>
            ) : (
              '🔮 Start Numerology Analysis'
            )}
          </Button>
        ) : (
          <div className="text-center mb-4">
            <Button
              onClick={resetCalculation}
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-600 dark:text-purple-300 dark:hover:bg-purple-900"
            >
              🔄 Calculate Again
            </Button>
          </div>
        )}
      </Card>

      {results && (
        <div className="grid md:grid-cols-2 gap-4">
          {results.map((result, index) => (
            <Card key={index} className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <div className="text-center mb-4">
                <div className={`w-16 h-16 rounded-full ${result.color} flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-2xl font-bold text-white">{result.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {result.title}
                </h3>
                <p className="text-sm text-gray-300 font-medium">
                  {result.type}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {result.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {result.traits.map((trait, traitIndex) => (
                  <span
                    key={traitIndex}
                    className="px-3 py-1 text-xs bg-purple-600 text-white rounded-full"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}