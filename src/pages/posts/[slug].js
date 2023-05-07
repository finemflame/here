import { useEffect } from 'react';
import { getPostBySlug } from 'lib/posts';

export default function PostRedirect({ post }) {
  useEffect(() => {
    // Redirect to the WordPress domain URL with a 301 (permanent) status code
    window.location.replace(`https://dailytrendings.info/${post.slug}`, { status: 301 });
  }, [post]);

  // Don't render anything in the component
  return null;
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
