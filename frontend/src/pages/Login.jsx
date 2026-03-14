function LoginPage() {
  return (
    <div className="min-h-screen bg-[url('/login-bg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen grid place-items-center bg-slate-950/55 p-6">
        <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
          <h1 className="text-2xl font-semibold text-white">Read & Meet</h1>
          <p className="mt-1 text-sm text-slate-200">
            Log in or sign up with email + password to save and edit plans.
          </p>

          <div className="mt-4 space-y-3">
            <input
              className="w-full rounded-xl border border-white/20 bg-white/90 p-2"
              type="email"
              placeholder="Email"
              value={authForm.email}
              onChange={(e) => setAuthForm((p) => ({ ...p, email: e.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-white/20 bg-white/90 p-2"
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={(e) => setAuthForm((p) => ({ ...p, password: e.target.value }))}
            />

            <div className="flex gap-2">
              <button
                className="flex-1 rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-white hover:bg-white/20"
                disabled={!!authModeLoading}
                onClick={() => submitAuth("login")}
              >
                {authModeLoading === "login" ? "Logging in..." : "Log in"}
              </button>
              <button
                className="flex-1 rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-white hover:bg-white/20"
                disabled={!!authModeLoading}
                onClick={() => submitAuth("register")}
              >
                {authModeLoading === "register" ? "Creating..." : "Sign up"}
              </button>
            </div>

            {authError ? <p className="text-sm text-red-300">{authError}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}