import { getSession } from "next-auth/react";
import Place from "../../../modals/Place";
import connectMongo from "../../../libs/conn";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  if (req.method === "POST") {
    const session = await getSession({ req });

    console.log(session)

    if (!session) {
      res.status(401).json({ message: "Invalid session" });
    } else {
      try {
        const newPlace = new Place(req.body);
        const savedPlace = await newPlace.save();

        res.status(200).json(savedPlace);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  } else {
    res.status(500).json({ message: "Method not allowed" });
  }
}
