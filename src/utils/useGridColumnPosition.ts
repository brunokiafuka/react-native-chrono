export const getNearestColumnPosition = (
  columnPositions: number[],
  x: number,
) => {
  "worklet";
  const nearestColumnPosition = columnPositions.reduce((prev, curr) => {
    return Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev;
  });
  return nearestColumnPosition;
};
