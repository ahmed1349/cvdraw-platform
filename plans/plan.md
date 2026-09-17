# ATS CV Platform — React

## 1. Project Overview

Build a modern, professional **ATS-friendly CV/Resume Builder platform** using React.

The platform allows users to:

1. Create a CV using structured sections.
2. Enter their information once.
3. Select different CV templates.
4. Preview the same CV data using different templates.
5. Create multiple CV versions.
6. Export the CV as a high-quality PDF.
7. Optimize the CV structure for Applicant Tracking Systems (ATS).
8. Support two major template categories:

   * Software Engineer / Technical CVs — up to 30 templates.
   * Content Creator / Creative CVs — up to 10 templates.

The primary goal is:

> **ATS compatibility first, visual design second.**

The platform should produce CVs that remain highly readable by ATS systems while still looking modern and professional.

---

# 2. Core Product Philosophy

Do NOT build the system as 40 independent CV editors.

Build:

```text
CV Data
   ↓
Normalized CV Schema
   ↓
CV Editor
   ↓
Template Engine
   ↓
Template Renderer
   ↓
PDF Renderer
```

The same CV data must work with every template.

For example:

```text
User Data
    ↓
{
  personalInfo,
  summary,
  experience,
  education,
  skills,
  projects,
  certifications,
  ...
}
    ↓
Template A
Template B
Template C
...
    ↓
PDF
```

Changing the template must NEVER require the user to enter their information again.

---

# 3. Technology Stack

Use:

* React
* Vite
* TypeScript
* React Router
* Tailwind CSS
* Zustand or another lightweight state manager
* React Hook Form
* Zod
* Lucide React icons

PDF:

Prefer a reliable browser-based PDF generation approach that preserves:

* selectable text
* correct document structure
* fonts
* spacing
* page breaks
* A4 dimensions

Avoid solutions that convert the CV into a single image before generating the PDF.

The generated PDF should contain real text whenever possible.

---

# 4. Design System

## Primary Colors

The platform should use a clean:

### Mint Green

```text
#98FFCC
```

Secondary mint:

```text
#6FE7B7
```

Dark green:

```text
#12372A
```

Very light background:

```text
#F8FAF9
```

White:

```text
#FFFFFF
```

Text:

```text
#17201C
```

Muted text:

```text
#66736D
```

Border:

```text
#DDE7E2
```

The overall visual style should be:

* modern
* clean
* premium
* minimal
* professional
* SaaS-like
* spacious
* trustworthy

Do NOT make the UI look like a gaming dashboard.

---

# 5. Application Structure

Create the following main pages:

```text
/
├── Landing Page
├── Templates
├── Create CV
├── CV Editor
├── CV Preview
├── My CVs
├── Settings
└── Authentication
```

---

# 6. Landing Page

Create a professional landing page.

Hero:

```text
Build a CV that gets read.

Create professional, ATS-friendly resumes in minutes.
Choose from modern templates designed for technical and creative careers.
```

Primary CTA:

```text
Create My CV
```

Secondary CTA:

```text
Explore Templates
```

Show:

* ATS-first approach
* Template gallery
* CV editor preview
* PDF export
* multiple CV versions
* software engineer templates
* content creator templates

Include a visual preview of the CV builder.

---

# 7. Template Categories

Create two categories.

## Category 1 — Software Engineer

Maximum:

```text
30 templates
```

These templates should focus on:

* software engineering
* frontend development
* backend development
* full-stack development
* DevOps
* cloud
* AI/ML
* data engineering
* cybersecurity
* mobile development
* QA/testing

Design characteristics:

* highly ATS-readable
* clean typography
* one-column or controlled two-column layouts
* strong section hierarchy
* minimal graphics
* no unnecessary icons
* no skill bars
* no decorative charts

---

# 8. Software Engineer Template List

Create the template architecture for the following 30 templates:

### SE-01 — Classic Engineer

Traditional one-column professional CV.

### SE-02 — Modern Engineer

