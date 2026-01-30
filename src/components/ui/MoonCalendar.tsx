import * as React from 'react'
import { cn } from '@/lib/utils'

// Moon phase calculation based on synodic month
const LUNAR_CYCLE = 29.53058867 // days

interface MoonPhase {
  phase: number // 0-1 (0 = new moon, 0.5 = full moon)
  name: string
  emoji: string
  illumination: number // percentage
}

interface MoonCalendarProps {
  date?: Date
  showDetails?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'minimal' | 'glass'
  className?: string
  onDateChange?: (date: Date, moonPhase: MoonPhase) => void
}

// Calculate next full moon and new moon dates
function getNextMoonEvents(date: Date): { nextFullMoon: Date; nextNewMoon: Date; moonAge: number } {
  const referenceNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0))
  const daysSinceReference = (date.getTime() - referenceNewMoon.getTime()) / (1000 * 60 * 60 * 24)
  const lunarAge = ((daysSinceReference % LUNAR_CYCLE) + LUNAR_CYCLE) % LUNAR_CYCLE
  
  // Days until next new moon
  const daysToNewMoon = LUNAR_CYCLE - lunarAge
  const nextNewMoon = new Date(date.getTime() + daysToNewMoon * 24 * 60 * 60 * 1000)
  
  // Days until next full moon (full moon is at ~14.76 days into cycle)
  const fullMoonOffset = LUNAR_CYCLE / 2
  let daysToFullMoon = fullMoonOffset - lunarAge
  if (daysToFullMoon < 0) daysToFullMoon += LUNAR_CYCLE
  const nextFullMoon = new Date(date.getTime() + daysToFullMoon * 24 * 60 * 60 * 1000)
  
  return { nextFullMoon, nextNewMoon, moonAge: Math.floor(lunarAge) }
}

// Calculate moon phase for a given date
function calculateMoonPhase(date: Date): MoonPhase {
  // Reference new moon: January 6, 2000 at 18:14 UTC
  const referenceNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0))
  
  const daysSinceReference = (date.getTime() - referenceNewMoon.getTime()) / (1000 * 60 * 60 * 24)
  const lunarAge = daysSinceReference % LUNAR_CYCLE
  const phase = (lunarAge < 0 ? lunarAge + LUNAR_CYCLE : lunarAge) / LUNAR_CYCLE
  
  // Calculate illumination (0% at new moon, 100% at full moon)
  const illumination = Math.round((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100)
  
  // Determine phase name
  const { name, emoji } = getMoonPhaseName(phase)
  
  return { phase, name, emoji, illumination }
}

function getMoonPhaseName(phase: number): { name: string; emoji: string } {
  if (phase < 0.0625) return { name: 'New Moon', emoji: '🌑' }
  if (phase < 0.1875) return { name: 'Waxing Crescent', emoji: '🌒' }
  if (phase < 0.3125) return { name: 'First Quarter', emoji: '🌓' }
  if (phase < 0.4375) return { name: 'Waxing Gibbous', emoji: '🌔' }
  if (phase < 0.5625) return { name: 'Full Moon', emoji: '🌕' }
  if (phase < 0.6875) return { name: 'Waning Gibbous', emoji: '🌖' }
  if (phase < 0.8125) return { name: 'Last Quarter', emoji: '🌗' }
  if (phase < 0.9375) return { name: 'Waning Crescent', emoji: '🌘' }
  return { name: 'New Moon', emoji: '🌑' }
}

