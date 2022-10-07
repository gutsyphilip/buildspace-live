import { BUILDSPACE_AWS_SECRET_ACCESS_KEY } from './../../../utils/config';
import type { NextApiRequest, NextApiResponse } from 'next'

import { IvschatClient, CreateChatTokenCommand } from "@aws-sdk/client-ivschat";
import { BUILDSPACE_WS_ACCESS_KEY_ID } from '../../../utils/config';
const client = new IvschatClient({ 
  region: "us-east-1",
  credentials: {
    accessKeyId: BUILDSPACE_WS_ACCESS_KEY_ID,
    secretAccessKey: BUILDSPACE_AWS_SECRET_ACCESS_KEY,
  },
});




type Data = {
  name: string
}

async function createChatToken(params) {
  const command = new CreateChatTokenCommand(params);
  const result = await client.send(command);
  /* If the duration is 60 seconds or less (minimum allowed),
     generate a new token every 30 seconds. Otherwise,
     generate a new token every duration minus 60 seconds.
  */
  const regenerateFrequencyInSeconds = params.duration <= 60 ? 30 : params.duration - 60;
  setTimeout(() => createChatToken(params), regenerateFrequencyInSeconds * 1000);
  return result;
}

export default async function authHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      try {
        const params = {
          "attributes": {
            "displayName": req.body.displayName,
          },
          "capabilities": ["SEND_MESSAGE"],
          "roomIdentifier": "arn:aws:ivschat:us-east-1:079102459196:room/njmmAimQse2a",
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
