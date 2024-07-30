// api/coins.js
let userData = {};

export default function handler(req, res) {
  const { userId, coins } = req.query;

  if (req.method === 'POST') {
    if (!userId || !coins) {
      return res.status(400).json({ message: 'Missing userId or coins' });
    }
    userData[userId] = coins;
    return res.status(200).json({ message: 'User data saved successfully' });
  } else if (req.method === 'GET') {
    if (!userId) {
      return res.status(400).json({ message: 'Missing userId' });
    }
    const userCoins = userData[userId];
    if (userCoins === undefined) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ userId, coins: userCoins });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
