import prisma from "../../prisma/client";

export async function getCategoryID(req, res) {
    const { uid } = req.query;
  
    try {
      let kategori_buku = await prisma.kategori_buku.findUnique({
        where: {
          id_kategori: parseInt(uid),
        }
      });
  
      res.status(200).json({
        message: "Kategori found successfully",
        data: kategori_buku,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }

  export async function getKategori(req, res) {
    const {skip} = req.query;
    const skipValue = skip ? Number(skip) : 0;

    try {
        let kategori_buku = await prisma.kategori_buku.findMany({
            skip: skipValue,
            select: {
                nama_kategori: true,
            }
        });

        let count = await prisma.kategori_buku.count();

        res.status(200).json({
            message: "kategori found successfully",
            total: count,
            data: kategori_buku,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

  export async function createCategory(req, res) {

    const { nama_kategori } = req.body;
    
    try {
      let kategori_buku = await prisma.kategori_buku.create({
        data: {
          nama_kategori,
        },
      });
      res.status(201).json({
        message: "Kategori added successfully",
        data: kategori_buku,
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }

  export async function createRelasi(req, res) {

    const { id_kategori, id_buku } = req.body;
    
    try {
      let kategori_buku_relasi = await prisma.kategori_buku_relasi.create({
        data: {
          id_kategori: parseInt(id_kategori),
          id_buku: parseInt(id_buku),
        },
      });
      res.status(201).json({
        message: "Kategori added successfully",
        data: kategori_buku_relasi,
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }

  export async function getRelasi(req, res) {
    const { skip } = req.query;
    const skipValue = skip ? Number(skip) : 0;
  
    try {
        let kategori_buku_relasi = await prisma.kategori_buku_relasi.findMany({
            skip: skipValue,
            select: {
                buku: {
                    select: {
                        judul: true,
                        deskripsi: true,
                        penulis: true,
                    }
                },
                kategori_buku: {
                    select: {
                        nama_kategori: true,
                    }
                },
            }
        });
  
        let count = await prisma.kategori_buku_relasi.count();
  
        res.status(200).json({
            message: "kategori relasi found successfully",
            total: count,
            data: kategori_buku_relasi,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
  }
  

  export async function getRelasiID(req, res) {
    const {skip} = req.query;
    const skipValue = skip ? Number(skip) : 0;

    try {
        let kategori_buku_relasi = await prisma.kategori_buku_relasi.findMany({
            skip: skipValue,
            select: {
                id_kategori: true,
                id_buku: true,
            }
        });

        let count = await prisma.kategori_buku.count();

        res.status(200).json({
            message: "kategori relasi found successfully",
            total: count,
            data: kategori_buku_relasi,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}
  