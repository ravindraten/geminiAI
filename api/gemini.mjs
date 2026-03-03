export default async function handler(req, res) {
  try {
    const { prompt } = JSON.parse(req.body);
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ text: "Error: GEMINI_API_KEY is not set in Vercel." });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      return res.status(500).json({ text: `Google API Error: ${data.error.message}` });
    }

    const text = data.candidates[0].content.parts[0].text;
    res.status(200).json({ text });

  } catch (error) {
    res.status(500).json({ text: `Server Error: ${error.message}` });
  }
}