Modern spacing with strong headings.

### SE-03 — Minimal Code

Minimal monochrome technical layout.

### SE-04 — Technical Professional

Strong technical skills hierarchy.

### SE-05 — Full Stack

Optimized for full-stack developers.

### SE-06 — Backend Engineer

Experience and technical stack focused.

### SE-07 — Frontend Engineer

Projects, frontend technologies and experience focused.

### SE-08 — AI Engineer

AI/ML/project-oriented layout.

### SE-09 — Data Engineer

Data stack and project emphasis.

### SE-10 — DevOps Engineer

Cloud, infrastructure and tooling emphasis.

### SE-11 — Cloud Engineer

Cloud certifications and infrastructure emphasis.

### SE-12 — Cybersecurity

Security skills and certifications emphasis.

### SE-13 — Mobile Engineer

Mobile technologies and application projects.

### SE-14 — QA Engineer

Testing experience and automation emphasis.

### SE-15 — Software Architect

Architecture, leadership and experience focused.

### SE-16 — Senior Engineer

Experience-heavy senior profile.

### SE-17 — Engineering Lead

Leadership and technical achievements.

### SE-18 — Startup Engineer

Compact modern startup CV.

### SE-19 — Product Engineer

Engineering + product experience.

### SE-20 — Open Source

Projects and GitHub contribution emphasis.

### SE-21 — Academic Engineer

Education/research/project focused.

### SE-22 — Graduate Engineer

Entry-level / graduate optimized.

### SE-23 — Internship Engineer

Internship and project focused.

### SE-24 — International Engineer

Designed for international applications.

### SE-25 — Compact Engineer

High information density while maintaining readability.

### SE-26 — Executive Technical

Senior technical professional.

### SE-27 — Research Engineer

Research/project oriented.

### SE-28 — AI Research

Research papers, projects and technical skills.

### SE-29 — Developer Portfolio

Projects receive stronger visual hierarchy while remaining ATS-readable.

### SE-30 — Universal Engineer

General software engineering CV suitable for most roles.

---

# 9. Content Creator Templates

Maximum:

```text
10 templates
```

These can have slightly more visual personality while remaining machine-readable.

### CC-01 — Modern Creator

### CC-02 — Social Media Creator

### CC-03 — Digital Creator

### CC-04 — Content Strategist

### CC-05 — Creative Professional

### CC-06 — Brand Creator

### CC-07 — Marketing Creator

### CC-08 — Media Creator

### CC-09 — Influencer Professional

### CC-10 — Creator Executive

Creative templates may use:

* subtle color accents
* controlled visual hierarchy
* social media links
* portfolio links
* brand information

But avoid:

* text rendered as images
* excessive graphics
* skill bars
* charts
* important information represented only through icons
* complex tables
* decorative elements that interfere with text extraction

---

# 10. Universal CV Data Schema

Create a central TypeScript interface.

```ts
interface CVData {
  id: string;

  title: string;

  templateId: string;

  personalInfo: PersonalInfo;

  summary: string;

  experience: Experience[];

  education: Education[];

  skills: SkillGroup[];

  projects: Project[];

  certifications: Certification[];

  achievements: Achievement[];

  languages: Language[];

  links: SocialLink[];

  customSections: CustomSection[];

  settings: CVSettings;
}
```

---

# 11. Personal Information

```ts
interface PersonalInfo {
  fullName: string;

  professionalTitle: string;

  email: string;

  phone: string;

  website?: string;

  linkedin?: string;

  github?: string;

  portfolio?: string;
}
```

Do NOT require:

* photo
* date of birth
* gender
* marital status
* nationality

These should not be default CV fields.

---

# 12. Experience

```ts
interface Experience {
  id: string;

  company: string;

  position: string;

  location?: string;

  startDate: string;

  endDate?: string;

  current: boolean;

  description: string;

  achievements: string[];
}
```

The editor should encourage achievement-based descriptions.

Example:

Bad:

```text
Worked on React applications.
```

