import { NextResponse } from "next/server";

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

export async function GET(request, { params }) {
  const route = params.route;

  // 1. Redirect user to GitHub login
  if (route[0] === "login") {
    const redirectUri = `https://cubefreestyletest.vercel.app/api/auth/callback`;

    const githubUrl =
      `https://github.com/login/oauth/authorize?` +
      `client_id=${clientId}&redirect_uri=${redirectUri}&scope=public_repo`;

    return NextResponse.redirect(githubUrl);
  }

  // 2. Handle GitHub callback and exchange code for token
  if (route[0] === "callback") {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return NextResponse.json(
        { error: "Failed to obtain token", details: tokenData },
        { status: 400 }
      );
    }

    // Redirect back to CMS with access token
    return NextResponse.redirect(
      `${request.nextUrl.origin}/admin/#access_token=${tokenData.access_token}`
    );
  }

  return NextResponse.json({ status: "ok" });
}
