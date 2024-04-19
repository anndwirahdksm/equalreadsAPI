import prisma from "../../prisma/client";

export async function getUlasan(req, res) {
  const { skip } = req.query;
  const skipValue = skip ? Number(skip) : 0;

  try {
    let ulasan_buku = await prisma.ulasan_buku.findMany({
      skip: skipValue,
      select: {
        id_user: true,
        id_buku: true,
        ulasan: true,
        rating: true,
        tgl_ulasan: true,
      },
    });

    let count = await prisma.ulasan_buku.count();

    res.status(200).json({
      message: "Ulasan found successfully",
      total: count,
      data: ulasan_buku,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

export async function getUlasanID(req, res) {
  const { id } = req.query;

  try {
    let ulasan_buku = await prisma.ulasan_buku.findUnique({
      where: {
        id_ulasan: parseInt(id),
      },
      // include: {
      //   Profile: true,
      // },
    });

    if (!ulasan_buku) {
      res.status(401).json({
        message: "Ulasan tidak di temukan",
        data: ulasan_buku,
      });
    }

    res.status(200).json({
      message: "Ulasan found successfully",
      data: ulasan_buku,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

export async function addUlasan(req, res) {
  const { id_user, id_buku, ulasan, rating } = req.body;
  const tgl_ulasan = new Date();

  try {
    let ulasan_buku = await prisma.ulasan_buku.create({
      data: {
        id_user: parseInt(id_user),
        id_buku: parseInt(id_buku),
        tgl_ulasan,
        ulasan,
        rating: parseInt(rating),
      },
    });
    res.status(201).json({
      message: "Ulasan added successfully",
      data: ulasan_buku,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

//edit Ulasan
export async function updateUlasan(req, res) {
  const { id } = req.query;
  const { ulasan, rating } = req.body;

  try {
    let existingUlasan = await prisma.ulasan_buku.findUnique({
      where: { id_ulasan: parseInt(id) },
    });

    if (!existingUlasan) {
      return res.status(404).json({ message: "Ulasan not found" });
    }

    let ulasan_buku = await prisma.ulasan_buku.update({
      where: { id_ulasan: parseInt(id) },
      data: {
        id_user: existingUlasan.id_user,
        id_buku: existingUlasan.id_buku,
        tgl_ulasan: existingUlasan.tgl_ulasan,
        ulasan,
        rating: parseInt(rating),
      },
    });

    res.status(200).json({
      message: "Ulasan updated successfully",
      data: ulasan_buku,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

//delete Ulasan
export async function deleteUlasan(req, res) {
  const { id } = req.query;

  try {
    let ulasan_buku = await prisma.ulasan_buku.findUnique({
      where: {
        id_ulasan: parseInt(id),
      },
    });

    if (!ulasan_buku) {
      res.status(401).json({
        message: "data tidak ada atau mungkin sudah di hapus CMIIW :)",
      });
    }

    await prisma.ulasan_buku.delete({
      where: {
        id_ulasan: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Ulasan deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}