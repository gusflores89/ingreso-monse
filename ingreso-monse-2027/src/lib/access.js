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

export function hashFamilyPassword(password) {
  const cleanPassword = String(password || "");
  const salt = crypto.randomBytes(16).toString("hex");
  const iterations = 120000;
  const digest = crypto.pbkdf2Sync(cleanPassword, salt, iterations, 32, "sha256").toString("hex");
  return `pbkdf2_sha256$${iterations}$${salt}$${digest}`;
}

export function verifyFamilyPassword(password, storedHash) {
  const parts = String(storedHash || "").split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2_sha256") return false;

  const iterations = Number(parts[1]);
  const salt = parts[2];
  const expectedDigest = parts[3];
  if (!Number.isFinite(iterations) || !salt || !expectedDigest) return false;

  const actualDigest = crypto.pbkdf2Sync(String(password || ""), salt, iterations, 32, "sha256").toString("hex");
  return safeEqual(actualDigest, expectedDigest);
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
