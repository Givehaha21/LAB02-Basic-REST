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

interface Book {
  id: number;
  title: string;
  author_name: string;
  description: string;
  groups: string;
}

//--Event Data
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


//--Book Data
const books: Book[] = [
  {
    id: 1,
    title: 'Clean Code',
    author_name: 'Robert C. Martin',
    description: 'A handbook of agile software craftsmanship.',
    groups: 'Programming',
  },
  {
    id: 2,
    title: 'The Pragmatic Programmer',
    author_name: 'Andrew Hunt, David Thomas',
    description: 'Practical tips for modern software developers.',
    groups: 'Programming',
  },
  {
    id: 3,
    title: 'Designing Data-Intensive Applications',
    author_name: 'Martin Kleppmann',
    description: 'Concepts behind reliable, scalable, maintainable systems.',
    groups: 'Software Architecture',
  },
  {
    id: 4,
    title: 'Atomic Habits',
    author_name: 'James Clear',
    description: 'Small habits, remarkable results.',
    groups: 'Self Development',
  },
  {
    id: 5,
    title: 'Deep Work',
    author_name: 'Cal Newport',
    description: 'Rules for focused success in a distracted world.',
    groups: 'Productivity',
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

//--Task 06 ข้อ 2 
//  app.get("/events", (req, res) => {
//     const category = req.query.category;
//     const filteredEvents = events.filter((event) => event.category === category);
//     res.json(filteredEvents);
// });

app.get("/events", (req, res) => {
  const category = req.query.category;

  if (!category) {
    res.json(events);
  } else {
    const filteredEvents = events.filter(
      (event) => event.category === category
    );
    res.json(filteredEvents);
  }
});

//--Task 07 ข้อ 1
 app.get("/events/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const event = events.find((event) => event.id === id);
    if (event) {
    res.json(event);
    } else {
    res.status(404).send("Event not found");
    }
}); 


// app.get('/books', (req: Request, res: Response) => {
//   res.json(books);
// });


app.get("/books", (req, res) => {
  const title = req.query.title as string | undefined;
  const groups = req.query.groups as string | undefined;

  let result = books;

  if (title) {
    result = result.filter((b) =>
      b.title.toLowerCase().startsWith(title.toLowerCase())
    );
  }

  if (groups) {
    result = result.filter((b) =>
      b.groups.toLowerCase() === groups.toLowerCase()
    );
  }

  res.json(result);
});

//--Task 08 ข้อ 1
app.post("/events", (req, res) => {
  // console.log("BODY =", req.body);
    const newEvent: Event = req.body;
    newEvent.id = events.length + 1;
    events.push(newEvent);
    res.json(newEvent);
});

app.post("/books", (req, res) => {
  const newBook: Book = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);

  res.json({
    message: "Book created successfully",
    book: newBook
  });
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

