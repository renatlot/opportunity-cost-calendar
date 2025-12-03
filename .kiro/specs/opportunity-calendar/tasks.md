# Tasks: Opportunity Cost Calendar

## Phase 1: State Management Foundation

### Task 1.1: Implement projectStore (P-1, P-6, AC-1)
- [ ] Create `src/store/projectStore.ts`
- [ ] Define Project interface usage
- [ ] Implement CRUD actions (add, update, delete, getById)
- [ ] Add computed totalValue property
- [ ] Configure persist middleware for localStorage
- [ ] Test: Create project, verify persistence after refresh

### Task 1.2: Implement timeBoxStore (P-2, AC-2)
- [ ] Create `src/store/timeBoxStore.ts`
- [ ] Define TimeBox interface usage
- [ ] Implement CRUD actions
- [ ] Configure persist middleware
- [ ] Test: Create time box, verify it appears on all days

### Task 1.3: Implement timeLogStore (P-1, P-3, P-4, AC-3, AC-4)
- [ ] Create `src/store/timeLogStore.ts`
- [ ] Define TimeLog interface usage
- [ ] Implement CRUD actions with automatic value calculation
- [ ] Add getLogsByDate selector
- [ ] Add getLogsByProject selector
- [ ] Add getTotalValue aggregation function
- [ ] Configure persist middleware
- [ ] Test: Add log, verify value calculation and persistence

### Task 1.4: Export unified store (P-4)
- [ ] Update `src/store/index.ts` to export all stores
- [ ] Verify localStorage key naming convention
- [ ] Test: Full state persistence across page refresh

## Phase 2: Atomic UI Components

### Task 2.1: Create Button component (NFR-3)
- [ ] Create `src/components/ui/Button.tsx`
- [ ] Props: variant (primary, secondary, danger), size, onClick, children
- [ ] Use Tailwind for styling
- [ ] Export component

### Task 2.2: Create Card component (NFR-3)
- [ ] Create `src/components/ui/Card.tsx`
- [ ] Props: className, children
- [ ] Wealth-themed styling
- [ ] Export component

### Task 2.3: Create Badge component (AC-3)
- [ ] Create `src/components/ui/Badge.tsx`
- [ ] Props: value (number), variant (gold, emerald)
- [ ] Display formatted currency
- [ ] Export component

### Task 2.4: Create Modal component (AC-6)
- [ ] Create `src/components/ui/Modal.tsx`
- [ ] Props: isOpen, onClose, title, children
- [ ] Overlay with backdrop
- [ ] Keyboard escape support
- [ ] Export component

### Task 2.5: Create Input component (AC-1)
- [ ] Create `src/components/ui/Input.tsx`
- [ ] Props: type, value, onChange, label, placeholder
- [ ] Styled for forms
- [ ] Export component

## Phase 3: Domain Components

### Task 3.1: Create TotalValueCounter (P-3, AC-5)
- [ ] Create `src/components/domain/TotalValueCounter.tsx`
- [ ] Subscribe to timeLogStore
- [ ] Display total portfolio value (large, bold, gold)
- [ ] Props: dateRange (week/month)
- [ ] Use formatCurrency utility

### Task 3.2: Create ProjectCard (AC-1)
- [ ] Create `src/components/domain/ProjectCard.tsx`
- [ ] Display project name, rate, total value
- [ ] Color-coded border
- [ ] Draggable (HTML5 drag API)
- [ ] Click to edit
- [ ] Test: Drag functionality

### Task 3.3: Create PortfolioSidebar (AC-1, AC-5)
- [ ] Create `src/components/domain/PortfolioSidebar.tsx`
- [ ] Render TotalValueCounter at top
- [ ] List all ProjectCards
- [ ] Add "New Project" button
- [ ] Responsive: collapsible on mobile

