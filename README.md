# Opportunity Cost Calendar

A Time Investment Portfolio application built on Eliyahu Goldratt's Theory of Constraints.

## Philosophy

This is not a standard calendar. It treats time as financial capital, allowing you to:
- Assign monetary value to projects ($/hr)
- Track "investments" of time
- Measure success by "Total Value Generated" rather than "hours filled"

## Tech Stack

- **Runtime**: Node.js + Vite
- **Framework**: React 18 + TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **State**: Zustand (with localStorage persistence)
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Utilities**: clsx, tailwind-merge

## Project Structure

```
src/
├── components/
│   ├── ui/          # Atomic components (Button, Card, Badge)
│   └── domain/      # Feature components (ProjectCard, CalendarView)
├── store/           # Zustand state management
├── types/           # TypeScript interfaces
├── lib/             # Utility functions
├── hooks/           # Custom React hooks
├── App.tsx
├── main.tsx
└── index.css

.kiro/
├── specs/           # Feature specifications
│   └── opportunity-calendar/
│       ├── requirements.md  # Acceptance criteria
│       ├── design.md        # Architecture & correctness properties
│       └── tasks.md         # Implementation tasks
├── hooks/           # Automated workflows
│   ├── pre-commit-check.json
│   ├── update-docs.json
│   ├── test-after-store-change.json
│   ├── dev-server.json
│   └── build-check.json
└── steering/        # Development guidelines
    ├── project-standards.md
    ├── component-patterns.md
    ├── value-calculation.md
    └── ui-design-system.md
```

## Getting Started

### ✅ Setup Complete!
Dependencies installed and dev server ready. See [SUCCESS.md](./SUCCESS.md) for next steps.

### Windows Users
Use the provided PowerShell scripts:
```powershell
.\setup.ps1  # Install dependencies (already done ✅)
.\dev.ps1    # Start development server
.\build.ps1  # Build for production
```

See [WINDOWS_SETUP.md](./WINDOWS_SETUP.md) for troubleshooting.

### Standard Setup
If Node.js is in your PATH:
```bash
npm install
npm run dev
```

Full guide: [SETUP.md](./SETUP.md)

## Core Features

1. **Asset Management**: Projects as investment assets with $/hr rates
2. **Time Boxing**: Replicated daily structure templates
3. **Time Logging**: Drag-and-drop time investment tracking
4. **Analytics**: Real-time portfolio value dashboard

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Kiro Features Showcase

This project demonstrates comprehensive Kiro integration:

### 📋 Specs
- **Requirements**: 8 acceptance criteria with clear Given/When/Then format
- **Design**: Architecture decisions and 8 correctness properties
- **Tasks**: 30+ implementation tasks with property mappings
- Location: `.kiro/specs/opportunity-calendar/`

### 🔧 Hooks
- **Manual**: Pre-commit checks, dev server, build verification
- **Automatic**: Documentation reminders, testing prompts
- Location: `.kiro/hooks/`

### 🎯 Steering
- **Always Active**: Core project standards
- **Conditional**: Component patterns, value calculation, UI design, date handling
- Location: `.kiro/steering/`

### 📚 Documentation
- [Kiro Features Overview](./.kiro/README.md)
- [Quick Reference](./.kiro/QUICK_REFERENCE.md)
- [Complete Showcase](./KIRO_SHOWCASE.md)
- [Directory Tree](./DIRECTORY_TREE.md)

## Implementation Status

- ✅ **Phase 1**: State management with Zustand (projectStore, timeBoxStore, timeLogStore)
- ✅ **Phase 1.5**: UI component library (Button, Card, Badge, Input, Modal)
- 🚧 **Phase 2**: Domain components (ProjectCard, CalendarView, TimeGrid)
- 📋 **Phase 3**: Integration and analytics dashboard

## License

MIT License
