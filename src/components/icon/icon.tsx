import { Icons } from "foundation/colors";
import { LineHeight } from "foundation/typography/constants";
import { forwardRef } from "helpers/generic-types";
import React, { HTMLAttributes, ReactElement } from "react";
import styled from "styled-components";

import { IconListMajor, IconListMinor } from "./icon-list";

interface IconProperties extends HTMLAttributes<HTMLElement> {
  icon: ReactElement;
  minor?: boolean;
  role?: string;
  "aria-label"?: string;
  viewBox?: string;
  className?: string;
  color?: string;
}

const BoundingBox = styled.i.withConfig({
  shouldForwardProp: (prop) => !["minor"].includes(prop),
})<{
  $color?: string;
}>`
  width: ${LineHeight.b};
  height: ${LineHeight.b};
  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  line-height: 0;
  font-style: normal;
  vertical-align: middle;
  color: ${({ $color }) => $color ?? `var(--icon-color, ${Icons.Default})`};
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  display: block;
  fill: none;

  path {
    fill: currentColor;
  }
`;

const MfUIIcon = forwardRef<HTMLElement, IconProperties>(
  (
    {
      icon,
      color,
      role = "img",
      "aria-label": ariaLabel = "icon",
      viewBox = "0 0 20 20",
      ...rest
    },
    ref,
  ) => (
    <BoundingBox ref={ref} $color={color} {...rest}>
      <Svg role={role} aria-label={ariaLabel} viewBox={viewBox}>
        {icon}
      </Svg>
    </BoundingBox>
  ),
);

MfUIIcon.displayName = "MfUIIcon";

function makeIconComponent(icon: ReactElement, minor?: boolean) {
  const Comp = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
    (props, ref) => <MfUIIcon {...props} ref={ref} icon={icon} minor={minor} />,
  );
  Comp.displayName = "IconComponent";
  return Comp;
}

export const Icon = {
  ArrowsUpDownLeftRight: makeIconComponent(
    IconListMajor["arrows-up-down-left-right"],
  ),
  BadgePercent: makeIconComponent(IconListMajor["badge-percent"]),
  Bell: makeIconComponent(IconListMajor["bell"]),
  Book: makeIconComponent(IconListMajor["book"]),
  BoxArchive: makeIconComponent(IconListMajor["box-archive"]),
  BuildingColumns: makeIconComponent(IconListMajor["building-columns"]),
  Building: makeIconComponent(IconListMajor["building"]),
  BullseyeArrow: makeIconComponent(IconListMajor["bullseye-arrow"]),
  Calculator: makeIconComponent(IconListMajor["calculator"]),
  CalendarDay: makeIconComponent(IconListMajor["calendar-day"]),
  ChartLine: makeIconComponent(IconListMajor["chart-line"]),
  ChartSimple: makeIconComponent(IconListMajor["chart-simple"]),
  Check: makeIconComponent(IconListMajor["check"]),
  CircleCheck: makeIconComponent(IconListMajor["circle-check"]),
  CircleInfo: makeIconComponent(IconListMajor["circle-info"]),
  CircleQuestion: makeIconComponent(IconListMajor["circle-question"]),
  ClipboardCheck: makeIconComponent(IconListMajor["clipboard-check"]),
  CommentLines: makeIconComponent(IconListMajor["comment-lines"]),
  DiamondExclamation: makeIconComponent(IconListMajor["diamond-exclamation"]),
  Envelope: makeIconComponent(IconListMajor["envelope"]),
  Eye: makeIconComponent(IconListMajor["eye"]),
  EyeSlash: makeIconComponent(IconListMajor["eye-slash"]),
  FileCertificate: makeIconComponent(IconListMajor["file-certificate"]),
  FileChartColumn: makeIconComponent(IconListMajor["file-chart-column"]),
  FileInvoiceDollar: makeIconComponent(IconListMajor["file-invoice-dollar"]),
  FileLines: makeIconComponent(IconListMajor["file-lines"]),
  Gear: makeIconComponent(IconListMajor["gear"]),
  GraduationCap: makeIconComponent(IconListMajor["graduation-cap"]),
  Heart: makeIconComponent(IconListMajor["heart"]),
  House: makeIconComponent(IconListMajor["house"]),
  Inbox: makeIconComponent(IconListMajor["inbox"]),
  MagnifyingGlass: makeIconComponent(IconListMajor["magnifying-glass"]),
  PaperPlaneTop: makeIconComponent(IconListMajor["paper-plane-top"]),
  Plus: makeIconComponent(IconListMajor["plus"]),
  SchoolFlag: makeIconComponent(IconListMajor["school-flag"]),
  ShieldPlus: makeIconComponent(IconListMajor["shield-plus"]),
  Store: makeIconComponent(IconListMajor["store"]),
  Suitcase: makeIconComponent(IconListMajor["suitcase"]),
  Tag: makeIconComponent(IconListMajor["tag"]),
  BedFront: makeIconComponent(IconListMajor["bed-front"]),
  TriangleExclamation: makeIconComponent(IconListMajor["triangle-exclamation"]),
  UserGroup: makeIconComponent(IconListMajor["user-group"]),
  User: makeIconComponent(IconListMajor["user"]),
  Wrench: makeIconComponent(IconListMajor["wrench"]),
  XmarkLarge: makeIconComponent(IconListMajor["xmark-large"]),
};

