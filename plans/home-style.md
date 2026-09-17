# Grove CV Platform — Homepage Redesign

Redesign the existing homepage of the Grove CV platform.

The current homepage is functional and clean, but it looks too much like a prototype/documentation landing page.

The goal is to transform it into a polished, premium SaaS landing page for an ATS-focused CV builder.

IMPORTANT:
Do not change the core application functionality.
Do not remove existing routes or working components.
Do not rewrite the entire project.
Inspect the existing code first and reuse existing components where appropriate.

==================================================
1. DESIGN DIRECTION
==================================================

The product is:

Grove — ATS-focused CV Builder

Primary audience:

- Software Engineers
- Developers
- AI Engineers
- Technical professionals
- Content Creators

Visual direction:

- Premium SaaS
- Minimal
- Modern
- Professional
- Clean
- Spacious, but not empty
- Strong typography
- Subtle motion
- High-quality product presentation

The current mint/white identity should remain.

Primary colors:

Mint:
#98FFCC

Secondary mint:
#6FE7B7

Dark green:
#12372A

Background:
#F8FAF9

White:
#FFFFFF

Primary text:
#17201C

Muted text:
#66736D

Border:
#DDE7E2

Do NOT introduce a completely different color palette.

Avoid:

- gaming UI
- excessive gradients
- neon effects
- excessive glassmorphism
- huge decorative illustrations
- generic stock imagery
- excessive rounded cards
- excessive shadows

==================================================
2. NAVIGATION
==================================================

Improve the existing navigation.

Desktop:

Left:
Grove logo + wordmark

Center:
Templates
My CVs
Settings

Right:
Create My CV

Make the navbar slightly more premium.

Use:

- subtle bottom border
- white background
- max-width content container
- sticky navigation if appropriate
- smooth hover states

The "Create My CV" button should be the primary mint/dark-green CTA.

Do not make the navbar unnecessarily tall.

==================================================
3. HERO SECTION
==================================================

The current hero has too much empty space.

Redesign it into a stronger two-column hero.

Left side:

Eyebrow:

"ATS-FIRST CV BUILDER"

Headline:

"Build a CV that gets read."

Supporting text:

"Create a professional, ATS-friendly CV in minutes.
Choose from modern templates built for technical and creative careers."

Primary CTA:

"Create My CV"

Secondary CTA:

"Explore Templates"

Below the buttons add trust/value indicators:

✓ ATS-first templates
✓ Selectable-text PDF
✓ 40+ professional templates

Right side:

Create a large interactive-looking product mockup.

This is extremely important.

The current CV editor preview is too small.

The product mockup should occupy approximately 50–55% of the hero visual area.

Show:

- editor sidebar
- form fields
- CV preview
- template selector
- subtle ATS score indicator

Example:

┌─────────────────────────────────────────┐
│ Sections      Personal Information      │
│                                         │
│ Personal      Full name                 │
│ Summary       ┌───────────────────────┐ │
│ Experience    │ Samira Noor           │ │
│ Education     └───────────────────────┘ │
│ Skills                                  │
│ Projects      Professional Title        │
│                                         │
│               ┌───────────────────────┐ │
│               │ Senior Software       │ │
│               │ Engineer              │ │
│               └───────────────────────┘ │
│                                         │
│                          ┌────────────┐ │
│                          │ ATS 94/100 │ │
│                          └────────────┘ │
└─────────────────────────────────────────┘

The CV preview must look like a real professional CV.

Do not use a fake colorful resume.

Use:

- black/dark text
- white paper
- subtle mint accent
- realistic sections
- realistic experience
- realistic skills

The preview should have enough scale to immediately communicate:

"This is a CV builder."

==================================================
4. HERO BACKGROUND
==================================================

Keep the background primarily white/light.

Add extremely subtle visual depth:

- soft mint radial glow
- very subtle grid/dot pattern
- faint abstract lines

Do not make the background distracting.

The product mockup should remain the visual focus.

