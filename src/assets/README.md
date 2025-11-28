# Assets

This folder contains all static resources of the project: images, icons, fonts, videos, etc.

## 📁 Structure

```
assets/
├── images/     # Images (.jpg, .png, .webp, .svg)
├── icons/      # Icons (.svg, .ico)
├── fonts/      # Custom fonts (.woff, .woff2, .ttf)
├── videos/     # Videos (.mp4, .webm)
├── index.ts    # Centralized exports
└── README.md   # This file
```

---

## 📸 Images

For images, logos, photographs, illustrations, etc.

**Recommended formats:**
- `.webp` - Better compression for web
- `.png` - Images with transparency
- `.jpg` - Photographs
- `.svg` - Vector graphics

**Example:**
```
images/
├── logo.png
├── hero-background.webp
├── placeholder.svg
└── features/
    ├── feature-1.jpg
    └── feature-2.jpg
```

---

## 🎨 Icons

For SVG icons or .ico files.

**Recommended formats:**
- `.svg` - Vector icons (recommended)
- `.ico` - Favicons

**Example:**
```
icons/
├── home.svg
├── search.svg
├── user.svg
└── favicon.ico
```

---

## 🔤 Fonts

For local custom fonts (if not using Google Fonts).

**Recommended formats:**
- `.woff2` - Modern format (first option)
- `.woff` - Fallback for older browsers

**Example:**
```
fonts/
├── custom-font.woff2
├── custom-font.woff
└── custom-font-bold.woff2
```

---

## 🎬 Videos

For background videos, demos, etc.

**Recommended formats:**
- `.mp4` - More compatible
- `.webm` - Better compression

**Example:**
```
videos/
├── hero-background.mp4
└── demo.webm
```

---

## 📦 How to Use

### Option 1: Direct import
```typescript
import LogoImage from '@/assets/images/logo.png';
import IconHome from '@/assets/icons/home.svg';

function MyComponent() {
  return <img src={LogoImage} alt="Logo" />;
}
```

### Option 2: Export from index.ts (recommended)
```typescript
// assets/index.ts
export { default as LogoImage } from './images/logo.png';
export { default as IconHome } from './icons/home.svg';

// In your component
import { LogoImage, IconHome } from '@/assets';

function MyComponent() {
  return <img src={LogoImage} alt="Logo" />;
}
```

### Option 3: Next.js Image Component
```typescript
import Image from 'next/image';
import LogoImage from '@/assets/images/logo.png';

function MyComponent() {
  return (
    <Image
      src={LogoImage}
      alt="Logo"
      width={200}
      height={100}
      priority
    />
  );
}
```

---

## 🎯 Best Practices

### Naming
- Use kebab-case: `hero-background.jpg`
- Descriptive names: `user-avatar-placeholder.png`
- Add dimensions if relevant: `logo-512x512.png`

### Organization
- Group by category in subfolders
- Keep flat structure if few files
- Use subfolders when many files of same type

### Optimization
- Compress images before uploading
- Use modern formats (.webp, .avif)
- Consider using CDN for large assets
- For Next.js, use `next/image` for automatic optimization

### Sizes
- Logos: max 512x512px (or SVG)
- Icons: 24x24px, 32x32px, 48x48px
- Hero images: max 1920x1080px
- Thumbnails: ~300x200px

---

## ⚙️ Path Alias Configuration

Already configured in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/assets/*": ["./src/assets/*"]
    }
  }
}
```

---

## 📝 Note about Public vs Assets

**`/public`** - Assets that need a direct public URL:
- Favicon
- robots.txt
- sitemap.xml
- manifest.json
- Meta tag images (og:image)

**`/src/assets`** - Assets imported in components:
- Component images
- SVG icons
- Custom fonts
- Background videos

**General rule:** If you import it in a component → `assets/`. If you link it by URL → `public/`.
