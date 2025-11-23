import { NextResponse } from "next/server";

// ❗ ВСТАВЬ СВОИ ДАННЫЕ СЮДА
const clientId = "Ov23liunLDjOjstOxjgR";
const clientSecret = "827d638fd5e5496c4debecdf0136d39852af3415";
const redirectUri = "https://cubefreestyletest.vercel.app/api/auth/callback";

export async function GET(request, { params }) {
  const route = params.route;

  // Redirect to GitHub login
  if (route[0] === "login") {
    const githubUrl =
      `https://github.com/login/oauth/authorize?` +
      `client_id=${clientId}&redirect_uri=${redirectUri}&scope=public_repo`;

    return NextResponse.redirect(githubUrl);
  }

  // Handle callback
  if (route[0] === "callback") {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri, // 👈 критично
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

    return NextResponse.redirect(
      `${request.nextUrl.origin}/admin/#access_token=${tokenData.access_token}`
    );
  }

  return NextResponse.json({ status: "ok" });
}