==================================================
5. TEMPLATE SHOWCASE
==================================================

Immediately after the hero, create a template showcase section.

Heading:

"Templates built for your career"

Supporting text:

"Start with a proven layout, then make it yours."

Add category tabs:

All
Software Engineer
Content Creator

Show 6 template cards.

Example:

SE-01 Classic Engineer
SE-02 Modern Engineer
SE-03 Minimal Code
SE-04 Technical Professional
CC-01 Modern Creator
CC-02 Social Creator

Each card should contain:

- realistic CV thumbnail
- template name
- category
- subtle ATS badge
- hover animation
- "Use template" action

Do not make the cards excessively large.

Create a clean horizontal/grid showcase.

Add:

"View all templates →"

==================================================
6. VALUE PROPOSITION
==================================================

Create a section titled:

"Everything you need to build a better CV."

Use four feature blocks.

1.

ATS-first structure

"Standard sections, selectable text and clean document structure designed for machine readability."

2.

40+ professional templates

"One set of CV data. Switch templates without rewriting your CV."

3.

Live editor + PDF

"See your CV update instantly and export a clean A4 PDF."

4.

Multiple CV versions

"Create targeted versions for different roles without rebuilding your CV."

Use subtle icons from Lucide React.

Do not use giant cards.

Use a clean 2x2 layout or horizontal feature grid.

==================================================
7. ATS SECTION
==================================================

Create a dedicated ATS-focused section.

Heading:

"Designed for ATS. Not just pretty PDFs."

Supporting text:

"Your CV should look good to people and remain readable by applicant tracking systems."

Create a visual split layout.

Left:

ATS analysis panel:

ATS READABILITY

94 / 100

✓ Contact information
✓ Standard section headings
✓ Experience detected
✓ Skills detected
✓ Text-based content
✓ Consistent dates

Suggestions:

! Add measurable achievements
! Add LinkedIn URL

Right:

Explain the approach.

Use:

- semantic text
- standard section headings
- selectable PDF text
- clean document structure
- no skill bars
- no image-based content

IMPORTANT:

Do not claim that the product guarantees a specific ATS percentage.

Use language such as:

"ATS-first"
"ATS-readable"
"ATS-focused"
"ATS readability analysis"

==================================================
8. HOW IT WORKS
==================================================

Add a simple four-step section.

01
Choose a template

02
Add your information

03
Improve your CV

04
Export your PDF

Use a horizontal process on desktop.

Use vertical layout on mobile.

Keep this section visually simple.

==================================================
9. SOFTWARE ENGINEER SECTION
==================================================

Create a dedicated section for the primary target audience.

Heading:

"Built for technical careers"

Supporting text:

"Professional CV layouts designed around the information recruiters look for in technical candidates."

Show tags:

Software Engineer
Frontend Engineer
Backend Engineer
Full Stack Engineer
AI Engineer
Data Engineer
DevOps Engineer
Cloud Engineer
Mobile Developer

Add a template preview on the right.

CTA:

"Explore Engineer Templates"

==================================================
10. CONTENT CREATOR SECTION
==================================================

Add a smaller section for creative professionals.

Heading:

"Creative enough to stand out. Structured enough to be read."

Mention:

Content Creator
Social Media
Digital Marketing
Brand Content
Media
Creative Strategy

Show 2–3 content creator templates.

Keep these templates more visually expressive but still text-readable.

==================================================
11. MULTIPLE CV VERSIONS
==================================================

Create a small product UI demonstration:

My CVs

Software Engineer — General
Software Engineer — AI
Frontend Engineer
Backend Engineer

Show:

- template thumbnail
- last updated
- edit
- duplicate
- download

Headline:

"One profile. Multiple opportunities."

Supporting text:

"Create targeted versions of your CV without starting over."

==================================================
12. FINAL CTA
==================================================

Create a strong final CTA section.

Headline:

"Your next opportunity starts with a better CV."

Supporting text:

