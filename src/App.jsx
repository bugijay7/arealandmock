import { useEffect, useState } from 'react'
import apartmentsImage from './assets/apartments.jpg'
import balconyImage from './assets/balcony.jpg'
import livingRoomImage from './assets/livingroom.jpg'
import officeImage from './assets/office.jpg'
import shopsImage from './assets/shops.jpg'
import './App.css'

const phoneNumber = '0794 325 000'
const phoneLink = 'tel:0794325000'
const emailAddress = 'info@arealandltd.co.ke'
const emailLink = `mailto:${emailAddress}`
const whatsappLink =
  'https://wa.me/254794325000?text=Hello%20Area%20Land%20Limited%2C%20I%20would%20like%20to%20enquire%20about%20your%20properties%20and%20services.'

const slides = [
  {
    image: apartmentsImage,
    alt: 'Contemporary apartment building in the evening light',
    caption: 'A place to call your own',
  },
  {
    image: balconyImage,
    alt: 'Bright apartment balcony overlooking the neighbourhood',
    caption: 'Room to see things differently',
  },
  {
    image: livingRoomImage,
    alt: 'Warm, thoughtfully furnished living room',
    caption: 'Make space for living',
  },
]

const properties = [
  {
    image: apartmentsImage,
    alt: 'Contemporary multi-storey residential building',
    category: 'Residential',
    title: 'A place to call your own',
    description: 'Explore a considered selection of residential spaces.',
    className: 'property-feature',
  },
  {
    image: officeImage,
    alt: 'Welcoming professional office with a large desk',
    category: 'Workspaces',
    title: 'Space for your next idea',
    description: 'Find a setting that gives your work room to grow.',
    className: 'property-offset',
  },
  {
    image: shopsImage,
    alt: 'Well-stocked retail shop with bright, open aisles',
    category: 'Commercial',
    title: 'A space for business',
    description: 'Discover commercial spaces for your next venture.',
    className: '',
  },
]

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'Properties', href: '#properties' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

function Wordmark({ light = false }) {
  return (
    <a
      aria-label="Area Land Limited home"
      className={`wordmark${light ? ' wordmark-light' : ''}`}
      href="#home"
    >
      <span className="wordmark-name">AREA LAND</span>
      <span className="wordmark-subtitle">LIMITED</span>
    </a>
  )
}

