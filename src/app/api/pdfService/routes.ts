// import { existsSync, fsPromises } from "node:fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { mkdir, writeFile } from "node:fs/promises";

export async function POST(request: NextRequest, response: NextResponse) {
  const formData = await request.formData();
  console.log(formData);

  const f = formData.get("file");

  if (!f) {
    return NextResponse.json({}, { status: 400 });
  }

  const file = f as File;
  console.log(`File name: ${file.name}`);
  console.log(`Content-Length: ${file.size}`);

  const destinationDirPath = path.join(process.cwd(), "public/upload");
  console.log(destinationDirPath);

  const fileArrayBuffer = await file.arrayBuffer();

//   if (!existsSync(destinationDirPath)) {
//     mkdir(destinationDirPath, { recursive: true });
//   }
//   await writeFile(
//     path.join(destinationDirPath, file.name),
//     Buffer.from(fileArrayBuffer)
//   );

  return NextResponse.json({
    fileName: file.name,
    size: file.size,
    lastModified: new Date(file.lastModified),
  });
}
