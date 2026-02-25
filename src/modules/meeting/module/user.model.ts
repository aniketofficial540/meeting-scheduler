import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/dbConnection'; 

// defined the interface of the user table
interface UserAttributes {
  id?: number; 
  name: string;
  email: string;
  password?: string;
}

// The sequalize class - establishing the connection between the node js and database
class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// the database configuration
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      primaryKey: true,    
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,    
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,        
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,           
    tableName: 'users',  
    timestamps: true,    
  }
);

export default User;