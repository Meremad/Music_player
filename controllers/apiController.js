const fetch = require('node-fetch');
const ApiHistory = require('../models/ApiHistory');

exports.getLyrics = async (req, res) => {
  const { artist, title } = req.query;
  try {
    const response = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    const lyricsData = await response.json();

    const artistInfoResponse = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=${process.env.LAST_FM_API_KEY}&format=json`);
    const artistInfoData = await artistInfoResponse.json();

    await ApiHistory.create({
      userId: req.session.user.id,
      endpoint: 'lyrics',
      query: `${artist} - ${title}`,
      result: lyricsData
    });

    res.render('details', {
      artist,
      title,
      lyrics: lyricsData.lyrics || 'No lyrics found',
      artistInfo: artistInfoData.artist || { name: 'Unknown', bio: { summary: 'No information available.' } },
    });
  } catch (error) {
    console.error('Error fetching song details:', error);
    res.status(500).send('An error occurred while fetching song details.');
  }
};


exports.getArtistInfo = async (req, res) => {
  const { artist } = req.query;
  try {
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=${process.env.LAST_FM_API_KEY}&format=json`);
    const data = await response.json();
    
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