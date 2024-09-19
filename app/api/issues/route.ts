import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma"
import {createIssueSchema} from "../../lib/validation"

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



// Get api 
export async function GET(req: NextRequest) {
  try {
    const issues = await prisma.issues.findMany()
    return NextResponse.json(issues, {status: 200})
} catch (error) {
    return NextResponse.json({error: "Server error"}, {status: 500})
}
}


// Put api
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




// Delete api

export async function DELETE(request: NextRequest){
    try {
        const {searchParams} = new URL(request.url)
        const id = searchParams.get("id")
    
    
        if (!id) {
            return NextResponse.json({error: "ID is required"}, {status: 404})
        }
        await prisma.issues.delete({
            where: {id: Number(id)}
        })
    
    
         return NextResponse.json({ message: 'Issue deleted successfully' }, { status: 200 });
    } catch (error) {
         return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
    }