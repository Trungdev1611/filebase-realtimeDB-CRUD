import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const WrapperLoading = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const Loading = ({ color, loading }) => {
  return (
    <WrapperLoading>
      <ClipLoader
        color={color}
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </WrapperLoading>
  );
};

export default Loading;
