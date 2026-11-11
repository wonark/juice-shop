/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path from 'node:path'
import { type Request, type Response, type NextFunction } from 'express'

export function serveKeyFiles () {
  return ({ params }: Request, res: Response, next: NextFunction) => {
    const file = params.file

    const baseDir = path.resolve('encryptionkeys/')
    const resolved = path.resolve(baseDir, file)
    const rel = path.relative(baseDir, resolved)

    if (!file.includes('/') && rel !== '' && !rel.startsWith('..') && !path.isAbsolute(rel)) {
      res.sendFile(resolved)
    } else {
      res.status(403)
      next(new Error('File names cannot contain forward slashes!'))
    }
  }
}