### Task 3.4: Create TimeSlot (P-2, AC-3)
- [ ] Create `src/components/domain/TimeSlot.tsx`
- [ ] Props: date, time, timeBox (optional), timeLog (optional)
- [ ] Render time box as background layer
- [ ] Render time log as foreground
- [ ] Drop target for projects
- [ ] Click to open project selector
- [ ] Display value badge if logged

### Task 3.5: Create TimeGrid (P-2, AC-2, AC-3)
- [ ] Create `src/components/domain/TimeGrid.tsx`
- [ ] Generate 24-hour grid (rows)
- [ ] Generate 7-day week (columns)
- [ ] Render TimeSlot for each cell
- [ ] Subscribe to timeBoxStore and timeLogStore
- [ ] Test: Time boxes appear on all days

### Task 3.6: Create CalendarView (AC-3, AC-7)
- [ ] Create `src/components/domain/CalendarView.tsx`
- [ ] Week navigation (prev/next buttons)
- [ ] Display current week range
- [ ] Render TimeGrid
- [ ] Responsive layout
- [ ] Test: Navigation updates grid

### Task 3.7: Create ProjectModal (AC-1)
- [ ] Create `src/components/domain/ProjectModal.tsx`
- [ ] Form: name, description, color picker, hourly rate
- [ ] Create and Edit modes
- [ ] Validation: required fields, rate > 0
- [ ] Call projectStore actions
- [ ] Test: Create and edit projects

### Task 3.8: Create TimeBoxModal (AC-2)
- [ ] Create `src/components/domain/TimeBoxModal.tsx`
- [ ] Form: name, start time, end time, color
- [ ] Validation: end > start
- [ ] Call timeBoxStore actions
- [ ] Test: Create time boxes

### Task 3.9: Create DeleteConfirmationModal (P-5, AC-6)
- [ ] Create `src/components/domain/DeleteConfirmationModal.tsx`
- [ ] Display item being deleted
- [ ] Show dollar value prominently
- [ ] Confirm/Cancel buttons
- [ ] Test: Displays correct value

## Phase 4: Integration & Polish

### Task 4.1: Wire up App.tsx (All ACs)
- [ ] Update `src/App.tsx` with full layout
- [ ] Render PortfolioSidebar
- [ ] Render CalendarView
- [ ] Add modal state management
- [ ] Test: Full user flow

### Task 4.2: Implement drag-and-drop (AC-3)
- [ ] Add onDragStart to ProjectCard
- [ ] Add onDrop to TimeSlot
- [ ] Calculate duration and value
- [ ] Create time log
- [ ] Test: Drag project onto slot

### Task 4.3: Add keyboard navigation (NFR-2)
- [ ] Tab navigation through interactive elements
- [ ] Escape to close modals
- [ ] Enter to submit forms
- [ ] Test: Full keyboard workflow

### Task 4.4: Responsive design testing (P-7, AC-7)
- [ ] Test on mobile (320px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1024px+)
- [ ] Adjust breakpoints as needed

### Task 4.5: Performance optimization (NFR-1)
- [ ] Memoize expensive calculations
- [ ] Use React.memo for pure components
- [ ] Test render performance with DevTools
- [ ] Ensure <100ms calendar render

### Task 4.6: Accessibility audit (NFR-2)
- [ ] Add ARIA labels to interactive elements
- [ ] Test with screen reader
- [ ] Verify color contrast ratios
- [ ] Add focus indicators

### Task 4.7: Final testing (All ACs)
- [ ] Test all acceptance criteria
- [ ] Verify data persistence
- [ ] Test edge cases (delete project with logs, etc.)
- [ ] Cross-browser testing

## Phase 5: Documentation & Deployment

### Task 5.1: Update documentation
- [ ] Add usage guide to README.md
- [ ] Document component APIs
- [ ] Add screenshots

### Task 5.2: Build for production
- [ ] Run `npm run build`
- [ ] Test production build
- [ ] Verify bundle size

### Task 5.3: Deployment preparation
- [ ] Choose hosting (Vercel, Netlify, etc.)
- [ ] Configure deployment
- [ ] Deploy and test live
