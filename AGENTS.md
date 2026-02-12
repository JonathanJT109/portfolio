# AGENTS.md — Portfolio Codebase Guide

This file provides context for AI coding agents operating in this repository.
It is a Next.js 16 personal portfolio site using the App Router, React 19,
Tailwind CSS v3, and shadcn/ui components (JavaScript, not TypeScript).

---

## Build / Lint / Test Commands

```bash
npm run dev       # Start dev server (Turbopack, default in Next 16)
npm run build     # Production build — run this to verify changes compile
npm run start     # Serve production build locally
npm run lint      # ESLint via flat config (eslint .)
```

There is **no test framework** configured (no jest, vitest, or test files).
The primary verification step is `npm run build` — it must pass cleanly.

ESLint uses flat config (`eslint.config.mjs`) extending
`eslint-config-next/core-web-vitals`. Custom rule overrides:
- `react/no-unescaped-entities`: off
- `quotes`: off
- `no-useless-escape`: off

No Prettier is configured.

---

## Project Structure

```
app/
  layout.jsx              # Root layout (server component, JetBrains Mono font)
  page.jsx                # Home page (client component)
  globals.css             # Tailwind directives + base-layer utility classes
  about/page.jsx          # About page (client component)
  contact/page.jsx        # Contact form (client component, EmailJS)
  services/page.jsx       # Services page (client component, placeholder)
  work/page.jsx           # Projects portfolio (client component, Swiper)
  api/contact/route.js    # POST endpoint — server-side EmailJS integration
data/
  home.js                 # Typed words + typing speed constants
  navigation.js           # Nav links (shared by desktop and mobile nav)
  projects.js             # Work portfolio projects + GitHub profiles
  resume.js               # Experience and education entries
  services.js             # Service offerings + contact form service options
  socials.js              # Social media links
  stats.js                # Stats counters (years of experience, etc.)
components/
  ui/                     # shadcn/ui primitives (button, input, select, etc.)
  Header.jsx, Nav.jsx, MobileNav.jsx, Photo.jsx, Socials.jsx, Stats.jsx, ...
lib/
  utils.js                # cn() utility (clsx + tailwind-merge)
public/                   # Static assets (images, resume.pdf)
```

Path alias: `@/*` maps to the project root (`jsconfig.json`). Always use
`@/components/...`, `@/data/...`, `@/lib/...` for internal imports — never
relative paths across directories.

All editable content data (projects, experience, education, social links,
navigation, stats, services) lives in `data/`. To add or modify content,
edit the relevant file in that directory.

---

## Code Style

### File Naming
- Custom components: **PascalCase** (`Header.jsx`, `MobileNav.jsx`, `WorkSliderBtns.jsx`)
- shadcn/ui components: **kebab-case** (`button.jsx`, `scroll-area.jsx`, `select.jsx`)
- Pages: `page.jsx` (Next.js convention)
- API routes: `route.js` (plain `.js`, not `.jsx`)
- Config/utility files: lowercase (`utils.js`, `next.config.mjs`)

### Component Patterns
- **Arrow function components** with default export at bottom:
  ```jsx
  const MyComponent = () => { ... };
  export default MyComponent;
  ```
- **Custom hooks** use function declarations:
  ```jsx
  function useMyHook() { ... }
  ```
- **shadcn/ui components** use named exports:
  ```jsx
  export { Button, buttonVariants }
  ```
- **API routes** use named function declaration exports:
  ```jsx
  export async function POST(request) { ... }
  ```

### Formatting
- Indentation is **mixed** (2 or 4 spaces depending on the file). Match the
  existing indentation of any file you edit.
- Semicolons are **inconsistent**. Match the file you are editing.
- Quotes are **mixed** (double is more common). The ESLint `quotes` rule is off.
- All pages using client-side hooks start with `"use client"` on line 1.

### Import Order (not enforced, but conventional)
1. `"use client"` directive (line 1, when needed)
2. React / Next.js imports (`react`, `next/link`, `next/image`, `next/navigation`)
3. Third-party libraries (`framer-motion`, `swiper`, `react-icons`, `sweetalert2`)
4. Internal imports via `@/` alias (`@/components/ui/...`, `@/components/...`, `@/data/...`, `@/lib/utils`)

