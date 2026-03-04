import { Borders, Gap, Surface, Typography } from "@foundations";
import { If, isNil } from "@helpers";
import { IconMinor } from "components/icon";
import { InputNumber } from "components/input-field";
import { Flex } from "components/layout";
import { Button } from "components/molecules/button";
import { Select } from "components/select";
import { Body } from "components/typography";
import { KeyboardEvent, useEffect, useState } from "react";
import styled from "styled-components";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100] as const;
const DEFAULT_PAGE_SIZE = 10;
const FIRST_PAGE = 1;

export interface IPaginationProps {
  page: number;
  totalPages: number;
  onChange?: (page: number) => void;
  showPageInfo?: boolean;
  previousLabel?: string;
  nextLabel?: string;

  pageSize?: number;
  onPageSizeChange?: (pageSize: number) => void;
  showPageSizeSelector?: boolean;
  pageSizeOptions?: readonly number[];
}

const PaginationInput = styled(InputNumber)`
  width: 60px;
  border-radius: 0;
  border-left: 0;
  border-right: 0;
`;

const StaticBox = styled(Flex)`
  height: 36px;
  align-items: center;
  padding: 0 12px;
  border: 1px solid ${Borders.Default.Default};
  border-radius: 6px;
  background-color: ${Surface.Neutral.Default};
  ${Typography.Body};
`;

const LeftInputText = styled(StaticBox)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const RightInputText = styled(StaticBox)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const LeftArrowButton = styled(Button)`
  border-radius: 6px 0px 0px 6px;
  border-right: 0;
`;

const RightArrowButton = styled(Button).attrs({
  type: "button",
  subtle: true,
})`
  border-radius: 0px 6px 6px 0px;
`;

const PageSizeContainer = styled(Flex)`
  align-items: center;
`;

const PageSelectorContainer = styled(Select)`
  & .select-value {
    border-radius: 6px 0px 0px 6px;
    border-right: 0;
  }
  width: 70px;
`;

const clampPage = (p: number, total: number) =>
  Math.min(Math.max(p, FIRST_PAGE), total);

export const Pagination = (props: IPaginationProps) => {
  const {
    page = FIRST_PAGE,
    totalPages: total,
    onChange,
    showPageInfo = true,
    previousLabel,
    nextLabel,
    pageSize = DEFAULT_PAGE_SIZE,
    onPageSizeChange,
    showPageSizeSelector = false,
    pageSizeOptions = PAGE_SIZE_OPTIONS,
  } = props;

  const safeTotal = Math.max(total ?? 0, FIRST_PAGE);
  const clampedPage = clampPage(page, safeTotal);

  const [inputValue, setInputValue] = useState<number | undefined>(clampedPage);

  useEffect(() => {
    setInputValue(clampedPage);
  }, [clampedPage]);

  const commit = (raw?: number) => {
    if (isNil(raw) || Number.isNaN(raw)) {
      setInputValue(clampedPage);
      return;
    }

    const next = clampPage(Math.trunc(raw), safeTotal);
    setInputValue(next);

    if (next !== clampedPage) {
      onChange?.(next);
    }
  };

  const handlePageInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commit(inputValue);
    }
    if (e.key === "Escape") {
      setInputValue(clampedPage);
    }
  };

  const handlePrevious = () => {
    const next = clampPage(clampedPage - 1, safeTotal);
    if (next !== clampedPage) {
      onChange?.(next);
    }
  };

  const handleNext = () => {
    const next = clampPage(clampedPage + 1, safeTotal);
    if (next !== clampedPage) {
      onChange?.(next);
    }
  };

  const handlePageSizeChange = (value: number) => {
    const nextSize = value;

    if (!Number.isFinite(nextSize) || nextSize <= 0) {
      return;
    }

    onPageSizeChange?.(nextSize);
  };

  const showTextPrev = Boolean(previousLabel);
  const showTextNext = Boolean(nextLabel);

  return (
    <Flex center gap={Gap.l}>
      <If is={showPageInfo}>
        <Body>
          <Flex center>
            <LeftInputText>Page</LeftInputText>
            <PaginationInput
              aria-label="Current page"
              value={inputValue}
              min={FIRST_PAGE}
              max={safeTotal}
              step={1}
              onChange={(v) => setInputValue(v)}
              onBlur={() => commit(inputValue)}
              onKeyDown={handlePageInputKeyDown}
            />
            <RightInputText>{`/${safeTotal}`}</RightInputText>
          </Flex>
        </Body>
      </If>

      <Flex>
        <LeftArrowButton
          aria-label="Previous page"
          IconPrefix={IconMinor.ChevronLeftSolid}
          onClick={handlePrevious}
          disabled={clampedPage <= FIRST_PAGE}
          type="button"
        >
          {showTextPrev ? previousLabel : null}
        </LeftArrowButton>
        <RightArrowButton
          aria-label="Next page"
          IconSuffix={IconMinor.ChevronRightSolid}
          onClick={handleNext}
          disabled={clampedPage >= safeTotal}
          type="button"
        >
          {showTextNext ? nextLabel : null}
        </RightArrowButton>
      </Flex>

      <If is={showPageSizeSelector}>
        <PageSizeContainer>
          <PageSelectorContainer
            ariaLabel="Items per page"
            id="items-per-page-label"
            ariaLabelledBy="items-per-page-label"
            menuHeight={500}
            menuPosition="top"
            value={pageSize}
            options={pageSizeOptions.map((option) => ({
              label: String(option),
              value: option,
            }))}
            onChange={(value) => handlePageSizeChange(Number(value))}
          />
          <RightInputText>/Page</RightInputText>
        </PageSizeContainer>
      </If>
    </Flex>
  );
};
