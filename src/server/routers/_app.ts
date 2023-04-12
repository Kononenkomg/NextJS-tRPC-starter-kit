import { procedure, router } from '../trpc'

export const appRouter = router({
  check: procedure.query(() => {
    return { ok: true }
  }),
})

export type AppRouter = typeof appRouter
