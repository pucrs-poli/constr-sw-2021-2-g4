import mongoose from 'mongoose';
import { ENVIROMENT_VARIABLES } from "./enviroment"

const { USERNAME, PASSWORD, URL } = ENVIROMENT_VARIABLES.DATABASE

const url = `${URL}`

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