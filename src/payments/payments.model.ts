import {
  Table,
  Column,
  Model,
  NotNull,
  PrimaryKey,
  ForeignKey,
} from 'sequelize-typescript';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from 'sequelize';
import { ShopsModel } from '../shops/shops.model';

export enum PaymentStatus {
  received = 'received',
  processed = 'processed',
  completed = 'completed',
  paid = 'paid',
}

@Table({
  timestamps: false,
})
export class PaymentsModel extends Model<
  InferAttributes<PaymentsModel>,
  InferCreationAttributes<PaymentsModel>
> {
  @PrimaryKey
  @Column({ type: DataTypes.BIGINT, allowNull: false, autoIncrement: true })
  id: number;

  @NotNull
  @Column({ type: DataTypes.BIGINT, allowNull: false })
  @ForeignKey(() => ShopsModel)
  shopId: number;

  @NotNull
  @Column({ type: DataTypes.DECIMAL, allowNull: false })
  amount: number;

  @NotNull
  @Column({ type: DataTypes.DECIMAL, allowNull: false })
  commissionAmount: number;

  @NotNull
  @Column({ type: DataTypes.DECIMAL, allowNull: false })
  lockedAmount: number;

  @NotNull
  @Column({
    type: DataTypes.ENUM(...Object.values(PaymentStatus)),
    allowNull: false,
  })
  status: string;

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
