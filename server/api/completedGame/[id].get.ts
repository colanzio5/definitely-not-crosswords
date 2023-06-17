import type { H3Event } from 'h3'

export default eventHandler(async (event: H3Event) => {
  const prisma = event.context.prisma
  const { params } = event.context

  if(!params?.id) 
    throw createError({ statusCode: 422, statusMessage: `Param 'id' is required` })
  const game = await prisma.completedGame.findFirst({ where: { id: params.id } })
  if (!game) {
    throw createError({ statusCode: 404, statusMessage: `Failed to find game with id ${params.id}` })
  }

  return game
})
