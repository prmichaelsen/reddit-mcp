export const mockListing = {
  kind: "Listing",
  data: {
    after: "t3_abc123",
    before: null,
    children: [
      {
        kind: "t3",
        data: {
          id: "abc123",
          name: "t3_abc123",
          title: "Test Post",
          author: "testuser",
          subreddit: "test",
          subreddit_name_prefixed: "r/test",
          selftext: "This is a test post",
          url: "https://www.reddit.com/r/test/comments/abc123/test_post/",
          permalink: "/r/test/comments/abc123/test_post/",
          score: 42,
          ups: 50,
          downs: 8,
          num_comments: 10,
          created_utc: 1710000000,
          is_self: true,
          over_18: false,
          spoiler: false,
          locked: false,
          stickied: false,
          link_flair_text: null,
          thumbnail: "self",
        },
      },
    ],
    dist: 1,
    modhash: "",
  },
};

export const mockCommentThread = [
  mockListing,
  {
    kind: "Listing",
    data: {
      after: null,
      before: null,
      children: [
        {
          kind: "t1",
          data: {
            id: "xyz789",
            name: "t1_xyz789",
            body: "This is a test comment",
            author: "commenter",
            subreddit: "test",
            score: 5,
            ups: 6,
            downs: 1,
            created_utc: 1710001000,
            parent_id: "t3_abc123",
            link_id: "t3_abc123",
            is_submitter: false,
            stickied: false,
            distinguished: null,
          },
        },
      ],
      dist: 1,
      modhash: "",
    },
  },
];

export const mockSearchResults = {
  kind: "Listing",
  data: {
    after: null,
    before: null,
    children: [
      {
        kind: "t3",
        data: {
          id: "search1",
          name: "t3_search1",
          title: "Search Result Post",
          author: "searchuser",
          subreddit: "programming",
          selftext: "Found via search",
          score: 100,
          num_comments: 25,
          created_utc: 1710000000,
        },
      },
    ],
    dist: 1,
    modhash: "",
  },
};

export const mockUserProfile = {
  kind: "t2",
  data: {
    name: "testuser",
    id: "user123",
    created_utc: 1600000000,
    link_karma: 1000,
    comment_karma: 5000,
    is_gold: false,
    is_mod: true,
    has_verified_email: true,
    icon_img: "https://www.redditstatic.com/avatars/default.png",
  },
};

export const mockSubredditAbout = {
  kind: "t5",
  data: {
    display_name: "test",
    title: "Test Subreddit",
    public_description: "A subreddit for testing",
    subscribers: 100000,
    active_user_count: 500,
    created_utc: 1500000000,
    over18: false,
    description: "Full description of the test subreddit",
  },
};

export const mockErrorResponse = {
  error: 403,
  message: "Forbidden",
  reason: "private",
};
