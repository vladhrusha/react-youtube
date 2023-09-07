import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import Videos from "../Videos";
import ChannelCard from "../ChannelCard";
import { fetchFromAPI } from "../../utils/fetchFromAPI";
const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const fetchChannel = async () => {
      const data = await fetchFromAPI(`channels?part="snippet&id=${id}`);
      setChannelDetail(data?.items[0]);
    };
    const fetchChannelVideos = async () => {
      const data = await fetchFromAPI(
        `search?channelId=${id}&part=snippet&order=date`
      );
      setVideos(data?.items);
    };
    fetchChannel();
    fetchChannelVideos();
  }, [id]);
  return (
    <Box minHeight="100vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(206,3,184,1) 35%, rgba(0,212,255,1) 100%)",

            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard channelCard channelDetail={channelDetail} />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }}>
          <Videos videos={videos} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChannelDetail;
