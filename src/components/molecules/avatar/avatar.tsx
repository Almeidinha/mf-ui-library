import { Label } from "components/typography";
import { Surface } from "foundation/colors";
import { Margin } from "foundation/spacing";
import { FC } from "helpers/generic-types";
import { If, Nothing } from "helpers/nothing";
import { isDefined, isEmpty, isNil } from "helpers/safe-navigation";
import styled from "styled-components";

import { SpaceAround } from "../../layout/";
import {
  AvatarSizeProps,
  getNodeToRenderText,
  getValuesBySize,
} from "./avatar-size-flags";

const Container = styled(SpaceAround)`
  align-items: center;
`;

const Circle = styled.div<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: ${Surface.Neutral.Default};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const FullName = styled(Label)`
  margin-left: ${Margin.xs};
`;
interface IAvatarProps {
  name: string;
  imageUrl?: string;
  imageLabel?: string;
  withLabel?: boolean;
  className?: string;
}
export type AvatarProps = IAvatarProps & AvatarSizeProps;

const isFirstOrLast = (
  el: string,
  index: number,
  items: Array<string>,
): boolean => (isDefined(el) && index === 0) || index === items.length - 1;

const getInitial = (text: string): string =>
  isNil(text) ? "" : text.charAt(0);

const getInitialsFromName = (name: string): string => {
  const allNames = name.trim().split(" ");
  const initials = allNames.filter(isFirstOrLast).map(getInitial).join("");

  return initials;
};

export const Avatar: FC<AvatarProps> = ({
  name,
  imageUrl,
  withLabel,
  imageLabel = `${name} avatar`,
  className,
  ...props
}) => {
  const size = getValuesBySize(props);
  const Text = getNodeToRenderText(props);

  if (!isDefined(name)) {
    return <Nothing />;
  }

  return (
    <Container className={className}>
      <Circle size={size}>
        {isDefined(imageUrl) && !isEmpty(imageUrl) ? (
          <Image src={imageUrl} alt={imageLabel} />
        ) : (
          <Text>{getInitialsFromName(name)}</Text>
        )}
      </Circle>
      <If is={withLabel}>
        <FullName>{name}</FullName>
      </If>
    </Container>
  );
};