"Build a professional, ATS-focused CV in minutes."

Button:

"Create My CV"

Secondary:

"Explore Templates"

Use a subtle mint background.

Do not make the section overly tall.

==================================================
13. FOOTER
==================================================

Improve the footer.

Left:

Grove

Description:

"ATS-focused CVs for technical and creative careers."

Columns:

Product
Templates
Create CV
My CVs
ATS Analysis

Resources
CV Guide
Career Tips
ATS Guide

Company
About
Contact
Privacy
Terms

Keep the footer minimal.

==================================================
14. ANIMATIONS
==================================================

Use subtle professional animations.

Hero:

- fade/slide-up on initial load
- product preview slight floating motion

Template cards:

- subtle translateY
- border change
- preview scale 1.01–1.02

Buttons:

- subtle hover transition

Sections:

- subtle scroll reveal

Do NOT over-animate the website.

This is a professional career product.

Animation should support hierarchy rather than distract from it.

==================================================
15. RESPONSIVE DESIGN
==================================================

Desktop:

Hero:
2 columns

Template gallery:
4–6 cards

Feature section:
2x2

ATS section:
2 columns

How it works:
horizontal

Tablet:

Reduce spacing and card sizes.

Mobile:

Hero becomes:

headline
description
buttons
product preview

Template cards become horizontal scroll or 2-column compact grid.

Feature cards become single column.

ATS section becomes vertical.

How it works becomes vertical.

Navigation becomes mobile menu.

Do not squeeze the desktop UI onto mobile.

==================================================
16. TYPOGRAPHY
==================================================

Use a professional modern sans-serif.

Prefer:

Inter

Use strong hierarchy.

Hero headline:

large but controlled

approximately:

56–72px desktop

36–44px mobile

Body:

16–18px

Section headings:

36–48px

Do not use extremely thin typography.

Use strong dark text.

==================================================
17. SPACING
==================================================

The existing homepage has too much unused whitespace.

Use a consistent max-width:

1200–1280px.

Use section padding around:

80–120px desktop

48–72px mobile

The page should feel spacious but intentional.

Avoid giant blank areas.

==================================================
18. PRODUCT PREVIEW QUALITY
==================================================

This is one of the most important requirements.

The editor preview must look like an actual application.

Use realistic data.

Example:

Name:
Samira Noor

Title:
Senior Software Engineer

Experience:

Senior Software Engineer
Northwind Labs

Software Engineer
Harbor Systems

Skills:

React
TypeScript
Python
Django
PostgreSQL
Docker
AWS

Projects:

Open-source developer platform
AI-powered healthcare application

The CV should visually resemble a real professional resume.

==================================================
19. CODE QUALITY
==================================================

Before editing:

1. Inspect the existing homepage.
2. Identify existing components.
3. Reuse components where possible.
4. Do not delete existing functionality.
5. Do not break routing.
6. Do not introduce unnecessary dependencies.
7. Keep the homepage components modular.

Suggested structure:

src/
├── pages/
│   └── Home/
│       ├── Home.tsx
│       ├── Hero.tsx
│       ├── TemplateShowcase.tsx
│       ├── Features.tsx
│       ├── ATSSection.tsx
│       ├── HowItWorks.tsx
│       ├── CareerSection.tsx
│       ├── CTA.tsx
│       └── Footer.tsx
│
└── components/
    └── home/

Use reusable components.

==================================================
20. IMPORTANT
==================================================

The current homepage already contains useful content.

Do not simply add more text.

The redesign should improve:

- visual hierarchy
- product visibility
- conversion
- template discovery
- ATS differentiation
- perceived product quality

The final result should feel like a real commercial SaaS product that could be launched publicly.

It should NOT feel like:

- a university project
- a dashboard
- a documentation page
- a generic landing page

The user should understand the product within 5 seconds:

"Grove lets me build an ATS-friendly CV, preview it, switch templates, and export it as a PDF."

Implement the redesign carefully and preserve the existing application functionality.