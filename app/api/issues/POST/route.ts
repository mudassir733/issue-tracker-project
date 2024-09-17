import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma"
import {createIssueSchema} from "../../../lib/validation"

export async function POST(request: NextRequest) {
  try {
    console.log("Incoming request method: ", request.method);

    const body = await request.json();

    console.log("Request body: ", body);

    const validation = createIssueSchema.safeParse(body);

    if (!validation.success) {
      console.error("Validation failed: ", validation.error.format());
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const newIssue = await prisma.issues.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newIssue, { status: 201 });

  } catch (error) {
    console.error("Server error: ", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
