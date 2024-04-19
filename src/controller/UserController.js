import prisma from "../../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getUser(req, res) {
    const {skip} = req.query;
    const skipValue = skip ? Number(skip) : 0;

    try {
        let user = await prisma.user.findMany({
            skip: skipValue,
            select: {
                email: true,
                password: true,
                username: true,
                
            }
        });

        let count = await prisma.user.count();

        res.status(200).json({
            message: "User found successfully",
            total: count,
            data: user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

export async function getUserID(req, res) {
    const { uid } = req.query;
  
    try {
      let user = await prisma.user.findUnique({
        where: {
          id_user: parseInt(uid),
        },
        // include: {
        //   Profile: true,
        // },
      });
  
      res.status(200).json({
        message: "User found successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }

  //pengguna biasa wirr
  export async function createUser(req, res) {

    const { email, password, username} = req.body;
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      let user = await prisma.user.create({
        data: {
          email,
          password : hashedPassword,
          username,
        },
      });
      res.status(201).json({
        message: "User created successfully",
        data: user,
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }

  export async function login(req, res) {
    const {email, password} = req.body;

    try {
      const user = await prisma.user.findFirst({
        where: { email : email },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Email atau password salah' });
      }

      const { password: _, ...userData } = user;

      const token = jwt.sign({ userId: user.id_user}, 'iniadalahaku', { expiresIn: '1d' });

      res.status(201).json({
        message: 'Login berhasil',
        userData,
        token,
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Internal server error',
        error: error,
      });
    }
  }

  //khusus petugas
  export async function loginPetugas(req, res) {
    const {username, password} = req.body;

    try {
      const user = await prisma.user.findFirst({
        where: { username: username },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Username atau password salah' });
      }

      let role = "petugas";
      if (user.role === "admin"){
        role = "admin";
      }

      const token = jwt.sign({ userId: user.id_user}, 'iniadalahaku', { expiresIn: '1h' });

      res.status(201).json({
        message: 'Login berhasil',
        token,
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Internal server error',
        error: error,
      });
    }
  }
  
  export async function createPetugas(req, res) {

    const { email, password, username, Role} = req.body;
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      let user = await prisma.user.create({
        data: {
          email,
          password : hashedPassword,
          username,
          role: Role || "admin", // Default role is "petugas"
        },
      });
      res.status(201).json({
        message: "User created successfully",
        data: user,
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }
  
//all role
  export async function logout(req, res) {
    try {
    const token = req.headers.authorization.split(' ')[1]; // Ambil token dari header
    const decoded = jwt.verify(token, 'iniadalahaku'); // Verifikasi token
    const role = decoded.role; // Ambil role dari token

      // Lakukan proses logout di sini
      res.status(200).json({
        message: "Logout berhasil",
        role: role,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
  