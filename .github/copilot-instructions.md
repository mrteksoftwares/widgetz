# widgetz Projesi

## Proje İsmi ve Domain

- **Proje İsmi:** `widgetz` (z ile biter) - **ASLA ~~widgets~~ KULLANMA!**
- **NPM Paketi:** `widgetz`
- **Domain:** https://widgetz.mr1.com.tr (HTTPS)
- **GitHub Repo:** https://github.com/mrteksoftwares/widgetz
- **NPM Package:** https://www.npmjs.com/package/widgetz

## Önemli Kurallar

- ⚠️ Proje ismini yazarken veya kodda kullanırken her zaman `widgetz` yaz
- ⚠️ Dokümantasyonda, README'de, açıklamalarda `widgetz` kullan
- ⚠️ URL'lerde, subdomain'lerde `widgetz` kullan
- ⚠️ ASLA "widgets" yazma!

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
2. ✅ Proje temelini kur (package.json, TypeScript, React, Tailwind, Vite)
3. ✅ Tema sistemini oluştur (CSS variables, context provider)
4. ✅ shadcn/Radix UI entegrasyonu
5. ✅ İlk örnek widget'lar (Button, Card)
6. ✅ Build konfigürasyonu (ESM + UMD)
7. ✅ NPM'e publish
8. ⏳ Tanıtım web sitesi (web/ klasörü)

## Proje Yapısı

```
widgetz/
├── .github/
│   └── copilot-instructions.md
├── src/                    # NPM paketi kaynak kodu
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
├── dist/                   # Build output (NPM'e gider)
│   ├── esm/
│   └── umd/
├── web/                    # Tanıtım sitesi (NPM'e GİTMEZ)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── LICENSE
└── README.md
```

## Tanıtım Web Sitesi (web/)

- **Teknoloji:** React + Vite + TypeScript + Tailwind CSS
- **Port:** 4900 (static)
- **Tema:** Dark/Light mode desteği
- **Copyright:** MrTEK Softwares
- **Amaç:** shadcn/ui tarzında component showcase ve dokümantasyon
- **Dil:** Tamamen İngilizce
- **Deploy:** GitHub Pages / Vercel
- **NOT:** `web/` klasörü npm paketine dahil edilmez (.npmignore)

## Development Commands

```bash
# NPM Paketi
npm install          # Dependencies yükle
npm run dev          # Development mode
npm run build        # Production build
npm run preview      # Build preview
npm publish          # NPM'e publish

# Web Sitesi
cd web
npm install          # Web dependencies
npm run dev          # Web dev server (port 4900)
npm run build        # Web build
```

## Widget Geliştirme Kuralları

1. Her widget TypeScript ile yazılmalı
2. Props interface'i export edilmeli
3. Dark/light tema desteklemeli
4. Tailwind classes kullanmalı
5. Radix UI primitives tercih edilmeli
6. Tree-shaking için named export kullanılmalı

## Versiyonlama ve Release

- **Otomatik:** semantic-release kullanılıyor
- **Commit Format:** Conventional Commits (feat, fix, docs, etc.)
- **Workflow:** Commit → Push → GitHub Actions → Auto Publish

### Commit Örnekleri:

```bash
# PATCH: 0.1.1 → 0.1.2
git commit -m "fix: button hover bug"

# MINOR: 0.1.1 → 0.2.0
git commit -m "feat: add Input component"

# MAJOR: 0.1.1 → 1.0.0
git commit -m "feat!: change Button API"
```

Detaylar: [CONTRIBUTING.md](../CONTRIBUTING.md)
