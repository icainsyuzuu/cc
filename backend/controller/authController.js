import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.js';
import dotenv from "dotenv";
dotenv.config();

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    // Cek apakah semua field diisi
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Cek apakah email sudah terdaftar
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan user baru
        const newUser = await User.create({
            username,
            email,
            password_hash: hashedPassword,
        });

        return res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: { id: newUser.id, username: newUser.username, email: newUser.email }
        });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: error.message });
    }
}

async function loginUser(req, res) {
    try {
        // console.log('Request body:', req.body); // Debug untuk cek body request

        const { email, password } = req.body;

        // Validasi input wajib diisi
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email dan password wajib diisi',
            });
        }

        // Cari user berdasarkan email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email atau password salah',
            });
        }

        // Cek kecocokan password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Email atau password salah',
            });
        }

        const userPlain = user.toJSON();
        const { password: _, refresh_token: __, ...safeUserData } = userPlain; // Hapus password dan refreshToken dari data yang akan dikirim
        console.log('Safe user data:', safeUserData); // Debug untuk cek data user yang aman

        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
        const accessToken = jwt.sign(
            { userId: user.id, username: user.username, email: user.email },
            accessTokenSecret,
            { expiresIn: '1d' } // Set access token expiration to 1 day
        );

        const refreshToken = jwt.sign(
            safeUserData,
            refreshTokenSecret,
            { expiresIn: '7d' } // Set refresh token expiration to 7 days
        );

        // Simpan refresh token ke database
        await User.update(
            { refresh_token: refreshToken },
            { where: { id: user.id } }
        );

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            secure: false // Set to true if using HTTPS
        });

        res.status(200).json({
            success: true,
            message: 'Login berhasil',
            accessToken: accessToken,
            data: {
                userId: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
        });
    }
}

async function logout(req, res) {
    try {
        // ambil refresh token dari cookie
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token found" });
        }

        const user = await User.findOne({ where: { refresh_token: refreshToken } });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const userId = user.id;

        // delete refresh token di database
        await User.update(
            { refresh_token: null },
            { where: { id: userId } }
        );

        res.clearCookie("refresh_token");

        return res.status(200).json({
            status: "success",
            message: "User logged out successfully"
        });
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: error.message });
    }
}

const getAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            return res.status(401).json({
                status: "error",
                message: "Refresh token not found"
            });
        }

        const user = await User.findOne({ where: { refresh_token: refreshToken } });

        // Check if user exists
        if (!user.refresh_token) {
            return res.status(401).json({
                status: "error",
                message: "User not found or refresh token is invalid"
            });
        }

        //if user exists, verify the refresh token
        else {
            const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
            const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
            jwt.verify(
                refreshToken,
                refreshTokenSecret,
                (err, decoded) => {
                    if (err) {
                        return res.status(403).json({
                            status: "error",
                            message: "Invalid refresh token"
                        });
                    }
                    //if refresh token valid, get user data
                    //convert user ke object JSON
                    const userPlain = user.toJSON();

                    //remove sensitive data
                    const { refresh_token: _, password_hash: __, ...safeUserData } = userPlain;

                    
                    const accessToken = jwt.sign(
                        safeUserData,
                        accessTokenSecret,
                        { expiresIn: "1d" } // Set access token expiration to 1 day
                    )

                    return res.status(200).json({
                        status: "success",
                        message: "Access token generated successfully",
                        access_token: accessToken,
                        userData: safeUserData
                    });
                }
            )
        }
    }
    catch (error) {
        console.error("Error getting access token:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}

export {
    registerUser,
    loginUser,
    logout,
    getAccessToken
}