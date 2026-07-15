const KEY = "pecho.admin.session";
const EMAIL = "Pecho.official@gmail.com";
const PASS = "Pecho5991@";

export function adminSignIn(email: string, password: string): boolean {
  if (email.trim().toLowerCase() === EMAIL.toLowerCase() && password === PASS) {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    return true;
  }
  return false;
}

export function adminSignOut() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}
