import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("Auth header:", authHeader);

    let token;

    // Ambil token dari format "Bearer <token>"
    if (authHeader) token = authHeader.split(" ")[1];

    // Kalau token gak ada
    if (!token) {
        return res.status(401).json({
            status: "Error",
            message: "Token tidak ada",
        });
    }

    // Verifikasi token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).json({
                status: "Error",
                message: "Access token tidak valid",
            });
        }

        req.user = decoded;
        console.log("Decoded token:", decoded);
        next();
    });
};

export { authMiddleware };