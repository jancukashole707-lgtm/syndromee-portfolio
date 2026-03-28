import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface Video {
  videoId: string
  title: string
  published: string
  thumbnail: string
  thumbnailMax: string
  url: string
}

const PLAYLIST_ID = 'PLCw5X6AnijvlevYduVQcGNlumf6imBHF1'

function useZoom() {
  const [zoom, setZoom] = useState(1)
  useEffect(() => {
    const update = () => setZoom(Math.min(window.innerWidth / 1200, 1))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return zoom
}

export default function Gallery() {
  const zoom = useZoom()
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/playlist?id=${PLAYLIST_ID}`)
      .then((r) => r.json())
      .then((data) => {
        setVideos(data.videos || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div
      style={{
        width: '1200px',
        margin: '0 auto',
        backgroundColor: 'black',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        zoom: zoom,
      }}
    >
      {/* Header */}
      <nav
        style={{
          width: '100%',
          height: '64px',
          backgroundColor: 'rgb(0, 0, 0)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
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
          <Link
            to="/"
            style={{
              fontFamily: '"ARK-ES", sans-serif',
              fontSize: '18px',
              color: 'white',
              textDecoration: 'none',
              marginRight: '30px',
            }}
          >
            Syndromee
          </Link>
          {[
            { label: 'Works', to: '/#works' },
            { label: 'Gallery', to: '/gallery' },
            { label: 'About', to: '/#about' },
            { label: 'Contact', to: '/#contact' },
          ].map((item) =>
            item.to.startsWith('/#') ? (
              <a
                key={item.label}
                href={item.to}
                style={{
                  fontFamily: '"Boldonse", sans-serif',
                  fontSize: '15px',
                  letterSpacing: '-0.01em',
                  lineHeight: '2em',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                style={{
                  fontFamily: '"Boldonse", sans-serif',
                  fontSize: '15px',
                  letterSpacing: '-0.01em',
                  lineHeight: '2em',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      </nav>

      {/* Page Title */}
      <motion.div
        style={{
          padding: '60px 40px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1
          style={{
            fontFamily: '"Boldonse", cursive',
            color: 'white',
            fontSize: '48px',
            margin: 0,
          }}
        >
          GALLERY
        </h1>
        <p
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '14px',
            margin: 0,
          }}
        >
          {loading
            ? 'Loading playlist...'
            : `${videos.length} videos from YouTube`}
        </p>
      </motion.div>

      {/* Video Grid */}
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          <motion.div
            style={{
              width: '40px',
              height: '40px',
              border: '2px solid rgba(255,255,255,0.1)',
              borderTop: '2px solid white',
              borderRadius: '50%',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      ) : (
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '4px',
            padding: '0 4px 80px',
          }}
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {videos.map((video) => (
            <motion.a
              key={video.videoId}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'relative',
                display: 'block',
                aspectRatio: '16/9',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: 'rgb(15,15,15)',
              }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setHoveredId(video.videoId)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Thumbnail */}
              <motion.img
                src={video.thumbnailMax}
                alt={video.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                animate={{
                  scale: hoveredId === video.videoId ? 1.05 : 1,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onError={(e) => {
                  // Fall back to hqdefault if maxres not available
                  ;(e.target as HTMLImageElement).src = video.thumbnail
                }}
              />

              {/* Hover overlay */}
              <AnimatePresence>
                {hoveredId === video.videoId && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(transparent 40%, rgba(0,0,0,0.85) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '16px',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span
                      style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        color: 'white',
                        fontSize: '13px',
                        lineHeight: '1.4em',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {video.title}
                    </span>
                    <span
                      style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '11px',
                        marginTop: '4px',
                      }}
                    >
                      {new Date(video.published).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                      })}
                    </span>

                    {/* Play icon */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -60%)',
                      }}
                    >
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <circle
                          cx="24"
                          cy="24"
                          r="23"
                          stroke="white"
                          strokeWidth="2"
                          opacity="0.8"
                        />
                        <path d="M20 16L34 24L20 32V16Z" fill="white" opacity="0.9" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.a>
          ))}
        </motion.div>
      )}

      {/* Footer */}
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'rgba(255,255,255,0.2)',
            fontSize: '12px',
          }}
        >
          &copy; 2026 Syndromee
        </span>
      </div>
    </div>
  )
}
