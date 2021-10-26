import React from "react";
import styled from "styled-components";
import { Image, Transformation } from "cloudinary-react";
import { useHistory } from "react-router";
const Post = ({ post }) => {
  const push=useHistory().push;

  const picture = (
    <Img publicId={post.pictures[0]?.public_id}>
      <Transformation crop="fill" width="300" height="300" quality='100' format='auto'/>
      <Transformation overlay={{fontFamily: "Arial", fontSize: 35, fontWeight: "bold", text: "Hello%20World"}} gravity="north" x="10" y="70" />
      <Transformation overlay={{fontFamily: "Arial", fontSize: 15, text: `${post.date}`}} gravity="south_east" x="10" y="10" />
    </Img>
  );

  return (
    <StyledPost>
      <div onClick={() => push(`/posts/${post.post_id}?occasion=${post.occasion}`)}>
      <PostHeader >
        <PostTitle >{post.occasion}</PostTitle>
      {picture}
        <PostDate >{post.date}</PostDate>
      </PostHeader>
      </div>
    </StyledPost>
  );
};
export default Post;

const StyledPost = styled.div`
  background-color: ${(props) => props.theme.red};
  margin-bottom: 1rem;
  width: calc(100% - 4px);
  padding: 1px;
  margin-left: 1px;
  margin-right: 1px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-around;
  width:calc(100vw - 4px);
  @media (min-width: 425px) {
    width:21rem;

  } ;
`;

const PostHeader = styled.header`
  display: flex;
  flex-direction:column;
align-items:space-between;
justify-content:space-between;
background-color:${props=>props.theme.red};
`;
const Img = styled(Image)`

`;
const PostTitle = styled.h1`
padding:10px;
font-size:25px;
color:${props=>props.theme.blue};
text-align:center;
`;
const PostDate = styled.p`
text-align:right;
padding-right:1rem;
color:${props=>props.theme.yellow};
`;
