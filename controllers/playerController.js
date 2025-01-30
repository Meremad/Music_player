const axios = require("axios")

exports.getPlayer = (req, res) => {
  res.render("player", { user: req.session.user })
}


const getSpotifyToken = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  
  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Spotify token obtained successfully");
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting Spotify token:", error.response?.data || error.message);
    throw new Error("Failed to obtain Spotify token");
  }
};

exports.searchSongs = async (req, res) => {
  const { q } = req.query;
  try {
    const accessToken = await getSpotifyToken();
    
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error searching songs:", error.response?.data || error.message);
    res.status(500).json({ error: "An error occurred while searching for songs" });
  }
};


exports.playSong = async (req, res) => {
  const { id } = req.params

  try {
    const accessToken = await getSpotifyToken();
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

