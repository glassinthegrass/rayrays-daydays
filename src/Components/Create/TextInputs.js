import React from "react";
import styled from "styled-components";

const TextInputs = ({
  handle,
  occasion,
  city,
  date,
  details,
  dd,
  mm,
  yyyy,
}) => {
  return (
    <Box>
      <Row>
<Title>Title</Title>
        <Input
          onChange={(e) => handle.occasion(e.target.value)}
          type="text"
          value={occasion}
          placeholder="occasion"
        />
      </Row>
      <Row>
      <Title>Location</Title>
        <Input
          onChange={(e) => handle.city(e.target.value)}
          type="text"
          value={city}
          placeholder="location"
        />
      </Row>
     
      <Row>
      <Title>Date</Title>
        <DateInput
          onChange={(e) => handle.date(e.target.value, 1)}
          type="text"
          value={date.month}
          placeholder="mm"
        />
        <DateInput

          ref={dd}
          onChange={(e) => handle.date(e.target.value, 2)}
          type="text"
          value={date.day}
          placeholder="dd"
        />
        <YearInput

          ref={yyyy}
          onChange={(e) => handle.date(e.target.value, 3)}
          type="text"
          value={date.year}
          placeholder="yyyy"
        />
      </Row>
      <Row>
      <Title>Details</Title>
        <Input
          ref={mm}
          onChange={(e) => handle.details(e.target.value)}
          type="text"
          value={details}
          placeholder="details"
        />
      </Row>
    </Box>
  );
};
export default TextInputs;
const Box = styled.span`
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
margin-left:-4rem;
`;
const Input = styled.input`
width:60%;
  padding: 1rem;
  margin: 0.5rem;
`;
const DateInput = styled(Input)`
  width: 1.8rem;
  text-align: center;
`;

const YearInput = styled(DateInput)`
  width: 3.8rem;
`;
const Row = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
    width:100%;
`;
const Title=styled.h1`
width:6rem;
text-align:center;
`