Better:

```text
Developed React-based applications that reduced page load time by 35%.
```

Provide optional writing assistance UI later.

---

# 13. Education

```ts
interface Education {
  id: string;

  institution: string;

  degree: string;

  field?: string;

  startDate?: string;

  endDate?: string;

  grade?: string;

  location?: string;

  description?: string;
}
```

---

# 14. Skills

```ts
interface SkillGroup {
  id: string;

  category: string;

  skills: string[];
}
```

Examples:

```text
Frontend
React
TypeScript
JavaScript
Next.js

Backend
Django
Node.js
REST APIs

Database
PostgreSQL
MySQL
MongoDB

DevOps
Docker
GitHub Actions
AWS
```

Do NOT use visual skill percentages.

Never render:

```text
React       █████████░ 90%
Python      ████████░░ 80%
```

This is poor ATS practice.

Use text-based skills instead.

---

# 15. Projects

```ts
interface Project {
  id: string;

  name: string;

  role?: string;

  description: string;

  technologies: string[];

  startDate?: string;

  endDate?: string;

  url?: string;

  github?: string;

  achievements?: string[];
}
```

---

# 16. Certifications

```ts
interface Certification {
  id: string;

  name: string;

  issuer: string;

  date?: string;

  credentialId?: string;

  url?: string;
}
```

---

# 17. Languages

```ts
interface Language {
  id: string;

  name: string;

  proficiency: string;
}
```

Example:

```text
Arabic — Native
English — Professional Working Proficiency
```

Do not represent proficiency using stars or progress bars.

---

# 18. Custom Sections

Allow users to add custom sections.

Examples:

```text
Publications
Awards
Volunteer Experience
Professional Memberships
Interests
References
Additional Information
```

```ts
interface CustomSection {
  id: string;

  title: string;

  items: CustomSectionItem[];
}
```

---

# 19. CV Editor

The editor should use a three-part desktop layout:

```text
┌──────────────────────────────────────────────────────────┐
│ Header                                                   │
├──────────────┬───────────────────────────┬───────────────┤
│              │                           │               │
│ Sections     │ Form Editor               │ Live Preview  │
│              │                           │               │
│              │                           │               │
└──────────────┴───────────────────────────┴───────────────┘
```

Left:

```text
CV Sections

Personal Information
Professional Summary
Experience
Education
Skills
Projects
Certifications
Achievements
Languages
Links
Custom Sections
```

Center:

The selected section's editor.

Right:

Live CV preview.

---

# 20. Editor UX

Each section should support:

* Add
* Edit
* Delete
* Duplicate
* Reorder
* Collapse
* Expand

Use drag-and-drop where appropriate.

Example:

```text
Experience

☰ Senior Software Engineer
   Origin Technologies

☰ Software Engineer
   Previous Company

+ Add Experience
```

Users should be able to reorder sections.

---

# 21. Section Visibility

Every section should have:

```text
Visible / Hidden
```

For example:

```text
☑ Experience
☑ Education
☑ Skills
☑ Projects
☐ Awards
```

Hidden sections should not be rendered in the PDF.

---

# 22. Live Preview

The preview must update immediately when the user changes data.

Important:

The preview must use the exact same template renderer used for PDF generation.

Do NOT create:

```text
Preview Renderer
PDF Renderer
```

with separate markup.

Instead:

```text
CVTemplate
   ↓
HTML/CSS representation
   ↓
Browser Preview
   ↓
PDF
```

This prevents preview/PDF differences.

---

# 23. Template Architecture

Create a reusable template interface.

```ts
interface CVTemplateProps {
  data: CVData;
  mode?: "preview" | "print";
}
```

Every template must implement:

```tsx
<CVTemplate
  data={cvData}
/>
```

Template registry:

```ts
const templateRegistry = {
  "se-01": ClassicEngineerTemplate,
  "se-02": ModernEngineerTemplate,
  "se-03": MinimalCodeTemplate,
  ...
};
```

