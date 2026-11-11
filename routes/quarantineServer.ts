/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path from 'node:path'
import { type Request, type Response, type NextFunction } from 'express'

export function serveQuarantineFiles () {
  return ({ params, query }: Request, res: Response, next: NextFunction) => {
    const file = params.file

    const quarantineDir = path.resolve('ftp/quarantine/')
    const resolved = path.resolve(quarantineDir, file)
    const relative = path.relative(quarantineDir, resolved)
    if (!file.includes('/') && !file.includes('\\') && relative !== '' && !relative.startsWith('..') && !path.isAbsolute(relative)) {
      res.sendFile(resolved)
    } else {
      res.status(403)
      next(new Error('File names cannot contain forward slashes!'))
    }
  }
}
