import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = requestBodySchema.parse(request.body)

  try {
    const authenticateService = makeAuthenticateService()

    const { organization } = await authenticateService.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({
        organization: {
          ...organization,
          password: undefined,
        },
        token,
      })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
