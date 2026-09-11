const db = require('../configs/db');
const { get } = require('../routes/lichsuthaydoiRoute');
const { create, update } = require('./taikhoanModel');


const lichsuthaydoiModel = {
    getAll: async () => {
        const query = 'SELECT * FROM lichsuthaydoi';
        const [rows] = await db.execute(query);
        return rows;
    },
    getByIdSP: async (id) => {
        const query = 'SELECT * FROM lichsuthaydoi WHERE masanpham = ? ORDER BY thoigian DESC, malichsu DESC LIMIT 5 OFFSET 1';
        const [rows] = await db.execute(query, [id]);
        return rows;
    },
    create: async (data) => {
        const { giasanpham, thoigian, masanpham } = data;
        const query = 'INSERT INTO lichsuthaydoi (giasanpham, thoigian, masanpham) VALUES (?, ?, ?)';
        const [result] = await db.execute(query, [giasanpham, thoigian, masanpham]);
        return { malichsuthaydoi: result.insertId, ...data };
    },
    update: async (malichsuthaydoi, data) => {
        const { giasanpham, thoigian, masanpham } = data;
        const query = 'UPDATE lichsuthaydoi SET giasanpham = ?, thoigian = ?, masanpham = ? WHERE malichsuthaydoi = ?';
        await db.execute(query, [giasanpham, thoigian, masanpham, malichsuthaydoi]);
        return { malichsuthaydoi, ...data };
    },
    delete: async (malichsuthaydoi) => {
        const query = 'DELETE FROM lichsuthaydoi WHERE malichsuthaydoi = ?';
        await db.execute(query, [malichsuthaydoi]);
        return { malichsuthaydoi };
    },
    deleteGiaSp: async (masanpham) => {
        const query = 'DELETE FROM lichsuthaydoi WHERE masanpham = ?';
        await db.execute(query, [masanpham]);
        return { masanpham };
    }
}

module.exports = lichsuthaydoiModel;