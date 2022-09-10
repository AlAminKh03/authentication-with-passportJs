require("dotenv").config()

const PORT = process.env.port || 6000;
const app = require("./app")


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})
