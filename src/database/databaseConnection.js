import sequelize from 'sequelize';

class DbConnection{
    constructor(){
        this.sequelize = new sequelize('eventhub', 'krystian', 'root', {
            host: '173.194.224.164',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            operatorsAliases: false
        });

        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }
    getSequalize(){
        return this.sequelize;
    }
}
const  db = new DbConnection();
export default db;