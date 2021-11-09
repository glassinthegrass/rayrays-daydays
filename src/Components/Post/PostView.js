import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Image, Transformation } from "cloudinary-react";
import { useParams, } from "react-router";
import styled from "styled-components";

const PostView = (props) => {
  const post_id = useParams().post_id;
  
  const [post, setPost] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [idx, setIdx] = useState(0);


  const handle = {
    getPost: useCallback(async () => {
      try {
        let post = await axios.get(`/api/posts/${post_id}?offset=0`);
        setPhotos(post.data.pictures);
        setPost(post.data);
      } catch (err) {
        console.log(err);
      }
    }, [post_id]),
    getIndex: (e) => {
      let selectedIndex = photos.findIndex((p) => +p.picture_id === +e);
      setIdx(+selectedIndex);
    },
  };
  const { getPost } = handle;
  useEffect(() => {
    getPost();
  }, [getPost]);

  const displayedPic = photos[idx] ? (
    <MainPicture publicId={photos[idx].public_id}>
      <Transformation crop="fill" gravity="faces" height="450" width="450" />
    </MainPicture>
  ) : (
    <React.Fragment></React.Fragment>
  );

  const mapPics = photos[1]
    ? photos.map((p, i) => {
        return (
          <Picture
            key={i}
            onClick={() => handle.getIndex(p.picture_id)}
            publicId={p.public_id}
          >
            <Transformation
              height="200"
              width="200"
              crop="fill"
              gravity="face"
            />
          </Picture>
        );
      })
    : "";
  return (
    <ViewBox>
      <PostBox>
        <InfoSpace>
          <Row>
            <Info>{post?.occasion}</Info>
            <Info>{post?.city}</Info>
          </Row>
          <Row>
            <Info></Info>
            <Info>{post.date}</Info>
          </Row>
          <MainPic>{displayedPic}</MainPic>
          <Row>
            <Info>{post.details}</Info>
          </Row>
        </InfoSpace>
<Center>
        <PictureBox>{mapPics}</PictureBox>
        </Center>
      </PostBox>
    </ViewBox>
  );
};

export default PostView;
const MainPic = styled.div`

`;
const Row = styled.span`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.pink};
`;

const ViewBox = styled.section`
  height: calc(100vh - 2rem);
  background-color: rgb(90, 29, 141, 0.9);
  overflow-y: auto;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const PostBox = styled(ViewBox)`
  display: flex;
  padding: 1rem;
  background-color: ${(props) => props.theme.purple};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100%);
  width:calc(100% - 2rem);
  
  @media (min-width: 425px) {
    width: calc(50rem);
    flex-direction: row;
    align-items: center;
    justify-content: center;
  };
`;
const Center = styled.span`
display:flex;
justify-content:center;
align-items:flex-start;
width:100%;
height:20rem;
overflow-y:scroll;
@media(min-width:425px){
height:calc(100% - 2rem);
overflow-x:hidden;
}
`

const PictureBox = styled.section`
background-color: rgb(90, 29, 141);
display: flex;
flex-direction:row;
width:100%;

flex-wrap:wrap;
gap:1rem;
justify-content:center;
align-items:center;
@media (min-width: 425px) {
flex-wrap:nowrap;
  flex-direction: column;
  justify-content:flex-start;
  height: calc(100% - 2rem);
  width:11rem;
  overflow-y: scroll;
  height:100%;
  border: 3px solid rgb(90, 29, 141);
  gap: 1rem;

};
`;

const Info = styled.h4`
@media (min-width: 425px) {
  padding: 0.3rem;
};
  text-align: left;
  background-color: ${(props) => props.theme.pink};
  color: ${(props) => props.theme.yellow};
`;
const InfoSpace = styled.span`
  @media (min-width: 425px) {
    width: 29rem;
    background-color: ${(props) => props.theme.pink};
    border: 3px solid rgb(90, 29, 141);
    margin-right: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  };

`;

const Picture = styled(Image)`
width:100px;
height:100px;
  @media (min-width: 425px) {
    height: 175px;
    width: 175px;
  } ;
`;

const MainPicture = styled(Image)`
@media (min-width: 425px) {
  width: 450px;
    display: flex;
    justify-content: center;
    align-items: flex-start;

};
width:100%;
`