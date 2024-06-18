import {
  Table,
  Column,
  Model,
  NotNull,
  PrimaryKey,
} from 'sequelize-typescript';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';

@Table({
  timestamps: false,
})
export class SystemSettingsModel extends Model<
  InferAttributes<SystemSettingsModel>,
  InferCreationAttributes<SystemSettingsModel>
> {
  @PrimaryKey
  @Column({ type: DataTypes.BIGINT, allowNull: false, autoIncrement: true })
  id: number;

  @NotNull
  @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
  key: string;

  @NotNull
  @Column({ type: DataTypes.JSONB, allowNull: false, defaultValue: {} })
  attrs: { [key: string]: any };

  @NotNull
  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('NOW()'),
  })
  createdAt: Date;

  @NotNull
  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('NOW()'),
  })
  updatedAt: Date;
}
