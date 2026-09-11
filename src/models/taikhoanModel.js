const db = require('../configs/db');

const taikhoanModel = {
    getById: async (mataikhoan) => {
        const sql = "SELECT * FROM taikhoan WHERE id = ?";
        const [rows] = await db.query(sql, [mataikhoan]);
        return rows[0];
    },
    getByTenTaiKhoan: async (tentaikhoan) => {
        const sql = "SELECT t.*, c.macuahang FROM taikhoan t LEFT JOIN cuahang c ON t.mataikhoan = c.mataikhoan WHERE t.tentaikhoan = ?";
        const [rows] = await db.query(sql, [tentaikhoan]);
        return rows[0];
    },

    getAll: async () => {
        const sql = "SELECT * FROM taikhoan";
        const [rows] = await db.query(sql);
        return rows;
    },
    create: async (data) => {
        const { tentaikhoan, matkhau } = data;
        const sql = "INSERT INTO taikhoan ( tentaikhoan, matkhau) VALUES (?, ?)";
        const [result] = await db.query(sql, [tentaikhoan, matkhau]);
        return result.insertId;
    },
    update: async (id, data) => {
        const { tentaikhoan, matkhau } = data;
        const sql = "UPDATE taikhoan SET tentaikhoan = ?, matkhau = ? WHERE id = ?";
        const [result] = await db.query(sql, [tentaikhoan, matkhau, id]);
        return result.affectedRows > 0;
    },
    delete: async (id) => {
        const sql = "DELETE FROM taikhoan WHERE id = ?";
        const [result] = await db.query(sql, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = taikhoanModel;