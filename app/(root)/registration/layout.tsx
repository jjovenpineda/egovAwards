export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex flex-col bg-slate-50">{children}</main>;
}
