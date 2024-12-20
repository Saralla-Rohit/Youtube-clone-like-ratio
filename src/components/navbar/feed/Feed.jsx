import './Feed.css';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { API_KEY, value_converter } from '../../../data';

const Feed = ({ category }) => {
  const [data, setData] = useState([]);  // Stores video data
  const [likeCounts, setLikeCounts] = useState({});  // Stores like counts by videoId
  const [dislikeCounts, setDislikeCounts] = useState({});  // Stores dislike counts by videoId

  // Fetch video data from YouTube API
  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    const response = await fetch(videoList_url);
    const data = await response.json();
    setData(data.items);
  };

  // Fetch like and dislike counts from the Return YouTube Dislike API
  const fetchLikeDislikeCount = async (videoId) => {
    const url = `https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Update like and dislike counts for the specific videoId
    likeCounts[videoId] = data.likes || 0;
    dislikeCounts[videoId] = data.dislikes || 0;
    setLikeCounts(likeCounts);
    setDislikeCounts(dislikeCounts);
  };

  // Fetch video data when component mounts or category changes
  useEffect(() => {
    fetchData();
  }, [category]);

  // Fetch like/dislike counts for each video once video data is available
  useEffect(() => {
    data.forEach(video => {
      fetchLikeDislikeCount(video.id);
    });
  }, [data]);

  // Calculate like percentage
  const calculateLikePercentage = (videoId) => {
    const likes = likeCounts[videoId] || 0;
    const dislikes = dislikeCounts[videoId] || 0;
    const total = likes + dislikes;

    if (total === 0) return 'No data';  // Handle if no likes or dislikes

    return ((likes / total) * 100).toFixed(2) + '%';  // Return like percentage
  };

  return (
    <div className="feed">
      {data.map((video) => {
        const { id, snippet, statistics } = video;
        const { title, channelTitle, publishedAt, thumbnails } = snippet;

        return (
          <Link to={`video/${snippet.categoryId}/${id}`} className="card" key={id}>
            <img src={thumbnails.medium.url} alt={title} />
            <h2>{title}</h2>
            <h3>{channelTitle}</h3>
            <p>{value_converter(statistics.viewCount)} views &bull; {moment(publishedAt).fromNow()}</p>
            <p>{calculateLikePercentage(id)} likes</p>  {/* Show like percentage */}
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;