The application should dynamically render:

```tsx
const Template = templateRegistry[data.templateId];

return <Template data={data} />;
```

---

# 24. Reusable CV Components

Create reusable components:

```text
CVHeader
CVSection
CVExperience
CVEducation
CVSkills
CVProjects
CVCertifications
CVAchievements
CVLanguages
CVLinks
CVCustomSection
```

Templates should compose these components rather than duplicating all logic.

Example:

```tsx
<CVHeader />

<CVSection title="Professional Summary">
   ...
</CVSection>

<CVSection title="Experience">
   <CVExperience />
</CVSection>
```

---

# 25. ATS Requirements

ATS compatibility is the highest priority.

The system should follow these rules:

### Typography

Use ATS-safe fonts such as:

* Arial
* Helvetica
* Calibri
* Georgia
* Times New Roman
* Inter

Provide a small font selector.

Default:

```text
Inter
```

But ensure PDF text remains extractable.

---

# 26. ATS Layout Rules

Templates should avoid:

* images containing important text
* text inside canvas elements
* excessive columns
* complex tables
* charts
* progress bars
* skill percentages
* decorative text boxes
* text rendered as SVG
* headers containing essential information
* footers containing essential information

Use semantic HTML:

```html
<header>
<section>
<h1>
<h2>
<h3>
<ul>
<li>
<p>
```

---

# 27. ATS Score

Create an ATS analysis system.

Important:

Do NOT claim that the platform can guarantee:

```text
99% ATS compatibility
```

because ATS systems differ.

Instead, provide:

```text
ATS Readability
```

and an internal score based on measurable checks.

Example:

```text
ATS Readability: 94/100
```

Checks:

```text
✓ Contact information detected
✓ Professional title detected
✓ Experience section detected
✓ Education section detected
✓ Skills section detected
✓ Standard section headings
✓ No image-based text
✓ No skill bars
✓ No excessive tables
✓ Text extraction available
✓ Valid email
✓ LinkedIn URL detected
✓ Consistent date format
```

The score should be clearly described as an internal structural/readability score, not a guarantee of ATS performance.

---

# 28. ATS Analyzer

Create:

```text
src/features/ats/
```

with:

```text
atsAnalyzer.ts
atsRules.ts
atsTypes.ts
```

Example:

```ts
interface ATSResult {
  score: number;

  checks: ATSCheck[];

  warnings: ATSWarning[];

  suggestions: string[];
}
```

---

# 29. ATS Warnings

Examples:

```text
Your CV does not contain a Professional Summary.

Your experience section contains descriptions without measurable achievements.

Your skills are not grouped into categories.

Your phone number is missing.

Your LinkedIn profile is missing.

Your CV contains a custom section name that may be difficult for some ATS systems to identify.

Your CV exceeds the recommended page length for an entry-level profile.
```

Do not scare users with fake claims such as:

```text
Your CV will be rejected by ATS.
```

---

# 30. Template Selector

Create a professional template gallery.

Filters:

```text
All
Software Engineer
Content Creator
One Column
Two Column
Minimal
Modern
Classic
Compact
```

Each template card displays:

* preview
* template name
* category
* layout type
* ATS indicator
* Select button

Example:

```text
┌───────────────────────┐
│                       │
│     CV PREVIEW        │
│                       │
│                       │
├───────────────────────┤
│ Modern Engineer       │
│ Software Engineer     │
│                       │
│ ATS-friendly          │
│                       │
│ [Use Template]        │
└───────────────────────┘
```

---

# 31. Template Switching

When switching templates:

```text
Current CV data
      ↓
Change template
      ↓
Same data
      ↓
New visual layout
```

Never duplicate or transform the actual CV data unnecessarily.

---

# 32. PDF Export

Provide:

```text
Download PDF
```

and:

```text
Print / Save as PDF
```

PDF requirements:

* A4
* selectable text
* high quality
* correct margins
* correct page breaks
* no clipped content
* no unexpected blank pages
* no overlapping elements

