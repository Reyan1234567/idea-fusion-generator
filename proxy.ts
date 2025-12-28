import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import RefreshToken from "@/models/refresh_tokens";
import {
  checkValidity,
  generateLongLivedSecretKey,
  generateShortLivedSecretKey,
} from "./utils/signup.helper";
import { cookies } from "next/headers";
import { createRefreshToken, deleteRefreshToken } from "./utils/refreshToken";
import { BASE_URL } from "./utils/global";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");
  const refreshToken = request.cookies.get("refresh_token");
  const userId = request.cookies.get("user_id");
  if (!accessToken || !refreshToken || !userId) {
    return NextResponse.redirect(`${BASE_URL}/signup`);
  }
  // first check if the accessToken is valid, if not then check the refreshtoken
  const accessCheck = checkValidity(
    new TextEncoder().encode(accessToken?.value),
    process.env.JWT_ACCESS_KEY!
  );
  const refreshCheck = checkValidity(
    new TextEncoder().encode(refreshToken?.value),
    process.env.JWT_REFRESH_KEY!
  );
  if (!accessCheck) {
    if (!refreshCheck) {
      (await cookies()).set("access_token", "", { expires: new Date() });
      (await cookies()).set("refresh_token", "", { expires: new Date() });
      (await cookies()).set("user_id", "", { expires: new Date() });
      return NextResponse.redirect("/signup");
    }
    const refresh = await RefreshToken.findOne({
      refresh_token: refreshToken?.value,
    });
    await deleteRefreshToken(refresh.id);
    const newRefreshToken = await generateLongLivedSecretKey(
      userId.value,
      new TextEncoder().encode(process.env.JWT_REFRESH_KEY)
    );
    const newAccessToken = await generateShortLivedSecretKey(
      userId.value,
      new TextEncoder().encode(process.env.JWT_ACCESS_KEY)
    );
    await createRefreshToken(userId.value, newRefreshToken);
    (await cookies()).set("access_token", newAccessToken, {
      expires: new Date(Date.now() + 3600 * 1000 * 24),
      httpOnly: true,
    });
    (await cookies()).set("access_token", newAccessToken, {
      expires: new Date(Date.now() + 3600 * 1000 * 24 * 7),
      httpOnly: true,
    });
  }
  return NextResponse.next();
  // if valid then refresh both, if not then empty teh cookies, and delete that shii from the db
}

// ((?!...))
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - login
     * - signup
     * - api (optional: remove if you want middleware to run on API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!login|signup|api/verify-account|redirect|_next/static|_next/image|favicon.ico).*)",
  ],
};
