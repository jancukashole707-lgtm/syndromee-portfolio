
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // Proxy /api/playlist to YouTube RSS directly during dev
            '/api/playlist': {
                target: 'https://www.youtube.com',
                changeOrigin: true,
                rewrite: (path) => {
                    const url = new URL(path, 'http://localhost')
                    const id = url.searchParams.get('id') || 'PLCw5X6AnijvlevYduVQcGNlumf6imBHF1'
                    return `/feeds/videos.xml?playlist_id=${id}`
                },
                selfHandleResponse: true,
                configure: (proxy) => {
                    proxy.on('proxyRes', (proxyRes, req, res) => {
                        let body = ''
                        proxyRes.on('data', (chunk) => { body += chunk })
                        proxyRes.on('end', () => {
                            const entries: any[] = []
                            const entryRegex = /<entry>([\s\S]*?)<\/entry>/g
                            let match
                            const reqUrl = new URL(req.url || '', 'http://localhost')
                            const playlistId = reqUrl.searchParams.get('id') || 'PLCw5X6AnijvlevYduVQcGNlumf6imBHF1'

                            while ((match = entryRegex.exec(body)) !== null) {
                                const entry = match[1]
                                const videoId = (entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/) || [])[1] || ''
                                const title = (entry.match(/<title>(.*?)<\/title>/) || [])[1] || ''
                                const published = (entry.match(/<published>(.*?)<\/published>/) || [])[1] || ''
                                if (videoId) {
                                    entries.push({
                                        videoId,
                                        title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
                                        published,
                                        description: '',
                                        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                                        thumbnailMax: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
                                        url: `https://www.youtube.com/watch?v=${videoId}&list=${playlistId}`,
                                    })
                                }
                            }

                            res.setHeader('Content-Type', 'application/json')
                            res.end(JSON.stringify({ playlistId, count: entries.length, videos: entries }))
                        })
                    })
                },
            },
        },
    },
})
