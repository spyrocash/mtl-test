import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Vote from 'App/Models/Vote'
import VoteItem from 'App/Models/VoteItem'

export default class VotesController {
  public async vote({ auth, params, response }: HttpContextContract) {
    const { voteItemId } = params

    const alreadyVoted = await Vote.findBy('voteByUserId', auth.user?.id)

    if (alreadyVoted) {
      return response.conflict({ message: 'already voted' })
    }

    const voteItem = await VoteItem.findOrFail(voteItemId)

    const vote = await Vote.create({
      voteItemId: voteItem.id,
      voteByUserId: auth.user?.id,
    })

    return vote
  }
}