export const IconMinor = {
  ArrowDownToLine: makeIconComponent(IconListMinor["arrow-down-to-line"], true),
  ArrowLeft: makeIconComponent(IconListMinor["arrow-left"], true),
  ArrowRightFromBracket: makeIconComponent(
    IconListMinor["arrow-right-from-bracket"],
    true,
  ),
  ArrowRight: makeIconComponent(IconListMinor["arrow-right"], true),
  ArrowUpArrowDown: makeIconComponent(
    IconListMinor["arrow-up-arrow-down"],
    true,
  ),
  ArrowUpFromLine: makeIconComponent(IconListMinor["arrow-up-from-line"], true),
  ArrowUpRightFromSquare: makeIconComponent(
    IconListMinor["arrow-up-right-from-square-regular"],
    true,
  ),
  BadgeCheck: makeIconComponent(IconListMinor["badge-check"], true),
  BadgePercent: makeIconComponent(IconListMinor["badge-percent"], true),
  Ban: makeIconComponent(IconListMinor["ban"], true),
  BarsFilter: makeIconComponent(IconListMinor["bars-filter"], true),
  Bars: makeIconComponent(IconListMinor["bars"], true),
  BedFront: makeIconComponent(IconListMinor["bed-front"], true),
  Bold: makeIconComponent(IconListMinor["bold"], true),
  Bookmark: makeIconComponent(IconListMinor["bookmark"], true),
  Book: makeIconComponent(IconListMinor["book"], true),
  BuildingColumns: makeIconComponent(IconListMinor["building-columns"], true),
  Calendar: makeIconComponent(IconListMinor["calendar"], true),
  Campground: makeIconComponent(IconListMinor["campground"], true),
  CartShopping: makeIconComponent(IconListMinor["cart-shopping"], true),
  CartShoppingPlus: makeIconComponent(
    IconListMinor["cart-shopping-plus"],
    true,
  ),
  ChartPieSimple: makeIconComponent(IconListMinor["chart-pie-simple"], true),
  Check: makeIconComponent(IconListMinor["check"], true),
  ChevronDownSolid: makeIconComponent(
    IconListMinor["chevron-down-solid"],
    true,
  ),
  ChevronLeftSolid: makeIconComponent(
    IconListMinor["chevron-left-solid"],
    true,
  ),
  ChevronRightSolid: makeIconComponent(
    IconListMinor["chevron-right-solid"],
    true,
  ),
  ChevronUpSolid: makeIconComponent(IconListMinor["chevron-up-solid"], true),
  CircleDollar: makeIconComponent(IconListMinor["circle-dollar"], true),
  CircleExclamation: makeIconComponent(
    IconListMinor["circle-exclamation"],
    true,
  ),
  CircleInfo: makeIconComponent(IconListMinor["circle-info"], true),
  CircleSmall: makeIconComponent(IconListMinor["circle-small"], true),
  Clock: makeIconComponent(IconListMinor["clock"], true),
  Clone: makeIconComponent(IconListMinor["clone"], true),
  Comment: makeIconComponent(IconListMinor["comment"], true),
  CreditCard: makeIconComponent(IconListMinor["credit-card"], true),
  Desktop: makeIconComponent(IconListMinor["desktop"], true),
  EllipsisVertical: makeIconComponent(IconListMinor["ellipsis-vertical"], true),
  Envelope: makeIconComponent(IconListMinor["envelope"], true),
  Eye: makeIconComponent(IconListMinor["eye"], true),
  EyeSlash: makeIconComponent(IconListMinor["eye-slash"], true),
  Facebook: makeIconComponent(IconListMinor["facebook"], true),
  FileLines: makeIconComponent(IconListMinor["file-lines"], true),
  FireBurner: makeIconComponent(IconListMinor["fire-burner"], true),
  Fire: makeIconComponent(IconListMinor["fire"], true),
  Folder: makeIconComponent(IconListMinor["folder"], true),
  FolderOpen: makeIconComponent(IconListMinor["folder-open"], true),
  GraduationCap: makeIconComponent(IconListMinor["graduation-cap"], true),
  Gear: makeIconComponent(IconListMinor["gear"], true),
  GlobeRegular: makeIconComponent(IconListMinor["globe-regular"], true),
  H1: makeIconComponent(IconListMinor["h1"], true),
  Heart: makeIconComponent(IconListMinor["heart"], true),
  HeartSolid: makeIconComponent(IconListMinor["heart-solid"], true),
  HeartOnMedia: makeIconComponent(IconListMinor["heart-on-media"], true),
  Instagram: makeIconComponent(IconListMinor["instagram"], true),
  Italic: makeIconComponent(IconListMinor["italic"], true),
  Link: makeIconComponent(IconListMinor["link"], true),
  ListOl: makeIconComponent(IconListMinor["list-ol"], true),
  ListUl: makeIconComponent(IconListMinor["list-ul"], true),
  LocationDot: makeIconComponent(IconListMinor["location-dot"], true),
  Lock: makeIconComponent(IconListMinor["lock"], true),
  Loveseat: makeIconComponent(IconListMinor["loveseat"], true),
  MagnifyingGlass: makeIconComponent(IconListMinor["magnifying-glass"], true),
  Minus: makeIconComponent(IconListMinor["minus"], true),
  MugTea: makeIconComponent(IconListMinor["mug-tea"], true),
  Paperclip: makeIconComponent(IconListMinor["paperclip"], true),
  Pen: makeIconComponent(IconListMinor["pen"], true),
  PersonPraying: makeIconComponent(IconListMinor["person-praying"], true),
  Phone: makeIconComponent(IconListMinor["phone"], true),
  PlaneArrival: makeIconComponent(IconListMinor["plane-arrival"], true),
  PlaneDeparture: makeIconComponent(IconListMinor["plane-departure"], true),
  Plus: makeIconComponent(IconListMinor["plus"], true),
  Print: makeIconComponent(IconListMinor["print"], true),
  RestroomSimple: makeIconComponent(IconListMinor["restroom-simple"], true),
  RotateLeft: makeIconComponent(IconListMinor["rotate-left"], true),
  RotateRight: makeIconComponent(IconListMinor["rotate-right"], true),
  School: makeIconComponent(IconListMinor["school"], true),
  ShareNodes: makeIconComponent(IconListMinor["share-nodes"], true),
  ShieldPlus: makeIconComponent(IconListMinor["shield-plus"], true),
  Spinner: makeIconComponent(IconListMinor["spinner"], true),
  Star: makeIconComponent(IconListMinor["star"], true),
  StarSolid: makeIconComponent(IconListMinor["star-solid"], true),
  Strikethrough: makeIconComponent(IconListMinor["strikethrough"], true),
  Suitcase: makeIconComponent(IconListMinor["suitcase"], true),
  TableTennisPaddleBall: makeIconComponent(
    IconListMinor["table-tennis-paddle-ball"],
    true,
  ),
  TrashCan: makeIconComponent(IconListMinor["trash-can"], true),
  Twitter: makeIconComponent(IconListMinor["twitter"], true),
  Underline: makeIconComponent(IconListMinor["underline"], true),
  User: makeIconComponent(IconListMinor["user"], true),
  Utensils: makeIconComponent(IconListMinor["utensils"], true),
  Whatsapp: makeIconComponent(IconListMinor["whatsapp"], true),
  Wheelchair: makeIconComponent(IconListMinor["wheelchair"], true),
  Wifi: makeIconComponent(IconListMinor["wifi"], true),
  Xmark: makeIconComponent(IconListMinor["xmark"], true),
  Youtube: makeIconComponent(IconListMinor["youtube"], true),
  VirusCovid: makeIconComponent(IconListMinor["virus-covid"], true),
};
