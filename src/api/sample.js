export default function handler(req, res) {
  console.log("Hello!")

  if (req.method !== "GET") {
    return res.status(400).json({ message: "This should be a GET" });
  }

  res.status(200).json({ message: "Hello, localhost!" })
}