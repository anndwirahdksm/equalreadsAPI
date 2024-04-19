import prisma from "../../prisma/client";

export async function getPeminjaman(req, res) {
    const {skip} = req.query;
    const skipValue = skip ? Number(skip) : 0;

    try {
        let peminjaman = await prisma.peminjaman.findMany({
            skip: skipValue,
            select: {
                id_user: true,
                id_buku: true,
                tgl_pinjam: true,
                tgl_kembali: true,
                status: true,
            }
        });

        let count = await prisma.peminjaman.count();

        res.status(200).json({
            message: "Peminjaman found successfully",
            total: count,
            data: peminjaman,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

export async function getPeminjamanID(req, res) {
    const { uid } = req.query;
  
    try {
      let peminjaman = await prisma.peminjaman.findUnique({
        where: {
          id_peminjaman: parseInt(uid),
        },
        // include: {
        //   Profile: true,
        // },
      });
  
      res.status(200).json({
        message: "Peminjaman found successfully",
        data: peminjaman,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }

export async function createPeminjaman(req, res) {
    const { id_user, id_buku, tgl_pinjam, tgl_kembali } = req.body;
  
    try {

      let peminjaman = await prisma.peminjaman.create({
        data: {
          id_user: parseInt(id_user),
          id_buku: parseInt(id_buku),
          tgl_pinjam : new Date(tgl_pinjam),
          tgl_kembali : new Date(tgl_kembali),
        },
      });
      res.status(201).json({
        message: "Buku terpinjam",
        data: peminjaman,
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }