import './Feed.css';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { API_KEY, value_converter } from '../../../data';

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [dislikeCounts, setDislikeCounts] = useState({});

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    const response = await fetch(videoList_url);
    const data = await response.json();
    setData(data.items);
  };

  const fetchLikeDislikeCount = async (videoId) => {
    try {
      const url = `https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`;
      const response = await fetch(url);
      const data = await response.json();
      
      setLikeCounts(prev => ({
        ...prev,
        [videoId]: data.likes || 0
      }));
      setDislikeCounts(prev => ({
        ...prev,
        [videoId]: data.dislikes || 0
      }));
    } catch (error) {
      console.error(`Error fetching like/dislike for ${videoId}:`, error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  useEffect(() => {
    const fetchAllLikeDislikes = async () => {
      const promises = data.map(video => fetchLikeDislikeCount(video.id));
      await Promise.all(promises);
    };
    
    if (data.length > 0) {
      fetchAllLikeDislikes();
    }
  }, [data]);

  const calculateLikePercentage = (videoId) => {
    const likes = likeCounts[videoId] || 0;
    const dislikes = dislikeCounts[videoId] || 0;
    const total = likes + dislikes;
    return total === 0 ? 'No data' : Math.round((likes / total) * 100);
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
            <p>{calculateLikePercentage(id)}%</p>  
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;
