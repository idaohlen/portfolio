import styled from "styled-components";

const Hr = styled.hr`
  width: 100%;
  color: white;
  opacity: 0.3;
  margin-block: 2rem;
  margin-top: 3rem;
`;

export default function Divider() {
  return <Hr />;
}
