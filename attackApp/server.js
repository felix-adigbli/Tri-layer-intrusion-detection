import app from "./src/app.js"

const port = 8060

app.listen(port, ()=> console.log(`attack app is running on http://localhost:${port}/`));
