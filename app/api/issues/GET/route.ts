import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma"

export async function GET(){
    try {
        const issues = await prisma.issues.findMany()
        return NextResponse.json(issues, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Server error"}, {status: 500})
    }
}