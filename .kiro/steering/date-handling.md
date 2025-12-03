---
inclusion: fileMatch
fileMatchPattern: "src/components/domain/**/*.tsx"
---

# Date Handling Guidelines

## Library: date-fns

Use `date-fns` for all date operations. It's tree-shakeable, immutable, and TypeScript-friendly.

## Common Operations

### Formatting Dates

```typescript
import { format, parseISO } from 'date-fns'

// Display date in calendar header
const displayDate = format(new Date(), 'EEEE, MMMM d, yyyy')
// Output: "Monday, December 1, 2025"

// ISO date for storage
const isoDate = format(new Date(), 'yyyy-MM-dd')
// Output: "2025-12-01"

// Parse ISO string back to Date
const date = parseISO('2025-12-01')
```

### Week Navigation

```typescript
import { startOfWeek, endOfWeek, addWeeks, subWeeks, eachDayOfInterval } from 'date-fns'

// Get current week
const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 }) // Sunday
const weekEnd = endOfWeek(new Date(), { weekStartsOn: 0 })

// Navigate weeks
const nextWeek = addWeeks(weekStart, 1)
const prevWeek = subWeeks(weekStart, 1)

// Get all days in week
const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd })
// Returns array of 7 Date objects
```

### Date Comparisons

```typescript
import { isSameDay, isToday, isBefore, isAfter } from 'date-fns'

// Check if same day
if (isSameDay(date1, date2)) {
  // Same calendar day
}

// Check if today
if (isToday(date)) {
  // Highlight current day
}

// Compare dates
if (isBefore(startDate, endDate)) {
  // Valid date range
}
```

## Date Storage Format

### ISO Date Strings
Always store dates as ISO strings in state and localStorage:

```typescript
// Good: ISO format
const timeLog = {
  date: '2025-12-01',
  startTime: '09:00',
  endTime: '12:00',
}

// Bad: Date objects (not serializable)
const timeLog = {
  date: new Date(),
}
```

### Time Format
Store times as "HH:mm" strings (24-hour format):

```typescript
// Good
startTime: '09:00'
endTime: '17:30'

// Bad
startTime: '9:00 AM'
endTime: '5:30 PM'
```

## Calendar Grid Implementation

### Generating Week View

```typescript
import { startOfWeek, eachDayOfInterval, addDays, format } from 'date-fns'

const generateWeekDays = (currentDate: Date) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 })
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i)
    return {
      date: format(date, 'yyyy-MM-dd'),
      dayName: format(date, 'EEE'),
      dayNumber: format(date, 'd'),
      isToday: isToday(date),
    }
  })
}
```

### Generating Hour Slots

```typescript
const generateHourSlots = () => {
  return Array.from({ length: 24 }, (_, hour) => ({
    hour,
    displayTime: `${hour.toString().padStart(2, '0')}:00`,
    label: hour === 0 ? '12 AM' 
         : hour < 12 ? `${hour} AM`
         : hour === 12 ? '12 PM'
         : `${hour - 12} PM`,
  }))
}
```

## Time Zone Considerations

### Current Approach
The app uses local browser time zone. No conversion needed.

```typescript
// User's local time
const now = new Date()
const localDate = format(now, 'yyyy-MM-dd')
```

### Future: Multi-Timezone Support
If needed, use `date-fns-tz`:

```typescript
import { formatInTimeZone } from 'date-fns-tz'

const utcDate = formatInTimeZone(date, 'UTC', 'yyyy-MM-dd HH:mm:ss')
```

## Date Validation

### Validate Date Range

```typescript
import { isValid, parseISO, isBefore } from 'date-fns'

const validateDateRange = (startDate: string, endDate: string): string | null => {
  const start = parseISO(startDate)
  const end = parseISO(endDate)
  
  if (!isValid(start)) {
    return 'Invalid start date'
  }
  
  if (!isValid(end)) {
    return 'Invalid end date'
  }
  
  if (!isBefore(start, end)) {
    return 'End date must be after start date'
  }
  
  return null
}
```

## Performance Considerations

### Memoize Date Calculations

```typescript
import { useMemo } from 'react'
import { startOfWeek, eachDayOfInterval, addDays } from 'date-fns'

const CalendarView = ({ currentDate }: { currentDate: Date }) => {
  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 })
    return eachDayOfInterval({ 
      start: weekStart, 
      end: addDays(weekStart, 6) 
    })
  }, [currentDate])
  
  // weekDays only recalculates when currentDate changes
}
```

### Avoid Creating New Dates in Render

```typescript
// Bad: Creates new Date on every render
const isCurrentDay = isSameDay(new Date(), date)

// Good: Use state or memo
const [today] = useState(() => new Date())
const isCurrentDay = isSameDay(today, date)
```

## Common Patterns

### Week Navigation Component

```typescript
import { useState } from 'react'
import { format, addWeeks, subWeeks, startOfWeek } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import Button from '@/components/ui/Button'

export default function WeekNavigator() {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 })
  const displayRange = format(weekStart, 'MMM d, yyyy')
  
  const handlePrevWeek = () => {
    setCurrentDate(prev => subWeeks(prev, 1))
  }
  
  const handleNextWeek = () => {
    setCurrentDate(prev => addWeeks(prev, 1))
  }
  
  const handleToday = () => {
    setCurrentDate(new Date())
  }
  
  return (
    <div className="flex items-center gap-4">
      <Button size="sm" onClick={handlePrevWeek}>
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <span className="text-lg font-semibold">{displayRange}</span>
      <Button size="sm" onClick={handleNextWeek}>
        <ChevronRight className="w-4 h-4" />
      </Button>
      <Button size="sm" variant="secondary" onClick={handleToday}>
        Today
      </Button>
    </div>
  )
}
```

## Testing Date Logic

### Use Fixed Dates in Tests

```typescript
// Don't use new Date() in tests - it changes
const testDate = new Date('2025-12-01T10:00:00')

// Or use date-fns
import { parseISO } from 'date-fns'
const testDate = parseISO('2025-12-01')
```

### Mock Current Date

```typescript
// Save original
const originalDate = Date

// Mock
global.Date = class extends Date {
  constructor() {
    super('2025-12-01T10:00:00')
  }
} as any

// Test...

// Restore
global.Date = originalDate
```
