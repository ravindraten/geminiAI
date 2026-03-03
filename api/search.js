export default async function handler(req, res) {
  const { prompt } = JSON.parse(req.body);
  const apiKey = process.env.GEMINI_API_KEY; // This is pulled from Vercel's secret settings

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;
  
  res.status(200).json({ text });
}
