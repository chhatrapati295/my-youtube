export const API_KEY = "AIzaSyD3_8qgZRimxv0jXBr3JvMuSreRhhcPD4";
export const API_KEY2 = "AIzaSyC0oR7YZsCRBjHVQXAlFSZ0Jgy1TRSC8c";
export const POPULAR_VIDEO_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=48&regionCode=IN&key=${API_KEY2}`;
export const HOMEPAGE_API = `
https://www.youtube.com/youtubei/v1/player?key=${API_KEY2}&prettyPrint=false`;

export const buttons_api = `https://www.youtube.com/youtubei/v1/browse?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false
`;
export const videoCategory_api = `https://www.googleapis.com/youtube/v3/videoCategories?key=${API_KEY2}&regionCode=IN`;

export const videoPlayer_api = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&maxResults=100&key=${API_KEY2}&videoCategoryId=`;

export const CATEGORIES_DATA_API = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY2}&part=snippet&type=video&maxResults=100&q=`;

export const VIDEO_DETAILS_API = `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${API_KEY2}&id=`;

export const CHANNLE_DATA_API = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&key=${API_KEY2}&id=`;
