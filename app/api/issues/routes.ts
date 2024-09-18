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
        const { searchParams } = new URL(req.url);
        const page = searchParams.get("page") ? parseInt(searchParams.get("page") as string, 10) : 1;
        const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit") as string, 10) : 10;
        const status = searchParams.get("status");
        const search = searchParams.get("search");


        const skip = (page - 1) * limit;

        const whereClause: any = {};

        if (status) {
            whereClause.status = status; 
        }

        if (search) {
            whereClause.OR = [
                { title: { contains: search, mode: 'insensitive' } }, 
                { description: { contains: search, mode: 'insensitive' } }, 
            ];
        }
        

        const issues = await prisma.issues.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc', 
            },
        });


        const totalIssues = await prisma.issues.count({ where: whereClause });


        return NextResponse.json(
            {
                data: issues,
                pagination: {
                    totalPages: Math.ceil(totalIssues / limit),
                    currentPage: page,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching issues:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
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