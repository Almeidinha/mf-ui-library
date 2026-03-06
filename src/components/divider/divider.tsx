import { FC } from "@helpers";
import { Borders } from "foundation/colors";
import styled from "styled-components";

const DividerLine = styled.hr<{ $color: string }>`
  width: 100%;
  margin: 0;
  border: 0;
  border-top: 1px solid ${({ $color }) => $color};
`;

export type DividerProps = {
  className?: string;
  subdued?: boolean;
};

function getColor(subdued?: boolean): string {
  return subdued ? Borders.Default.Subdued : Borders.Default.Default;
}

export const Divider: FC<DividerProps> = ({ className, subdued }) => {
  return (
    <DividerLine
      className={className}
      $color={getColor(subdued)}
      data-testid="divider-test"
    />
  );
};