### Props and Styling
- Props are destructured in function parameters, defaults inline:
  `const Stats = ({ className = "" }) => { ... }`
- Several custom components accept `containerStyles`, `btnStyles`, `iconStyles`
  string props rather than `className`.
- Tailwind utility classes are applied directly in `className`.
- Use `cn()` from `@/lib/utils` when merging conditional classes (primarily in
  shadcn/ui components). Uses `clsx` + `tailwind-merge`.
- Conditional error styling uses template literals:
  `className={errors.field ? errorBorder : ""}`

---

## Tailwind Configuration

Custom values in `tailwind.config.js`:
- **Colors**: `primary: "#1c1c22"`, `accent: "#DA5353"`, `accent-hover: "#9A3637"`
- **Font**: `primary: "var(--font-jetbrainsMono)"`
- **Breakpoints**: `sm: 640px`, `md: 768px`, `lg: 960px`, `xl: 1200px`
- **Container**: centered, padding `DEFAULT: "20px"`, `sm: "15px"`
- **Plugin**: `tailwindcss-animate`

Desktop layout (`xl:` breakpoint) constrains pages to viewport height using
`h-screen flex flex-col overflow-hidden` on `<body>`. Mobile is allowed to
scroll naturally. Use `xl:` prefixes for height constraints.

---

## State Management

No global state library. All state is local:
- `useState` for component state
- `useEffect` for side effects
- `useRef` for DOM references
- Custom hooks are defined **inline in page files** (not in a `hooks/` directory):
  - `useTyper(words)` in `app/page.jsx`
  - `useScrollCue()` in `app/about/page.jsx`
  - `useSessionField(key, initial)` in `app/contact/page.jsx`

---

## Error Handling

**API routes** (`app/api/contact/route.js`):
- Wrap handler in `try/catch`
- Validate required fields, return `{ success: false, message }` with status 400
- On external API failure: `console.error`, return status 500
- Consistent response shape: `{ success: boolean, message: string }`

**Client-side** (`app/contact/page.jsx`):
- Validate form before submit with a `validate()` function building an errors object
- Wrap `fetch` in `try/catch`, use `finally` for cleanup
- Show feedback via SweetAlert2 modals (dark theme matching portfolio aesthetic)
- sessionStorage operations use empty `catch {}` to fail silently

No error boundaries (`error.jsx`) or global error handlers exist.

---

## Animation Conventions

All page components use a consistent framer-motion entrance animation:
```jsx
<motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1, transition: { delay: 0.25, duration: 0.4, ease: "easeIn" } }}
  className="xl:h-full flex flex-col py-6 xl:py-0"
>
```

---

## Environment Variables

- `.env.local` (gitignored) holds `EMAILJS_PRIVATE_KEY`
- Access server-side only via `process.env.EMAILJS_PRIVATE_KEY`
- Never expose private keys in client components

---

## Key Dependencies

| Package | Purpose |
|---|---|
| `next` 16.1.6 | App Router framework (Turbopack default) |
| `react` ^19.2.4 | UI library |
| `framer-motion` | Page and element animations |
| `@radix-ui/*` | shadcn/ui primitives (dialog, select, tooltip, etc.) |
| `class-variance-authority` | Component variant definitions (`cva`) |
| `swiper` | Carousel slider (work page) |
| `sweetalert2` | Alert modals (contact form) |
| `react-icons` | Icon sets (Fa, Bs, Ci, etc.) |
| `react-countup` | Animated number counters |
| `tailwindcss` 3.4.19 | Utility-first CSS |

---

## Important Notes

- This is a **JavaScript** project — no TypeScript. shadcn/ui config sets `tsx: false`.
- React 19 is in use — follow latest React API patterns.
- `next/image` uses `images.qualities: [100, 75]` in `next.config.mjs`.
- Services page has placeholder content; services links are commented out in nav data.
- The `hooks/` alias exists in `components.json` but the directory does not — hooks
  live inline in their page files.
