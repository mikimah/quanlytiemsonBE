const db = require('../configs/db');

const cuahangModel = {
    getAll: async () => {
        const query = 'SELECT * FROM cuahang';
        const [rows] = await db.execute(query);
        return rows;
    },
    create: async (data) => {
        const { tencuahang, mataikhoan } = data;
        const query = 'INSERT INTO cuahang (tencuahang, mataikhoan) VALUES (?, ?)';
        const [result] = await db.execute(query, [tencuahang, mataikhoan]);
        return { macuahang: result.insertId, ...data };
    },
    update: async (macuahang, data) => {
        const { tencuahang, mataikhoan } = data;
        const query = 'UPDATE cuahang SET tencuahang = ?, mataikhoan = ? WHERE macuahang = ?';
        await db.execute(query, [tencuahang, mataikhoan, macuahang]);
        return { macuahang, ...data };
    },
    delete: async (macuahang) => {
        const query = 'DELETE FROM cuahang WHERE macuahang = ?';
        await db.execute(query, [macuahang]);
        return { macuahang };
    }
}

module.exports = cuahangModel;
