// import express, { Request, Response } from 'express'
import express from 'express';
import type { Request, Response } from 'express';
const app = express()
const port = 3000



app.use(express.json());  

interface Event {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  petsAllowed: boolean;
  organizer: string;
}

const events: Event[] = [
  {
    id: 1,
    category: 'Music',
    title: 'Indie Night',
    description: 'Live indie bands and music.',
    location: 'Chiang Mai',
    date: '2025-03-01',
    time: '19:00',
    petsAllowed: false,
    organizer: 'CM Indie Club',
  },
  {
    id: 2,
    category: 'Sport',
    title: 'Morning Run',
    description: 'Community running event in the park.',
    location: 'Bangkok',
    date: '2025-03-05',
    time: '06:30',
    petsAllowed: true,
    organizer: 'Run Together',
  },
  {
    id: 3,
    category: 'Education',
    title: 'TypeScript Workshop',
    description: 'Learn basic TypeScript for beginners.',
    location: 'Online',
    date: '2025-03-10',
    time: '19:30',
    petsAllowed: false,
    organizer: 'Dev School',
  },
  {
    id: 4,
    category: 'Music',
    title: 'Jazz Night',
    description: 'Chill jazz with live band.',
    location: 'Chiang Mai',
    date: '2025-03-15',
    time: '20:00',
    petsAllowed: false,
    organizer: 'Jazz CM',
  },
  {
    id: 5,
    category: 'Education',
    title: 'Backend Basics',
    description: 'REST API with Node.js & Express.',
    location: 'Online',
    date: '2025-03-20',
    time: '18:00',
    petsAllowed: false,
    organizer: 'SE Course',
  },
];

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/test', (req: Request, res: Response) => {
  const id = req.query.id;
  const output = `id: ${id}`;
  res.send(output);
});

app.get('/events', (req: Request, res: Response) => {
  res.json(events);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

