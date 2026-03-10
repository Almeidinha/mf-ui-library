import { Margin, Padding } from "@foundations";
import {
  defaultTo,
  FC,
  is,
  isDefined,
  isEmpty,
  maybeRender,
  Nothing,
  PropsWithChildren,
} from "@helpers";
import { Card } from "components/card";
import { JSX, useMemo, useState } from "react";
import styled from "styled-components";

import { TreeNode } from "./components/tree-node";
import {
  deserializeList,
  flattenNodes,
  getNode,
  getNodeCheckState,
  serializeList,
  toggleChecked,
  toggleNode,
} from "./helper";
import {
  CheckNodeProps,
  ExpandNodeProps,
  FlattenNodeProps,
  NodeProps,
  TreeViewProps,
} from "./types";

const ParentNode = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: ${Margin.none};
  padding-left: ${Padding.none};
  list-style-type: none;
  & ol {
    padding-left: ${Padding.l};
  }
`;

const Container = styled.div<{ $useCardContainer: boolean }>`
  display: block;
  margin: ${Margin.none};
  padding: ${({ $useCardContainer }) =>
    $useCardContainer ? Padding.none : Padding.xs};
`;

export const TreeView: FC<PropsWithChildren<TreeViewProps>> = (props) => {
  const {
    checkedList = [],
    expanded = [],
    title,
    nodes,
    className,
    showChildCount = false,
    useCardContainer = true,
  } = props;

  const [expandedList, setExpandedList] = useState<string[]>(expanded);
  const treeId = new Date().getTime().toString();

  const flattenNodeList: FlattenNodeProps[] = useMemo(() => {
    const _nodeList: FlattenNodeProps[] = [];
    flattenNodes(_nodeList, nodes);

    deserializeList(_nodeList, {
      checked: checkedList,
      expanded: expandedList,
    });

    return _nodeList;
  }, [nodes, checkedList, expandedList]);

  const handleOnCheck = (nodeInfo: CheckNodeProps): void => {
    const { onCheck } = props;

    toggleChecked(flattenNodeList, nodeInfo, nodeInfo.checked);
    if (isDefined(onCheck)) {
      onCheck(serializeList(flattenNodeList, "checked"), { ...nodeInfo });
    }
  };

  const handleOnExpand = (nodeInfo: ExpandNodeProps): void => {
    const { onExpand } = props;

    toggleNode(flattenNodeList, nodeInfo.value, "expanded", nodeInfo.expanded);
    if (isDefined(onExpand)) {
      onExpand(serializeList(flattenNodeList, "expanded"), { ...nodeInfo });
    }
    setExpandedList(serializeList(flattenNodeList, "expanded"));
  };

  const onNodeClick = (nodeInfo: CheckNodeProps): void => {
    const { onClick } = props;
    const node = getNode(flattenNodeList, nodeInfo.value);
    if (isDefined(onClick)) {
      onClick({ ...node, ...nodeInfo });
    }
  };

  const renderTreeNodes = (
    nodeList: NodeProps[],
    parent?: NodeProps,
  ): JSX.Element => {
    const { expandDisabled = false } = props;

    const treeNodes = nodeList.map((node: NodeProps) => {
      const flatNode = getNode(flattenNodeList, node.value);

      const children = is(flatNode?.isParent) ? (
        renderTreeNodes(defaultTo(node.children, []), node)
      ) : (
        <Nothing key={node.value} />
      );

      if (isDefined(flatNode)) {
        flatNode.checkState = getNodeCheckState(flattenNodeList, node);
      }

      const parentExpanded =
        isDefined(parent) && isDefined(parent.value)
          ? getNode(flattenNodeList, parent.value)?.expanded
          : true;

      if (!is(parentExpanded)) {
        return <Nothing key={node.value} />;
      }

      return (
        <TreeNode
          key={node.value}
          checkState={defaultTo(flatNode?.checkState, 0)}
          disabled={is(flatNode?.disabled)}
          expandDisabled={expandDisabled}
          expanded={is(flatNode?.expanded)}
          label={node.label}
          isLeaf={is(flatNode?.isLeaf)}
          isParent={is(flatNode?.isParent)}
          treeId={treeId}
          invalid={defaultTo(node.invalid, false)}
          value={node.value}
          showChildCount={showChildCount}
          childCount={defaultTo(flatNode?.children?.length, 0)}
          helpfulMessage={node.helpfulMessage}
          onClick={onNodeClick}
          onCheck={handleOnCheck}
          onExpand={handleOnExpand}
        >
          {children}
        </TreeNode>
      );
    });

    return (
      <ParentNode role="tree" className="tree-view">
        {treeNodes}
      </ParentNode>
    );
  };

  const renderTree = (): JSX.Element => {
    return useCardContainer ? (
      <Card heading={title}>
        <Card.Section>
          <Container className={className} id={treeId} $useCardContainer>
            {renderTreeNodes(nodes)}
          </Container>
        </Card.Section>
      </Card>
    ) : (
      <Container className={className} id={treeId} $useCardContainer={false}>
        {renderTreeNodes(nodes)}
      </Container>
    );
  };

  return maybeRender(!isEmpty(nodes), renderTree());
};
