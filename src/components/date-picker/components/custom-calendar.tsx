import {
  Actions,
  Background,
  Interactive,
  Surface,
  TextColors,
} from "foundation/colors";
import { Margin, Padding } from "foundation/spacing";
import { TypographyStyles } from "foundation/typography";
import { Calendar } from "react-multi-date-picker";
import styled from "styled-components";

/**
 * For a reasonable description of the class names etc,
 * @see https://shahabyazdi.github.io/react-multi-date-picker/classes-&-styles/
 */
export const CustomCalendar = styled(Calendar)`
  .rmdp-week-day {
    ${TypographyStyles.Caption}
    color: ${TextColors.Muted};
  }

  .rmdp-header {
    font-size: inherit;
    line-height: inherit;
    height: inherit;
    margin-top: ${Margin.none};

    .rmdp-header-values span {
      ${TypographyStyles.Heading3}
      color: ${TextColors.Default};
      padding: ${Padding.none};
    }

    button {
      background-color: ${Surface.Default.Default};
      border: none;
      cursor: pointer;
    }
  }

  .rmdp-day-picker {
    padding: ${Padding.none};
  }

  .rmdp-month-picker {
    padding: ${Padding.none};
  }

  .rmdp-year-picker {
    padding: ${Padding.none};
  }

  .rmdp-calendar {
    padding: ${Padding.xs};
  }

  .rmdp-day.rmdp-disabled {
    border-radius: 6px;
    box-shadow: none;
    ${TypographyStyles.Body}
    color: ${TextColors.Disabled};

    &:active {
      background-color: transparent;
    }

    span {
      background-color: unset;
    }

    & .rmdp-today {
      border-radius: 6px;
    }
  }

  .rmdp-day.rmdp-range {
    border-radius: 0px;
    background-color: ${Surface.Neutral.Muted};
    box-shadow: none;
    ${TypographyStyles.Body}

    margin-bottom: ${"1px"};

    &:first-of-type {
      border-radius: 6px 0 0 6px;
    }

    &:last-of-type {
      border-radius: 0 6px 6px 0;
    }

    &:not(.rmdp-disabled):not(.rmdp-day-hidden):not(.start):not(.end):hover {
      background-color: ${Actions.Secondary.Hover};
    }

    &:active {
      background-color: ${Actions.Secondary.Pressed};
    }

    span {
      background-color: unset;
    }

    &:not(.rmdp-disabled):not(.rmdp-day-hidden) span {
      background-color: unset;
      color: ${TextColors.Default};
    }

    &.rmdp-today {
      border-radius: 6px;
    }

    &.start {
      border-radius: 18px 0px 0px 18px;
    }

    &.end {
      border-radius: 0px 18px 18px 0px;
    }

    &.start,
    &.end {
      background-color: ${Interactive.Subtle.Default};
      box-shadow: none;
      ${TypographyStyles.Heading4}
      color: ${TextColors.OnPrimary};

      &:not(.rmdp-disabled):not(.rmdp-day-hidden) span {
        background-color: unset;
        color: ${TextColors.OnPrimary};
      }

      &:not(.rmdp-disabled):not(.rmdp-day-hidden) span:hover {
        background-color: unset;
        color: ${TextColors.OnPrimary};
      }
    }

    &.rmdp-selected span:not(.highlight) {
      background-color: inherit;
      border-radius: none;
      box-shadow: none;
    }
  }

  .rmdp-day {
    border-radius: 6px;
    ${TypographyStyles.Body}

    &.rmdp-today {
      border-radius: 6px;
      background-color: ${Background.Default};
      font-weight: bold;
    }

    &:not(.rmdp-disabled):not(.rmdp-day-hidden):not(.start):not(.end):not(
        .rmdp-selected
      ):hover {
      background-color: ${Actions.Secondary.Hover};
    }

    &:active {
      background-color: ${Actions.Secondary.Pressed};
    }

    span {
      background-color: unset;
    }

    &:not(.rmdp-disabled):not(.rmdp-day-hidden) span {
      background-color: unset;
      color: ${TextColors.Default};
    }

    &.rmdp-selected {
      background-color: ${Interactive.Subtle.Default};
      border-radius: 6px;
      box-shadow: none;
      ${TypographyStyles.Heading4}
      color: ${TextColors.OnPrimary};

      &:not(.rmdp-disabled):not(.rmdp-day-hidden) span {
        background-color: unset;
        color: ${TextColors.OnPrimary};
      }

      &:not(.rmdp-disabled):not(.rmdp-day-hidden) span:hover {
        background-color: unset;
        color: ${TextColors.OnPrimary};
      }
    }

    &.rmdp-selected span:not(.highlight) {
      background-color: inherit;
      border-radius: none;
      box-shadow: none;
    }
  }
`;
