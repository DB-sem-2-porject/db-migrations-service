import { AppDataSource } from '../src/data-source.ts'

async function generateMigration() {
  try {
    await AppDataSource.initialize()
    
    const migrationName = process.argv[2]
    if (!migrationName) {
      console.error('Please provide migration name: npm run migration:generate MyMigration')
      process.exit(1)
    }
    
    console.log('Generating migration...')
    // TypeORM CLI будет использовать конфигурацию из data-source
    
  } catch (error) {
    console.error('Error during migration generation:', error)
  } finally {
    await AppDataSource.destroy()
  }
}

generateMigration()