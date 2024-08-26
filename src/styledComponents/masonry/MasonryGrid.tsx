import PropTypes from "prop-types";
import React, { Children } from "react";
import useWidth from "./useWidth";
import { Grid } from "@mui/material";

/**
 * Returns an array of size `segmentCount`, where each element is an array
 * that is a subset of `array` obtained by walking `array` and placing each
 * element (shallow), in turn, in the next segment.
 * @example segment([1, 2, 3, 4], 3) => [[1, 4], [2], [3]]
 * @example segment([1, 2, 3, 4, 5], 3) => [[1, 4], [2, 5], [3]]
 * @example segment([1, 2], 3) => [[1], [2], []]
 * @example segment([1, 2], 2) => [[1], [2]]
 * @example segment([1], 1) => [[1]]
 * @param {list} array - array to segment
 * @param {integer} segmentCount - number of segments
 */
const segment = (array: any[], segmentCount: number): any => {
  const segmentedArray = [];
  for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex += 1) {
    segmentedArray.push(
      array.filter(
        (_: any, index: number): any => segmentIndex === index % segmentCount
      )
    );
  }
  return segmentedArray;
};

/**
 * Arranges children into grid, dependent on current screen width
 * Children may be re-mounted when width changes (they're re-parented)
 */
const MasonryGrid = ({ children, screenWidthToColumns }: any) => {
  const width = useWidth();
  const columnWidths = screenWidthToColumns[width];
  const columnsOfGridItems = segment(
    Children.toArray(children),
    columnWidths.length
  );
  return (
    <Grid container spacing={1} direction="row">
      {columnsOfGridItems.map((column: any[], columnIndex: string | number) => (
        <Grid item xs={columnWidths[columnIndex]} key={columnIndex.toString()}>
          <Grid container spacing={1}>
            {column.map(
              (
                gridItem:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined,
                gridItemIndex: { toString: () => React.Key | null | undefined }
              ) => (
                <Grid item xs={12} key={gridItemIndex.toString()}>
                  {gridItem}
                </Grid>
              )
            )}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

MasonryGrid.propTypes = {
  children: PropTypes.node,
  screenWidthToColumns: PropTypes.shape({
    xs: PropTypes.arrayOf(PropTypes.number).isRequired,
    sm: PropTypes.arrayOf(PropTypes.number).isRequired,
    md: PropTypes.arrayOf(PropTypes.number).isRequired,
    lg: PropTypes.arrayOf(PropTypes.number).isRequired,
    xl: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
};

MasonryGrid.defaultProps = {
  children: null,
};

export default MasonryGrid;
