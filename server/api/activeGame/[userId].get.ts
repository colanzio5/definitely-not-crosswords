import type { H3Event } from 'h3'

export default eventHandler(async (event: H3Event) => {
  const prisma = event.context.prisma
  const { params } = event.context

  if(!params?.userId) 
    throw createError({ statusCode: 422, statusMessage: `Param 'userId' is required` })
  const game = await prisma.activeGame.findMany({ where: { userId: params.userId }, include: { game: true } })
  if (!game) {
    throw createError({ statusCode: 404, statusMessage: `Failed to find game with userId ${params.userId}` })
  }

  return game
})