Recommended CSS:

```css
@page {
  size: A4;
  margin: 0;
}
```

Each template must define print styles.

---

# 33. Page Break Management

Experience and project entries must not randomly split.

Use:

```css
break-inside: avoid;
page-break-inside: avoid;
```

Where appropriate.

Section headings should not appear alone at the bottom of a page.

Use:

```css
break-after: avoid;
```

when appropriate.

---

# 34. PDF Validation

Before allowing export, run basic validation:

```text
✓ CV has name
✓ CV has contact information
✓ CV has at least one major section
✓ No overflow detected
✓ No empty pages
✓ Valid A4 dimensions
```

Show:

```text
Ready to export
```

or:

```text
Review your CV before exporting
```

---

# 35. CV Management

Create a dashboard:

```text
My CVs
```

Each CV card:

```text
Software Engineer CV
Modern Engineer

Last updated:
17 Sep 2026

[Edit]
[Duplicate]
[Change Template]
[Download]
[Delete]
```

Users can create multiple versions.

Examples:

```text
Software Engineer — General
Software Engineer — AI
Frontend Engineer
Backend Engineer
```

---

# 36. Duplicate CV

When duplicating:

```text
Original CV
    ↓
Clone CVData
    ↓
New CV ID
```

Do not mutate the original CV.

---

# 37. Data Persistence

Initially create a clean persistence abstraction.

```ts
interface CVStorage {
  getCV(id: string): Promise<CVData | null>;

  getAllCVs(): Promise<CVData[]>;

  createCV(cv: CVData): Promise<void>;

  updateCV(cv: CVData): Promise<void>;

  deleteCV(id: string): Promise<void>;
}
```

For the first implementation, local storage can be used.

Structure the code so it can later be replaced with:

```text
REST API
```

or:

```text
Supabase
```

without rewriting the editor.

---

# 38. Autosave

Autosave CV changes.

Display:

```text
Saved
```

or:

```text
Saving...
```

or:

```text
Unsaved changes
```

Debounce save operations.

Do not save on every keystroke directly.

---

# 39. Responsive Design

Desktop:

```text
Editor + Preview
```

Tablet:

```text
Editor
Preview toggle
```

Mobile:

```text
Editor
Preview
```

The mobile editor should not attempt to squeeze the full desktop layout onto a phone.

---

# 40. Component Architecture

Use:

```text
src/
├── app/
│   ├── router/
│   ├── providers/
│   └── store/
│
├── components/
│   ├── ui/
│   ├── forms/
│   └── layout/
│
├── features/
│   ├── cv/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── editor/
│   ├── templates/
│   │   ├── software-engineer/
│   │   └── content-creator/
│   │
│   ├── ats/
│   ├── pdf/
│   └── dashboard/
│
├── pages/
│
├── lib/
│
└── styles/
```

---

# 41. Template Folder Structure

Example:

```text
templates/
└── software-engineer/
    ├── se-01-classic/
    │   ├── ClassicEngineer.tsx
    │   ├── styles.css
    │   └── metadata.ts
    │
    ├── se-02-modern/
    ├── se-03-minimal/
    └── ...
```

Metadata:

```ts
interface TemplateMetadata {
  id: string;

  name: string;

  category: "software-engineer" | "content-creator";

  layout: "one-column" | "two-column";

  atsLevel: "high";

  description: string;

  recommendedFor: string[];
}
```

---

# 42. Important Template Rule

Do not create 40 completely different codebases.

Create a design system with reusable primitives.

For example:

```text
CVHeader
CVSection
ExperienceItem
EducationItem
ProjectItem
SkillGroup
```

Templates control:

```text
spacing
font sizes
font weights
border styles
section layout
colors
alignment
column structure
```

The data remains identical.

---

# 43. Template Color Strategy

The user's selected color should be configurable.

Example:

