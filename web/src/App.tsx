import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useTheme, Button } from 'widgetz'
import 'widgetz/styles.css'
import { Home } from './pages/Home'
import { ComponentPage } from './pages/ComponentPage'

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
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <h1 className="text-2xl font-bold">widgetz</h1>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  v0.1.1
                </span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/" className="text-sm font-medium hover:underline">
                  Home
                </Link>
                <Link to="/components/button" className="text-sm font-medium hover:underline">
                  Components
                </Link>
                <a
                  href="https://github.com/mrteksoftwares/widgetz#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:underline"
                >
                  References
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-64 rounded-md border bg-background px-3 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
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

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components/:componentId" element={<ComponentPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Footer */}
        <footer className="mt-auto border-t">
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
    </BrowserRouter>
  )
}

export default App
