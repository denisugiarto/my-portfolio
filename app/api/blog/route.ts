import { NextRequest, NextResponse } from "next/server";
import {
  getPaginatedBlogPosts,
  searchBlogPosts,
  getBlogCategories,
} from "@/lib/sanity-queries";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "6", 10);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || null;

    const skip = (page - 1) * limit;

    let result;
    if (search || category) {
      result = await searchBlogPosts(search, category, skip, limit);
    } else {
      result = await getPaginatedBlogPosts(skip, limit);
    }

    // Also fetch categories on first load
    const categories = await getBlogCategories();

    return NextResponse.json({
      posts: result.posts,
      total: result.total,
      categories,
      page,
      totalPages: Math.ceil(result.total / limit),
    });
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog data" },
      { status: 500 },
    );
  }
}
