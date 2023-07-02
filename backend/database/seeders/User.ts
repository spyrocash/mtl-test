import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        email: 'admin1@example.com',
        password: 'admin1',
      },
      {
        email: 'admin2@example.com',
        password: 'admin2',
      },
    ])
  }
}
