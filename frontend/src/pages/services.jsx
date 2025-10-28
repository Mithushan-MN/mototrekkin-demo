import Section from "../components/services";

import SafetySystembg from "../assets/safetysystem.webp";
import m1 from "../assets/services/m1.webp";
import m2 from "../assets/services/m2.webp";
import m3 from "../assets/services/m3.webp";
import m4 from "../assets/services/m4.webp";
import m5 from "../assets/services/m5.webp";
import mvideo from "../assets/services/MTG-VIDEO-v2 (1).mp4";

export default function ServicesPage() {
  return (
    <div>
     
      <Section
        videoSrc={mvideo} 
       
      />

      
      <Section
        title="THE MOTORCYCLE SERVICING GAME
               IS CHANGING – FOREVER."
        description="A new era of motorcycle care and maintenance is here – and it’s long overdue! From May 2023,
                     motorcycle owners will enjoy next level motorcycle care and service."
        bgImage={m1}
        buttonText="BOOK A SERVICE"
        buttonLink="/service-booking-form"
      />

      
      <Section
        title="LOG BOOK SERVICING –
               REDEFINED."
        description="When we care for your motorcycle,
                     there is zero impact to your manufacturer’s warranty. Every service we complete
                     complies or exceeds the manufacturer’s
                     requirements."
        bgImage={m2}
        buttonText="BOOK A SERVICE"
        buttonLink="/service-booking-form"
      />


      <Section
        title="GENUINE OR AFTERMARKET?"
        description="Genuine or aftermarket parts.The choice is yours."
        bgImage={m3}
        buttonText="BOOK A SERVICE"
        buttonLink="/service-booking-form"
      />

     
      <Section
        title="QUALIFIED TECHS – NO APPRENTICES."
        description="When in our care, experienced technicians work their magic on your motorcycle to ensure it runs perfectly while also keeping you safe."
        bgImage={m4}
        buttonText="BOOK A SERVICE"
        buttonLink="/service-booking-form"
      />

      
      <Section
        title="BOOK A SERVICE"
        bgImage={m5}
        buttonText="CLICK HERE"
        buttonLink="/service-booking-form"
      />
    </div>
  );
}
