import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

import VoteItem from 'App/Models/VoteItem'
import User from 'App/Models/User'

export default class Vote extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public voteItemId: number

  @column()
  public voteByUserId: number

  @belongsTo(() => VoteItem)
  public voteItem: BelongsTo<typeof VoteItem>

  @belongsTo(() => User)
  public voteByUser: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
