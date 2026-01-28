# widgetz Projesi

## Proje Amacı
React + TypeScript + Tailwind CSS + Radix UI/shadcn teknolojileri kullanarak yeniden kullanılabilir widget ve component kütüphanesi geliştiriyoruz.

## Kullanım Senaryoları
- React projelerinin dashboard'larında doğrudan import ile kullanım
- WordPress sayfalarında iframe içinde embed edilebilme
- Dark/light tema desteği (color-scheme)

## Teknoloji Stack
- **React.js** - UI kütüphanesi
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI / shadcn** - Headless UI components
- **Vite** - Build tool
- **MIT License** - Açık kaynak

## NPM Paketi
- **Paket adı:** `widgetz` (scoped değil)
- **Dağıtım:** npmjs.org
- **Format:** ESM (React projeleri) + UMD/IIFE (WordPress iframe)

## Kurulum Planı
1. ✅ Proje planını kaydet
2. ⏳ Proje temelini kur (package.json, TypeScript, React, Tailwind, Vite)
3. ⏳ Tema sistemini oluştur (CSS variables, context provider)
4. ⏳ shadcn/Radix UI entegrasyonu
5. ⏳ İlk örnek widget'lar (Button, Card)
6. ⏳ Build konfigürasyonu (ESM + UMD)
7. ⏳ NPM'e publish

## Proje Yapısı
```
widgetz/
├── .github/
│   └── copilot-instructions.md
├── src/
│   ├── components/          # Widget'lar
│   │   ├── ui/             # shadcn base components
│   │   ├── Button/
│   │   ├── Card/
│   │   └── ...
│   ├── lib/                # Utilities
│   │   └── utils.ts
│   ├── styles/             # Global styles, themes
│   │   ├── globals.css
│   │   └── themes.css
│   ├── providers/          # Theme provider
│   └── index.ts            # Main export
├── dist/                   # Build output
│   ├── esm/
│   └── umd/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── LICENSE
└── README.md
```

## Development Commands
```bash
npm install          # Dependencies yükle
npm run dev          # Development mode
npm run build        # Production build
npm run preview      # Build preview
npm publish          # NPM'e publish
```

## Widget Geliştirme Kuralları
1. Her widget TypeScript ile yazılmalı
2. Props interface'i export edilmeli
3. Dark/light tema desteklemeli
4. Tailwind classes kullanmalı
5. Radix UI primitives tercih edilmeli
6. Tree-shaking için named export kullanılmalı
