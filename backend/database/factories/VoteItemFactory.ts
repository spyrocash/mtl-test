import VoteItem from 'App/Models/VoteItem'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(VoteItem, ({ faker }) => {
  return {
    name: faker.person.fullName(),
    description: faker.lorem.sentence(),
  }
}).build()
