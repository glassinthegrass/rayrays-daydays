import axios from "axios";
import { Image, Transformation } from "cloudinary-react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
const PostView = (props) => {
  const [post, setPost] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [idx, setIdx] = useState(0);

  const post_id = useParams().post_id;

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
    <Image publicId={photos[idx].public_id}>
      <Transformation crop="fill" gravity="faces" height="450" width="450" />
    </Image>
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

        <PictureBox>{mapPics}</PictureBox>
      </PostBox>
    </ViewBox>
  );
};

export default PostView;
const MainPic = styled.div`
  width: 450px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const PostBox = styled(ViewBox)`
  display: flex;
  padding: 1rem;
  background-color: ${(props) => props.theme.purple};
  flex-direction: row;
  justify-content: space-between;
  width: calc(60% + 1rem);
  align-items: center;
  height: calc(100%);
  @media (min-width: 425px) {
    align-items: center;
    justify-content: center;
  }
`;
const PictureBox = styled.section`
  background-color: rgb(90, 29, 141);
  display: flex;
  flex-direction: column;
  height: calc(100% - 2rem);
  overflow-y: auto;
  overflow-x: hidden;
  border: 3px solid rgb(90, 29, 141);
  gap: 1rem;
`;

const Info = styled.h4`
  padding: 0.3rem;

  text-align: left;
  background-color: ${(props) => props.theme.pink};
  color: ${(props) => props.theme.yellow};
`;
const InfoSpace = styled.span`
  width: 29rem;
  background-color: ${(props) => props.theme.pink};
  border: 3px solid rgb(90, 29, 141);
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Picture = styled(Image)`
  height: 75px;
  width: 75px;
  @media (min-width: 425px) {
    height: 175px;
    width: 175px;
  } ;
`;
