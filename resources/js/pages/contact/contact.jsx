import TransText from "@components/TransText";
import { useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
// Custom SVG Icons
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5.02 3.66 9.19 8.44 9.93v-7.02H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.91h-2.33V22c4.78-.74 8.44-4.91 8.44-9.93Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm4.75-.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M3 3h3.8l5.05 6.53L17.9 3H21l-7.3 8.53L21 21h-3.8l-5.44-7.03L6.1 21H3l7.74-9.06L3 3Z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8.5h4V23h-4V8.5Zm7 0h3.84v1.98h.05c.53-.99 1.82-2.04 3.75-2.04 4.01 0 4.75 2.64 4.75 6.07V23h-4v-6.43c0-1.53-.03-3.49-2.13-3.49-2.13 0-2.46 1.66-2.46 3.38V23h-4V8.5Z" />
  </svg>
);
const ContactUs = () => {
  const { selectedLanguage } = "en";
  const url = "https://management.youthempowermentsummit.africa/";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const sendMessage = async () => {
    setLoading(true);
    let data = {
      fullname: fullName,
      email,
      phone,
      message,
    };
    // console.log(data);
    try {
      await axios.post(url + "/api/messages", data);
    } catch (error) {
      console.log(error);
    } finally {
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setLoading(false);
    }
  };
  return (
    <>
    <Navbar />
    <div
      className={`flex gap-5 py-[10vh] px-[5vw] lg:flex-row flex-col ${
        selectedLanguage == "ar" ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div
        className={`lg:w-[50%] flex flex-col gap-5 ${
          selectedLanguage == "ar" ? "text-right items-end" : ""
        }`}
      >
        <p className="text-3xl font-medium">
          <TransText en="Contact Us" ar="تواصل معنا" fr="Contactez-nous" />
        </p>
        <p className="text-lg w-[90%]">
          <TransText
            en="Do you have any questions? Need more information? 
Fill out our contact form available in multiple languages, or connect with us via social media. You can also call or email us, and we will get back to you as soon as possible."
            ar="هل لديك أي أسئلة؟ هل تحتاج إلى مزيد من المعلومات؟ املأ نموذج الاتصال الخاص بنا المتاح بعدة لغات، أو تواصل معنا عبر وسائل التواصل الاجتماعي. يمكنك أيضًا الاتصال بنا أو إرسال بريد إلكتروني، وسنرد عليك في أقرب وقت ممكن"
            fr="Avez-vous des questions ? Besoin de plus d'informations ?
Remplissez notre formulaire de contact disponible en plusieurs langues ou connectez-vous avec nous via les réseaux sociaux. Vous pouvez également nous appeler ou nous envoyer un e-mail, et nous vous répondrons dès que possible."
          />
        </p>
        {/* <div
          className={`flex gap-2 items-center text-lg ${selectedLanguage == "ar" ? "flex-row-reverse" : ""
            }`}
        >
          <BsTelephone className="font-bold" />
          <p>+212 666 059 258</p>
        </div> */}
        <div
          className={`flex gap-2 items-center text-lg ${
            selectedLanguage == "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <EmailIcon />
          <p>contact@youthempowermentsummit.africa</p>
        </div>
        <div className="flex gap-5 text-2xl">
          <a
            target="_blank"
            href="https://www.facebook.com/profile.php?id=61567349305436"
          >
            <FacebookIcon />
          </a>
          <a
            target="_blank"
            href="https://x.com/yes_summit?s=21&t=7jqpIPumaHca8lonoHm8Uw"
          >
            <XIcon />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/yes_summit_africa/"
          >
            <InstagramIcon />
          </a>
           <a target="_blank" href="https://www.linkedin.com/company/yes-summit-africa">
                     <LinkedinIcon />
                   </a>
        </div>
      </div>
      <div className={`lg:w-[50%] flex flex-col gap-3 `}>
        <div
          className={`flex flex-col gap-2 ${
            selectedLanguage == "ar" ? "text-right" : ""
          }`}
        >
          <label htmlFor="">
            <TransText fr="Nom complet" en="Full name" ar="الاسم الكامل" />
          </label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className={`p-2 border rounded-lg ${
              selectedLanguage == "ar" ? "text-right" : ""
            }`}
            type="text"
            placeholder={
              selectedLanguage == "ar"
                ? "الاسم الكامل"
                : selectedLanguage == "en"
                ? "Your name"
                : "Votre nom"
            }
          />
        </div>
        <div
          className={`flex flex-col gap-2 ${
            selectedLanguage == "ar" ? "text-right" : ""
          }`}
        >
          <label htmlFor="">
            <TransText ar="البريد الالكتروني" en="Email" fr="Email" />
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`p-2 border rounded-lg float-right ${
              selectedLanguage == "ar" ? "text-right" : ""
            }`}
            type="email"
            placeholder="Your@email.com"
          />
        </div>
        <div
          className={`flex flex-col gap-2 ${
            selectedLanguage == "ar" ? "text-right" : ""
          }`}
        >
          <label htmlFor="">
            <TransText
              ar="رقم الهاتف"
              en="Phone number"
              fr="Numéro de téléphone"
            />
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className={`p-2 border rounded-lg [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none ${
              selectedLanguage == "ar" ? "text-right" : ""
            }`}
            type="tel"
            placeholder="+212 125 578987"
          />
        </div>
        <div
          className={`flex flex-col gap-2 ${
            selectedLanguage == "ar" ? "text-right" : ""
          }`}
        >
          <label htmlFor="">
            {" "}
            <TransText ar="رسالة" en="Message" fr="Message" />
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className={`p-2 border rounded-lg ${
              selectedLanguage == "ar" ? "text-right" : ""
            }`}
            placeholder={
              selectedLanguage == "ar"
                ? " رسالتك هنا"
                : selectedLanguage == "en"
                ? "Your message here ..."
                : "Votre message ici ..."
            }
            rows={5}
            name=""
            id=""
          ></textarea>
        </div>
        <button
          onClick={sendMessage}
          className="bg-black text-white py-3 rounded-lg"
        >
          {loading ? (
            <div role="status" className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <>
              <TransText ar="إرسال" en="Submit" fr="Envoyer" />
            </>
          )}
        </button>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ContactUs;
