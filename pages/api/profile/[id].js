const profiles = [
  { id: 1, name: 'Gabriel', email: 'gabriel@gmail.com' },
  { id: 2, name: 'Zanin', email: 'zanin@gmail.com' },
  { id: 2, name: 'Gabriel Zanin', email: 'gabrielzanin@gmail.com' },
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
