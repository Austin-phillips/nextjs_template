import LoginLayout from "@/app/ui/login/LoginLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LoginLayout>{children}</LoginLayout>;
}
