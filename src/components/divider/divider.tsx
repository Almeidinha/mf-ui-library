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
  muted?: boolean;
};

function getColor(muted?: boolean): string {
  return muted ? Borders.Default.Muted : Borders.Default.Default;
}

export const Divider: FC<DividerProps> = ({ className, muted }) => {
  return (
    <DividerLine
      className={className}
      $color={getColor(muted)}
      data-testid="divider-test"
    />
  );
};
