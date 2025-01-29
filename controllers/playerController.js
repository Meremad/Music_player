const axios = require("axios")

exports.getPlayer = (req, res) => {
  res.render("player", { user: req.session.user })
}

exports.searchSongs = async (req, res) => {
  const { q } = req.query
  try {
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track`, {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      },
    })
    res.json(response.data)
  } catch (error) {
    console.error("Error searching songs:", error)
    res.status(500).json({ error: "An error occurred while searching for songs" })
  }
}

exports.playSong = async (req, res) => {
  const { id } = req.params
  try {
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      },
    })
    res.json(response.data)
  } catch (error) {
    console.error("Error playing song:", error)
    res.status(500).json({ error: "An error occurred while fetching the song" })
  }
}

exports.getVideo = async (req, res) => {
  const { q } = req.query
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&key=${process.env.YOUTUBE_API_KEY}`,
    )
    const videoId = response.data.items[0].id.videoId
    res.json({ videoId })
  } catch (error) {
    console.error("Error getting video:", error)
    res.status(500).json({ error: "An error occurred while fetching the video" })
  }
}

