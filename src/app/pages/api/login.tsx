import { NextApiResponse } from 'next';

export default async function handler(req: NextRequest, res: NextApiResponse) {
  const data = req.body; // Assuming data is sent in the request body

  // ... your user creation logic (e.g., database interaction)

    const cookieData = JSON.stringify(data); // Example user data
    res.setHeader('Set-Cookie', [
      `currentUser=${cookieData}; Path=/; HttpOnly; Secure; Max-Age=3600`,
    ]);

    res.status(200).json({ message: 'User created successfully' });
}
