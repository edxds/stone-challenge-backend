import express, { Router } from 'express';
import cors from 'cors';

import { MapMarker } from './map-marker.model';

export function runServer() {
  const app = express();
  const port = 8080;

  app.use(cors());
  app.use(express.json());

  const markerRouter = Router()
    .get('/', async (req, res) => {
      const markers = await MapMarker.find();
      res.send({
        data: markers,
      });
    })
    .get('/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const marker = await MapMarker.findById(id);
        if (!marker) {
          return res.status(404).send({ data: null });
        }

        res.send({ data: marker });
      } catch (error) {
        res.status(500).send({ error });
      }
    })
    .post('/', async (req, res) => {
      const { marker } = req.body;
      if (!marker) {
        return res.status(400).send({ message: 'Send marker data in request body!' });
      }

      try {
        const newMarker = new MapMarker({ ...marker });
        await newMarker.save();

        res.status(201).send({ data: newMarker });
      } catch (error) {
        res.status(500).send({ error });
      }
    })
    .post('/switch-favorite/:id', async (req, res) => {
      try {
        const { id } = req.params;
        if (!id) {
          return res.status(400).send({ message: 'Bad Request, missing id in path' });
        }

        const marker = await MapMarker.findById(id);
        if (!marker) {
          return res.status(404).send({ message: 'Marker not found' });
        }

        marker.set('favorite', !marker.favorite);
        await marker.save();

        res.send({ data: marker });
      } catch (error) {
        res.status(500).send({ error });
      }
    })
    .delete('/:id', async (req, res) => {
      try {
        const { id } = req.params;
        if (!id) {
          return res.status(400).send({ message: 'Bad Request, missing id in path' });
        }

        await MapMarker.deleteOne({ _id: id });
        res.send({ sucess: true });
      } catch (error) {
        res.status(500).send({ error });
      }
    });

  app.use('/markers', markerRouter);

  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
}
