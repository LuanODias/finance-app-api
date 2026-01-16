import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetTransactionsByUserIdRepository {
    async execute(user_id) {
        return await prisma.transaction.findMany({
            where: {
                user_id,
            },
        })
    }
}
