export const mapFighters = fighters => fighters.map(fighter => ({
  ...fighter,
  id: parseInt(fighter.id),
  club_admin_id: parseInt(fighter.club_admin_id),
  user_role_id: parseInt(fighter.user_role_id),
  club_id: parseInt(fighter.club_id),
  status: parseInt(fighter.status),
  weight: parseInt(fighter.weight),
}));
