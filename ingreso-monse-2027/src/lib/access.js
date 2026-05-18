import crypto from "crypto";

const COOKIE_NAMES = {
  student: "monse_student_access",
  setup: "monse_setup_access",
  admin: "monse_admin_access",
};

const PASSWORD_ENVS = {
  student: "MONSE_LOGIN_PASSWORD",
  setup: "MONSE_SETUP_PASSWORD",
  admin: "MONSE_ADMIN_PASSWORD",
};

export function verifyAccessPassword(kind, password) {
  const expected = getPassword(kind);
  if (!expected) return false;
  return safeEqual(String(password || ""), expected);
}

export function setAccessCookie(res, kind) {
  const token = createAccessToken(kind);
  const cookieName = COOKIE_NAMES[kind];
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

  res.setHeader("Set-Cookie", [
    `${cookieName}=${token}; HttpOnly; Path=/; Max-Age=2592000; SameSite=Lax${secure}`,
  ]);
}

export function hasAccess(req, allowedKinds) {
  const kinds = Array.isArray(allowedKinds) ? allowedKinds : [allowedKinds];
  const cookies = parseCookies(req.headers.cookie || "");

  return kinds.some((kind) => {
    const token = cookies[COOKIE_NAMES[kind]];
    return Boolean(token && token === createAccessToken(kind));
  });
}

export function requireAccess(req, res, allowedKinds) {
  if (hasAccess(req, allowedKinds)) return true;
  res.status(401).json({ error: "Acceso protegido. Ingresa con la contrasena primero." });
  return false;
}

function createAccessToken(kind) {
  const password = getPassword(kind);
  if (!password) return "";

  return crypto.createHmac("sha256", getAuthSecret()).update(`${kind}:${password}`).digest("hex");
}

function getPassword(kind) {
  return process.env[PASSWORD_ENVS[kind]] || "";
}

function getAuthSecret() {
  return process.env.MONSE_AUTH_SECRET || process.env.SUPABASE_SERVICE_KEY || process.env.OPENROUTER_API_KEY || "monse-local";
}

function parseCookies(header) {
  return header.split(";").reduce((acc, pair) => {
    const index = pair.indexOf("=");
    if (index === -1) return acc;
    const key = pair.slice(0, index).trim();
    const value = pair.slice(index + 1).trim();
    if (key) acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
}

function safeEqual(value, expected) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  if (valueBuffer.length !== expectedBuffer.length) return false;
  return crypto.timingSafeEqual(valueBuffer, expectedBuffer);
}
