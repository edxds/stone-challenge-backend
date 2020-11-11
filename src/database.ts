import mongoose, { Connection, SchemaOptions } from 'mongoose';

export async function connectDatabase(): Promise<Connection> {
  try {
    await mongoose.connect('mongodb://localhost/stone-backend', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: process.env.AUTH_DB ?? 'admin',
      auth: { user: process.env.DB_USER!, password: process.env.DB_PASS! },
    });

    console.log('Connected to database!');
    return mongoose.connection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const defaultSchemaOptions: SchemaOptions = {
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
};
