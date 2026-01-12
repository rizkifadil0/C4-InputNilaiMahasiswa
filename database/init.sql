    -- TODO: Tulis query SQL kalian di sini (CREATE TABLE & INSERT) untuk inisialisasi database otomatis
    -- Buat database jika belum ada
    CREATE DATABASE IF NOT EXISTS nilai_mahasiswa;
    USE nilai_mahasiswa;

    -- Tabel Mahasiswa
    CREATE TABLE IF NOT EXISTS mahasiswa (
        nim VARCHAR(20) PRIMARY KEY,
        nama VARCHAR(100) NOT NULL,
        kelas VARCHAR(10) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabel Data Nilai
    CREATE TABLE IF NOT EXISTS nilai (
        id_nilai INT AUTO_INCREMENT PRIMARY KEY,
        nim VARCHAR(20) NOT NULL,
        mata_kuliah VARCHAR(100) NOT NULL,
        nilai_tugas DECIMAL(5,2) DEFAULT 0,
        nilai_uts DECIMAL(5,2) DEFAULT 0,
        nilai_uas DECIMAL(5,2) DEFAULT 0,
        nilai_akhir DECIMAL(5,2) GENERATED ALWAYS AS (
            (nilai_tugas * 0.3) + (nilai_uts * 0.3) + (nilai_uas * 0.4)
        ) STORED,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (nim) REFERENCES mahasiswa(nim) ON DELETE CASCADE ON UPDATE CASCADE
    );

    -- Data Dummy Mahasiswa
    INSERT INTO mahasiswa (nim, nama, kelas) VALUES
    ('20240140001', 'Ahmad Rizki Pratama', 'C'),
    ('20240140002', 'Siti Nurhaliza', 'C'),
    ('20240140003', 'Budi Santoso', 'C'),
    ('20240140004', 'Deni Lestari', 'C'),
    ('20240140005', 'Eka Putri Wijaya', 'C');

    -- Data Dummy Nilai
    INSERT INTO nilai (nim, mata_kuliah, nilai_tugas, nilai_uts, nilai_uas) VALUES
    ('20240140001', 'Teknologi Server', 85.00, 90.00, 88.00),
    ('20240140001', 'Pemrograman Web', 78.00, 82.00, 80.00),
    ('20240140002', 'Teknologi Server', 92.00, 88.00, 90.00),
    ('20240140002', 'Basis Data', 85.00, 87.00, 89.00),
    ('20240140003', 'Teknologi Server', 75.00, 80.00, 78.00),
    ('20240140004', 'Pemrograman Web', 88.00, 85.00, 90.00),
    ('20240140005', 'Basis Data', 90.00, 92.00, 91.00);