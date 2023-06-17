import { getToken } from '#auth'
import { getServerSession } from '#auth'

export default eventHandler(async (event) => {

    const session = await getServerSession(event)
    
    const token = await getToken({ event });
    if (!session || !token) {
        return { status: 'unauthenticated!' }
    }
    return event.context.prisma.users.find();
})

