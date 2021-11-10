import mongoose from 'mongoose';
import { ENVIROMENT_VARIABLES } from "./enviroment"

const { HOST, NAME, PORT, USERNAME, PASSWORD } = ENVIROMENT_VARIABLES.DATABASE


const url = `mongodb://${HOST}:${PORT}/${NAME}`;
// const url = `mongodb://${HOST}:${PORT}`;
mongoose.connection.on('error', function (err) {
    console.log("fuck bro not working")
});

const connectToServer = () => {
    console.log(url)
    mongoose.connect(url,
        {
            user: USERNAME,
            pass: PASSWORD,
            authSource: "admin",
            autoIndex: true
        }

    )

}

export default connectToServer