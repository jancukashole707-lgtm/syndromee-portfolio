// Vercel serverless function — fetches YouTube playlist RSS and returns video data as JSON
export default async function handler(req, res) {
  const playlistId =
    req.query.id || 'PLCw5X6AnijvlevYduVQcGNlumf6imBHF1'

  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(playlistId)}`
    const response = await fetch(rssUrl)

    if (!response.ok) {
      return res.status(502).json({ error: 'Failed to fetch playlist RSS' })
    }

    const xml = await response.text()

    // Parse entries from the RSS XML
    const entries = []
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g
    let match

    while ((match = entryRegex.exec(xml)) !== null) {
      const entry = match[1]

      const videoId =
        (entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/) || [])[1] || ''
      const title =
        (entry.match(/<title>(.*?)<\/title>/) || [])[1] || ''
      const published =
        (entry.match(/<published>(.*?)<\/published>/) || [])[1] || ''
      const description =
        (entry.match(/<media:description>([\s\S]*?)<\/media:description>/) ||
          [])[1] || ''

      if (videoId) {
        entries.push({
          videoId,
          title: decodeXml(title),
          published,
          description: decodeXml(description).slice(0, 200),
          thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          thumbnailMax: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${videoId}&list=${playlistId}`,
        })
      }
    }

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600')
    return res.status(200).json({ playlistId, count: entries.length, videos: entries })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

function decodeXml(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}
