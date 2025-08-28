import { getGitHubStars } from "@/lib/github";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stars = await getGitHubStars();

    return NextResponse.json(
      { stars, cached: true },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=600, stale-while-revalidate=300", // 10 minutes cache, 5 minutes stale
        },
      },
    );
  } catch (error) {
    console.error("Failed to fetch GitHub stars:", error);

    return NextResponse.json(
      { stars: 0, error: "Unable to fetch stars" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-cache",
        },
      },
    );
  }
}
