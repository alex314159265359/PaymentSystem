import {
  Table,
  Column,
  Model,
  NotNull,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';
import { PaymentsModel } from '../payments/payments.model';

@Table({
  timestamps: false,
})
export class ShopsModel extends Model<
  InferAttributes<ShopsModel>,
  InferCreationAttributes<ShopsModel>
> {
  @PrimaryKey
  @Column({ type: DataTypes.BIGINT, allowNull: false, autoIncrement: true })
  id: number;

  @NotNull
  @Column({ type: DataTypes.STRING, allowNull: false })
  name: string;

  @NotNull
  @Column({ type: DataTypes.DECIMAL, allowNull: false })
  commission: number;

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

  @HasMany(() => PaymentsModel)
  payments: PaymentsModel[];
}
