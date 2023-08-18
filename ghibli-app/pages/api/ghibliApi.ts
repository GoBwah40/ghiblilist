import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
    uri: string,
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query: { uri } } = req;
    const response = await axios.get(`https://ghibliapi.vercel.app/films/${uri}`);
    const data: Film = response.data;

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
