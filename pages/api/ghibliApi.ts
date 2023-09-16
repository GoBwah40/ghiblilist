import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Film } from '@/model/film';

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Film>) {
  try {
    const response = await axios.get(`https://ghibliapi.vercel.app/films/`);
    const data: Film = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500);
  }
}
