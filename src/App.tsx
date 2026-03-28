import './framer/styles.css'
import { useEffect, useRef, useState } from 'react'

import HoverFramerComponent from './framer/hover'
import Hover2FramerComponent from './framer/hover-2'
import Hover3FramerComponent from './framer/hover-3'
import Hover4FramerComponent from './framer/hover-4'

const DESIGN_WIDTH = 1200

const PLAYLIST_URL =
  'https://www.youtube.com/playlist?list=PLCw5X6AnijvlevYduVQcGNlumf6imBHF1'

function useFramerScale() {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      setScale(vw < DESIGN_WIDTH ? vw / DESIGN_WIDTH : 1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return scale
}

const buttonStyle: React.CSSProperties = {
  fontFamily: '"Boldonse", sans-serif',
  fontSize: '15px',
  color: 'white',
  backgroundColor: 'transparent',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '30px',
  padding: '12px 32px',
  textDecoration: 'none',
  letterSpacing: '-0.01em',
  transition: 'background-color 0.2s, border-color 0.2s',
  cursor: 'pointer',
}

function Navigation({ scale }: { scale: number }) {
  return (
    <nav
      style={{
        width: '1200px',
        height: '64px',
        backgroundColor: 'rgb(0, 0, 0)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '20px',
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: `translateX(-50%) scale(${scale})`,
        transformOrigin: 'top center',
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginLeft: 'auto',
          marginRight: 'auto',
          alignItems: 'center',
        }}
      >
        {['Works', 'About', 'Contact'].map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            style={{
              fontFamily: '"Boldonse", sans-serif',
              fontSize: '15px',
              letterSpacing: '-0.01em',
              lineHeight: '2em',
              textAlign: 'center',
              color: 'rgb(255, 255, 255)',
              textDecoration: 'none',
            }}
          >
            {label}
          </a>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        }}
      />
    </nav>
  )
}

