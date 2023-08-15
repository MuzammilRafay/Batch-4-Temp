import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
    font-family: ${theme.fonts.body};
    font-weight: ${theme.fontWeights.regular};
    color: ${theme.colors.text.primary};
    flex-wrap:wrap;
    margin-top:0px;
    margin-bottom:0px;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme) => `
    font-size:${theme.fontSizes.caption};
    font-weight:${theme.fontWeights.bold};
`;

const label = (theme) => `
    font-size:${theme.fontSizes.body};
    font-weight:${theme.fontWeights.medium};
    font-family: ${theme.fonts.heading};
`;

const variants = {
  body,
  error,
  caption,
  label,
};

// variants["body"]()

const TextComponent = styled(Text)`
  ${(props) => defaultTextStyles(props.theme)};
  ${(props) => variants[props.variant](props.theme)};
`;

function CustomText(props) {
  const { variant = "body", children, style } = props;
  return (
    <TextComponent variant={variant} style={style}>
      {children}
    </TextComponent>
  );
}

export default CustomText;