function ArrowIcon({ direction = 'right' }) {
  return (
    <svg
      aria-hidden="true"
      className={`arrow-icon arrow-${direction}`}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="nav-shell">
        <Wordmark />
        <button
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className={`menu-toggle${menuOpen ? ' menu-toggle-open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
        </button>
        <div
          className={`nav-content${menuOpen ? ' nav-content-open' : ''}`}
          id="primary-navigation"
        >
          <ul className="nav-links">
            {navigation.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="button button-orange nav-cta"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Enquire now <ArrowIcon />
          </a>
        </div>
      </nav>
    </header>
  )
}

function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [touchStart, setTouchStart] = useState(null)

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(motionPreference.matches)

    updatePreference()
    motionPreference.addEventListener('change', updatePreference)
    return () => motionPreference.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (isPaused || reducedMotion) return undefined

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [isPaused, reducedMotion])

  const changeSlide = (nextSlide) => {
    setIsPaused(true)
    setActiveSlide((nextSlide + slides.length) % slides.length)
  }

  const handleTouchStart = (event) => {
    setTouchStart(event.changedTouches[0].clientX)
  }

  const handleTouchEnd = (event) => {
    if (touchStart === null) return

    const distance = event.changedTouches[0].clientX - touchStart
    if (Math.abs(distance) > 48) {
      changeSlide(activeSlide + (distance < 0 ? 1 : -1))
    }
    setTouchStart(null)
  }

  return (
    <section
      aria-label="Featured spaces"
      aria-roledescription="carousel"
      className="hero"
      id="home"
      onFocus={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
    >
      <div className="hero-images" aria-live="off">
        {slides.map((slide, index) => (
          <img
            alt={slide.alt}
            className={`hero-image${index === activeSlide ? ' hero-image-active' : ''}`}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            key={slide.image}
            src={slide.image}
          />
        ))}
      </div>
      <div className="hero-shade" />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light">
            <span className="eyebrow-mark" />
            Area Land Limited <span className="eyebrow-divider">·</span> Letting &amp;
            Property Management
          </p>
          <h1>
            Spaces that feel like
            <br />
            <em>the right place.</em>
          </h1>
          <p className="hero-description">
            Discover thoughtfully managed properties and professional letting
            services designed to make finding, owning, and managing space feel
            simpler.
          </p>
          <div className="hero-actions">
            <a className="button button-orange" href="#properties">
              Explore our properties <ArrowIcon />
            </a>
            <a className="button button-outline-light" href="#services">
              Property management
            </a>
          </div>
        </div>
        <div className="hero-bottom">
          <p className="hero-location">Nairobi, Kenya</p>
          <div className="carousel-controls">
            <span aria-live="polite" className="slide-counter">
              <span>{String(activeSlide + 1).padStart(2, '0')}</span>
              <span className="counter-divider">/</span>
              {String(slides.length).padStart(2, '0')}
            </span>
            <div aria-label="Choose a slide" className="slide-indicators">
              {slides.map((slide, index) => (
                <button
                  aria-current={index === activeSlide ? 'true' : undefined}
                  aria-label={`Show slide ${index + 1}: ${slide.caption}`}
                  className={`slide-indicator${index === activeSlide ? ' slide-indicator-active' : ''}`}
                  key={slide.caption}
                  onClick={() => changeSlide(index)}
                  type="button"
                />
              ))}
            </div>
            <button
              aria-label="Previous slide"
              className="carousel-arrow"
              onClick={() => changeSlide(activeSlide - 1)}
              type="button"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              aria-label="Next slide"
              className="carousel-arrow"
              onClick={() => changeSlide(activeSlide + 1)}
              type="button"
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionLabel({ children, number }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  )
}

function EditorialIntro() {
  return (
    <section className="intro section-pad" id="about">
      <div className="intro-grid content-width">
        <div className="intro-image-wrap">
          <img
            alt="Quiet, sunlit living room with warm natural finishes"
            className="intro-image"
            loading="lazy"
            src={livingRoomImage}
          />
          <p className="image-note">A space to settle into</p>
        </div>
        <div className="intro-copy">
          <SectionLabel number="01">More than a property</SectionLabel>
          <h2>
            Good spaces make room for <em>better living.</em>
          </h2>
          <p>
            At Area Land Limited, we believe the right space should bring
            clarity, comfort, and confidence. Through letting and property
            management, we help connect people with places that work for them.
          </p>
          <a className="text-link" href="#services">
            Get to know us <ArrowIcon />
          </a>
          <p className="intro-signature">Building Spaces. Creating Value.</p>
        </div>
      </div>
    </section>
  )
}

function FeaturedProperties() {
  return (
    <section className="properties section-pad" id="properties">
      <div className="content-width">
        <div className="section-heading">
          <div>
            <SectionLabel number="02">Explore our spaces</SectionLabel>
            <h2>Find a place that fits your <em>next chapter.</em></h2>
          </div>
          <p>
            A glimpse at the kinds of spaces we work with. Get in touch for
            verified availability and details.
          </p>
        </div>
        <div className="property-grid">
          {properties.map((property, index) => (
            <article
              className={`property-card ${property.className}`}
              key={property.category}
            >
              <a
                aria-label={`Enquire about ${property.category.toLowerCase()} spaces`}
                className="property-image-link"
                href="#contact"
              >
                <img
                  alt={property.alt}
                  loading="lazy"
                  src={property.image}
                />
                <span className="property-number">0{index + 1}</span>
              </a>
              <div className="property-info">
                <p className="property-category">{property.category}</p>
                <h3>{property.title}</h3>
                <p>{property.description}</p>
                <a className="text-link property-link" href="#contact">
                  Make an enquiry <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="sample-note">
          Images are illustrative. Please enquire for current property
          information.
        </p>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="services section-pad" id="services">
      <div className="content-width">
        <div className="services-heading">
          <SectionLabel number="03">What we do</SectionLabel>
          <h2>Space to move forward.</h2>
        </div>
        <div className="service-grid">
          <article className="service-panel service-letting">
            <div className="service-image">
              <img
                alt="Contemporary apartment balcony with a neighbourhood view"
                loading="lazy"
                src={balconyImage}
              />
              <span className="service-number">01</span>
            </div>
            <div className="service-copy">
              <p className="service-kicker">Letting</p>
              <h3>Finding the right space, made simpler.</h3>
              <p>
                Explore spaces suited to your needs and connect with Area Land
                Limited to learn more about available letting opportunities.
              </p>
              <a className="text-link" href={`${emailLink}?subject=Letting%20enquiry`}>
                Enquire about letting <ArrowIcon />
              </a>
            </div>
          </article>
          <article className="service-panel service-management">
            <div className="service-image">
              <img
                alt="A welcoming professional office space"
                loading="lazy"
                src={officeImage}
              />
              <span className="service-number">02</span>
            </div>
            <div className="service-copy">
              <p className="service-kicker">Property management</p>
              <h3>Property care with confidence.</h3>
              <p>
                Professional property management support for owners seeking a
                more dependable way to look after their spaces.
              </p>
              <a
                className="text-link"
                href={`${emailLink}?subject=Property%20management%20enquiry`}
              >
                Discuss property management <ArrowIcon />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function BrandStatement() {
  return (
    <section aria-label="Our brand statement" className="brand-statement">
      <div className="brand-statement-inner content-width">
        <p className="section-label section-label-light">
          <span>04</span> Our perspective
        </p>
        <h2>
          Building spaces.
          <br />
          <em>Creating value.</em>
        </h2>
        <p className="statement-support">
          Every property represents an opportunity to create something meaningful.
        </p>
        <span className="statement-shape" aria-hidden="true" />
      </div>
    </section>
  )
}

function WhyAreaLand() {
  const values = [
    {
      number: '01',
      title: 'A thoughtful approach',
      description: 'We understand that every space serves a purpose.',
    },
    {
      number: '02',
      title: 'Professional support',
      description: 'Letting and property management, with clear communication.',
    },
    {
      number: '03',
      title: 'A focus on value',
      description:
        'Helping property owners and occupants make meaningful use of their spaces.',
    },
  ]

  return (
    <section className="why section-pad">
      <div className="content-width">
        <div className="why-heading">
          <SectionLabel number="05">Why Area Land</SectionLabel>
          <h2>
            Property decisions deserve a <em>personal touch.</em>
          </h2>
        </div>
        <div className="value-grid">
          {values.map((value) => (
            <article className="value-item" key={value.number}>
              <span className="value-number">{value.number}</span>
              <span className="value-accent" aria-hidden="true" />
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-grid content-width">
        <div className="contact-copy">
          <SectionLabel number="06">Start a conversation</SectionLabel>
          <h2>
            Let&apos;s find the <em>right space</em> for you.
          </h2>
          <p>
            Whether you&apos;re looking for a property or exploring professional
            management, start a conversation with Area Land Limited.
          </p>
          <a
            className="button button-orange"
            href={whatsappLink}
            rel="noreferrer"
            target="_blank"
          >
            Enquire on WhatsApp <ArrowIcon />
          </a>
        </div>
        <address className="contact-details">
          <div className="contact-detail">
            <span className="contact-label">Call us</span>
            <a href={phoneLink}>{phoneNumber}</a>
          </div>
          <div className="contact-detail">
            <span className="contact-label">Email</span>
            <a href={emailLink}>{emailAddress}</a>
          </div>
          <div className="contact-detail">
            <span className="contact-label">Website</span>
            <a href="https://www.arealandltd.co.ke" rel="noreferrer" target="_blank">
              www.arealandltd.co.ke
            </a>
          </div>
          <div className="contact-detail">
            <span className="contact-label">Postal address</span>
            <p>P.O. Box 14455 – 00400, Tom Mboya, Nairobi</p>
          </div>
        </address>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main content-width">
        <div className="footer-brand">
          <Wordmark light />
          <p>Building Spaces <span>•</span> Creating Value.</p>
        </div>
        <div className="footer-navigation">
          <p className="footer-heading">Explore</p>
          {navigation.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="footer-contact">
          <p className="footer-heading">Get in touch</p>
          <a href={phoneLink}>{phoneNumber}</a>
          <a href={emailLink}>{emailAddress}</a>
          <a href="https://www.arealandltd.co.ke" rel="noreferrer" target="_blank">
            www.arealandltd.co.ke
          </a>
          <p>P.O. Box 14455 – 00400, Tom Mboya, Nairobi</p>
        </div>
      </div>
      <div className="footer-bottom content-width">
        <span>© {new Date().getFullYear()} Area Land Limited. All rights reserved.</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroCarousel />
        <EditorialIntro />
        <FeaturedProperties />
        <ServicesSection />
        <BrandStatement />
        <WhyAreaLand />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
