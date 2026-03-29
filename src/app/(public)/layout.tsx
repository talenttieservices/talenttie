import WhatsAppButton from "@/components/layout/WhatsAppButton"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <WhatsAppButton />
    </>
  )
}
