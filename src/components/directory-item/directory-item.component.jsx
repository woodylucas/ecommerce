import React from "react";

import {
  DirectoryItemContainer,
  Body,
  BackgroundImage,
} from "./directory-item.styles";

const DirectoryItem = ({ title, imageUrl }) => {
  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
