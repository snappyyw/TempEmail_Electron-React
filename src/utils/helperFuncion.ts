export function generateName(): string {
  const length = Math.floor(Math.random() * 12);

  return (Math.random() + 1).toString(36).substring(length);
}
