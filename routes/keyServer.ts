/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path from 'node:path'
import { type Request, type Response, type NextFunction } from 'express'

export function serveKeyFiles () {
  return ({ params }: Request, res: Response, next: NextFunction) => {
    const file = params.file

    if (!file.includes('/')) {
      const base = path.resolve('encryptionkeys/')
      const resolved = path.resolve(base, file)
      const rel = path.relative(base, resolved)
      if (rel && !rel.startsWith('..') && !path.isAbsolute(rel)) {
        res.sendFile(resolved)
      } else {
        res.status(403)
        next(new Error('File names must stay inside the key folder!'))
      }
    } else {
      res.status(403)
      next(new Error('File names must not contain forward slashes!'))
    }
  }
}
