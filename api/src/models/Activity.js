const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty:{
      type: DataTypes.ENUM("1","2","3","4","5"),
      allowNull: false
    },
    duration:{
      type: DataTypes.REAL,
      allowNull: false
    },
    season:{
      type: DataTypes.ARRAY(DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera")),
      allowNull:false,
    }
  },
  { timestamps: false }
  );
};