# Tech Spec: SketchZero — Learn to Draw Manga

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19 | UI framework |
| `react-dom` | ^19 | React DOM renderer |
| `vite` | ^6 | Build tool |
| `@vitejs/plugin-react` | ^4 | Vite React integration |
| `typescript` | ^5 | Type safety |
| `tailwindcss` | ^4 | Utility-first CSS |
| `@tailwindcss/vite` | ^4 | Tailwind Vite plugin |
| `gsap` | ^3 | Animations & ScrollTrigger |
| `@gsap/react` | ^2 | GSAP React hooks (useGSAP) |
| `lenis` | ^1 | Smooth scrolling |
| `three` | ^0.175 | 3D renderer for Manga Stage |
| `@types/three` | ^0.175 | Three.js types |
| `meshline` | ^3 | MeshLine for ink trails |
| `lucide-react` | ^0.511 | SVG icons |
| `clsx` | ^2 | Conditional class names |
| `tailwind-merge` | ^3 | Merge Tailwind classes |

## Component Inventory

### Layout
- **AppShell** — wraps Lenis provider, renders all page sections in order
- **LenisProvider** — initializes smooth scroll, exposes instance via context

### Sections
- **HeroSection** — full-viewport intro with Zen Fluid Void background, glass text card, CTAs
- **PhilosophySection** — two-column text + animated geometry construction demo
- **CurriculumCore** — sticky scroll-hijacked module viewer; left text panel, right Three.js canvas
- **TheoryHub** — Bento-box grid of educational topic cards
- **GallerySection** — cascading grid with Digital Wash Masking image reveals
- **FooterSection** — minimalist dark footer

### Reusable Components
- **ZenFluidVoid** — raw WebGL fullscreen quad shader (hero background)
- **MangaStage** — Three.js canvas with MeshLine ink trails, camera orbits
- **WashImage** — SVG-filter + GSAP ink-spread reveal wrapper for images
- **GlassCard** — frosted glass panel (backdrop-blur + border)
- **ModulePanel** — single curriculum module text (label, title, description, checklist)
- **ChecklistItem** — tappable task row with completion state (localStorage)
- **TopicCard** — TheoryHub card with hover glow lift
- **GeometryDemo** — PhilosophySection CSS keyframe animation (square → circle construction)

### Hooks
- **useZenFluid** — WebGL context + rAF loop, pointer (mouse + touch) uniform updates, resize handling
- **useMangaStage** — Three.js scene setup, MeshLine generation logic, camera orbit tween tied to scroll progress
- **useWashReveal** — IntersectionObserver → GSAP SVG filter tween trigger

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Zen Fluid Void (hero bg) | raw WebGL | fragment shader on fullscreen quad, rAF loop passes time/resize/pointer uniforms | 🔒 High |
| Interactive Manga Stage | three + meshline + gsap | TetrahedronGeometry → 6-vertex MeshLine trail spawn loop; camera orbit + hue shift driven by ScrollTrigger progress | 🔒 High |
| Curriculum scroll hijack | gsap ScrollTrigger | pin right canvas, scrub left text panel through 8 modules with snap | 🔒 High |
| Digital Wash Masking | gsap + SVG filters | feFlood/feComposite swap + scale tween triggered by IntersectionObserver | Medium |
| Geometry construction demo | CSS keyframes | square → circle morph, infinite loop, no JS | Low |
| Card hover glow/lift | CSS transitions | translateY + border-color transition, cubic-bezier easing | Low |
| Smooth scrolling | lenis | global instance, synced with GSAP ScrollTrigger | Low |
| Checklist tap feedback | CSS transition | opacity + scale micro-interaction on tap | Low |

## State & Logic Plan

### Curriculum Scroll Sync
The CurriculumCore section splits scroll control between two children:
- **Left panel** is a tall scroll container (module count × 100vh). GSAP ScrollTrigger pins the parent container and scrubs a timeline that translates/switches visible module content.
- **Right panel** (MangaStage canvas) is `position: sticky` inside the pinned container. Its internal camera angle and line color hue tween based on the same ScrollTrigger progress value passed down via a ref or callback.

### Checklist Persistence
Each ModulePanel contains a list of task strings. Completion state is stored in `localStorage` under key `sketchzero-checklist`. The format is a flat object keyed by `module-index-task-index` with boolean values. Tapping a ChecklistItem toggles its state and re-renders the strikethrough UI.

### Performance Budget (S23 Ultra target)
- Three.js renderer: `antialias: false`, `powerPreference: "high-performance"`, `pixelRatio: Math.min(devicePixelRatio, 2)`
- Zen Fluid Void shader runs at `precision mediump float` (never highp)
- MeshLine spawn rate gated by `Math.random() > 0.85` to limit object count
- Lenis `syncTouch: true` for mobile smooth scroll without jank

## Other Key Decisions

### Raw WebGL over Three.js for Hero Shader
The Zen Fluid Void is a single fullscreen fragment shader with no 3D scene, geometry, or camera. Using raw WebGL (create context, compile shaders, draw single quad) avoids loading Three.js overhead for the hero only. Three.js is deferred to the CurriculumCore section where it is actually needed.

### SVG Filter Approach for Wash Masking
The Digital Wash Masking effect requires SVG `<filter>` elements with `feFlood` + `feComposite`. These filters must be mounted in a hidden `<svg>` in the DOM (display: none or 0×0). The GSAP tween animates the CSS `filter: url(#id)` property swapping between two filter definitions. This is the only reliable cross-browser way to animate procedural noise masking without Canvas 2D or WebGL.

### ScrollTrigger Snap for Curriculum
The scroll-hijacked curriculum uses GSAP ScrollTrigger with `snap: 1 / (total - 1)` so the user always lands on a full module, never halfway between two. This requires `delay: 0` and `duration: { min: 0.2, max: 0.5 }` for fast, responsive snap on mobile touch.
