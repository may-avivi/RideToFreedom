import { sql } from '@vercel/postgres';


// Handler
export default async function handler(req, res) {
    const { email, password } = req.body;

    if (req.method === 'POST') {
        try {
            const data = await sql`SELECT * FROM users WHERE email = ${email};`;
            console.log("🚀 ~ handler ~ data:", data)
            const actual_password = data.rows[0].password;
            if (password !== actual_password) {
                res.status(404).json('Not authorized')
            }
            res.status(200).json({ user: data.rows[0] });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).end();
    }
}