export default function App() {
  const scale = useFramerScale()
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number | undefined>()

  useEffect(() => {
    if (!contentRef.current) return
    const observer = new ResizeObserver(([entry]) => {
      setContentHeight(entry.contentRect.height * scale)
    })
    observer.observe(contentRef.current)
    return () => observer.disconnect()
  }, [scale])

  return (
    <div style={{ height: contentHeight, overflow: 'hidden' }}>
    <div
      ref={contentRef}
      style={{
        width: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
    >
      {/* Navigation */}
      <Navigation scale={scale} />
      {/* Spacer for fixed nav */}
      <div style={{ width: '100%', height: '64px', flexShrink: 0 }} />

      {/* Hero Section */}
      <section
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: 'rgb(0, 0, 0)',
          overflow: 'clip',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '400px',
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '46%',
            transform: 'translate(-50%, -50%)',
            fontFamily: '"ARK-ES", sans-serif',
            color: 'white',
            zIndex: 1,
            textAlign: 'center',
            lineHeight: '0.85em',
            fontSize: '155px',
            letterSpacing: '-0.02em',
          }}
        >
          syndrome<br />e
        </span>
        <span
          style={{
            position: 'absolute',
            left: '63%',
            top: '18%',
            transform: 'translate(-50%, -50%)',
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'white',
            whiteSpace: 'nowrap',
            zIndex: 1,
          }}
        >
          Syndromee
        </span>
        <span
          style={{
            position: 'absolute',
            left: '18%',
            top: '58%',
            transform: 'translate(-50%, -50%)',
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'white',
            whiteSpace: 'nowrap',
            zIndex: 1,
          }}
        >
          Syndromee
        </span>
        <span
          style={{
            position: 'absolute',
            left: '30%',
            top: '16%',
            transform: 'translate(-50%, -50%)',
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'white',
            whiteSpace: 'nowrap',
            zIndex: 1,
          }}
        >
          Syndromee
        </span>
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '78%',
            transform: 'translate(-50%, -50%)',
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'white',
            whiteSpace: 'nowrap',
            zIndex: 1,
          }}
        >
          motion designer
        </span>
        <span
          style={{
            position: 'absolute',
            left: '82%',
            top: '66%',
            transform: 'translate(-50%, -50%)',
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'white',
            whiteSpace: 'nowrap',
            zIndex: 1,
          }}
        >
          Syndromee
        </span>
      </section>

      {/* Works Section */}
      <section
        id="works"
        style={{
          width: '100%',
          backgroundColor: 'rgb(0, 0, 0)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            backgroundColor: 'rgb(0, 0, 0)',
            overflow: 'clip',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontFamily: '"Boldonse", cursive',
              color: 'white',
              fontSize: '48px',
            }}
          >
            WORKS
          </h2>

          {/* Hover Card 1 (hover) */}
          <a
            href="https://www.youtube.com/watch?v=4cYzLcWt0nY&list=PLCw5X6AnijvlevYduVQcGNlumf6imBHF1&index=3"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              height: '304px',
              overflow: 'clip',
              position: 'relative',
            }}
          >
            <HoverFramerComponent.Responsive
              style={{
                position: 'absolute',
                width: '1200px',
                height: '304px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              variant="Variant 1"
            />
          </a>

          {/* Hover Card 2 (hover-4) */}
          <a
            href="https://www.youtube.com/watch?v=XvoUXcYoagU&list=PLCw5X6AnijvlevYduVQcGNlumf6imBHF1&index=4"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              height: '304px',
              overflow: 'clip',
              position: 'relative',
            }}
          >
            <Hover4FramerComponent.Responsive
              style={{
                position: 'absolute',
                width: '1200px',
                height: '304px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              variant="Variant 1"
            />
          </a>

          {/* Hover Card 3 (hover-3) */}
          <div style={{ width: '100%', height: '304px' }}>
            <Hover3FramerComponent.Responsive
              style={{ width: '100%', height: '100%' }}
              variant="Variant 1"
            />
          </div>

          {/* Hover Card 4 (hover-2) */}
          <a
            href="https://www.youtube.com/watch?v=SccovzmKXPc&list=PLCw5X6AnijvlevYduVQcGNlumf6imBHF1&index=5"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              height: '304px',
              overflow: 'clip',
              position: 'relative',
            }}
          >
            <Hover2FramerComponent.Responsive
              style={{
                position: 'absolute',
                width: '1200px',
                height: '304px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              variant="Variant 1"
            />
          </a>

          {/*
            =============================================
            TO ADD MORE HOVER CARDS (5th, 6th, etc.):
            =============================================
            1. Create a new HOVER component in Framer (duplicate one of the existing ones)
            2. Re-export components by running in terminal:
                 cd example-framer-app && npm run framer
            3. A new file like hover-5.jsx will appear in src/framer/
            4. Import it at the top of this file:
                 import Hover5FramerComponent from './framer/hover-5'
            5. Copy-paste one of the <a> blocks above and change:
               - The href to your new YouTube video URL
               - The component to <Hover5FramerComponent.Responsive ... />
            =============================================
          */}

          {/* View Full Playlist Button */}
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...buttonStyle,
              marginTop: '40px',
              marginBottom: '60px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
            }}
          >
            View Full Playlist →
          </a>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        style={{
          width: '100%',
          backgroundColor: 'rgb(0, 0, 0)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '80px 60px',
          gap: '60px',
        }}
      >
        <h2
          style={{
            fontFamily: '"Boldonse", cursive',
            color: 'white',
            fontSize: '48px',
            margin: 0,
          }}
        >
          ABOUT
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '40px',
            width: '100%',
          }}
        >
          {/* INSTRUCTION: Replace the placeholder below with your image:
              <img src="/your-photo.jpg" ... />
              Put the image file in the /public folder */}
          <div
            style={{
              width: '400px',
              height: '400px',
              backgroundColor: 'rgb(20, 20, 20)',
              borderRadius: '8px',
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <span
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                color: 'rgba(255, 255, 255, 0.3)',
                fontSize: '14px',
              }}
            >
              your photo here
            </span>
          </div>

          {/* INSTRUCTION: Edit the text below to customize your About section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              flex: 1,
            }}
          >
            {/* ✎ Change your display name here */}
            <h3
              style={{
                fontFamily: '"ARK-ES", sans-serif',
                color: 'white',
                fontSize: '48px',
                margin: 0,
                lineHeight: '1em',
              }}
            >
              Syndromee
            </h3>
            {/* ✎ Change your title/role here */}
            <p
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '16px',
                lineHeight: '1.8em',
                margin: 0,
              }}
            >
              motion designer
            </p>
            {/* ✎ Change your bio here */}
            <p
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '14px',
                lineHeight: '1.8em',
                margin: 0,
                maxWidth: '600px',
              }}
            >
              Your bio goes here. Tell visitors about yourself, your experience,
              your passion for motion design, and what drives your creative work.
            </p>

            {/* ✎ Change your skills here — add or remove items from the array */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                marginTop: '16px',
              }}
            >
              {['Motion Design', 'After Effects', 'Cinema 4D', 'Video Editing'].map(
                (skill) => (
                  <span
                    key={skill}
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      color: 'white',
                      fontSize: '12px',
                      padding: '6px 14px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '20px',
                    }}
                  >
                    {skill}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        style={{
          width: '100%',
          backgroundColor: 'rgb(0, 0, 0)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 60px 80px',
          gap: '40px',
        }}
      >
        <h2
          style={{
            fontFamily: '"Boldonse", cursive',
            color: 'white',
            fontSize: '48px',
            margin: 0,
          }}
        >
          CONTACT
        </h2>

        <p
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '14px',
            margin: 0,
            textAlign: 'center',
          }}
        >
          Let's work together
        </p>

        {/* INSTRUCTION: Change the URLs below to your actual social links
            - label: the text shown on screen
            - url: where it links to
            Add or remove items from the array as needed */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          {[
            { label: 'YouTube', url: 'https://youtube.com/@yourhandle' },
            { label: 'Instagram', url: 'https://instagram.com/yourhandle' },
            { label: 'Twitter / X', url: 'https://x.com/yourhandle' },
            { label: 'Email', url: 'mailto:your@email.com' },
          ].map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"Boldonse", sans-serif',
                color: 'white',
                fontSize: '24px',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {social.label}
            </a>
          ))}
        </div>

        <span
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'rgba(255, 255, 255, 0.2)',
            fontSize: '12px',
            marginTop: '40px',
          }}
        >
          &copy; 2026 Syndromee
        </span>
      </section>
    </div>
    </div>
  )
}
