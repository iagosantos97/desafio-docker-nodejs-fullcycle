const express = require('express');

const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

let users = '';

connection.query(
    'CREATE TABLE IF NOT EXISTS people (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(255))',
);

connection.query(`INSERT INTO people(name) values ('Code Education')`);

connection.query('SELECT * FROM people', (_, results, fields) => {
    users = results;
});

connection.end();

app.get('/', (req, res) => {
    const allUsers = [];

    users.map((user) => {
        const newUser = `
            <tr>
                <td>
                    ${user.id}
                </td>
                <td>
                    ${user.name}
                </td>
            </tr>
        `;
        allUsers.push(newUser);
    });

    res.send(`
        <h1>Full Cycle Rocks!</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                ${allUsers.join('')}
            </tbody>
        </table>
    `);
});

app.listen(port, () => {
    console.log(`Rodando na porta: ${port}`);
});
