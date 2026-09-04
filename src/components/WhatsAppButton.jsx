import { MessageCircle } from 'lucide-react'

const WHATSAPP_URL =
  'https://wa.me/919869911317?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Asmita\'s%20Samast%20Shikshan%20programs.'

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 md:hidden"
      style={{ backgroundColor: '#25D366' }}
    >
      <MessageCircle size={26} color="#fff" fill="#fff" />
    </a>
  )
}
