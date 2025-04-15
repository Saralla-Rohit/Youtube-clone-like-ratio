# 📊 YouTube Like-Dislike Ratio Checker

**YouTube Ratio Checker** is a responsive web application that shows the **real like-to-dislike ratio** of any YouTube video — helping users make smarter choices before watching. With YouTube hiding public dislike counts, this app restores transparency by using real-time data from public APIs to reveal what viewers actually think of a video.

---

## 🎯 Problem It Solves

YouTube no longer shows dislike counts publicly, which has led to a rise in **clickbait content**. A thumbnail may promise something exciting, but once you watch the full video — it turns out to be misleading or low-quality.

This app helps solve that by:
- Showing the **true like-to-dislike ratio** of a video
- Providing key video and channel insights at a glance
- Helping users decide **if a video is worth watching**

---

## 🚀 Key Features

- 🔍 **Search by Video ID or URL**  
  Input a YouTube video link or ID to instantly fetch and display real-time data.

- 📽️ **Real-Time Video Insights**  
  - Video title, description, and publish date  
  - Like count and **dislike count** via external API  
  - Comment count  
  - Channel name and live subscriber count

- 📊 **Like-Dislike Ratio Calculation**  
  - Percentage calculation  
  - Visual indicators like pie charts or bars

- 📱 **Fully Responsive UI**  
  Works seamlessly on mobile, tablet, and desktop devices.

---

## ⚙️ How It Works

1. **YouTube Data API v3** is used to fetch:
   - Video details: title, likes, description, publish date
   - Channel information: name and live subscriber count
   - Comment count

2. **Return YouTube Dislike API** is used to fetch:
   - Dislike count using the Video ID

3. The like ratio is calculated as:
   ```js
   likePercentage = (likes / (likes + dislikes)) * 100;

## 🧱 Tech Stack

- **Frontend**: React.js
- **Styling**: Vanilla CSS
- **APIs**:
  - YouTube Data API v3
  - Return YouTube Dislike API
- **Deployment**: Render

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Saralla-Rohit/Youtube-clone-like-ratio.git
cd Youtube-clone-like-ratio

# Install dependencies
npm init -y
npm install
npm run dev
