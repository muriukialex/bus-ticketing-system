import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'xxxx',
  port: 5432,
  username: 'xxxx',
  password: 'xxxx',
  database: 'xxxx',
  entities: ['**/*.entity.js'],
  migrations: ['migrations/*.js'],
});
