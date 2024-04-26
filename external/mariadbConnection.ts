import * as mariadb from 'mariadb';
class MysqlConnection
{

    
    connection: mariadb.Connection = null;

    constructor(){
        this.connect();
    }

    async connect(){
        console.log( process.env.MARIADB_HOST);
        this.connection = await mariadb.createConnection({            
            host: process.env.MARIADB_HOST,
            user: process.env.MARIADB_USER,
            password: process.env.MARIADB_PASS,
            database: process.env.MARIADB_DATABASE,
            port : parseInt(process.env.MARIADB_PORT),
        });

        await this.connection.query(`CREATE TABLE IF NOT EXISTS producao (
            id INT PRIMARY KEY AUTO_INCREMENT,
            idPedido VARCHAR(200) not null unique,
            entradaCozinha datetime null ,
            saidaCozinha datetime null,
            created datetime null,
            modified datetime null
        )  ENGINE=INNODB;`);

    }

    public conn () {
        return this.connection;
    }
}

export default MysqlConnection