import prisma from "../../prisma/client";

//get Koleksi By ID
export async function getKoleksiID(req, res) {
    const { id } = req.query;
  
    try {
      let koleksi_pribadi = await prisma.koleksi_pribadi.findUnique({
        where: { id_koleksi: parseInt(id) },
        select: {
          buku: {
            select: {
                judul: true,
                penulis: true,
                penerbit: true
            }
          },
        }
      });

      if (!koleksi_pribadi) {
        res.status(401).json({
          message: "Koleksi tidak di temukan",
          data: koleksi_pribadi,
        });
      }
  
      res.status(200).json({
        message: "Koleksi found successfully",
        data: koleksi_pribadi,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }

//get Koleksi
export async function getKoleksi(req, res) {
  const { skip } = req.query;
  const skipValue = skip ? Number(skip) : 0;

  try {
      let koleksi_pribadi = await prisma.koleksi_pribadi.findMany({
          skip: skipValue,
          select: {
              id_user: true,
              id_buku: true,
          }
      });

      let count = await prisma.koleksi_pribadi.count();

      res.status(200).json({
          message: "Koleksi found successfully",
          total: count,
          data: koleksi_pribadi,
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({
          message: "Internal server error",
          error: error,
      });
  }
}


//menambah Koleksi
export async function addKoleksi(req, res) {

  const { id_user, id_buku } = req.body;
  
  try {

    const existingKoleksi = await prisma.koleksi_pribadi.findFirst({
        where: {
          id_user: parseInt(id_user),
          id_buku: parseInt(id_buku),
        },
    });
  
      if (existingKoleksi) {
        return res.status(400).json({
          message: "Anda sudah menambahkan ke koleksi",
        });
      }

    let koleksi_pribadi = await prisma.koleksi_pribadi.create({
      data: {
        id_user: parseInt(id_user),
        id_buku: parseInt(id_buku),
      },
    });

    res.status(201).json({
      message: "Koleksi added successfully",
      data: koleksi_pribadi,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

//delete Relasi
export async function deleteKoleksi(req, res) {
  const { id } = req.query;

  try {
    let koleksi_pribadi = await prisma.koleksi_pribadi.findUnique({
      where: {
        id_koleksi: parseInt(id),
      },
    });

    if (!koleksi) {
      res.status(401).json({
        message: "data tidak ada atau mungkin sudah di hapus CMIIW :)",
      });
    }

    await prisma.koleksi_pribadi.delete({
      where: {
        id_koleksi: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Koleksi deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}