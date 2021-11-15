import React, { useState } from "react";
import { Redirect } from "react-router";
import Post from "../Post/Post.js";
import styled from "styled-components";
import useAxios from "../../hooks/useAxios.js";

const Home = ({ user }) => {
  const { isLoggedIn } = user;
  let redirect = !isLoggedIn ? <Redirect to="/login" /> : <React.Fragment />;
  const [offset, setOffset] = useState(0);

  const [{ data }, recall] = useAxios({
    method: "get",
    url: `/api/posts?offset=${offset}`,
  });

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
      {redirect}
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
  display: flex;
  height: calc(100vh - 3rem);
  flex-direction: column;
  @media (min-width: 425px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }
`;

const Space = styled.span`
  height: 1rem;
  width: 100%;
`;
