# Gaming Forge

Create a modern, professional website for **Itone Private Limited**, a software development company specializing in gaming industry solutions (casino, sports betting, etc.).

## Technical Requirements
- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Iconify Simple Icons (https://icon-sets.iconify.design/simple-icons/)
- **Animations**: Hive animations library for smooth interactions
- **Theme**: Light theme with modern design aesthetic
- **Color Scheme**: Use RED as the primary brand color (extract from logo)
- **Effects**: Implement glassmorphism effects throughout the site

## Pages Structure

### 1. Home Page
**Hero Section**:
- Full-width hero with animated background (use Hive for smooth animations)
- Headline: "Powering the Future of Gaming Technology"
- Subheadline: "Industry-leading software solutions for casino, sports betting, and gaming platforms"
- CTA buttons: "View Our Solutions" and "Contact Us"
- Include company logo prominently
- Glassmorphism card overlay for hero content
- Animated stats counter showing: Years of Experience, Projects Delivered, Active Clients, Technologies Mastered

**About Section**:
- Brief company overview with glassmorphism card
- Mission statement focused on gaming industry innovation
- Core values with animated icons (Iconify Simple Icons)

**Why Choose Itone**:
- 4-6 key differentiators in glassmorphism cards
- Icons for each point: Innovation, Reliability, Scalability, Security, Support, Expertise
- Hover animations using Hive

**Technologies Section**:
- Tech stack showcase using Iconify Simple Icons
- Include: React, Next.js, TypeScript, Node.js, MongoDB, PostgreSQL, AWS, Docker, Kubernetes, Python, Java, etc.
- Grid layout with hover effects
- Glassmorphism backdrop

**CTA Section**:
- "Ready to Transform Your Gaming Platform?"
- Contact button with animation

### 2. Products/Solutions Page
**Must Include** - This is the main focus:

**Product Categories**:
1. **Casino Management Systems**
   - Complete casino platform solutions
   - Game integration APIs
   - Player management systems
   - Payment gateway integration
   - Real-time analytics dashboard
   - Feature list with check icons

2. **Sports Betting Solutions**
   - Odds management systems
   - Live betting platforms
   - Risk management tools
   - Multi-sport coverage
   - Mobile-first design
   - Feature highlights

3. **Gaming Platform Development**
   - Custom game development
   - Multiplayer infrastructure
   - In-game economy systems
   - Social features integration
   - Cross-platform compatibility

4. **Backend & Infrastructure**
   - Scalable cloud solutions
   - Security & compliance
   - API development
   - Database optimization
   - DevOps services

**Each Product Card Should Have**:
- Glassmorphism effect
- Relevant Iconify icon
- Product name and description
- Key features list (4-6 items)
- "Learn More" button
- Hover animation (scale/glow effect)

### 3. Services Page
- Custom Software Development
- API Development & Integration
- Cloud Solutions (AWS, Azure, GCP)
- DevOps & CI/CD
- Maintenance & Support
- Consulting Services

Each service in glassmorphism card with icon and description.

### 4. Technologies Page
**Tech Stack Showcase**:
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Redux
- **Backend**: Node.js, Python, Java, .NET
- **Databases**: MongoDB, PostgreSQL, MySQL, Redis
- **Cloud**: AWS, Azure, Google Cloud
- **DevOps**: Docker, Kubernetes, Jenkins, GitHub Actions
- **Gaming**: Unity, Unreal Engine, WebGL
- **Mobile**: React Native, Flutter

Display in categorized sections with Iconify Simple Icons for each technology.

### 5. About Page
- Company history and mission
- Team section (placeholder images with glassmorphism frames)
- Company values
- Certifications/Partnerships (if any)

### 6. Contact Page
- Contact form with glassmorphism styling:
  - Name, Email, Phone, Company
  - Service Interest (dropdown)
  - Message
  - Submit button with animation
- Contact information:
  - Email, Phone, Address
  - Social media links with Iconify icons
- Embedded map (placeholder or actual if address provided)

## Design Specifications

### Color Palette
- **Primary**: Red (from logo) - use for buttons, headings, accents
- **Background**: White/Light gray (#FAFAFA, #F5F5F5)
- **Text**: Dark gray (#1F2937, #374151)
- **Accents**: Light red shades, subtle shadows

### Typography
- Modern sans-serif fonts (Inter, Poppins, or Outfit)
- Clear hierarchy: H1 (48px), H2 (36px), H3 (24px), Body (16px)
- Good line spacing for readability

### Glassmorphism Effect Specifications
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.3);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
```

Apply to: cards, navigation bar, modal overlays, product cards

### Navigation
- Sticky header with glassmorphism effect on scroll
- Logo on left, navigation links center/right
- Mobile: Hamburger menu with smooth slide-in animation
- Links: Home, Products, Services, Technologies, About, Contact
- CTA button: "Get Started" (prominent red button)

### Footer
- Dark or light glassmorphism style
- Quick links (Products, Services, About, Contact)
- Social media icons (LinkedIn, Twitter, GitHub) using Iconify
- Copyright text
- Company address and contact info

## Animations & Interactions

### Hero Section
- Hive animation for hero background (subtle particle effect or gradient animation)
- Text fade-in with stagger effect
- Button hover effects (scale, glow)
- Scroll indicator animation

### General Animations
- Fade-in on scroll for sections (using Hive)
- Card hover effects (lift, glow, scale)
- Button ripple effects
- Smooth page transitions
- Loading states with skeleton screens

### Performance Optimization
- Lazy load images
- Optimize icon loading
- Code splitting
- Next.js Image component for all images
- Minimize bundle size

## Content Guidelines

### Images to Include
- Hero background (abstract gaming/tech themed)
- Product showcase images (dashboards, interfaces)
- Team photos (placeholder or actual)
- Technology logos (use Iconify Simple Icons)
- Gaming industry visuals (cards, sports, casino chips - use abstract/legal stock images)

### Tone & Messaging
- Professional yet innovative
- Focus on reliability and cutting-edge technology
- Emphasize gaming industry expertise
- Highlight security and scalability
- Use action-oriented language

## Additional Features
- **Testimonials Section** (optional): Client feedback with 5-star ratings
- **Case Studies** (optional): Brief project highlights
- **Blog Section** (optional): Gaming industry insights
- **FAQ Section**: Common questions about services
- **Newsletter Signup**: Capture leads with glassmorphism form

## Responsiveness
- Mobile-first approach
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Touch-friendly buttons and navigation
- Optimized images for all screen sizes

## SEO & Meta
- Descriptive meta titles and descriptions for each page
- Open Graph tags for social sharing
- Proper heading hierarchy (H1, H2, H3)
- Alt text for all images
- Semantic HTML5

## Deliverables
- Fully functional Next.js application
- TypeScript throughout
- Tailwind CSS styling
- Responsive on all devices
- Smooth animations with Hive
- Glassmorphism effects on key elements
- Iconify Simple Icons integration
- Optimized for performance
- Clean, maintainable code

---

**Note**: Please ensure all gaming-related imagery and content is professional and compliant with legal standards. Use abstract representations of casino/gaming elements rather than explicit gambling imagery.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://itone.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8ed68afc-30fa-49b0-a385-b95b1364d9d8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
