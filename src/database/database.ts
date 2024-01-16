import pgp from 'pg-promise';

const db = pgp()("postgres://postgres:852711@localhost:5432/postgres");

db.connect()

export { db };
