import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("please define mongodb");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose;
}
export async function connetdb() {
  if (cached.con) {
    return cached.Errorcon;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(() => mongoose.connection);
  }

  try {
    cached.con = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw new Error("check db files");
  }
  return cached.con;
}
