// import { dbConnect } from "@/config/dbConfig";
import userModel from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
// dbConnect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { walletAddress, chainId } = await req.json();
    if (!walletAddress || !chainId) {
      return NextResponse.json(
        { message: "WalletAddress or nonce or chainID not found " },
        { status: 401 }
      );
    }
    const user = await userModel.create({ walletAddress, chainId });
    if (!user) {
      return NextResponse.json(
        { message: "Error creating user" },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "User created successfully", user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
