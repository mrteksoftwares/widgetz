import { useState } from 'react'
import { Button } from 'widgetz'

interface CodeBlockProps {
  code: string
  language?: string
  preview?: boolean
}

export function CodeBlock({ code, language = 'tsx', preview = true }: CodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const displayCode = isExpanded || !preview ? code : code.split('\n').slice(0, 3).join('\n')
  const hasMore = code.split('\n').length > 3

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="w-full space-y-2">
      <div className="relative rounded-md bg-muted p-4 font-mono text-sm overflow-x-auto">
        <div className="text-foreground whitespace-pre">
          {displayCode}
          {preview && !isExpanded && hasMore && (
            <span className="text-muted-foreground">...</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-2 rounded-md bg-background px-2 py-1 text-xs hover:bg-accent transition-colors"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      {preview && hasMore && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide Code' : 'Show Code'}
        </Button>
      )}
    </div>
  )
}
