import db from "../index";
export default class Invoice {
    static async create(data) {
        const queryString = `INSERT INTO invoices
            (trip_id, rider_id, driver_id, cost)
            VALUES
            ($1, $2, $3, $4) RETURNING *`;
        return await db.query(queryString, Object.values(data));
    }
}