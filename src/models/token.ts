import { Schema, model, Types } from 'mongoose';

export interface IToken {
  userId: Types.ObjectId;
  refreshToken: string;
}

const tokenSchema = new Schema<IToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
 
);

export default model<IToken>('RefreshToken', tokenSchema);
