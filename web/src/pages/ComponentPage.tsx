import { Link, useParams } from 'react-router-dom'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  RandomNumber,
  Numerology,
} from 'widgetz'
import { CodeBlock } from '../components/CodeBlock'

const widgets = [
  {
    id: 'button',
    name: 'Button',
    description: 'Versatile button component with multiple variants',
    tags: ['#temel', '#form', '#interaksiyon']
  },
  {
    id: 'card',
    name: 'Card',
    description: 'Container for grouping related content',
    tags: ['#layout', '#konteyner']
  },
  {
    id: 'random-number',
    name: 'Random Number',
    description: 'Generate random numbers within a range',
    tags: ['#eğlence', '#oyun', '#rastgele']
  },
  {
    id: 'numerology',
    name: 'Numerology',
    description: 'Calculate personality number from birth date',
    tags: ['#numeroloji', '#kişilik', '#analiz', '#mistik']
  },
]

const codeExamples = {
  button: `import { Button } from 'widgetz'
import 'widgetz/styles.css'

function MyComponent() {
  return (
    <div>
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}`,
  card: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from 'widgetz'
import 'widgetz/styles.css'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Your content here</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}`,
  'random-number': `import { RandomNumber } from 'widgetz'
import 'widgetz/styles.css'

function MyComponent() {
  return (
    <RandomNumber 
      defaultMin={1}
      defaultMax={100}
      onGenerate={(num) => console.log('Generated:', num)}
    />
  )
}`,
  numerology: `import { Numerology } from 'widgetz'
import 'widgetz/styles.css'

function MyComponent() {
  return (
    <Numerology className="max-w-md mx-auto" />
  )
}`
}

export function ComponentPage() {
  const { componentId } = useParams<{ componentId: string }>()
  const widget = widgets.find(w => w.id === componentId)

  if (!widget) {
    return (
      <div className="flex-1 py-8">
        <div className="container px-4 md:px-8">
          <Card>
            <CardContent className="py-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Component bulunamadı</h2>
              <Link to="/">
                <Button>Ana Sayfaya Dön</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex">
      {/* Sidebar */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r py-8 pr-8 md:block">
        <div className="space-y-1">
          <h3 className="mb-4 text-lg font-semibold">Components</h3>
          {widgets.map((w) => (
            <Link key={w.id} to={`/components/${w.id}`}>
              <button
                className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent ${componentId === w.id
                    ? 'bg-accent font-medium text-accent-foreground'
                    : 'text-muted-foreground'
                  }`}
              >
                {w.name}
              </button>
            </Link>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4 md:pl-8 md:pr-8">
        {componentId === 'button' && (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Button</CardTitle>
                  <CardDescription>
                    {widget.description}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  {widget.tags.map(tag => (
                    <span key={tag} className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="mb-3 text-sm font-medium">Variants</h4>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-medium">Sizes</h4>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start">
              <h4 className="mb-2 text-sm font-medium">Code</h4>
              <CodeBlock code={codeExamples.button} />
            </CardFooter>
          </Card>
        )}

        {componentId === 'card' && (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Card</CardTitle>
                  <CardDescription>
                    {widget.description}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  {widget.tags.map(tag => (
                    <span key={tag} className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Simple Card</CardTitle>
                    <CardDescription>Basic card with header and content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Cards are containers for grouping related content.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Card with Footer</CardTitle>
                    <CardDescription>Card with action buttons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Add footers with buttons or additional info.
                    </p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button size="sm">Accept</Button>
                    <Button variant="outline" size="sm">Cancel</Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start">
              <h4 className="mb-2 text-sm font-medium">Code</h4>
              <CodeBlock code={codeExamples.card} />
            </CardFooter>
          </Card>
        )}

        {componentId === 'random-number' && (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Random Number Generator</CardTitle>
                  <CardDescription>
                    {widget.description}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  {widget.tags.map(tag => (
                    <span key={tag} className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <RandomNumber onGenerate={(num) => console.log('Generated:', num)} />
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start">
              <h4 className="mb-2 text-sm font-medium">Code</h4>
              <CodeBlock code={codeExamples['random-number']} />
            </CardFooter>
          </Card>
        )}

        {componentId === 'numerology' && (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Numerology Analysis</CardTitle>
                  <CardDescription>
                    {widget.description}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  {widget.tags.map(tag => (
                    <span key={tag} className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Numerology />
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start">
              <h4 className="mb-2 text-sm font-medium">Code</h4>
              <CodeBlock code={codeExamples['numerology']} />
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  )
}