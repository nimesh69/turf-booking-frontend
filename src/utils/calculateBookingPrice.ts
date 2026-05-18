export const calculateBookingPrice = (
  pricePerHour: number,
  startTime: string,
  endTime: string
): number => {
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  const hours = (eh * 60 + em - sh * 60 - sm) / 60;
  return Math.round(hours * pricePerHour);
};
