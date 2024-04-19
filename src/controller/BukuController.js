import prisma from "../../prisma/client";

export async function getBuku(req, res) {
    const {skip} = req.query;
    const skipValue = skip ? Number(skip) : 0;

    try {
        let buku = await prisma.buku.findMany({
            skip: skipValue,
            select: {
                id_buku: true,
                judul: true,
                deskripsi: true,
                penulis: true,
                penerbit: true,
                tahunterbit: true,
                jumlahhalaman: true,
                gambar: true,
            }
        });

        let count = await prisma.buku.count();

        res.status(200).json({
            message: "Buku found successfully",
            total: count,
            data: buku,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

export async function getBukuID(req, res) {
    const { id } = req.query;
  
    try {
      let buku = await prisma.buku.findUnique({
        where: {
          id_buku: parseInt(id),
        },
        // include: {
        //   Profile: true,
        // },
      });
  
      res.status(200).json({
        message: "Book found successfully",
        data: buku,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }

  // nambahin buku
  export async function addBook(req, res) {

    const { judul, deskripsi, penulis, penerbit, tahunterbit, jumlahhalaman, gambar} = req.body;
    
    try {
      let buku = await prisma.buku.create({
        data: {
          judul,
          deskripsi,
          penulis,
          penerbit,
          jumlahhalaman: parseInt(jumlahhalaman),
          tahunterbit,
          gambar,
        },
      });
      res.status(201).json({
        message: "Book added successfully",
        data: buku,
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }

  // Update a book by ID
  export async function updateBuku(req, res) {
    const { id } = req.query;
    const { judul, penulis, tahunterbit, jumlahhalaman, penerbit, deskripsi, gambar } = req.body;
  
    try {
      let buku = await prisma.buku.update({
        where: { id_buku: parseInt(id) },
        data: {
            judul,
            deskripsi,
            tahunterbit,
            penulis,
            jumlahhalaman: parseInt(jumlahhalaman),
            penerbit,
            gambar,
        },
      });
  
      res.status(200).json({
        message: "Book updated successfully",
        data: buku,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
}

//deleteBuku
export async function deleteBuku(req, res) {
  const { id } = req.query;

  try {
    await prisma.buku.delete({
      where: {
        id_buku: parseInt(id),
      }
    })

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}