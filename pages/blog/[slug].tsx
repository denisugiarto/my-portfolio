import { useRouter } from "next/router";
import Markdown from "react-markdown";
const BlogPage = () => {
  const router = useRouter();
  // const slug = router.query.slug;
  const markdownContent = `
    # This is a heading
    
    This is some paragraph text with **bold** and *italic* formatting.
    
    You can also include [links](https://www.example.com).
    `;

  return <Markdown>{markdownContent}</Markdown>;
};

export default BlogPage;
