# Copilot Instructions for addisjackson.github.io

## Project Overview
This is a GitHub Pages portfolio site featuring a portfolio landing page (`index.html`) that dynamically lists deployed projects. The repository serves as both a project showcase and a README template repository (inherited from Best-README-Template).

## Architecture & Key Files
- **`index.html`** - Single-page portfolio with embedded vanilla JavaScript that dynamically renders project links from a hardcoded `projects` array
- **`README.md`** - Best-README-Template documentation; not the primary site content
- **`BLANK_README.md`** - Template starter file for users copying this template
- **`images/`** - Contains `logo.png` and `screenshot.png` for branding

## Critical Patterns

### Project List Management
When adding new projects:
1. Add an object with `folder` and `display` properties to the `projects` array in `index.html`
2. `folder` - the actual subfolder name in the GitHub Pages site (e.g., "captains_logs", "paradise-nursery")
3. `display` - the human-readable name shown to users (e.g., "Captains Logs", "Paradise Nursery")

**Example**: 
```javascript
{ folder: "my-cool-app", display: "My Cool App" }
```
Links to `https://addisjackson.github.io/my-cool-app/` and displays "My Cool App"

### Styling Approach
- Inline CSS only; no external stylesheets
- Dark header (#2c3e50), light body (#f8f9fa)
- Project cards use subtle shadows and hover scale transform (1.02x)
- Responsive: `max-width: 800px` container with `1rem` padding on mobile

## Development Workflow

### Local Testing
Open `index.html` directly in a browser—no build process required. JavaScript runs client-side without dependencies.

### Publishing
This is a GitHub Pages site. Push changes to `master` branch; GitHub automatically publishes to `https://addisjackson.github.io/`.

## Common Tasks

**Add a project**: Edit the `projects` array in `index.html` and commit.

**Update portfolio title/description**: Modify `<h1>` and `<p>` in the `<header>` element.

**Change styling**: Edit the `<style>` block in `<head>`. Keep inline for simplicity.

**Update footer year**: The `<span id="year">` is auto-updated by JavaScript `new Date().getFullYear()`.

## Notes for AI Agents
- This repository has dual purpose: active portfolio + template documentation. Distinguish between maintenance of the portfolio site vs. Best-README-Template guidance in README.md
- Keep JavaScript vanilla (no frameworks) to avoid deployment dependencies
- All projects listed must have accessible URLs at `https://addisjackson.github.io/{projectName}/`
- HTML must remain a single file for GitHub Pages simplicity
