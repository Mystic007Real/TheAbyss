import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set in Vercel dashboard

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, grade, team, product } = req.body;

  // Basic validation
  if (!name || !grade || !team || !product) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const msg = {
    to: 'jrhatcher@students.wcpss.net',
    from: 'your-verified-sendgrid-email@example.com', // Replace with your SendGrid verified sender
    subject: `Request for ${product}`,
    text: `Name: ${name}\nGrade: ${grade}\nTeam: ${team}`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email' });
  }
}
