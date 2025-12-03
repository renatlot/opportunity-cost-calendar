# Requirements: Opportunity Cost Calendar

## Overview
A web-based calendar application that treats time as financial capital, built on Eliyahu Goldratt's Theory of Constraints and the concept of Opportunity Cost.

## Core Problem Statement
Standard calendars treat time as a flat resource. An hour spent on low-leverage admin work looks identical to an hour spent on a high-value strategic project. This application solves this by treating time as financial capital with measurable ROI.

## Acceptance Criteria

### AC-1: Project Management (Asset Management)
**Given** a user wants to manage their time investments
**When** they access the project management interface
**Then** they should be able to:
- Create a new project with name, description, color, and hourly rate ($/hr)
- Edit existing project details
- Delete projects (with confirmation if time logs exist)
- View all projects in a portfolio dashboard
- See calculated "Current Valuation" (Total Hours × Hourly Rate) for each project

### AC-2: Time Box Templates (Background Layer)
**Given** a user wants to structure their ideal day
**When** they define time box templates
**Then** they should be able to:
- Create named time boxes (e.g., "Deep Work", "Admin", "Health")
- Set start and end times for each box
- Assign colors and opacity levels
- See these boxes replicated automatically across all days in the calendar
- Edit or delete time box templates

### AC-3: Time Logging (Investment Transactions)
**Given** a user wants to log time against a project
**When** they interact with the calendar
**Then** they should be able to:
- Drag a project onto a specific time slot
- Click a time slot and select a project from a list
- See the calculated value (Duration × Project Rate) immediately
- Edit or delete existing time logs
- See visual feedback (color, value badge) on logged time

### AC-4: Value Calculation
**Given** time is logged against projects
**When** calculations are performed
**Then** the system should:
- Calculate duration in hours between start and end times
- Multiply duration by project hourly rate to get value
- Update project total value in real-time
- Update daily/weekly/monthly portfolio totals
- Persist all calculations to localStorage

### AC-5: Analytics Dashboard
**Given** a user wants to understand their time investment
**When** they view the analytics dashboard
**Then** they should see:
- Total Portfolio Value for current week/month
- Breakdown by project (hours and value)
- High-value vs. low-value time comparison
- Visual charts or indicators showing investment distribution

### AC-6: Opportunity Cost Awareness
**Given** a user attempts to delete a logged time block
**When** they initiate the deletion
**Then** the system should:
- Display a confirmation prompt
- Show the dollar value being removed
- Require explicit confirmation (e.g., "You are removing a $1,500 investment")

### AC-7: Responsive Design
**Given** users access the app on various devices
**When** they view the calendar
**Then** the interface should:
- Be fully responsive (mobile, tablet, desktop)
- Maintain usability on smaller screens
- Use mobile-first Tailwind CSS approach

### AC-8: Data Persistence
**Given** a user makes changes to projects or time logs
**When** they close and reopen the application
**Then** all data should:
- Persist in browser localStorage
- Load automatically on app initialization
- Maintain data integrity across sessions

## Non-Functional Requirements

### NFR-1: Performance
- Calendar should render within 100ms for a week view
- State updates should feel instantaneous (<50ms)

### NFR-2: Accessibility
- Keyboard navigation support
- ARIA labels for screen readers
- Sufficient color contrast ratios

### NFR-3: Code Quality
- TypeScript strict mode enabled
- No ESLint errors or warnings
- Modular, maintainable component structure

### NFR-4: Visual Design
- Wealth management aesthetic (emerald, gold, clean whites)
- Dollar values prominently displayed (bold, large font)
- Clear visual hierarchy (value > time > labels)
