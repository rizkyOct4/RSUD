import { NextResponse } from "next/server";
import { cache } from "react";

export const ErrorTypes = cache((err: unknown) => {
  console.error(err);
  if (err instanceof Error && err.message === "Unauthorized") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (err instanceof Error && err.message === "Invalid key") {
    return NextResponse.json({ message: "Invalid key" }, { status: 400 });
  }

  if (err instanceof Error && err.message === "Data not found!") {
    return NextResponse.json({ message: "Data not found!" }, { status: 404 });
  }

  if (err instanceof Error && err.message === "Invalid request") {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  // ! SERVER
  if (
    err instanceof Error &&
    (err.message === "Invalid parameter" ||
      err.message === "Invalid limit" ||
      err.message === "Invalid date")
  ) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
  return NextResponse.json(
    { message: "Internal server error!" },
    { status: 500 },
  );
});
