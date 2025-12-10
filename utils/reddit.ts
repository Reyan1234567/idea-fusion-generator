type comments = {
  comment: string;
  replies: comments[] | null;
};

export type cleanedType = {
  posts: string; 
  comments: comments[];
};

const getComments = async (subreddit: string | null, postId: string | null): Promise<any> => {
  try {
    if (!subreddit || !postId) {
      throw new Error("Subreddit and PostId are required field");
    }
    const res = await fetch(
      `https://www.reddit.com/r/${subreddit}/comments/${postId}/.json`
    );
    return res.json(); 
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const processCommentData = (rawData: any): comments[] | null => {
  if (!rawData || !rawData.data || !rawData.data.children) {
    return null;
  }

  const cleanedComments: comments[] = [];

  for (const item of rawData.data.children) {
    const data = item.data;

    // Check for the 'More' object used for truncated replies
    if (item.kind === 't1' && data.body) {
      
      const newComment: comments = {
        comment: data.body,
        // The replies are nested under data.replies
        replies: processCommentData(data.replies), 
      };
      cleanedComments.push(newComment);
      
    } else if (item.kind === 'more') {
        // Handle "more comments" object if needed, or just skip
        // For simplicity, we are skipping "more" objects.
        continue;
    }
  }

  // Return null if no valid comments were found
  return cleanedComments.length > 0 ? cleanedComments : null;
};

// --- Main Cleaning Function (Modified cleanerFunciton) ---

export const cleanerFunciton = async (postId: string | null, subreddit: string | null): Promise<cleanedType | null> => {
  if (!postId || !subreddit) {
      console.error("Missing Post ID or Subreddit");
      return null;
  }
  
  const rawData = await getComments(subreddit, postId);
  
  if (!rawData || rawData.length < 2) {
    return null;
  }
  
  const postData = rawData[0].data.children[0].data;
  const commentTree = rawData[1]; 
  
  const cleanedComments = processCommentData(commentTree);

  return {
    posts: postData.title || postData.body || "", // Assuming post is title/body
    comments: cleanedComments || [],
  };
};

// --- Remaining Functions (iteratePosts structure suggestion) ---

// Note: iteratePosts needs to pass the postId (from post.data.id) 
// and subreddit (from post.data.subreddit) correctly.
export const iteratePosts = async (posts: any) => {
  const res: (cleanedType | null)[] = [];

  for (const post of posts.data.children) {
    // Reddit Post ID is post.data.id, not post.data.name.split("_")[1]
    const postId = post.data.id; 
    const subreddit = post.data.subreddit;
    
    // cleanerFunciton takes (postId, subreddit)
    const cleanedPost = await cleanerFunciton(postId, subreddit);
    if (cleanedPost) {
        res.push(cleanedPost);
    }
  }
  return res;
};

