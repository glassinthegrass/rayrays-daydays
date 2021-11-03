import React from "react";
import styled from "styled-components";
import { Image, Transformation } from "cloudinary-react";
import { useHistory } from "react-router";
const Post = ({ post }) => {
  const push = useHistory().push;

  const picture = (
    <Img publicId={post.pictures[0]?.public_id}>
      <Transformation
        crop="fill"
        width="300"
        height="300"
        quality="auto"
        format="png"
      />
      <Transformation
        overlay={{
          fontFamily: "Futura",
          fontSize: 40,
          fontWeight: "bold",
          text: `${post?.occasion ? post.occasion : " untitled "}`,
        }}
        crop="fit"
        width="270"
        background="#fcd47e"
        gravity="north_west"
        x="10"
        y="10"
        color="#9f21ff"
        radius="5"
        border="2px_solid_rgb:9f21ff"
      />
      <Transformation
        overlay={{
          fontFamily: "Futura",
          fontWeight: "bold",
          fontSize: 15,
          text: `${post?.date !== "--" ? post.date : " untitled "}`,
        }}
        gravity="south_east"
        x="10"
        y="10"
        color="#fcd47e"
        background="#9f21ff"
        radius="5"
      />
    </Img>
  );

  return (
    <StyledPost>
      <Span
        onClick={() => push(`/posts/${post.post_id}?occasion=${post.occasion}`)}
      >
        <PostHeader>{picture}</PostHeader>
        <PostDate>people</PostDate>
      </Span>
    </StyledPost>
  );
};
export default Post;

const StyledPost = styled.div`
  background-color: ${(props) => props.theme.pink};
  margin-bottom: 1rem;
  width: 100%;
  padding: 5px;
  margin-left: 1px;
  margin-right: 1px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-around;
  width: calc(100vw - 4px);
  @media (min-width: 425px) {
    width: 21rem;
  } ;
`;
const Span = styled.span`
  cursor: pointer;
`;

const PostHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  color: ${(props) => props.theme.pink};
  border: 3px solid ${(props) => props.theme.pink};
`;
const Img = styled(Image)``;
const PostTitle = styled.h1`
  padding: 10px;
  font-size: 25px;
  color: ${(props) => props.theme.blue};
  text-align: center;
`;
const PostDate = styled.p`
  text-align: right;
  padding-right: 1rem;
  color: ${(props) => props.theme.purple};
`;
