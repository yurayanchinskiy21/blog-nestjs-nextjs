import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'yourDBPassword',
  database: 'yourDBName',
  entities: ['**/*.entity.js'],
  migrations: ['migrations/*.js'],
});
