export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/issues/new",
    "/issues/edit/:id+",
    "/api/issues/:id+",
    "/api/issues",
  ],
};