```ts
interface CVSettings {
  accentColor: string;

  fontFamily: string;

  fontSize: "small" | "medium" | "large";

  spacing: "compact" | "normal" | "comfortable";

  showIcons: boolean;

  pageSize: "A4";

  sectionOrder: string[];
}
```

Default accent:

```text
#12372A
```

Platform UI:

```text
Mint Green + White
```

CV templates themselves should mostly use professional neutral colors.

---

# 44. Software Engineer CV Defaults

When creating a new Software Engineer CV, automatically create:

```text
Personal Information
Professional Summary
Technical Skills
Experience
Projects
Education
Certifications
Languages
```

Recommended ordering:

```text
Header
Summary
Technical Skills
Experience
Projects
Education
Certifications
```

But allow the user to reorder sections.

---

# 45. Content Creator CV Defaults

```text
Personal Information
Professional Summary
Experience
Content Portfolio
Skills
Achievements
Education
Certifications
Social Links
```

---

# 46. Smart Content Guidance

The editor should provide lightweight guidance.

For example:

```text
Professional Summary

Tip:
Keep your summary focused on your role, experience,
specialization and measurable impact.
```

Experience:

```text
Tip:
Start bullets with strong action verbs.

Examples:
Developed
Designed
Implemented
Optimized
Automated
Led
Architected
Reduced
Improved
```

Do not automatically rewrite user content without explicit action.

---

# 47. Technical Validation

Use Zod schemas for:

```text
CVData
PersonalInfo
Experience
Education
Skills
Projects
Certifications
Languages
```

Validate before:

* saving
* switching templates
* exporting PDF

---

# 48. Accessibility

Follow WCAG principles.

Requirements:

* keyboard navigation
* visible focus states
* semantic HTML
* accessible labels
* sufficient contrast
* ARIA only when necessary
* no color-only status indicators

---

# 49. Performance

The CV preview should remain responsive.

Requirements:

* debounce autosave
* memoize expensive template rendering
* lazy-load template components
* lazy-load template previews
* avoid rerendering the entire editor when editing one field
* use stable IDs for list items

---

# 50. Future Backend Compatibility

Keep frontend architecture ready for a backend.

Possible future API:

```text
POST /api/cvs/
GET /api/cvs/
GET /api/cvs/:id/
PUT /api/cvs/:id/
DELETE /api/cvs/:id/
GET /api/templates/
POST /api/export/
```

Do not tightly couple the UI directly to localStorage.

Use service abstractions.

---

# 51. Authentication

Do not implement complex authentication during the initial UI phase.

Create an authentication abstraction:

```ts
AuthService
```

that can later support:

* JWT
* Supabase Auth
* OAuth

Potential providers:

```text
Google
GitHub
Email
```

---

# 52. Error Handling

Never silently fail.

Examples:

```text
Unable to save CV.
Please try again.
```

```text
PDF export failed.
Your CV is still saved.
```

Never lose the user's CV data because PDF generation failed.

---

# 53. Empty States

Create professional empty states.

Example:

```text
No CVs yet

Create your first professional CV
and start building your career profile.

[Create CV]
```

---

# 54. UX Flow

Primary flow:

```text
Landing Page
      ↓
Create CV
      ↓
Choose Category
      ↓
Choose Template
      ↓
CV Editor
      ↓
Enter Information
      ↓
Live Preview
      ↓
ATS Analysis
      ↓
Review
      ↓
Export PDF
```

---

# 55. Create CV Flow

Step 1:

```text
What type of CV are you creating?

[ Software Engineer ]

[ Content Creator ]
```

Step 2:

```text
Choose a template
```

Step 3:

```text
Start building your CV
```

---

# 56. ATS Panel

Add a collapsible panel in the editor.

Example:

```text
ATS READABILITY

94 / 100

✓ Contact information
✓ Standard section headings
✓ Experience detected
✓ Skills detected
✓ Education detected
✓ Text-based content

Suggestions

! Add measurable achievements
! Add LinkedIn URL
```

The ATS panel should be useful, not decorative.

---

# 57. Template Preview

Allow:

