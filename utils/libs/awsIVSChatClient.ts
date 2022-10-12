import { IvschatClient } from "@aws-sdk/client-ivschat";
import { BUILDSPACE_AWS_SECRET_ACCESS_KEY, BUILDSPACE_WS_ACCESS_KEY_ID } from "../config";


const awsIVSChatClient = new IvschatClient({ 
    region: "us-east-1",
    credentials: {
      accessKeyId: BUILDSPACE_WS_ACCESS_KEY_ID,
      secretAccessKey: BUILDSPACE_AWS_SECRET_ACCESS_KEY,
    },
});

export default awsIVSChatClient
  