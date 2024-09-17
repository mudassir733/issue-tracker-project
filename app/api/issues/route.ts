import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

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
