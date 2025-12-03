---
inclusion: fileMatch
fileMatchPattern: "src/components/ui/**/*.tsx"
---

# UI Design System

## Design Philosophy

The Opportunity Cost Calendar uses a "Wealth Management" aesthetic to reinforce the concept of time as financial capital.

## Color Palette

### Primary Colors
```typescript
// Tailwind config: theme.extend.colors.wealth
wealth: {
  emerald: '#10b981',  // High-value indicators, success states
  gold: '#f59e0b',     // Value displays, premium features
  dark: '#1f2937',     // Primary text, headers
  light: '#f9fafb',    // Backgrounds, cards
}
```

### Usage Guidelines
- **Emerald**: High-value projects (>$300/hr), positive actions, growth indicators
- **Gold**: All dollar value displays, premium badges, highlights
- **Dark**: Body text, headings, borders
- **Light**: Page backgrounds, card backgrounds, subtle dividers

### Semantic Colors (Tailwind defaults)
- **Red (red-500)**: Delete actions, warnings, errors
- **Blue (blue-500)**: Links, informational states
- **Gray (gray-*)**: Neutral elements, disabled states

## Typography

### Font Weights
```css
font-normal: 400   /* Body text */
font-medium: 500   /* Subheadings */
font-semibold: 600 /* Component labels */
font-bold: 700     /* Headings */
font-value: 700    /* Dollar amounts (custom) */
```

### Font Sizes
```css
text-sm: 0.875rem   /* 14px - Helper text, labels */
text-base: 1rem     /* 16px - Body text */
text-lg: 1.125rem   /* 18px - Subheadings */
text-xl: 1.25rem    /* 20px - Card titles */
text-2xl: 1.5rem    /* 24px - Section headings */
text-3xl: 1.875rem  /* 30px - Page titles */
text-4xl: 2.25rem   /* 36px - Hero text, total value */
```

### Typography Hierarchy
1. **Total Portfolio Value**: text-4xl font-value text-wealth-gold
2. **Page Titles**: text-3xl font-bold text-wealth-dark
3. **Section Headings**: text-2xl font-semibold text-wealth-dark
4. **Card Titles**: text-xl font-semibold
5. **Body Text**: text-base font-normal
6. **Labels**: text-sm font-medium text-gray-600

## Spacing Scale

Use consistent spacing throughout:
```css
p-1: 4px
p-2: 8px
p-3: 12px
p-4: 16px   /* Standard card padding */
p-6: 24px   /* Section padding */
p-8: 32px   /* Page padding */
p-12: 48px  /* Large spacing */
```

## Component Specifications

### Button

**Variants:**
```typescript
// Primary: Main actions (Save, Create, Confirm)
className="px-4 py-2 bg-wealth-emerald text-white rounded-lg hover:bg-emerald-600 
           focus:ring-2 focus:ring-wealth-emerald focus:ring-offset-2 
           transition-colors"

// Secondary: Alternative actions (Cancel, Back)
className="px-4 py-2 bg-gray-200 text-wealth-dark rounded-lg hover:bg-gray-300 
           focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 
           transition-colors"

// Danger: Destructive actions (Delete)
className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
           focus:ring-2 focus:ring-red-500 focus:ring-offset-2 
           transition-colors"
```

**Sizes:**
- Small: `px-3 py-1.5 text-sm`
- Medium: `px-4 py-2 text-base` (default)
- Large: `px-6 py-3 text-lg`

### Card

**Base Style:**
```typescript
className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
```

**Variants:**
- **Elevated**: Add `shadow-lg hover:shadow-xl transition-shadow`
- **Interactive**: Add `cursor-pointer hover:border-wealth-emerald`
- **Selected**: Add `border-wealth-emerald border-2`

### Badge

**Value Badge (Gold):**
```typescript
className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-value 
           bg-wealth-gold/10 text-wealth-gold border border-wealth-gold/20"
```

