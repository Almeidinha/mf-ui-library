import { Borders, Surface } from "foundation/colors";
import { FC } from "helpers/generic-types";
import { useState } from "react";
import styled from "styled-components";

type ThumbnailSize = "small" | "medium" | "large";

export type ThumbnailProps = {
  imageUrl?: string | null;
  fallbackUrl?: string;
  size?: ThumbnailSize;
  imageLabel?: string;
  className?: string;
};

const SIZE_MAP: Record<ThumbnailSize, string> = {
  small: "40px",
  medium: "60px",
  large: "80px",
};

const Box = styled.div<{ $size: string }>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 6px;
  border: 1px solid ${Borders.Default.Subdued};
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  background: ${Surface?.Default?.Default ?? "transparent"};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
`;

export const Thumbnail: FC<ThumbnailProps> = ({
  imageUrl,
  fallbackUrl,
  imageLabel = "",
  size = "medium",
  className,
}) => {
  const [src, setSrc] = useState(imageUrl?.trim() || fallbackUrl?.trim() || "");

  if (!src) {
    return null;
  }

  return (
    <Box $size={SIZE_MAP[size]} className={className}>
      <Image
        src={src}
        alt={imageLabel}
        loading="lazy"
        decoding="async"
        onError={() => {
          if (fallbackUrl && src !== fallbackUrl) {
            setSrc(fallbackUrl);
          }
        }}
      />
    </Box>
  );
};
