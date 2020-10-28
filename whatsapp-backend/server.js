import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: '1087261',
  key: '9cc2fc471049c4b45af6',
  secret: '9b568c6800424f081b2c',
  cluster: 'us2',
  encrypted: true,
});

app.use(express.json());

app.use(cors());

const connection_url =
  'mongodb+srv://admin:OIZpiiKx63NWPmM4@cluster0.w69cq.mongodb.net/whatsappdb?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('DB Connected');

  const msgCollection = db.collection('messagecontents');
  const changeStream = msgCollection.watch();

  changeStream.on('change', (change) => {
    console.log(change);

    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument;
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log('Error triggering pusher');
    }
  });
});

app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/messages/new', (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created: \n ${data}`);
    }
  });
});

app.listen(port, () => console.log(`Listening on local host: ${port}`));
