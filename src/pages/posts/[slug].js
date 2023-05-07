import Head from 'next/head';
import { useRouter } from 'next/router';

export default function PostRedirect({ post }) {
  const router = useRouter();

  if (!post) {
    // Return a 404 page if the post data is not available
    return <h1>404 - Post not found</h1>;
  }

  // Destructure the post data to get the meta tags
  const { metaTitle, title, og, description, date, modified } = post;

  // Redirect to the new URL
  router.replace(`https://dailytrendings.info/${post.slug}`);

  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={metaTitle || title} />
      <meta property="og:description" content={og?.description || description} />
      <meta property="og:image" content={og?.imageUrl} />
      <meta property="og:image:secure_url" content={og?.imageSecureUrl} />
      <meta property="og:image:width" content={og?.imageWidth} />
      <meta property="og:image:height" content={og?.imageHeight} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle || title} />
      <meta name="twitter:description" content={og?.description || description} />
      <meta name="twitter:image" content={og?.imageUrl} />
      <meta name="twitter:image:width" content={og?.imageWidth} />
      <meta name="twitter:image:height" content={og?.imageHeight} />
      <meta name="article:published_time" content={date} />
      <meta name="article:modified_time" content={modified} />
    </Head>
  );
}

export async function getStaticPaths() {
  // Fetch the slugs for all blog posts from the WordPress REST API
  const res = await fetch('https://dailytrendings.info/wp-json/wp/v2/posts?fields=slug');
  const posts = await res.json();

  // Generate the paths for the blog post pages
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  // Fetch the blog post data for the given slug from the WordPress REST API
  const res = await fetch(`https://dailytrendings.info/wp-json/wp/v2/posts?slug=${params.slug}`);
  const posts = await res.json();

  // Return the post data as a prop
  return {
    props: {
      post: posts[0] || null,
    },
  };
}
