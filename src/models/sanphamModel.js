const db = require('../configs/db');

const sanphamModel = {
    getAll: async () => {
        const query = 'SELECT s.masanpham,s.tensanpham,s.motasanpham,s.anhsanpham,s.madanhmuc,d.tendanhmuc,ls.giasanpham AS giaban,ls.thoigian AS thoigiancapnhat FROM sanpham s LEFT JOIN danhmuc d ON s.madanhmuc = d.madanhmuc LEFT JOIN ( SELECT l1.masanpham, l1.giasanpham, l1.thoigian FROM lichsuthaydoi l1 INNER JOIN ( SELECT masanpham, MAX(malichsu) AS max_id FROM lichsuthaydoi GROUP BY masanpham ) l2 ON l1.malichsu = l2.max_id) ls ON s.masanpham = ls.masanpham;';
        const [rows] = await db.execute(query);
        return rows;
    },
    getById: async (id) => {
        const query = 'SELECT * FROM sanpham WHERE masanpham = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0] || null;
    },
    create: async (data) => {
        const { tensanpham, motasanpham, anhsanpham, madanhmuc } = data;
        const query = 'INSERT INTO sanpham (tensanpham, motasanpham, anhsanpham, madanhmuc) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [tensanpham, motasanpham || null, anhsanpham || null, madanhmuc || null]);
        return { masanpham: result.insertId, ...data };
    },
    update: async (masanpham, data) => {
        const { tensanpham, motasanpham, anhsanpham, madanhmuc } = data;
        const query = 'UPDATE sanpham SET tensanpham = ?, motasanpham = ?, anhsanpham = ?, madanhmuc = ? WHERE masanpham = ?';
        await db.execute(query, [tensanpham, motasanpham, anhsanpham, madanhmuc, masanpham]);
        return { masanpham, ...data };
    },
    delete: async (masanpham) => {
        const query = 'DELETE FROM sanpham WHERE masanpham = ?';
        await db.execute(query, [masanpham]);
        return { masanpham };
    }
}

module.exports = sanphamModel;