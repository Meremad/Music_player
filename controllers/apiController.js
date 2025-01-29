const fetch = require('node-fetch');
const ApiHistory = require('../models/ApiHistory');

exports.getLyrics = async (req, res) => {
  const { artist, title } = req.query;
  try {
    const response = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    const data = await response.json();
    
    // Save to history
    await ApiHistory.create({
      userId: req.session.user.id,
      endpoint: 'lyrics',
      query: `${artist} - ${title}`,
      result: data
    });
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching lyrics' });
  }
};

exports.getArtistInfo = async (req, res) => {
  const { artist } = req.query;
  try {
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=${process.env.LAST_FM_API_KEY}&format=json`);
    const data = await response.json();
    
    // Save to history
    await ApiHistory.create({
      userId: req.session.user.id,
      endpoint: 'artist-info',
      query: artist,
      result: data
    });
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching artist info' });
  }
};