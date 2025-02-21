import jwt from "jsonwebtoken";

async function refreshAccessToken(token) {
  try {
    const decodedRefreshToken = jwt.verify(
      token?.refreshToken,
      process.env.AUTH_SECRET
    );

    if (!decodedRefreshToken || decodedRefreshToken.exp * 1000 < Date.now()) {
      throw new Error("RefreshTokenExpired");
    }

    const refreshedAccessToken = jwt.sign(
      { id: token.user.id, email: token.user.email, image: token.user.image },
      process.env.AUTH_SECRET,
      { expiresIn: "1m" }
    );

    const refreshedRefreshToken = jwt.sign(
      { id: token.user.id },
      process.env.AUTH_SECRET,
      { expiresIn: "7d" }
    );

    return {
      ...token,
      accessToken: refreshedAccessToken,
      refreshToken: refreshedRefreshToken,
      expiresIn: Date.now() + 60 * 1000,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default refreshAccessToken;
