// TODO: Definisikan semua jalur (Route) aplikasi kalian disini (GET, POST, PUT, DELETE)
const express = require("express");
const router = express.Router();
const db = require("../config/database");

// ========== READ: Halaman Utama (List Semua Nilai) ==========
router.get("/", (req, res) => {
  const query = `
    SELECT n.*, m.nama, m.kelas 
    FROM nilai n 
    JOIN mahasiswa m ON n.nim = m.nim 
    ORDER BY n.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send("Error fetching data");
    }
    res.render("index", { nilai: results, message: req.query.message });
  });
});

// ========== CREATE: Form Tambah Nilai ==========
router.get("/add", (req, res) => {
  // Ambil daftar mahasiswa untuk dropdown
  db.query("SELECT * FROM mahasiswa ORDER BY nama", (err, mahasiswa) => {
    if (err) {
      console.error("Error fetching mahasiswa:", err);
      return res.status(500).send("Error fetching mahasiswa");
    }
    res.render("add", { mahasiswa });
  });
});

// ========== CREATE: Proses Tambah Nilai ==========
router.post("/add", (req, res) => {
  const { nim, mata_kuliah, nilai_tugas, nilai_uts, nilai_uas } = req.body;

  const query = `
    INSERT INTO nilai (nim, mata_kuliah, nilai_tugas, nilai_uts, nilai_uas) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [nim, mata_kuliah, nilai_tugas, nilai_uts, nilai_uas],
    (err) => {
      if (err) {
        console.error("Error adding nilai:", err);
        return res.status(500).send("Error adding nilai");
      }
      res.redirect("/?message=Data berhasil ditambahkan!");
    }
  );
});

// ========== UPDATE: Form Edit Nilai ==========
router.get("/edit/:id", (req, res) => {
  const { id } = req.params;

  // Ambil data nilai yang akan diedit
  db.query("SELECT * FROM nilai WHERE id_nilai = ?", [id], (err, nilai) => {
    if (err || nilai.length === 0) {
      console.error("Error fetching nilai:", err);
      return res.status(404).send("Data tidak ditemukan");
    }

    // Ambil daftar mahasiswa untuk dropdown
    db.query("SELECT * FROM mahasiswa ORDER BY nama", (err, mahasiswa) => {
      if (err) {
        console.error("Error fetching mahasiswa:", err);
        return res.status(500).send("Error fetching mahasiswa");
      }
      res.render("edit", { nilai: nilai[0], mahasiswa });
    });
  });
});

// ========== UPDATE: Proses Edit Nilai ==========
router.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { nim, mata_kuliah, nilai_tugas, nilai_uts, nilai_uas } = req.body;

  const query = `
    UPDATE nilai 
    SET nim = ?, mata_kuliah = ?, nilai_tugas = ?, nilai_uts = ?, nilai_uas = ?
    WHERE id_nilai = ?
  `;

  db.query(
    query,
    [nim, mata_kuliah, nilai_tugas, nilai_uts, nilai_uas, id],
    (err) => {
      if (err) {
        console.error("Error updating nilai:", err);
        return res.status(500).send("Error updating nilai");
      }
      res.redirect("/?message=Data berhasil diupdate!");
    }
  );
});

// ========== DELETE: Hapus Nilai ==========
router.post("/delete/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM nilai WHERE id_nilai = ?", [id], (err) => {
    if (err) {
      console.error("Error deleting nilai:", err);
      return res.status(500).send("Error deleting nilai");
    }
    res.redirect("/?message=Data berhasil dihapus!");
  });
});

// ========== BONUS: Halaman Mahasiswa ==========
router.get("/mahasiswa", (req, res) => {
  db.query("SELECT * FROM mahasiswa ORDER BY nama", (err, results) => {
    if (err) {
      console.error("Error fetching mahasiswa:", err);
      return res.status(500).send("Error fetching mahasiswa");
    }
    res.render("mahasiswa", { mahasiswa: results });
  });
});

module.exports = router;