**Status Badge:**
- Active: `bg-emerald-100 text-emerald-800`
- Inactive: `bg-gray-100 text-gray-800`
- Warning: `bg-amber-100 text-amber-800`

### Input

**Text Input:**
```typescript
className="w-full px-3 py-2 border border-gray-300 rounded-lg 
           focus:ring-2 focus:ring-wealth-emerald focus:border-transparent 
           placeholder:text-gray-400"
```

**Label:**
```typescript
className="block text-sm font-medium text-wealth-dark mb-1"
```

**Error State:**
```typescript
className="border-red-500 focus:ring-red-500"
// Error message
className="text-sm text-red-600 mt-1"
```

### Modal

**Overlay:**
```typescript
className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
```

**Container:**
```typescript
className="fixed inset-0 z-50 flex items-center justify-center p-4"
```

**Content:**
```typescript
className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
```

**Header:**
```typescript
className="text-2xl font-bold text-wealth-dark mb-4"
```

## Icon Usage

Using Lucide React icons:

```typescript
import { DollarSign, Clock, TrendingUp, Trash2, Edit2, Plus } from 'lucide-react'

// Standard size
<DollarSign className="w-5 h-5" />

// Small (in buttons)
<Plus className="w-4 h-4" />

// Large (in empty states)
<Clock className="w-12 h-12 text-gray-400" />

// With color
<TrendingUp className="w-5 h-5 text-wealth-emerald" />
```

**Common Icons:**
- `DollarSign`: Value displays, financial data
- `Clock`: Time-related features
- `TrendingUp`: Growth, high-value indicators
- `Calendar`: Date selection
- `Plus`: Add/create actions
- `Edit2`: Edit actions
- `Trash2`: Delete actions
- `X`: Close modals
- `Check`: Confirm actions

## Responsive Breakpoints

```typescript
// Mobile first approach
sm: '640px'   // Small tablets
md: '768px'   // Tablets
lg: '1024px'  // Laptops
xl: '1280px'  // Desktops
```

**Layout Patterns:**
```typescript
// Sidebar: Full width on mobile, fixed width on desktop
className="w-full lg:w-80 lg:fixed lg:left-0 lg:top-0 lg:h-screen"

// Main content: Full width on mobile, with margin on desktop
className="w-full lg:ml-80"

// Grid: 1 column mobile, 2 columns tablet, 3 columns desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
```

## Animation & Transitions

Use subtle transitions for better UX:

```typescript
// Hover effects
className="transition-colors duration-200"
className="transition-shadow duration-200"
className="transition-transform duration-200 hover:scale-105"

// Modal entrance
className="animate-in fade-in duration-200"

// Loading states
className="animate-pulse"
```

## Accessibility

### Focus States
Always include visible focus indicators:
```typescript
className="focus:ring-2 focus:ring-wealth-emerald focus:ring-offset-2 
           focus:outline-none"
```

### Color Contrast
Ensure WCAG AA compliance:
- Text on light background: Use `text-wealth-dark` or darker
- Text on dark background: Use `text-white`
- Links: Use `text-blue-600 hover:text-blue-800`

### Interactive Elements
- Minimum touch target: 44x44px (use `p-3` or larger)
- Clear hover states
- Disabled state: `opacity-50 cursor-not-allowed`

## Example Component

```typescript
import { DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ValueBadgeProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function ValueBadge({ value, size = 'md', className }: ValueBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-full font-value",
      "bg-wealth-gold/10 text-wealth-gold border border-wealth-gold/20",
      size === 'sm' && "px-2 py-0.5 text-xs",
      size === 'md' && "px-2.5 py-0.5 text-sm",
      size === 'lg' && "px-3 py-1 text-base",
      className
    )}>
      <DollarSign className={cn(
        size === 'sm' && "w-3 h-3",
        size === 'md' && "w-4 h-4",
        size === 'lg' && "w-5 h-5"
      )} />
      {formatCurrency(value)}
    </span>
  )
}
```
