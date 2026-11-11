/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import * as challengeUtils from '../lib/challengeUtils'
import { type Request, type Response } from 'express'

export function repeatNotification () {
  return ({ query }: Request, res: Response) => {
    let challengeName: string
    try {
      challengeName = decodeURIComponent(query.challenge as string)
    } catch {
      res.sendStatus(400)
      return
    }
    const challenge = challengeUtils.findChallengeByName(challengeName)

    if (challenge?.solved) {
      challengeUtils.sendNotification(challenge, true)
    }

    res.sendStatus(200)
  }
}
