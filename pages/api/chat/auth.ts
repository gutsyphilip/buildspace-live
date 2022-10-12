import { BUILDSPACE_AWS_ROOM_IDENTIFIER } from './../../../utils/config';
import { CreateChatTokenCommand } from '@aws-sdk/client-ivschat';

import awsIVSChatClient from '../../../utils/libs/awsIVSChatClient';

import type { NextApiRequest, NextApiResponse } from 'next'




async function createChatToken(params) {
  const command = new CreateChatTokenCommand(params);
  const result = await awsIVSChatClient.send(command);
  const regenerateFrequencyInSeconds = params.duration <= 60 ? 30 : params.duration - 60;
  setTimeout(() => createChatToken(params), regenerateFrequencyInSeconds * 1000);
  return result;
}

export default async function authHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case 'POST':
      try {
        const params = {
          "attributes": {
            "displayName": req.body.displayName,
          },
          "capabilities": ["SEND_MESSAGE"],
          "roomIdentifier": BUILDSPACE_AWS_ROOM_IDENTIFIER,
          "userId": req.body.userId,
          "duration:": 180
        };

        const result:any = await createChatToken(params);
        res.status(200).json(result)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
