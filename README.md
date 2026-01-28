# widgetz

**widgetz** - Modern, customizable React widget library with TypeScript, Tailwind CSS, and Radix UI.

## 🚀 Features

- ⚛️ Built with **React 18** and **TypeScript**
- 🎨 Styled with **Tailwind CSS**
- 🎭 Powered by **Radix UI** primitives
- 🌓 **Dark/Light** theme support
- 📦 **Tree-shakeable** - only import what you need
- 🔧 Fully customizable with Tailwind classes
- 📱 Responsive and accessible

## 📦 Installation

```bash
npm install widgetz
# or
yarn add widgetz
# or
pnpm add widgetz
```

### Peer Dependencies

Make sure you have React installed:

```bash
npm install react react-dom
```

### Setup Tailwind CSS

widgetz uses Tailwind CSS. Add the preset to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/widgetz/dist/**/*.js", // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Import Styles

Import the global styles in your app entry point:

```tsx
import "widgetz/styles.css"
```

## 🎯 Usage

### Basic Example

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "widgetz"

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to widgetz</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

### With Theme Provider

```tsx
import { ThemeProvider, useTheme, Button } from "widgetz"
import "widgetz/styles.css"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle theme
    </Button>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <ThemeToggle />
      {/* Your app */}
    </ThemeProvider>
  )
}
```

## 🧩 Components

### Button

Versatile button component with multiple variants and sizes.

```tsx
import { Button } from 'widgetz';

<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Card

Container component for grouping related content.

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "widgetz"

;<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## 🎨 Customization

All components accept `className` prop for custom styling:

```tsx
<Button className="bg-purple-500 hover:bg-purple-600">Custom Button</Button>
```

## 📝 License

MIT © [Mr.TEK Softwares](https://github.com/mrtek)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- [GitHub Repository](https://github.com/mrtek/widgetz)
- [NPM Package](https://www.npmjs.com/package/widgetz)
- [Issues](https://github.com/mrtek/widgetz/issues)
