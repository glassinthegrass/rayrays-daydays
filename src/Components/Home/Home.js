import React, { useState } from "react";
import Post from "../Post/Post.js";
import styled from "styled-components";

import useAxios from "../../hooks/useAxios.js";

const Home = (props) => {
  const [offset, setOffset] = useState(0);

  const [{data,loading,error},recall] = useAxios({method:'get',url:`/api/posts?offset=${offset}`})

  const postMap = data.map((post, i) => {
    return <Post post={post} key={i} />;
  });

  const handleLazyLoad = () => {
    let onset = offset + 6;
    setOffset(onset);
    recall(true);
  };


  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) handleLazyLoad();
  };

  return (
    <HomeBox>
      <PostCenter onScroll={handleScroll}>
        <Space></Space>
        {postMap}
      </PostCenter>
    </HomeBox>
  );
};
export default Home;

const HomeBox = styled.section`
  height: calc(100vh - 3rem);
  overflow-y: auto;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  z-index: 1;
`;

const PostCenter = styled(HomeBox)`
  height: calc(100vh - 3rem);
  @media (min-width: 425px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }
`;

const Loading = styled.span`
  color: ${(props) => props.theme.maroon};
`;

const Space = styled.span`
  height: 1rem;
  width: 100%;
`;
