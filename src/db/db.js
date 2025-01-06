const sql = require("msnodesqlv8");

const connectionString = "Driver={ODBC Driver 18 for SQL Server};Server=DESKTOP-FQPU69F;Database=pmt_sanfe;Trusted_Connection=Yes;Encrypt=yes;TrustServerCertificate=yes;";

module.exports = {
    query: (query, params = [], callback) => {
        sql.query(connectionString, query, params, callback);
    },
};
