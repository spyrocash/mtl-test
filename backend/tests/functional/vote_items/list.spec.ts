import { test } from '@japa/runner'

test.group('Vote items list', () => {
  test('get a paginated list of vote items', async ({ client }) => {
    const loginResponse = await client.request('/api/v1/auth/login', 'post').setup((request) => {
      request.json({
        email: 'admin1@example.com',
        password: 'admin1',
      })
    })

    const loginResult = loginResponse.body()

    const voteItemsResponse = await client.request('/api/v1/vote-items', 'get').setup((request) => {
      request.bearerToken(loginResult?.token)
    })

    voteItemsResponse.assertStatus(200)
  })
})
