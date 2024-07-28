import { formatDistanceToNow } from "date-fns";

const useTimeConvertor = (time) => {
  const publishedAt = new Date(time);

  const timeAgo = formatDistanceToNow(publishedAt, { addSuffix: true });

    const matches = duration?.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!matches) return;

    const hours = parseInt(matches[1]) || 0;
    const minutes = parseInt(matches[2]) || 0;
    const seconds = parseInt(matches[3]) || 0;

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // const hoursPart = Math.floor(totalSeconds / 3600);
    const minutesPart = Math.floor((totalSeconds % 3600) / 60);
    const secondsPart = totalSeconds % 60;

    return `${
      minutesPart < 10 ? String(minutesPart).padStart(2, "0") : minutesPart
    }:${secondsPart < 10 ? String(secondsPart).padStart(2, "0") : secondsPart}`;
};

export default useTimeConvertor;
