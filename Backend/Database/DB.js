import mongoose from "mongoose"

export const DBConnect = () => {
    mongoose.connect(process.env.MONGODB_URI, {dbName: "EVENT_NEWLIFE"}).then(() => {
        console.log("Connected to database!")
    })
    .catch((err) => {
        console.log("Some error occured while connecting to database: ", err)
    })
}
