export const config = {
  url:
    typeof window !== "undefined"
      ? `${window.location.protocol}//${process.env.NEXT_PUBLIC_API_URL}`
      : "http://localhost:3000",

  secret: process.env.SECRET_KEY ?? "",
};
