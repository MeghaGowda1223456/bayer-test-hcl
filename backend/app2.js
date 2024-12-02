const express = require('express');
const jwt = require('jsonwebtoken');
const dbconn = require('./dbconn'); 

const app = express();
app.use(express.json());

const SECRET_KEY = "xyz123";

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            status: "failure",
            code: 401,
            message: "Access denied. No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; 
        next(); 
    } catch (err) {
        res.status(401).json({
            status: "failure",
            code: 401,
            message: "Invalid or expired token."
        });
    }
};


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "password") {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        res.json({
            status: "success",
            code: 200,
            message: "Login successful",
            token
        });
    } else {
        res.status(401).json({
            status: "failure",
            code: 401,
            message: "Invalid username or password"
        });
    }
});

app.get("/health-topics", verifyToken, (req, res) => {
    let sql = "SELECT id, title, description FROM hosp_feature";
    dbconn.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({
                status: "failure",
                code: 10001,
                message: "No data found!",
            });
        } else {
            res.json({
                status: "success",
                code: 200,
                data: rows,
                message: "Feature list",
            });
        }
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "failure",
        code: 1000,
        message: "Sorry, something went wrong!"
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
