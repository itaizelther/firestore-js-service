import { Router } from "express";

const api = Router();
import db from "./db/connector.js";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  query,
  where,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { parseQueryValue } from "./utils/utils.js";

// collection match middleware
api.param("collection", (req, _, next, coll) => {
  req.collection = collection(db, coll);
  next();
});

// GET all items in a collection
api.get("/:collection", async (req, res) => {
  const q = query(
    req.collection,
    ...Object.entries(req.query).map(([key, value]) =>
      where(key, "==", parseQueryValue(value))
    )
  );

  const list = await getDocs(q);
  res.send(list.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
});

// if an app searches null ID, should empty response be returned
api.get("/:collection/null", async (_, res) => {
  res.end();
});

// GET an itme from collection by an ID
api.get("/:collection/:id", async (req, res) => {
  const item = await getDoc(doc(req.collection, req.params.id));
  if (item.data()) {
    res.send({ id: req.params.id, ...item.data() });
  } else {
    res
      .status(404)
      .send(`${req.params.id} does not exist in quried collection.`);
  }
});

// POST a new item to a collection
api.post("/:collection", async (req, res) => {
  const newDoc = await addDoc(req.collection, req.body);
  res.send({ ...req.body, id: newDoc.id });
});

// POST a new item to a collection with a predefined given id
api.post("/:collection/:id", async (req, res) => {
  await setDoc(doc(req.collection, req.params.id), req.body);
  res.send({ ...req.body, id: req.params.id });
});

// PUT update an existing item in a collection
api.put("/:collection/:id", async (req, res) => {
  await updateDoc(doc(req.collection, req.params.id), req.body);
  res.end();
});

export default api;
