const db = require('../configs/db');
const { create, update } = require('./taikhoanModel');


const danhmucModel = {
    getAll: async () => {
        const query = 'SELECT d.*, COUNT(s.masanpham) AS soluongsanpham FROM danhmuc d LEFT JOIN sanpham s ON d.madanhmuc = s.madanhmuc GROUP BY d.madanhmuc';
        const [rows] = await db.execute(query);
        return rows;
    },
    create: async (data) => {
        const { tendanhmuc, macuahang } = data;
        const query = 'INSERT INTO danhmuc (tendanhmuc, macuahang) VALUES (?, ?)';
        const [result] = await db.execute(query, [tendanhmuc, macuahang]);
        return { madanhmuc: result.insertId, ...data };
    },
    update: async (madanhmuc, data) => {
        const { tendanhmuc, macuahang } = data;
        const query = 'UPDATE danhmuc SET tendanhmuc = ?, macuahang = ? WHERE madanhmuc = ?';
        await db.execute(query, [tendanhmuc, macuahang, madanhmuc]);
        return { madanhmuc, ...data };
    },
    delete: async (madanhmuc) => {
        const query = 'DELETE FROM danhmuc WHERE madanhmuc = ?';
        await db.execute(query, [madanhmuc]);
        return { madanhmuc };
    }
}

module.exports = danhmucModel;