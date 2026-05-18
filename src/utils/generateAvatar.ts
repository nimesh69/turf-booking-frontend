export const generateAvatar = (name: string) => {
  const colors = ['#00C896','#FF6B35','#3B82F6','#8B5CF6','#F59E0B'];
  const idx = name.charCodeAt(0) % colors.length;
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return { initials, color: colors[idx] };
};
