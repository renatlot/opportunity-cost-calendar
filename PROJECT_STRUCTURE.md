# Project Structure Overview

## Directory Layout

```
opportunity-calendar/
├── .gitignore                 # Git ignore rules
├── .eslintrc.cjs             # ESLint configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript config with path aliases
├── tsconfig.node.json        # TypeScript config for Vite
├── vite.config.ts            # Vite bundler configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── index.html                # HTML entry point
├── README.md                 # Project documentation
├── SETUP.md                  # Setup instructions
│
└── src/
    ├── main.tsx              # React entry point
    ├── App.tsx               # Root component
    ├── index.css             # Global styles + Tailwind imports
    ├── vite-env.d.ts         # Vite type definitions
    │
    ├── components/
    │   ├── ui/               # Atomic/reusable UI components
    │   │   └── .gitkeep      # (Button, Input, Card, Badge, etc.)
    │   │
    │   └── domain/           # Feature-specific components
    │       └── .gitkeep      # (ProjectCard, CalendarView, PortfolioSidebar)
    │
    ├── store/
    │   └── index.ts          # Zustand stores (projects, timeLogs, timeBoxes)
    │
    ├── types/
    │   └── index.ts          # TypeScript interfaces (Project, TimeLog, TimeBox)
    │
    ├── lib/
    │   └── utils.ts          # Utility functions (cn, formatCurrency, etc.)
    │
    └── hooks/
        └── .gitkeep          # Custom React hooks
```

## Path Aliases Configured

The following import aliases are available:

- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/store/*` → `./src/store/*`
- `@/types/*` → `./src/types/*`
- `@/lib/*` → `./src/lib/*`
- `@/hooks/*` → `./src/hooks/*`

Example usage:
```typescript
import { cn } from '@/lib/utils'
import { Project } from '@/types'
import { useProjectStore } from '@/store'
```

## Kiro Workflow Integration

This project demonstrates full Kiro capabilities:

### Specs (`/.kiro/specs/opportunity-calendar/`)
- **requirements.md**: 8 acceptance criteria (AC-1 to AC-8)
- **design.md**: Architecture and 8 correctness properties (P-1 to P-8)
- **tasks.md**: Phased implementation tasks with property mappings

### Hooks (`/.kiro/hooks/`)
- **Manual**: pre-commit-check, dev-server, build-check
- **Automatic**: update-docs (on component save), test-after-store-change (on store save)

### Steering (`/.kiro/steering/`)
- **Always**: project-standards.md
- **Conditional**: component-patterns.md, value-calculation.md, ui-design-system.md, date-handling.md

## Implementation Status

### ✅ Phase 1: State Management (Complete)
- Zustand stores: projectStore, timeBoxStore, timeLogStore
- localStorage persistence
- Value calculation logic
- Type-safe interfaces

### ✅ Phase 1.5: UI Components (Complete)
- Button, Card, Badge, Input, Modal
- Wealth-themed design system
- Accessibility features
- Responsive utilities

### 🚧 Phase 2: Domain Components (Next)
- ProjectCard with drag-and-drop
- CalendarView with week navigation
- TimeGrid with time boxes
- TimeSlot with drop targets

### 📋 Phase 3: Integration (Planned)
- Wire up full user flow
- Add CRUD modals
- Implement analytics dashboard
- Polish and optimize

## Next Steps

After running the setup commands in SETUP.md:

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Review `.kiro/specs/` for implementation roadmap
4. Follow tasks in `.kiro/specs/opportunity-calendar/tasks.md`
5. Use Kiro hooks for quality checks
