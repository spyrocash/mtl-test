import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Vote from 'App/Models/Vote'
import VoteItem from 'App/Models/VoteItem'

export default class VoteItemsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const paginatedVoteItem = await VoteItem.query()
      .withCount('votes')
      .preload('votes')
      .orderBy('votes_count', 'desc')
      .paginate(page, limit)

    return paginatedVoteItem
  }

  public async store({ request, response }: HttpContextContract) {
    /**
     * Schema definition
     */
    const newVoteItemSchema = schema.create({
      name: schema.string(),
      description: schema.string.optional(),
    })

    /**
     * Validate request body against the schema
     */
    const payload = await request.validate({ schema: newVoteItemSchema })

    const count = await Vote.query().pojo<{ total: number }>().count('id as total')
    if (count[0].total > 0) {
      return response.conflict({ message: 'vote is started' })
    }

    const createdVoteItem = await VoteItem.create({
      name: payload?.name,
      description: payload?.description,
    })

    return createdVoteItem
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id')

    const voteItem = await VoteItem.findOrFail(id)

    return voteItem
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')

    /**
     * Schema definition
     */
    const newVoteItemSchema = schema.create({
      name: schema.string(),
      description: schema.string.optional(),
    })

    /**
     * Validate request body against the schema
     */
    const payload = await request.validate({ schema: newVoteItemSchema })

    const voteItem = await VoteItem.findOrFail(id)

    const count = await Vote.query().pojo<{ total: number }>().count('id as total')
    if (count[0].total > 0) {
      return response.conflict({ message: 'vote is started' })
    }

    const updatedVoteItem = await voteItem.merge(payload).save()

    return updatedVoteItem
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const voteItem = await VoteItem.findOrFail(id)

    const count = await Vote.query().pojo<{ total: number }>().count('id as total')
    if (count[0].total > 0) {
      return response.conflict({ message: 'vote is started' })
    }

    await voteItem.delete()

    return voteItem
  }

  public async clear({}: HttpContextContract) {
    const voteItems = await VoteItem.query().delete()

    return voteItems
  }
}
