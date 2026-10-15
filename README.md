# Quantum University - Central Library Website

A modern, responsive College Library web application designed and developed with **React 19**, **Vite**, **Tailwind CSS v4**, **GSAP 3**, and **Lenis Smooth Scroll**.

![Quantum University Library](public/library/1.jpg)

## Features

- **3D Stack Motion Hero Animations**: Interactive 3D book cover depth motion on scroll powered by GSAP ScrollTrigger and CSS 3D transforms.
  - *The Living Archives*: Curved arc depth travel.
  - *Chronicles of Literature*: 360° vortex card rotation.
  - *The Odyssey of Wisdom*: Diagonal wave trajectory.
- **Dynamic Book Search & Categories**: Instant filter by title, author, topic, and categories (Romance, Literature, Computer Science, Philosophy, History, etc.).
- **Interactive Book Actions**: Modal book viewer, real-time book issuing, returning, and preview reader.
- **Student Dashboard**: Member portal for **Rohith Naidu** featuring active borrowings, due dates, reading history, and quick book return.
- **Library Guidelines & Services**: Highlighting study rooms, inter-library borrowing privileges, digital access, and research desk assistance.
- **Responsive Navigation & Menu**: Floating header with search shortcut, student profile indicator, and physics-curved slide-out navigation drawer.
- **Lenis Smooth Scrolling**: Ultra-fluid scrolling experience.
- **Design System**: Purple & White academic aesthetic with clean typography using Google Fonts (Outfit & Space Grotesk).

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + Custom CSS 3D transforms
- **Animations**: GSAP (GreenSock) + ScrollTrigger
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React
- **Routing**: React Router v7

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/rohith10ty/quantum-library.git

# Navigate to project directory
cd quantum-library

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## License

MIT