```text
Template
```

button.

The user can preview several templates using the current CV data.

Example:

```text
[Template 01]
[Template 02]
[Template 03]
```

Selecting a template should instantly update the preview.

---

# 58. Print CSS

Every template must have dedicated print behavior.

Create:

```text
@media print
```

Rules must ensure:

* no application sidebar
* no editor controls
* no buttons
* no shadows that reduce print quality
* correct A4 dimensions
* correct margins
* correct page breaks

---

# 59. Development Rules

IMPORTANT:

Before implementing anything:

1. Inspect the existing project.
2. Understand the current architecture.
3. Do not delete existing working code.
4. Reuse existing components when appropriate.
5. Follow existing naming conventions.
6. Avoid unnecessary dependencies.
7. Keep components small.
8. Keep business logic outside UI components.
9. Use TypeScript strictly.
10. Avoid `any` unless absolutely necessary.

When modifying existing code:

```text
Do not rewrite the entire file unnecessarily.
```

Make targeted changes.

---

# 60. Cursor Implementation Strategy

Implement the project in phases.

## Phase 1 — Foundation

Build:

* project structure
* design system
* routing
* reusable UI
* CV types
* CV store
* local persistence

Do NOT build all 40 templates yet.

---

## Phase 2 — CV Editor

Build:

* personal information
* summary
* experience
* education
* skills
* projects
* certifications
* languages
* custom sections
* section ordering
* visibility
* autosave

---

## Phase 3 — Template Engine

Build:

* template registry
* reusable CV components
* template metadata
* template selector

Create only:

```text
SE-01
SE-02
SE-03
```

first.

Validate architecture before creating the remaining templates.

---

## Phase 4 — PDF

Implement:

* A4
* print styles
* PDF export
* page breaks
* text preservation
* export validation

Test with long CVs.

Test:

```text
1 page
2 pages
3 pages
```

---

## Phase 5 — ATS Analyzer

Implement:

* structural checks
* contact checks
* section checks
* formatting checks
* warnings
* suggestions
* internal ATS readability score

---

## Phase 6 — Remaining Templates

Implement:

```text
SE-04 → SE-30
CC-01 → CC-10
```

Every template must use the same CV schema.

---

## Phase 7 — CV Dashboard

Implement:

* My CVs
* duplicate
* rename
* delete
* template switching
* export

---

# 61. Critical Acceptance Criteria

The application is considered successful only if:

### Data

One CV can render using every template.

### Template Switching

Changing templates does not change CV content.

### PDF

PDF contains selectable text.

### ATS

Important information is represented as actual text.

### Layout

No overlapping content.

### Pagination

No unexpected blank pages.

### Editing

Changes appear immediately in preview.

### Persistence

Refreshing the browser does not lose the CV.

### Templates

At least:

```text
3 Software Engineer templates
```

must work before implementing all remaining templates.

---

# 62. Final Product Goal

The final product should feel like a professional SaaS product rather than a simple form builder.

The experience should be:

```text
Create
    ↓
Write
    ↓
Preview
    ↓
Improve
    ↓
Check ATS readability
    ↓
Choose template
    ↓
Export
```

The most important architectural principle is:

> **Content is independent from presentation.**

The user's CV data is the source of truth.

Templates are presentation layers.

PDF export is a rendering layer.

ATS analysis is a validation layer.

Do not mix these responsibilities.

---

# 63. First Development Task

Start by implementing ONLY:

1. Project foundation
2. Mint/white design system
3. Application routing
4. CVData TypeScript schema
5. CV Zustand store
6. LocalStorage persistence
7. Create CV flow
8. CV editor shell
9. Personal Information section
10. Professional Summary section
11. Experience section
12. One-column `SE-01 Classic Engineer` template
13. Live preview

Do not implement the other templates yet.

After `SE-01` works correctly in both browser preview and PDF export, create the reusable template architecture and then scale it to the remaining templates.

Do not prematurely build 40 templates before validating the underlying architecture.
