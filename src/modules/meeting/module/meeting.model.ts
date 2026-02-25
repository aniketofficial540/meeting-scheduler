import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/dbConnection'; 
import User from './user.model'; //fetching the user table details from the module/user.module.ts

// interface of the meeting table
interface MeetingAttributes {
  id?: number;
  userId: number; //foregin key
  title: string;
  startTime: Date;
  endTime: Date;
}

// Tthe sequelize class
class Meeting extends Model<MeetingAttributes> implements MeetingAttributes {
  public id!: number;
  public userId!: number;
  public title!: string;
  public startTime!: Date;
  public endTime!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// the database configuration
Meeting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, //condition where the id should be present in the table
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'meetings',
    timestamps: true,
  }
);

//defining the foreign key and linking the user table and the meeting table
User.hasMany(Meeting, { foreignKey: 'userId' }); //user table has many connection
Meeting.belongsTo(User, { foreignKey: 'userId' }); //meeting table should have only one connection to the user table

export default Meeting;