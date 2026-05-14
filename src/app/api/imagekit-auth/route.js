import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

export async function GET() {
  const authenticationParameters = imagekit.getAuthenticationParameters();
  const res = {
    signature: authenticationParameters.signature,
    expire: authenticationParameters.expire,
    token: authenticationParameters.token,
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  };
  return NextResponse.json(res);
}
