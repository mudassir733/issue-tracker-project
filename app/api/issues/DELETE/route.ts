import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../lib/prisma"


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