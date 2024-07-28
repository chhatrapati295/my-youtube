export const API_KEY = "AIzaSyD3_8qgZRimxv0jXBr3JvMuSreRhhcPD4Q";
export const API_KEY2 = "AIzaSyC0oR7YZsCRBjHVQXAlFSZ0Jgy1TRSC8cQ";
export const API_KEY3 = "AIzaSyCX55kqbiFuiohqzwCsHVmuKgrvt--5juo";
export const POPULAR_VIDEO_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=48&regionCode=IN&key=${API_KEY}`;
export const HOMEPAGE_API = `
https://www.youtube.com/youtubei/v1/player?key=${API_KEY}&prettyPrint=false`;

export const buttons_api = `https://www.youtube.com/youtubei/v1/browse?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false
`;
export const videoCategory_api = `https://www.googleapis.com/youtube/v3/videoCategories?key=${API_KEY}&regionCode=IN`;

export const videoPlayer_api = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&maxResults=100&key=${API_KEY}&videoCategoryId=`;

export const CATEGORIES_DATA_API = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&maxResults=100&q=`;

export const VIDEO_DETAILS_API = `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${API_KEY}&id=`;

export const CHANNLE_DATA_API = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&key=${API_KEY}&id=`;

export const search_suggestion_api = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=10&q=
`;

export const search_video_api = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=48&q=`;

export const video_info_api = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${API_KEY}&id=`;

export const channle_info_api = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&key=${API_KEY}&id=`;

export const video_comments_api = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&order=relevance&key=${API_KEY}&maxResults=50&videoId=`;

export const suggested_video_api = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&type=video&relatedToVideoId=`;


// https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=5rOiW_xY-kc&type=video&key={YOUR_API_KEY}