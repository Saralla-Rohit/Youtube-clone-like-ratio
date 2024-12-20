import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { API_KEY, value_converter } from '../../data';

const PlayVideo = () => {
  const { videoId } = useParams();
  const [channelData, setChannelData] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [dislikeCount, setDislikeCount] = useState(null); // State to store dislike count

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then(res => res.json())
      .then(data => setApiData(data.items[0]));
  };

  const fetchDislikeData = async () => {
    // Fetch dislike count from third-party API
    const dislike_url = `https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`;
    await fetch(dislike_url)
      .then(res => res.json())
      .then(data => setDislikeCount(data.dislikes)); // Store dislikes in state
  };

  const fetchOtherData = async () => {
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelData_url)
      .then(response => response.json())
      .then(data => setChannelData(data.items[0]));

    // Fetching comment Data
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_url)
      .then(res => res.json())
      .then(data => setCommentData(data.items));
  };

  useEffect(() => {
    fetchVideoData();
    fetchDislikeData(); // Fetch dislike count when the component mounts
  }, [videoId]);

  useEffect(() => {
    if (apiData) {
      fetchOtherData();
    }
  }, [apiData]);

  return (
    <div className='play-video'>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        <p>{apiData ? value_converter(apiData.statistics.viewCount) : "16K"} &bull; {moment(apiData ? apiData.snippet.publishedAt : "").fromNow()}</p>
        <div>
          <span><img src={like} alt="" />{value_converter(apiData ? apiData.statistics.likeCount : 155)}</span>
          {/* Displaying dislike count from third-party API */}
          <span><img src={dislike} alt="" />{dislikeCount ? value_converter(dislikeCount) : "Loading..."}</span>
          <span><img src={share} alt="" />Share</span>
          <span><img src={save} alt="" />Save</span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>1M Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description Here"}</p>
        <hr />
        <h4>{value_converter(apiData ? apiData.statistics.commentCount : 106)} Comments</h4>
        {commentData.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
