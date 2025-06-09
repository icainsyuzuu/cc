import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.js';

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        // Validasi input wajib diisi
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Semua field (username, email, password) harus diisi',
            });
        }

        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email sudah terdaftar',
            });
        }

        // Hash password dengan bcrypt
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Simpan user baru ke database
        const newUser = await User.create({
            username,
            email,
            password_hash,
        });

        return res.status(201).json({
            success: true,
            message: 'User berhasil didaftarkan',
            data: { userId: newUser.id },
        });
    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
        });
    }
}

async function loginUser(req, res) {
    try {
        console.log('Request body:', req.body); // Debug untuk cek body request

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
            return res.status(400).json({
                success: false,
                message: 'Email atau password salah',
            });
        }

        // Cek kecocokan password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Email atau password salah',
            });
        }

        // Buat JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        return res.json({
            success: true,
            message: 'Login berhasil',
            data: { token },
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
        });
    }
}

export {
    registerUser,
    loginUser
}