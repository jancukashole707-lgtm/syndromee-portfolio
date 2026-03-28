import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import '../framer/styles.css'

interface Video {
  videoId: string
  title: string
  published: string
  thumbnail: string
  thumbnailMax: string
  url: string
}

const PLAYLIST_ID = 'PLCw5X6AnijvlevYduVQcGNlumf6imBHF1'

/* Responsive column count based on actual container width */
function useColumns() {
  const [cols, setCols] = useState(3)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 500) setCols(1)
      else if (w < 800) setCols(2)
      else if (w < 1100) setCols(3)
      else setCols(4)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return cols
}

/* Thumbnail — start with hqdefault (always works), try upgrade to maxres */
function Thumbnail({
  video,
  isHovered,
}: {
  video: Video
  isHovered: boolean
}) {
  // Start with hqdefault which is guaranteed to work for all videos
  const hqSrc = `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`
  const [src, setSrc] = useState(hqSrc)

  useEffect(() => {
    // Try to upgrade to maxres in background
    const maxres = `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
    const img = new Image()
    img.onload = () => {
      // Only upgrade if the image is actually high-res (not a placeholder)
      if (img.naturalWidth > 200) setSrc(maxres)
    }
    img.src = maxres
  }, [video.videoId])

  return (
    <motion.img
      src={src}
      alt={video.title}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }}
      animate={{ scale: isHovered ? 1.08 : 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onError={() => setSrc(hqSrc)}
    />
  )
}

/* Video preview that loads on hover with delay */
function VideoPreview({ videoId }: { videoId: string }) {
  const [show, setShow] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    // Small delay before loading iframe to avoid loading on quick mouse passes
    timer.current = setTimeout(() => setShow(true), 400)
    return () => {
      clearTimeout(timer.current)
      setShow(false)
    }
  }, [videoId])

  if (!show) return null

  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&start=30&loop=1&playlist=${videoId}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      allow="autoplay; encrypted-media"
      loading="lazy"
    />
  )
}

export default function Gallery() {
  const cols = useColumns()
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
        width: '100%',
        margin: '0 auto',
        backgroundColor: 'black',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <nav
        style={{
          width: '100%',
          height: '64px',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
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
            { label: 'About', to: '/#about' },
            { label: 'Contact', to: '/#contact' },
            { label: 'Gallery', to: '/gallery' },
          ].map((item) =>
            item.to.startsWith('/#') ? (
              <motion.a
                key={item.label}
                href={item.to}
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 600,
                  fontSize: '15px',
                  letterSpacing: '-0.01em',
                  lineHeight: '2em',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                }}
                whileHover={{ color: 'rgba(255,255,255,1)' }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.a>
            ) : (
              <motion.div key={item.label} whileHover={{ opacity: 0.6 }} transition={{ duration: 0.2 }}>
                <Link
                  to={item.to}
                  style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 600,
                    fontSize: '15px',
                    letterSpacing: '-0.01em',
                    lineHeight: '2em',
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ),
          )}
        </div>
      </nav>

      {/* Page Title */}
      <motion.div
        style={{
          padding: '50px 40px 30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1
          style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'white',
            fontSize: '42px',
            margin: 0,
          }}
        >
          GALLERY
        </h1>
        <p
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'rgba(255,255,255,0.35)',
            fontSize: '13px',
            margin: 0,
          }}
        >
          {loading ? 'Loading playlist...' : `${videos.length} works`}
        </p>
      </motion.div>

      {/* Video Grid — edge to edge, no gaps */}
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '80px',
            flex: 1,
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
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: '2px',
            padding: 0,
            flex: 1,
          }}
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.04 } },
          }}
        >
          {videos.map((video) => {
            const isHovered = hoveredId === video.videoId
            return (
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
                  backgroundColor: 'rgb(10,10,10)',
                }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.4 }}
                onMouseEnter={() => setHoveredId(video.videoId)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Thumbnail */}
                <Thumbnail video={video} isHovered={isHovered} />

                {/* Video preview on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      style={{ position: 'absolute', inset: 0, zIndex: 1 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <VideoPreview videoId={video.videoId} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Title overlay — always visible at bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      'linear-gradient(transparent, rgba(0,0,0,0.75))',
                    padding: '24px 12px 10px',
                    zIndex: 2,
                    pointerEvents: 'none',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s',
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      color: 'white',
                      fontSize: '12px',
                      lineHeight: '1.4em',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {video.title}
                  </span>
                </div>
              </motion.a>
            )
          })}
        </motion.div>
      )}

      {/* Footer */}
      <div
        style={{
          padding: '30px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'rgba(255,255,255,0.15)',
            fontSize: '11px',
          }}
        >
          &copy; 2026 Syndromee
        </span>
      </div>
    </div>
  )
}
