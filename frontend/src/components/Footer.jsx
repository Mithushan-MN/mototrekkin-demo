import { Facebook, Instagram, Youtube, Music2, Phone, Mail } from 'lucide-react';
import logo from '../assets/MT-footer.webp';

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        {/* Logo Section */}
        <div className="flex flex-col items-center lg:items-start space-y-2 text-center lg:text-left">
          <img src={logo} alt="Moto Trekkin Logo" className="w-full h-auto" />
          {/* <p className="text-yellow-600 text-sm font-semibold">
            ENDLESS MOTORCYCLE ADVENTURE
          </p> */}
        </div>

        {/* Store Address */}
        <div className="text-center lg:text-left">
          <h4 className="font-bold text-lg mb-2">Visit our physical store:</h4>
          <p className="text-gray-300 text-sm">
            Unit 4/46 Sandringham Ave, <br />
            Thornton, NSW, 2322
          </p>
        </div>

        {/* Opening Hours */}
        <div className="text-center lg:text-left">
          <h4 className="font-bold text-lg mb-2">Opening hours:</h4>
          <p className="text-sm">Mon–Fri: 8AM–5PM</p>
          <p className="text-sm">Sat: 9AM–Noon</p>
          <p className="text-sm">Sun: Closed</p>
        </div>

        {/* Phone + Email */}
        <div className="text-center lg:text-left">
          <h4 className="font-bold text-lg mb-2">Contact us at</h4>
          <p className="text-sm flex items-center justify-center lg:justify-start gap-2">
            <Phone size={16} className="text-yellow-500" />
            <a
              href="tel:0240724511"
              className="text-yellow-500 hover:text-yellow-400"
            >
              02 4072 4511
            </a>
          </p>
          <p className="text-sm flex items-center justify-center lg:justify-start gap-2 mt-2">
            <Mail size={16} className="text-yellow-500" />
            <a
              href="mailto:adventure@mototrekkin.com.au"
              className="text-yellow-500 hover:text-yellow-400 font-semibold"
            >
              CLICK HERE TO EMAIL US
            </a>
          </p>
        </div>

        {/* Social Media */}
        <div className="text-center lg:text-left">
          <h4 className="font-bold text-lg mb-2">Visit us on:</h4>
          <div className="flex justify-center lg:justify-start space-x-4">
            <a
              href="https://www.facebook.com/mototrekkin/"
              className="p-2 bg-yellow-600 rounded-full hover:bg-yellow-500"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/moto_trekkin_aus/"
              className="p-2 bg-yellow-600 rounded-full hover:bg-yellow-500"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCe__2WpNr0v_FgmTMq-hvdQ/about?view_as=subscriber"
              className="p-2 bg-yellow-600 rounded-full hover:bg-yellow-500"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
            <a
              href="https://www.tiktok.com/@mototrekkin?is_from_webapp=1&sender_device=pc"
              className="p-2 bg-yellow-600 rounded-full hover:bg-yellow-500"
              aria-label="TikTok"
            >
              <Music2 size={18} /> {/* TikTok substitute */}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Moto Trekkin. All Rights Reserved.
      </div>
    </footer>
  );
}