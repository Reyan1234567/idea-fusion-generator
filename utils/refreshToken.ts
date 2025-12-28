import RefreshToken from "@/models/refresh_tokens";

export const createRefreshToken = async (
  userId: string,
  refreshToken: string
) => {
  const newRefreshToken = new RefreshToken({
    user_id: userId,
    refresh_token: refreshToken,
  });
  await newRefreshToken.save();
};

export const deleteRefreshToken = async (id: string) => {
  await RefreshToken.deleteOne({ id });
};

export const extendRefreshToken = async (id: string) => {
  const refreshToken = await RefreshToken.findOne({
    id,
  });
  if (!id) throw new Error("RefreshToken not found!");
  refreshToken.expires_in = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  await refreshToken.save();
};
