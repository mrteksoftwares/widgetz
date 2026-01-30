import { Button } from 'widgetz'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="container px-4 py-24 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            widgetz
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Modern React widget library. Beautiful, reusable components built with
            TypeScript, Tailwind CSS, and Radix UI. -.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/components/button">
              <Button size="lg">Explore Components</Button>
            </Link>
            <a
              href="https://github.com/mrteksoftwares/widgetz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container px-4 py-16 md:px-8">
        <div className="mx-auto max-w-5xl">
          <h3 className="mb-8 text-center text-3xl font-bold">Features</h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-2xl">⚛️</span>
              </div>
              <h4 className="mb-2 text-lg font-semibold">React 18</h4>
              <p className="text-sm text-muted-foreground">
                Modern React features and hooks support
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-2xl">📘</span>
              </div>
              <h4 className="mb-2 text-lg font-semibold">TypeScript</h4>
              <p className="text-sm text-muted-foreground">
                Full type safety and IntelliSense support
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="mb-2 text-lg font-semibold">Tailwind CSS</h4>
              <p className="text-sm text-muted-foreground">
                Easy customization with utility-first CSS
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-2xl">🌓</span>
              </div>
              <h4 className="mb-2 text-lg font-semibold">Dark Mode</h4>
              <p className="text-sm text-muted-foreground">
                Built-in dark/light theme support
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-2xl">♿</span>
              </div>
              <h4 className="mb-2 text-lg font-semibold">Accessible</h4>
              <p className="text-sm text-muted-foreground">
                WAI-ARIA compliant with Radix UI
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-2xl">📦</span>
              </div>
              <h4 className="mb-2 text-lg font-semibold">Tree-shakeable</h4>
              <p className="text-sm text-muted-foreground">
                Only the components you use are included in your bundle
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="container px-4 py-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h3 className="mb-8 text-center text-3xl font-bold">Quick Start</h3>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold">1. Install the package</h4>
              <div className="rounded-md bg-muted p-4 font-mono text-sm">
                npm install widgetz
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">2. Import and use</h4>
              <div className="rounded-md bg-muted p-4 font-mono text-sm">
                <div>import {'{ Button }'} from 'widgetz'</div>
                <div>import 'widgetz/styles.css'</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}