import { Gap, Icons, Surface } from "@foundations";
import { FC } from "@helpers";
import { Center } from "components/layout";
import styled from "styled-components";

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Gap.xxs};
  align-self: center;
  box-sizing: border-box;
  :hover {
    cursor: pointer;
  }
`;

const ButtonBox = styled(Center)`
  background: ${Surface.Neutral.Default};
  width: 18px;
  height: 14px;
  border-radius: 3px;
`;

const TriangleUp = styled.div`
  width: 0px;
  height: 0px;
  border-left: 3.5px solid transparent;
  border-right: 3.5px solid transparent;
  border-bottom: 3.5px solid ${Icons.Default};
`;

const TriangleDown = styled.div`
  width: 0px;
  height: 0px;
  border-left: 3.5px solid transparent;
  border-right: 3.5px solid transparent;
  border-top: 3.5px solid ${Icons.Default};
`;

interface IStepperProps {
  onUpClick?: () => void;
  onDownClick?: () => void;
}

export const Stepper: FC<IStepperProps> = (props: IStepperProps) => {
  return (
    <Controls>
      <ButtonBox onClick={props.onUpClick}>
        <TriangleUp />
      </ButtonBox>
      <ButtonBox onClick={props.onDownClick}>
        <TriangleDown />
      </ButtonBox>
    </Controls>
  );
};
