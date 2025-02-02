import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, grade, team, product } = req.body;

    if (!name || !grade || !team || !product) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!['6th', '7th', '8th'].includes(grade)) {
        return res.status(400).json({ message: 'Invalid grade' });
    }

    if (!['Lead', 'Dream', 'Innovate'].includes(team)) {
        return res.status(400).json({ message: 'Invalid team' });
    }

    const transporter = nodemailer.createTransport({
        service: 'Outlook365',
        auth: {
            user: 'abyssshop77@gmail.com',
            pass: 'Abyssshopforusbs'
        }
    });

    const mailOptions = {
        from: 'abyssshop77@gmail.com',
        to: 'jrhatcher@students.wcpss.net',
        subject: `Request for ${product}`,
        text: `Name: ${name}\nGrade: ${grade}\nTeam: ${team}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Request sent successfully' });
    } catch (error) {
        console.error('Email error:', error);
        return res.status(500).json({ message: 'Failed to send request' });
    }
}
