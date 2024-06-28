import React from "react";
import { Layout } from "../../components/Layout/Layout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
const BlogPages = () => {
  const { data: blogsList, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      try {
        const result = axios.get(
          "https://dev.to/api/articles?username=deni_sugiarto_1a01ad7c3fb",
        );
        return result;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Layout activeNavbar="blog">
      <Image
        src="/blog1-bg.jpg"
        alt="blog"
        width={800}
        height={400}
        className="fixed top-0 -z-10 min-h-screen w-full object-cover brightness-50"
      />
      <section className="container pt-40">
        {/* <h1 className="mb-4 text-3xl font-bold">Blog</h1> */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-8">
            {blogsList?.data?.map((blog) => (
              <Link key={blog.id} href={blog.url} title={blog.url}>
                <h2 className="text-lg font-bold text-white md:text-2xl">
                  {blog.title}
                </h2>
                <p className="mb-2 mt-2 text-sm text-gray-400">
                  {blog.description}
                </p>
                {blog.tag_list.map((tag) => (
                  <span
                    key={tag}
                    className="mr-2 rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </Link>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default BlogPages;
