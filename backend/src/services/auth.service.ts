export async function sendOtpService(
  telephone: string
) {
  return {
    telephone,
    debugCode: "123456"
  };
}

export async function verifyOtpService(
  telephone: string,
  code: string
) {
  return {
    existing: false,
    telephone,
    code
  };
}

export async function completeSignupService(
  data: unknown
) {
  return {
    accessToken: "token",
    refreshToken: "refresh",
    personne: data
  };
}