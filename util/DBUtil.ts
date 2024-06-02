import mongoose from "mongoose";

export class DBUtil {
    public static async connectToDB(dbUrl: string, dbName: string): Promise<string> {
        try {
            await mongoose.connect(dbUrl, {
                dbName: dbName,
            });
            return "Connected to MongoDB successfully";
        } catch (error) {
             return "MongoDB connection failed: ";
        }
    }
}
