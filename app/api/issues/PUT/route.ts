import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import {createIssueSchema} from "../../../lib/validation";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
        return NextResponse.json({error: "ID is required"}, {status: 400})
    }

    const validation = createIssueSchema.safeParse(body);

    if (!validation.success) {
      console.error("Validation failed: ", validation.error.format());
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const updateIssue = await prisma.issues.update({
        where: {id: Number(id)},
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(updateIssue, { status: 200 });

  } catch (error) {
    console.error("Server error: ", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}