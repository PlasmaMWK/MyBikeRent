// backend/config/db.config.js
module.exports = {
    server: "localhost\\SQLEXPRESS", // Remplacez par votre serveur SQL
    database: "MyBikeRent",
    authentication: {
      type: "default",
      options: {
        userName: "root", // Remplacez par votre nom d'utilisateur SQL
        password: "" // Remplacez par votre mot de passe SQL
      }
    },
    options: {
      encrypt: false,
      trustServerCertificate: true,
      enableArithAbort: true,
      instanceName: "SQLEXPRESS" // Changez selon votre instance
    }
  };