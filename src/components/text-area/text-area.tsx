import { Label } from "components/typography";
import { Borders, Focus, Surface } from "foundation/colors";
import { Padding } from "foundation/spacing";
import { Typography } from "foundation/typography";
import { isDefined } from "helpers/safe-navigation";
import { forwardRef, TextareaHTMLAttributes, useId } from "react";
import styled from "styled-components";

type TextAreaResize = "none" | "vertical" | "horizontal" | "both";

const resizeMap: Record<TextAreaResize, string> = {
  none: "none",
  vertical: "vertical",
  horizontal: "horizontal",
  both: "both",
};

const TextAreaContainer = styled.div`
  position: relative;
  width: 100%;
`;

const TextAreaFrame = styled.textarea<{
  $isInvalid: boolean;
  $hasLabel: boolean;
  $resize: TextAreaResize;
}>`
  ${Typography.Body};
  box-sizing: border-box;
  width: 100%;
  min-height: 100px;
  resize: ${({ $resize }) => resizeMap[$resize]};
  border-radius: 6px;
  border: 1px solid
    ${({ $isInvalid }) =>
      $isInvalid ? Borders.Critical.Default : Borders.Default.Default};
  background: ${({ $isInvalid }) =>
    $isInvalid ? Surface.Critical.Muted : "transparent"};
  padding: ${({ $hasLabel }) =>
    $hasLabel
      ? `${Padding.xl} ${Padding.m} ${Padding.s}`
      : `${Padding.s} ${Padding.m}`};

  &:focus {
    outline: 2px solid
      ${({ $isInvalid }) => ($isInvalid ? Focus.Critical : Focus.Default)};
    outline-offset: -2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    resize: none;
  }
`;

const LabelFrame = styled(Label).attrs({ as: "label" })`
  ${Typography.Label};
  position: absolute;
  top: ${Padding.s};
  left: ${Padding.m};
  line-height: 16px;
  pointer-events: none;
`;

export type TextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
> & {
  label?: string;
  invalid?: boolean;
  resize?: TextAreaResize;
  onChange?: (value: string) => void;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      id,
      label,
      invalid = false,
      resize = "none",
      onChange,
      ...domProps
    } = props;

    const generatedId = useId();
    const textAreaId = id ?? generatedId;

    return (
      <TextAreaContainer>
        {isDefined(label) && (
          <LabelFrame htmlFor={textAreaId} muted>
            {label}
          </LabelFrame>
        )}

        <TextAreaFrame
          {...domProps}
          ref={ref}
          id={textAreaId}
          $isInvalid={invalid}
          $hasLabel={isDefined(label)}
          $resize={resize}
          aria-invalid={invalid || undefined}
          aria-label={!label ? domProps["aria-label"] : undefined}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </TextAreaContainer>
    );
  },
);

TextArea.displayName = "TextArea";
