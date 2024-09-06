"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

export async function tokenProvider() {
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  if (!apiKey) throw new Error("Stream API Key not found");
  if (!apiSecret) throw new Error("Stream API Secret not found");

  const streamClient = new StreamClient(apiKey, apiSecret);

  const validity = 60 * 60;

  return streamClient.generateUserToken({
    user_id: user.id,
    validity_in_seconds: validity,
  });
}
