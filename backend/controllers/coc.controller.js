import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const COC_TOKEN = process.env.COC_TOKEN_223;

export const getWarlog = async (req, res) => {
    const clanTag = req.params.clanTag;
    try {
      const response = await axios.get(`https://api.clashofclans.com/v1/clans/%23${clanTag}/warlog`, {
        headers: {
          Authorization: `Bearer ${COC_TOKEN}`
        }
      });
      console.log(response.data);
      res.json(response.data);
    } catch (error) {
      console.error('Clash API Error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to fetch warlog' });
    }
  }