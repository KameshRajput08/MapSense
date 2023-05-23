import { hash } from "bcryptjs";
import connectMongo from "../../../libs/conn.js";
import User from "../../../modals/User.js";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body)
      return res.status(404).json({ error: "Don't have form data...!" });
    const { name, email, password } = req.body;

    // check duplicate users
    const checkexisting = await User.findOne({ email });
    if (checkexisting)
      return res.status(403).json({ error: "User Already Exists...!" });

    try {
      const user = await User.create({
        name,
        email,
        password: await hash(password, 12),
      });

      res.status(200).json({ status: true, user });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json({ message: "Method not allowed" });
  }
}
