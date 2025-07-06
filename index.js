const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

const app = express();

// Middleware setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Adnan@123shah",
    database: "delta_app",
});

// Global error handler
function handleDbError(err, res) {
    console.error("Database Error:", err);
    return res.status(500).send("Internal Server Error. Please try again later.");
}

// Routes

// Home - show count
app.get("/", (req, res) => {
    const q = "SELECT COUNT(*) AS count FROM user";
    connection.query(q, (err, result) => {
        if (err) return handleDbError(err, res);
        const count = result[0].count;
        res.render("home.ejs", { count });
    });
});

// Show all users
app.get("/user", (req, res) => {
    const q = "SELECT * FROM user";
    connection.query(q, (err, users) => {
        if (err) return handleDbError(err, res);
        res.render("showusers.ejs", { users });
    });
});

// Edit form
app.get("/user/:id/edit", (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM user WHERE id = ?";
    connection.query(q, [id], (err, result) => {
        if (err) return handleDbError(err, res);
        if (result.length === 0) return res.status(404).send("User not found");
        console.log(result[0]);
        res.render("edit.ejs", { user: result[0] });
    });
});

// Update user
app.patch("/user/:id", (req, res) => {
    const { id } = req.params;
    const { username: newUsername, password: formPass } = req.body;
    const q = "SELECT * FROM user WHERE id = ?";

    connection.query(q, [id], (err, result) => {
        if (err) return handleDbError(err, res);
        if (result.length === 0) return res.status(404).send("User not found");

        const user = result[0];
        if (formPass !== user.password) return res.send("WRONG Password");

        const updateQuery = "UPDATE user SET username = ? WHERE id = ?";
        connection.query(updateQuery, [newUsername, id], (err) => {
            if (err) return handleDbError(err, res);
            res.redirect("/user");
        });
    });
});

// Delete confirmation page
app.get("/user/:id/delete", (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM user WHERE id = ?";
    connection.query(q, [id], (err, result) => {
        if (err) return handleDbError(err, res);
        if (result.length === 0) return res.status(404).send("User not found");
        console.log(result[0]);
        res.render("delete.ejs", { user: result[0] });
    });
});

// Delete user
app.delete("/user/:id", (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    const q = "SELECT * FROM user WHERE id = ?";

    connection.query(q, [id], (err, result) => {
        if (err) return handleDbError(err, res);
        if (result.length === 0) return res.status(404).send("User not found");

        const user = result[0];
        if (email === user.email && password === user.password) {
            const deleteQuery = "DELETE FROM user WHERE id = ?";
            connection.query(deleteQuery, [id], (err) => {
                if (err) return handleDbError(err, res);
                res.redirect("/user");
            });
        } else {
            res.send("WRONG email or password");
        }
    });
});

// Add new user form
app.get("/user/new", (req, res) => {
    const id = uuidv4();
    res.render("new.ejs", { id });
});

// Create new user
app.post("/user/new", (req, res) => {
    const { id, email, username, password } = req.body;
    const q = "INSERT INTO user(id, email, username, password) VALUES (?, ?, ?, ?)";
    connection.query(q, [id, email, username, password], (err) => {
        if (err) return handleDbError(err, res);
        res.redirect("/user");
    });
});

// Server start
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});


// --------------------------------------------------
// insert in bulk
// let getRandomUser = () => {
//     return [
//         faker.string.uuid(),
//         faker.internet.username(), // before version 9.1.0, use userName()
//         faker.internet.email(),
//         faker.internet.password(),
//     ];
// }
// let data = [];
// for(let i=1 ; i<=100 ; i++){
//     data.push(getRandomUser()); //100 fake users
// }

//  let q = "INSERT INTO user (id,username,email,password) VALUES ?";
// try{
//     connection.query(q, [data],(err, result) => {
//     if(err) throw err;
//     console.log(result);
// });
// }catch(err){
//     console.log(err);
// }
// connection.end();


// insert single row
// let q = "INSERT INTO user (id,username,email,password) VALUES (?,?,?,?)";
// let user = ["123","123_newuser" , "abc@gmail.com", "abc"];

// insert multiple rows
// let q = "INSERT INTO user (id,username,email,password) VALUES ?";
// let users =[
//             ["123b","123_newuserb" , "abc@gmail.comb", "abcb"],
//             ["123c","123_newuserc" , "abc@gmail.comc", "abcc"],
//             ["123d","123_newuserd" , "abc@gmail.comd", "abcd"]
//            ];