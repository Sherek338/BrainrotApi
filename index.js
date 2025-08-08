const express = require('express');
const queue = require('express-queue');

const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const dataPath = path.join(__dirname, 'data.json');
const data = getJsonData(dataPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(queue({ activeLimit: 10, queuedLimit: -1 }));

app.get('/', (req, res) => {
	res.send('Server is running');
});

app.get('/api/users', async (req, res) => {
	res.send(data.users);
});

app.get('/api/posts', async (req, res) => {
	res.send(data.posts);
});

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});

function getJsonData(path) {
	try {
		const data = fs.readFileSync(path, 'utf-8');
		return JSON.parse(data);
	} catch (error) {
		throw error;
	}
}
