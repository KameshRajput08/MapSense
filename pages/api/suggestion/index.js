import Suggestion from "../../../modals/Suggestion";
import connectMongo from "../../../libs/conn";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  if (req.method === "POST") {
  
      try {
        const newSuggestion = new Suggestion(req.body);
        const savedSuggestion = await newSuggestion.save();

        res.status(200).json(savedSuggestion);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  } else {
    res.status(500).json({ message: "Method not allowed" });
  }
}
