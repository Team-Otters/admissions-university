"use client";
class AuthService {
  private static instance: AuthService | null = null;
  private role: string | null;
  private roleContext: RoleNa;

  private constructor() {
    if (localStorage.getItem("role")) {
      this.role = localStorage.getItem("role");
    } else {
      this.role = "Khach";
    }
  }

  public static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public login(role: string): void {
    this.role = role;
    if (typeof window !== "undefined") {
      localStorage.setItem("role", role);
    }
  }

  public logout(): void {
    this.role = "Khach";
    localStorage.setItem("role", "Khach");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  public getRole(): string {
    return (
      AuthService.instance?.role || localStorage.getItem("role") || "Khach"
    );
  }
}

export default AuthService;
