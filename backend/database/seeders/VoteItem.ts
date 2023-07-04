import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import VoteItemFactory from 'Database/factories/VoteItemFactory'

export default class VoteItemSeeder extends BaseSeeder {
  public async run() {
    await VoteItemFactory.createMany(25)
  }
}
