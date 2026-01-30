import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/Button'

export interface RandomNumberProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultMin?: number
  defaultMax?: number
  onGenerate?: (value: number) => void
}

const RandomNumber = React.forwardRef<HTMLDivElement, RandomNumberProps>(
  ({ className, defaultMin = 1, defaultMax = 100, onGenerate, ...props }, ref) => {
    const [min, setMin] = React.useState<number>(defaultMin)
    const [max, setMax] = React.useState<number>(defaultMax)
    const [result, setResult] = React.useState<number | null>(null)
    const [error, setError] = React.useState<string>('')

    const generateRandomNumber = () => {
      setError('')

      if (min >= max) {
        setError('Alt sınır, üst sınırdan küçük olmalıdır')
        return
      }

      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
      setResult(randomNum)

      if (onGenerate) {
        onGenerate(randomNum)
      }
    }

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value)
      setMin(isNaN(value) ? 0 : value)
      setError('')
    }

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value)
      setMax(isNaN(value) ? 0 : value)
      setError('')
    }

    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm',
          className
        )}
        {...props}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="min-input"
              className="text-sm font-medium text-foreground"
            >
              Alt Sınır
            </label>
            <input
              id="min-input"
              type="number"
              value={min}
              onChange={handleMinChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="max-input"
              className="text-sm font-medium text-foreground"
            >
              Üst Sınır
            </label>
            <input
              id="max-input"
              type="number"
              value={max}
              onChange={handleMaxChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Button
            onClick={generateRandomNumber}
            className="w-full"
            size="lg"
          >
            Rastgele Sayı Üret
          </Button>

          {error && (
            <div className="rounded-md bg-destructive/15 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {result !== null && !error && (
            <div className="rounded-md border-2 border-primary bg-primary/10 px-4 py-6 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Sonuç
              </p>
              <p className="mt-2 text-4xl font-bold text-foreground">
                {result}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
)

RandomNumber.displayName = 'RandomNumber'

export { RandomNumber }
