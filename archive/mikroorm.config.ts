// import path from 'path'
// import { MikroORM, EntityManager, EntityRepository } from 'mikro-orm'
// import systemConfig from '../config/systemConfig'

// import { Product } from '../entities/product.entity'
// import { Worker } from '../entities/worker.entity'

// // ! Documentation: https://mikro-orm.io/

// // We pre define the MikroORM instance to export it to use it otherwise (DI)
// export const db = {} as {
//   orm: MikroORM
//   em: EntityManager
//   productRepo: EntityRepository<Product>
//   workerRepo: EntityRepository<Worker>
// }

// export async function getDatabase(): Promise<MikroORM | undefined> {
//   try {
//     // connecting to the database witth MikroORM, saving the instance
//     db.orm = await MikroORM.init({
//       discovery: {
//         requireEntitiesArray: true,
//       },
//       baseDir: __dirname,
//       entities: [Product, Worker],
//       debug: systemConfig.isEnvDev(),
//       type: 'postgresql',
//       migrations: {
//         pattern: /^[\w-]+\d+\.js$/,
//         disableForeignKeys: false,
//         path: path.resolve(__dirname, '../', 'migrations'), // path to folder with migration files
//       },
//       ...systemConfig.database,
//     })
//     // also save the EntityManager and the Product Repo
//     db.em = db.orm.em
//     db.productRepo = db.orm.em.getRepository(Product)
//     db.workerRepo = db.orm.em.getRepository(Worker)

//     // if we are connected to DB and have pending Migrations (in env PROD), run them
//     if (await db.orm.isConnected()) {
//       console.log('===================== MIGRATIONS =====================')
//       console.log('DB is connected')
//       console.log('Migrations Path: ', path.resolve(__dirname, '../', 'migrations'))
//       const migrator = db.orm.getMigrator()
//       const pendingMigrations = await migrator.getPendingMigrations()
//       const executedMigrations = await migrator.getExecutedMigrations()
//       console.log('Applied Migrations: ', executedMigrations)
//       console.log('Pending Migrations: ', pendingMigrations)
//       console.log(
//         'can we run them? (length ex, length pen, is prod)',
//         executedMigrations.length,
//         pendingMigrations.length,
//         systemConfig.isEnvProd()
//       )
//       if (pendingMigrations.length > 0 && systemConfig.isEnvProd()) {
//         const newMigrations = await migrator.up() // runs migrations up to the latest
//         console.log('Migrations applied: ', newMigrations)
//       }
//     }

//     return db.orm
//   } catch (error) {
//     console.error(`ERROR | : getDatabase: `, error)
//   }
// }