// SVG Moon visualization component
function MoonVisual({ phase, size }: { phase: number; size: number }) {
  const radius = size / 2 - 4
  const centerX = size / 2
  const centerY = size / 2
  
  // Calculate the terminator position
  const angle = phase * 2 * Math.PI
  const cosAngle = Math.cos(angle)
  
  // Create the lit portion of the moon
  const createMoonPath = () => {
    if (phase < 0.5) {
      // Waxing: right side lit, left side dark
      const curveX = centerX + radius * cosAngle
      return `
        M ${centerX} ${centerY - radius}
        A ${radius} ${radius} 0 0 1 ${centerX} ${centerY + radius}
        A ${Math.abs(curveX - centerX)} ${radius} 0 0 ${cosAngle > 0 ? 0 : 1} ${centerX} ${centerY - radius}
      `
    } else {
      // Waning: left side lit, right side dark
      const curveX = centerX + radius * cosAngle
      return `
        M ${centerX} ${centerY - radius}
        A ${radius} ${radius} 0 0 0 ${centerX} ${centerY + radius}
        A ${Math.abs(curveX - centerX)} ${radius} 0 0 ${cosAngle < 0 ? 0 : 1} ${centerX} ${centerY - radius}
      `
    }
  }
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-lg">
      {/* Moon base (dark side) */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        className="fill-slate-700 dark:fill-slate-800"
      />
      {/* Moon lit portion */}
      <path
        d={createMoonPath()}
        className="fill-amber-100 dark:fill-yellow-100"
      />
      {/* Moon border */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        strokeWidth="1"
        className="stroke-slate-400 dark:stroke-slate-600"
      />
      {/* Crater details */}
      <circle cx={centerX - radius * 0.3} cy={centerY - radius * 0.2} r={radius * 0.12} className="fill-slate-600/30 dark:fill-slate-900/30" />
      <circle cx={centerX + radius * 0.2} cy={centerY + radius * 0.3} r={radius * 0.15} className="fill-slate-600/30 dark:fill-slate-900/30" />
      <circle cx={centerX - radius * 0.1} cy={centerY + radius * 0.4} r={radius * 0.08} className="fill-slate-600/30 dark:fill-slate-900/30" />
    </svg>
  )
}

// Calendar grid component
function CalendarGrid({ 
  currentDate, 
  selectedDate, 
  onSelectDate,
  compact
}: { 
  currentDate: Date
  selectedDate: Date
  onSelectDate: (date: Date) => void
  compact?: boolean
}) {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startingDay = firstDay.getDay()
  const daysInMonth = lastDay.getDate()
  
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  
  const days: (number | null)[] = []
  
  // Add empty cells for days before the first day of month
  for (let i = 0; i < startingDay; i++) {
    days.push(null)
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }
  
  const isToday = (day: number) => {
    const today = new Date()
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear()
  }
  
  const isSelected = (day: number) => {
    return day === selectedDate.getDate() && 
           month === selectedDate.getMonth() && 
           year === selectedDate.getFullYear()
  }
  
  return (
    <div className={cn("mt-4", compact && "mt-2")}>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className={cn(
            "text-center font-medium text-muted-foreground",
            compact ? "text-[10px]" : "text-xs"
          )}>
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className={cn(compact ? "h-6" : "h-8")} />
          }
          
          const dayDate = new Date(year, month, day)
          const moonPhase = calculateMoonPhase(dayDate)
          
          return (
            <button
              key={day}
              onClick={() => onSelectDate(dayDate)}
              className={cn(
                'w-full rounded-md transition-colors relative group',
                'hover:bg-accent hover:text-accent-foreground',
                isToday(day) && 'bg-primary text-primary-foreground',
                isSelected(day) && !isToday(day) && 'bg-secondary text-secondary-foreground',
                !isToday(day) && !isSelected(day) && 'text-foreground',
                compact ? "h-6 text-xs" : "h-8 text-sm"
              )}
            >
              {day}
              <span className={cn(
                "absolute -top-1 -right-1 opacity-70 group-hover:opacity-100",
                compact ? "text-[6px]" : "text-[8px]"
              )}>
                {moonPhase.emoji}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const sizeMap = {
  sm: { moon: 60, padding: 'p-3', title: 'text-sm', subtitle: 'text-xs', date: 'text-[10px]', emoji: 'text-lg', button: 'py-1 text-xs', nav: 12, compact: true },
  md: { moon: 100, padding: 'p-4', title: 'text-base', subtitle: 'text-sm', date: 'text-xs', emoji: 'text-xl', button: 'py-1.5 text-xs', nav: 14, compact: false },
  lg: { moon: 140, padding: 'p-6', title: 'text-lg', subtitle: 'text-sm', date: 'text-xs', emoji: 'text-2xl', button: 'py-2 text-sm', nav: 16, compact: false },
  xl: { moon: 180, padding: 'p-8', title: 'text-xl', subtitle: 'text-base', date: 'text-sm', emoji: 'text-3xl', button: 'py-2.5 text-sm', nav: 18, compact: false },
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

const variantStyles = {
  default: 'bg-card border border-border',
  minimal: 'bg-card border border-border',
  glass: 'bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10',
}

const MoonCalendar = React.forwardRef<HTMLDivElement, MoonCalendarProps>(
  ({ 
    date: initialDate, 
    showDetails = true,
    size = 'md',
    variant = 'default',
    className,
    onDateChange 
  }, ref) => {
    const [selectedDate, setSelectedDate] = React.useState(initialDate || new Date())
    const [currentMonth, setCurrentMonth] = React.useState(initialDate || new Date())
    
    const moonPhase = calculateMoonPhase(selectedDate)
    
    const handleDateChange = (newDate: Date) => {
      setSelectedDate(newDate)
      onDateChange?.(newDate, calculateMoonPhase(newDate))
    }
    
    const navigateMonth = (direction: -1 | 1) => {
      const newMonth = new Date(currentMonth)
      newMonth.setMonth(newMonth.getMonth() + direction)
      setCurrentMonth(newMonth)
    }
    
    const sizeConfig = sizeMap[size]
    const isMinimal = variant === 'minimal'
    const moonEvents = getNextMoonEvents(selectedDate)
    
    // Minimal variant: only show moon visual and basic info
    if (isMinimal) {
      return (
        <div
          ref={ref}
          className={cn(
            'rounded-xl shadow-sm',
            variantStyles[variant],
            sizeConfig.padding,
            className
          )}
        >
          <div className="flex flex-col items-center">
            <MoonVisual phase={moonPhase.phase} size={sizeConfig.moon} />
            
            {showDetails && (
              <div className={cn("mt-3 text-center", size === 'sm' && "mt-2")}>
                <div className="flex items-center justify-center gap-1">
                  <span className={sizeConfig.emoji}>{moonPhase.emoji}</span>
                  <h3 className={cn("font-semibold text-foreground", sizeConfig.title)}>
                    {moonPhase.name}
                  </h3>
                </div>
                <p className={cn("text-muted-foreground mt-1", sizeConfig.subtitle)}>
                  Illumination: {moonPhase.illumination}%
                </p>
                <p className={cn("text-muted-foreground", sizeConfig.date)}>
                  {selectedDate.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                
                {/* Additional Info */}
                <div className={cn("mt-3 pt-3 border-t border-border space-y-1", size === 'sm' && "mt-2 pt-2")}>
                  <p className={cn("text-muted-foreground", sizeConfig.date)}>
                    🌙 Moon Age: {moonEvents.moonAge} days
                  </p>
                  <p className={cn("text-muted-foreground", sizeConfig.date)}>
                    🌕 Next Full Moon: {moonEvents.nextFullMoon.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                  <p className={cn("text-muted-foreground", sizeConfig.date)}>
                    🌑 Next New Moon: {moonEvents.nextNewMoon.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl shadow-sm',
          variantStyles[variant],
          sizeConfig.padding,
          className
        )}
      >
        {/* Moon Visual */}
        <div className="flex flex-col items-center mb-4">
          <MoonVisual phase={moonPhase.phase} size={sizeConfig.moon} />
          
          {showDetails && (
            <div className={cn("mt-3 text-center", size === 'sm' && "mt-2")}>
              <div className="flex items-center justify-center gap-1">
                <span className={sizeConfig.emoji}>{moonPhase.emoji}</span>
                <h3 className={cn("font-semibold text-foreground", sizeConfig.title)}>
                  {moonPhase.name}
                </h3>
              </div>
              <p className={cn("text-muted-foreground mt-1", sizeConfig.subtitle)}>
                Illumination: {moonPhase.illumination}%
              </p>
              <p className={cn("text-muted-foreground", sizeConfig.date)}>
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: size === 'sm' ? 'short' : 'long',
                  year: 'numeric',
                  month: size === 'sm' ? 'short' : 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}
        </div>
        
        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1.5 rounded-md hover:bg-accent transition-colors"
            aria-label="Previous month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={sizeConfig.nav} height={sizeConfig.nav} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <h4 className={cn("font-medium text-foreground", sizeConfig.subtitle)}>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h4>
          <button
            onClick={() => navigateMonth(1)}
            className="p-1.5 rounded-md hover:bg-accent transition-colors"
            aria-label="Next month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={sizeConfig.nav} height={sizeConfig.nav} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
        
        {/* Calendar Grid */}
        <CalendarGrid
          currentDate={currentMonth}
          selectedDate={selectedDate}
          onSelectDate={handleDateChange}
          compact={sizeConfig.compact}
        />
        
        {/* Today Button */}
        <button
          onClick={() => {
            const today = new Date()
            setSelectedDate(today)
            setCurrentMonth(today)
            onDateChange?.(today, calculateMoonPhase(today))
          }}
          className={cn(
            "w-full mt-3 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors",
            sizeConfig.button
          )}
        >
          Today
        </button>
      </div>
    )
  }
)

MoonCalendar.displayName = 'MoonCalendar'

export { MoonCalendar, calculateMoonPhase }
export type { MoonCalendarProps, MoonPhase }
