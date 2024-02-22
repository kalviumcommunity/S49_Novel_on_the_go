const express = require('express');
const router = express.Router();

let users = [
    { id: 1, Title: "The Great Gatsby", Description: '"The Great Gatsby" by F. Scott Fitzgerald is a timeless American classic set in the Roaring Twenties. Jay Gatsby, a mysterious millionaire, pursues the elusive Daisy Buchanan in a tale of love, wealth, and the American Dream. The novel explores the decadence and disillusionment of the Jazz Age with poetic brilliance.' },
    { id: 2, Title: "The Catcher in the Rye", Description: '"The Catcher in the Rye" is a classic novel by J.D. Salinger, narrated by Holden Caulfield. Set in the 1950s, it explores Holdens journey of teenage angst and rebellion in New York City. The narrative captures his unique voice and introspective musings, providing a poignant and timeless portrayal of adolescence and societal disillusionment.' }
];

router.get('/users', (req, res) => {
    res.json(users);
});
router.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});
router.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1, 
        Title : "To Kill a Mockingbird",
        Description: '"To Kill a Mockingbird" by Harper Lee is a poignant novel set in the racially charged American South during the 1930s. Through the eyes of Scout Finch, it explores themes of racial injustice, moral growth, and compassion. Atticus Finch, a lawyer, defends a wrongly accused Black man, showcasing the harsh realities of prejudice.'
    };
    users.push(newUser);
    res.status(201).json(newUser);
});
router.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    const { Title, Description } = req.body;
    users[userIndex].Title = Title;
    users[userIndex].Description = Description;
    res.json(users[userIndex]);
});

router.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.json({ message: 'User deleted successfully' });
});

module.exports = router;
