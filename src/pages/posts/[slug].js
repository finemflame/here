import Head from 'next/head';
import { useEffect } from 'react';
import { getPostBySlug } from 'lib/posts';

export default function PostRedirect({ post }) {
  useEffect(() => {
    // Redirect to the WordPress domain URL with a 301 (permanent) status code
    window.location.replace(`https://dailytrendings.info/${post.slug}`, { status: 301 });
  }, [post]);

  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.metaTitle || post.title} />
      <meta property="og:description" content={post.og?.description || post.description} />
      <meta property="og:image" content={post.og?.imageUrl} />
      <meta property="og:image:secure_url" content={post.og?.imageSecureUrl} />
      <meta property="og:image:width" content={post.og?.imageWidth} />
      <meta property="og:image:height" content={post.og?.imageHeight} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.metaTitle || post.title} />
      <meta name="twitter:description" content={post.og?.description || post.description} />
      <meta name="twitter:image" content={post.og?.imageUrl} />
      <meta name="twitter:image:width" content={post.og?.imageWidth} />
      <meta name="twitter:image:height" content={post.og?.imageHeight} />
      <meta name="article:published_time" content={post.date} />
      <meta name="article:modified_time" content={post.modified} />
    </Head>
  );
}

export async function getServerSideProps({ params }) {
  const { post } = await getPostBySlug(params.slug);

  if (!post) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}
