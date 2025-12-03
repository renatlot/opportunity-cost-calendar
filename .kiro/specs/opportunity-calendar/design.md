# Design: Opportunity Cost Calendar

## Architecture Overview

### Component Hierarchy
```
App
├── PortfolioSidebar
│   ├── TotalValueCounter
│   └── ProjectList
│       └── ProjectCard (multiple)
├── CalendarView
│   ├── WeekHeader
│   ├── TimeGrid
│   │   ├── TimeBoxLayer (background)
│   │   └── TimeLogLayer (foreground)
│   └── TimeSlot (multiple)
└── Modals
    ├── ProjectModal (create/edit)
    └── TimeBoxModal (create/edit)
```

## State Management (Zustand)

### Store: projectStore
```typescript
{
  projects: Project[],
  addProject: (project: Omit<Project, 'id'>) => void,
  updateProject: (id: string, updates: Partial<Project>) => void,
  deleteProject: (id: string) => void,
  getProjectById: (id: string) => Project | undefined
}
```

### Store: timeBoxStore
```typescript
{
  timeBoxes: TimeBox[],
  addTimeBox: (timeBox: Omit<TimeBox, 'id'>) => void,
  updateTimeBox: (id: string, updates: Partial<TimeBox>) => void,
  deleteTimeBox: (id: string) => void
}
```

### Store: timeLogStore
```typescript
{
  timeLogs: TimeLog[],
  addTimeLog: (log: Omit<TimeLog, 'id'>) => void,
  updateTimeLog: (id: string, updates: Partial<TimeLog>) => void,
  deleteTimeLog: (id: string) => void,
  getLogsByDate: (date: string) => TimeLog[],
  getLogsByProject: (projectId: string) => TimeLog[],
  getTotalValue: (startDate?: string, endDate?: string) => number
}
```

## Correctness Properties

### P-1: Value Calculation Accuracy (AC-1, AC-4)
**Property**: For any time log, the calculated value must equal duration × project hourly rate
**Verification**: Unit tests for calculateDuration and value computation
**Implementation**: 
- `src/lib/utils.ts` - calculateDuration function
- `src/store/index.ts` - timeLogStore with automatic value calculation

### P-2: Time Box Replication (AC-2)
**Property**: Time boxes defined in templates must appear on every day in the calendar view
**Verification**: Visual inspection and component tests
**Implementation**:
- `src/components/domain/TimeBoxLayer.tsx` - renders time boxes for each day
- Uses date-fns to iterate over visible week

### P-3: Real-Time Value Updates (AC-4)
**Property**: When a time log is added/updated/deleted, all dependent values update immediately
**Verification**: State change triggers re-render of affected components
**Implementation**:
- Zustand subscriptions in components
- Computed values in store selectors

### P-4: Data Persistence (AC-8)
**Property**: All state changes must persist to localStorage and survive page refresh
**Verification**: Manual testing - refresh browser and verify data remains
**Implementation**:
- Zustand persist middleware
- localStorage key: 'opportunity-calendar-state'

### P-5: Opportunity Cost Warning (AC-6)
**Property**: Deleting a time log must show confirmation with exact dollar value
**Verification**: UI test - attempt deletion and verify modal content
**Implementation**:
- `src/components/domain/DeleteConfirmationModal.tsx`
- Displays formatCurrency(timeLog.value)

### P-6: Project Valuation Accuracy (AC-1)
**Property**: Project total value = sum of all time log values for that project
**Verification**: Aggregate calculation test
**Implementation**:
- Computed property in projectStore
- Recalculated on any timeLog change

### P-7: Responsive Layout (AC-7)
**Property**: Calendar must be usable on screens ≥320px width
**Verification**: Browser DevTools responsive testing
**Implementation**:
- Tailwind mobile-first breakpoints
- Collapsible sidebar on mobile
- Horizontal scroll for calendar on small screens

### P-8: Type Safety (NFR-3)
**Property**: No TypeScript errors in strict mode
**Verification**: `npm run build` succeeds without type errors
**Implementation**:
- Strict tsconfig.json
- Explicit types for all store actions and components

## UI/UX Design Specifications

### Color Palette
- **Primary (High Value)**: `#10b981` (Emerald) - for high-rate projects
- **Accent (Value)**: `#f59e0b` (Gold) - for value displays
- **Background**: `#f9fafb` (Light Gray)
- **Text**: `#1f2937` (Dark Gray)
- **Time Boxes**: 20% opacity of assigned color

### Typography
- **Value Display**: 700 weight, 2xl-4xl size
- **Project Names**: 600 weight, lg-xl size
- **Time Labels**: 400 weight, sm-base size

### Interaction Patterns
1. **Drag-and-Drop**: Drag project card onto time slot
2. **Click-to-Select**: Click time slot → modal with project dropdown
3. **Hover States**: Show value preview on hover
4. **Delete Confirmation**: Modal with prominent value display

## Data Flow

### Adding a Time Log
1. User drags ProjectCard onto TimeSlot
2. TimeSlot captures drop event with projectId and time
3. Calculate duration and value
4. Call `timeLogStore.addTimeLog()`
5. Zustand updates state and localStorage
6. Components re-render with new data
7. TotalValueCounter updates automatically

### Calculating Portfolio Value
1. User views dashboard
2. Component calls `timeLogStore.getTotalValue(startDate, endDate)`
3. Store filters logs by date range
4. Reduce logs to sum of values
5. Return formatted currency string

## File Organization

### Phase 1: Core Infrastructure
- `src/store/projectStore.ts`
- `src/store/timeBoxStore.ts`
- `src/store/timeLogStore.ts`
- `src/store/index.ts` (exports)

### Phase 2: UI Components
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Badge.tsx`
- `src/components/ui/Modal.tsx`
- `src/components/ui/Input.tsx`

### Phase 3: Domain Components
- `src/components/domain/PortfolioSidebar.tsx`
- `src/components/domain/ProjectCard.tsx`
- `src/components/domain/TotalValueCounter.tsx`
- `src/components/domain/CalendarView.tsx`
- `src/components/domain/TimeGrid.tsx`
- `src/components/domain/TimeSlot.tsx`

### Phase 4: Integration
- Update `src/App.tsx` with full layout
- Wire up all interactions
- Add modals for CRUD operations
