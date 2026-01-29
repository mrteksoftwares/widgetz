import { useTheme } from 'widgetz'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  MoonCalendar,
} from 'widgetz'
import 'widgetz/styles.css'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </Button>
  )
}

function App() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">widgetz</h1>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              v0.1.1
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mrteksoftwares/widgetz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/widgetz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline"
            >
              NPM
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container px-4 py-24 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Widgetz is a Modern React Widget Library
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Build beautiful, accessible interfaces with widgetz. A collection of
            customizable components built with TypeScript, Tailwind CSS, and Radix UI.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">
              View Widgets
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>⚛️</span>
              <span>React 18</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎨</span>
              <span>Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📘</span>
              <span>TypeScript</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🌓</span>
              <span>Dark Mode</span>
            </div>
          </div>
        </div>
      </section>

      {/* Components Showcase */}
      <section className="container px-4 py-16 md:px-8">
        <div className="mx-auto max-w-5xl">
          <h3 className="mb-8 text-3xl font-bold">Components</h3>

          {/* Button Examples */}
          <div className="mb-12">
            <h4 className="mb-4 text-2xl font-semibold">Button</h4>
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>
                  Versatile button component with multiple variants and sizes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Card Examples */}
          <div className="mb-12">
            <h4 className="mb-4 text-2xl font-semibold">Card</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Simple Card</CardTitle>
                  <CardDescription>
                    A basic card with header and content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Cards are containers for grouping related content and actions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Card with Footer</CardTitle>
                  <CardDescription>
                    Card with action buttons
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    You can add footers with action buttons or additional information.
                  </p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button size="sm">Accept</Button>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Moon Calendar Widget */}
          <div className="mb-12">
            <h4 className="mb-4 text-2xl font-semibold">🌙 Moon Calendar</h4>
            <p className="mb-4 text-muted-foreground">
              Interactive lunar calendar showing moon phases for any date. 
              Shows current phase, illumination percentage, and phase name.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <MoonCalendar size="md" variant="minimal" />
              <MoonCalendar size="md" variant="default" />
              <Card>
                <CardHeader>
                  <CardTitle>Moon Calendar Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>✅ Accurate moon phase calculation</p>
                  <p>✅ Interactive calendar navigation</p>
                  <p>✅ Visual moon phase representation</p>
                  <p>✅ Dark/Light theme compatible</p>
                  <p>✅ Multiple variants (default, minimal, glass)</p>
                  <p>✅ Multiple size options (sm, md, lg, xl)</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="container px-4 py-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h3 className="mb-8 text-3xl font-bold">Installation</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Install the package</h4>
                  <div className="rounded-md bg-muted p-4 font-mono text-sm">
                    npm install widgetz
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Import and use</h4>
                  <div className="rounded-md bg-muted p-4 font-mono text-sm">
                    <div>import {'{ Button, Card }'} from 'widgetz'</div>
                    <div>import 'widgetz/styles.css'</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 border-t">
        <div className="container px-4 py-8 md:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2014-2026{' '}
              <a
                href="https://mrtek.com.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                MrTEK Softwares
              </a>
              . All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/mrteksoftwares/widgetz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:underline"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/widgetz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:underline"
              >
                NPM
              </a>
              <a
                href="https://github.com/mrteksoftwares/widgetz/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:underline"
              >
                MIT License
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
