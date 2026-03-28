import './framer/styles.css'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

import HoverFramerComponent from './framer/hover'
import Hover2FramerComponent from './framer/hover-2'
import Hover3FramerComponent from './framer/hover-3'
import Hover4FramerComponent from './framer/hover-4'

const DESIGN_WIDTH = 1200

const PLAYLIST_URL =
  'https://www.youtube.com/playlist?list=PLCw5X6AnijvlevYduVQcGNlumf6imBHF1'

function useZoom() {
  const [zoom, setZoom] = useState(1)
  useEffect(() => {
    const update = () => {
      setZoom(Math.min(window.innerWidth / DESIGN_WIDTH, 1))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return zoom
}

/* Fade-up wrapper — children animate in when scrolled into view */
function Reveal({
  children,
  delay = 0,
  y = 40,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function Navigation() {
  return (
    <nav
      style={{
        width: '100%',
        height: '64px',
        backgroundColor: 'rgb(0, 0, 0)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '20px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)',
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
          <motion.a
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
              position: 'relative',
            }}
            whileHover={{ opacity: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.a>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
        }}
      />
    </nav>
  )
}

function HeroSection({ zoom }: { zoom: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      style={{
        width: '100%',
        height: `${100 / zoom}vh`,
        backgroundColor: 'rgb(0, 0, 0)',
        overflow: 'clip',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Main title with parallax */}
      <motion.span
        style={{
          position: 'absolute',
          left: '50%',
          top: '46%',
          x: '-50%',
          y: textY,
          fontFamily: '"ARK-ES", sans-serif',
          color: 'white',
          zIndex: 1,
          textAlign: 'center',
          lineHeight: '0.85em',
          fontSize: '155px',
          letterSpacing: '-0.02em',
          opacity: textOpacity,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        syndrome<br />e
      </motion.span>

      {/* Scattered text with staggered entrance */}
      {[
        { left: '63%', top: '18%', delay: 0.3 },
        { left: '18%', top: '58%', delay: 0.5 },
        { left: '30%', top: '16%', delay: 0.4 },
        { left: '82%', top: '66%', delay: 0.6 },
      ].map((pos, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            left: pos.left,
            top: pos.top,
            transform: 'translate(-50%, -50%)',
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'white',
            whiteSpace: 'nowrap',
            zIndex: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: pos.delay }}
        >
          Syndromee
        </motion.span>
      ))}

      {/* "motion designer" */}
      <motion.span
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        motion designer
      </motion.span>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          style={{
            width: '1px',
            height: '40px',
            backgroundColor: 'white',
          }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}

export default function App() {
  const zoom = useZoom()

  return (
    <div
      style={{
        width: '1200px',
        margin: '0 auto',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zoom: zoom,
      }}
    >
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection zoom={zoom} />

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
          <Reveal>
            <h2
              style={{
                fontFamily: '"Boldonse", cursive',
                color: 'white',
                fontSize: '48px',
                textAlign: 'center',
              }}
            >
              WORKS
            </h2>
          </Reveal>

          {/* Hover Card 1 (hover) */}
          <Reveal delay={0.1}>
            <motion.a
              href="https://www.youtube.com/watch?v=4cYzLcWt0nY&list=PLCw5X6AnijvlevYduVQcGNlumf6imBHF1&index=3"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '1200px',
                height: '304px',
                overflow: 'clip',
                position: 'relative',
              }}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
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
            </motion.a>
          </Reveal>

          {/* Hover Card 2 (hover-4) */}
          <Reveal delay={0.1}>
            <motion.a
              href="https://www.youtube.com/watch?v=XvoUXcYoagU&list=PLCw5X6AnijvlevYduVQcGNlumf6imBHF1&index=4"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '1200px',
                height: '304px',
                overflow: 'clip',
                position: 'relative',
              }}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
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
            </motion.a>
          </Reveal>

          {/* Hover Card 3 (hover-3) */}
          <Reveal delay={0.1}>
            <motion.div
              style={{ width: '1200px', height: '304px' }}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Hover3FramerComponent.Responsive
                style={{ width: '100%', height: '100%' }}
                variant="Variant 1"
              />
            </motion.div>
          </Reveal>

          {/* Hover Card 4 (hover-2) */}
          <Reveal delay={0.1}>
            <motion.a
              href="https://www.youtube.com/watch?v=SccovzmKXPc&list=PLCw5X6AnijvlevYduVQcGNlumf6imBHF1&index=5"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '1200px',
                height: '304px',
                overflow: 'clip',
                position: 'relative',
              }}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
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
            </motion.a>
          </Reveal>

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
            5. Wrap in <Reveal delay={0.1}><motion.a whileHover={{ scale: 1.015 }}> ... </motion.a></Reveal>
               like the cards above
            =============================================
          */}

          {/* View Full Playlist Button */}
          <Reveal delay={0.2}>
            <motion.a
              href={PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"Boldonse", sans-serif',
                fontSize: '15px',
                color: 'white',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '30px',
                padding: '12px 32px',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                cursor: 'pointer',
                display: 'inline-block',
                marginTop: '40px',
                marginBottom: '60px',
              }}
              whileHover={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.6)',
                scale: 1.05,
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              View Full Playlist →
            </motion.a>
          </Reveal>
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
        <Reveal>
          <h2
            style={{
              fontFamily: '"Boldonse", cursive',
              color: 'white',
              fontSize: '48px',
              margin: 0,
              textAlign: 'center',
            }}
          >
            ABOUT
          </h2>
        </Reveal>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '40px',
            width: '100%',
          }}
        >
          {/* Profile Image Placeholder */}
          <Reveal delay={0.1}>
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
          </Reveal>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              flex: 1,
            }}
          >
            <Reveal delay={0.2}>
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
            </Reveal>
            <Reveal delay={0.3}>
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
            </Reveal>
            <Reveal delay={0.4}>
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
            </Reveal>

            <Reveal delay={0.5}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginTop: '16px',
                }}
              >
                {['Motion Design', 'After Effects', 'Cinema 4D', 'Video Editing'].map(
                  (skill, i) => (
                    <motion.span
                      key={skill}
                      style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        color: 'white',
                        fontSize: '12px',
                        padding: '6px 14px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '20px',
                        cursor: 'default',
                      }}
                      whileHover={{
                        borderColor: 'rgba(255, 255, 255, 0.6)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill}
                    </motion.span>
                  ),
                )}
              </div>
            </Reveal>
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
        <Reveal>
          <h2
            style={{
              fontFamily: '"Boldonse", cursive',
              color: 'white',
              fontSize: '48px',
              margin: 0,
              textAlign: 'center',
            }}
          >
            CONTACT
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
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
        </Reveal>

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
          ].map((social, i) => (
            <Reveal key={social.label} delay={0.15 + i * 0.1}>
              <motion.a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: '"Boldonse", sans-serif',
                  color: 'white',
                  fontSize: '24px',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  display: 'block',
                  textAlign: 'center',
                }}
                whileHover={{ opacity: 0.5, x: 8 }}
                transition={{ duration: 0.25 }}
              >
                {social.label}
              </motion.a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.6}>
          <span
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              color: 'rgba(255, 255, 255, 0.2)',
              fontSize: '12px',
              marginTop: '40px',
              display: 'block',
              textAlign: 'center',
            }}
          >
            &copy; 2026 Syndromee
          </span>
        </Reveal>
      </section>
    </div>
  )
}
