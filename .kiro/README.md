# Kiro Workspace Configuration

This directory contains Kiro-specific configurations that enhance the development workflow for the Opportunity Cost Calendar project.

## Directory Structure

```
.kiro/
├── specs/              # Feature specifications (requirements, design, tasks)
├── hooks/              # Automated workflow triggers
├── steering/           # Development guidelines and standards
└── README.md          # This file
```

## Specs

The `specs/` directory contains structured feature specifications following the Kiro spec workflow:

### opportunity-calendar/
- **requirements.md**: Acceptance criteria (AC-1 through AC-8) defining what the application must do
- **design.md**: Architecture decisions, component hierarchy, and correctness properties (P-1 through P-8)
- **tasks.md**: Implementation tasks organized by phase with property/AC mappings

### Using Specs
1. Review requirements to understand user needs
2. Study design for technical approach
3. Follow tasks sequentially for implementation
4. Reference property mappings to ensure correctness

## Hooks

Automated workflows that trigger on specific events:

### Manual Hooks (Click to Run)
- **pre-commit-check.json**: Runs TypeScript and ESLint before committing
- **dev-server.json**: Starts Vite development server
- **build-check.json**: Builds for production and reports errors

### Automatic Hooks (Trigger on Events)
- **update-docs.json**: Reminds to update docs when new components are added
- **test-after-store-change.json**: Suggests testing when store files are modified

### Creating New Hooks
Use the Kiro Hook UI (Command Palette → "Open Kiro Hook UI") to create custom hooks for:
- Running tests on file save
- Formatting code before commit
- Updating translations
- Custom build processes

## Steering

Development guidelines that are automatically included in Kiro's context:

### Always Included
- **project-standards.md**: Core coding standards, TypeScript rules, React patterns, commit conventions

### Conditionally Included (File Match)
- **component-patterns.md**: Included when working in `src/components/**/*.tsx`
- **value-calculation.md**: Included when working in `src/store/**/*.ts`
- **ui-design-system.md**: Included when working in `src/components/ui/**/*.tsx`

### How Steering Works
When you're editing a file, Kiro automatically includes relevant steering files in its context, ensuring consistent code style and best practices without manual reference.

## Workflow Example

### Implementing a New Feature

1. **Spec Phase**
   - Create or review spec in `.kiro/specs/`
   - Define requirements, design, and tasks
   - Use `#[[file:path]]` to reference external docs

2. **Development Phase**
   - Kiro automatically loads relevant steering rules
   - Hooks remind you of testing and documentation
   - Follow task checklist in `tasks.md`

3. **Quality Check Phase**
   - Run "Pre-Commit Quality Check" hook
   - Verify TypeScript and ESLint pass
   - Test data persistence and responsiveness

4. **Commit Phase**
   - Follow commit message format from project-standards.md
   - Example: `feat: add project CRUD operations`

## Benefits

### For Solo Developers
- Consistent code style across sessions
- Automated reminders for best practices
- Structured approach to complex features

### For Teams
- Shared standards and conventions
- Onboarding documentation built-in
- Automated quality checks

### For AI Assistance
- Kiro understands project context automatically
- Steering rules guide code generation
- Specs provide clear implementation roadmap

## Customization

### Adding New Steering Rules
Create a new `.md` file in `.kiro/steering/` with frontmatter:

```markdown
---
inclusion: always
---

# Your Custom Rule

Content here...
```

Options:
- `inclusion: always` - Always included
- `inclusion: fileMatch` + `fileMatchPattern: "*.test.ts"` - Conditional
- `inclusion: manual` - Only when referenced with `#` in chat

### Adding New Hooks
Create a new `.json` file in `.kiro/hooks/`:

```json
{
  "name": "Hook Name",
  "description": "What it does",
  "trigger": {
    "type": "manual" | "onSave" | "onMessage",
    "filePattern": "src/**/*.ts"
  },
  "action": {
    "type": "command" | "message",
    "command": "npm test",
    "message": "Reminder text"
  }
}
```

## Best Practices

1. **Keep specs updated**: As requirements change, update the spec files
2. **Reference properties**: When implementing, note which property (P-X) you're addressing
3. **Use hooks**: Don't skip quality checks - run hooks before committing
4. **Follow steering**: The rules exist to maintain consistency
5. **Document decisions**: Add new steering files for project-specific patterns

## Resources

- [Kiro Specs Documentation](https://docs.kiro.ai/specs)
- [Kiro Hooks Guide](https://docs.kiro.ai/hooks)
- [Kiro Steering Reference](https://docs.kiro.ai/steering)

---

**Note**: The `.kiro` directory should be committed to version control to share workflow configurations with the team.
