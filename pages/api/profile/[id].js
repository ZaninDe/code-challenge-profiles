const profiles = [
  {
    id: 1,
    name: 'Gabriel',
    email: 'gabriel@gmail.com',
    facebook: 'https://www.facebook.com/gabriel',
    twitter: 'https://twitter.com/gabriel',
  },
  {
    id: 2,
    name: 'Zanin',
    email: 'zanin@gmail.com',
    facebook: 'https://www.facebook.com/zanin',
    twitter: 'https://twitter.com/zanin',
  },
  {
    id: 3,
    name: 'Maria',
    email: 'maria@gmail.com',
    facebook: 'https://www.facebook.com/maria',
    twitter: 'https://twitter.com/maria',
  },
  {
    id: 4,
    name: 'Pedro',
    email: 'pedro@gmail.com',
    facebook: 'https://www.facebook.com/pedro',
    twitter: 'https://twitter.com/pedro',
  },
];

const handler = (req, res) => {
  try {
    const id = req.query.id;
    res.status(200).json(profiles.filter((profile) => profile.id == id));
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
