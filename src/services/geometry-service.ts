export function boxSurfaceArea(length: number, width: number, height: number): number {
  return 2 * (length * width + length * height + width * height);
}

export function cubeSurfaceArea(side: number): number {
  return 6 * side * side;
}

export function cylinderSurfaceArea(radius: number, height: number): number {
  return 2 * Math.PI * radius * (radius + height);
}

export function formatResult(value: number): string {
  return value.toFixed(2);
}