import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TransText from "@components/TransText";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

const PlaidoyerPage = () => {
  const { data, setData, transform, post, processing, reset, errors } = useForm({
    full_name: "",
    organization: "",
    role: "",
    email: "",
    country: "",
    other_country: "",
    recommendation: "",
  });

  const submit = (e) => {
    e.preventDefault();
    transform((formData) => ({
      ...formData,
      country:
        formData.country === "Other" && formData.other_country
          ? formData.other_country
          : formData.country,
    }));
    post("/plaidoyer", { onSuccess: () => reset() });
  };

  const manifestos = [
    { code: "fr", label: "Français", path: "/assets/pdfs/manifesto fr.pdf" },
    { code: "en", label: "English", path: "/assets/pdfs/manifesto eng (1).pdf" },
    { code: "ar", label: "العربية", path: "/assets/pdfs/manifesto ar.pdf" },
    { code: "pr", label: "Português", path: "/assets/pdfs/manifesto prtg.pdf" },
    { code: "sw", label: "Swahili", path: "/assets/pdfs/manifesto swahili.pdf" },
    { code: "tf", label: "Tafinaght", path: "/assets/pdfs/manifesto tafinaght.pdf" },
  ];
  const [selectedManifesto, setSelectedManifesto] = useState(manifestos[0]);

  return (
    <>
      <Navbar />
      {/* Manifestos cards section */}
      <div className="px-[5vw] pt-[6vh] pb-[2vh] flex flex-col gap-4 overflow-hidden">
        <p className="text-2xl font-medium">
          <TransText fr="YES AFRICA Manifestes" en="YES AFRICA Manifestos" ar="بيانات YES AFRICA" />
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {manifestos.map((m) => (
            <div key={m.code} className="border rounded-lg shadow-sm overflow-hidden bg-[white]">
              <div className="relative w-full bg-gray-100 overflow-hidden" style={{ height: "38vh"  }}>
                <iframe
                  title={`preview-${m.code}`}
                  src={`${m.path}#page=1&zoom=page-width&toolbar=0&navpanes=0&statusbar=0`}
                  className="absolute top-0 left-0 pointer-events-none"
                  style={{
                    border: "none",
                    overflow: "hidden",
                    width: "calc(100% + 3vw)",
                    height: "calc(100% + 12vh)",
                    top: "-6vh",
                    left: "-1vw",
                    paddingTop: "9%",
                  }}
                  scrolling="no"
                />
              </div>
              <div className="p-3 flex items-center gap-3 justify-between">
                <span className="font-medium">{m.label}</span>
                <div className="flex items-center gap-3">
                  <a href={m.path} target="_blank" rel="noreferrer" className="underline">
                    <TransText fr="Ouvrir" en="Open" ar="فتح" />
                  </a>
                  <a href={m.path} download className="underline">
                    <TransText fr="Télécharger" en="Download" ar="تنزيل" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intro and form */}
      <div className={`flex gap-5 py-[6vh] px-[5vw] lg:flex-row flex-col`}>
        <div className={`lg:w-[50%] flex flex-col gap-5`}>
          <p className="text-3xl font-medium">Plaidoyer</p>
          <p className="text-lg w-[90%]">Formulaire de Recommandation</p>
          <p className="text-lg w-[90%]">
            Une idée peut tout changer. La vôtre pourrait ouvrir des perspectives nouvelles à des milliers de jeunes Africains. Partagez-la et semez les graines du futur.
          </p>
        </div>

        <form onSubmit={submit} className={`lg:w-[50%] flex flex-col gap-3`}>
          <div className="flex flex-col gap-2">
            <label>Nom et Prénom</label>
            <input
              type="text"
              value={data.full_name}
              onChange={(e) => setData("full_name", e.target.value)}
              className="p-2 border rounded-lg"
              placeholder="Votre nom complet"
            />
            {errors.full_name && <span className="text-red-600">{errors.full_name}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label>Organisation/Affiliation (optionnel)</label>
            <input
              type="text"
              value={data.organization}
              onChange={(e) => setData("organization", e.target.value)}
              className="p-2 border rounded-lg"
              placeholder="Votre organisation (si applicable)"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Titre/Rôle (optionnel)</label>
            <input
              type="text"
              value={data.role}
              onChange={(e) => setData("role", e.target.value)}
              className="p-2 border rounded-lg"
              placeholder="Votre titre ou rôle"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Adresse e-mail professionnelle</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              className="p-2 border rounded-lg"
              placeholder="vous@exemple.com"
            />
            {errors.email && <span className="text-red-600">{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label>
              <TransText
                fr="Pays de Résidence ou d'Opération"
                en="Country of Residence or Operation"
                ar="بلد الإقامة أو النشاط"
              />
            </label>
            <select
              value={data.country}
              onChange={(e) => setData("country", e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="">Sélectionnez un pays</option>
              <option value="Morocco">Maroc</option>
              <option value="Senegal">Sénégal</option>
              <option value="Ivory Coast">Côte d'Ivoire</option>
              <option value="Nigeria">Nigéria</option>
              <option value="Kenya">Kenya</option>
              <option value="South Africa">Afrique du Sud</option>
              <option value="Other">Autre</option>
            </select>
            {errors.country && <span className="text-red-600">{errors.country}</span>}

            {data.country === "Other" && (
              <div className="flex flex-col gap-2 mt-2">
                <label>
                  <TransText
                    fr="Précisez le pays"
                    en="Specify the country"
                    ar="يرجى تحديد البلد"
                  />
                </label>
                <input
                  type="text"
                  value={data.other_country}
                  onChange={(e) => setData("other_country", e.target.value)}
                  className="p-2 border rounded-lg"
                  placeholder={
                    // Placeholder localized via TransText by rendering the string from a hidden element
                    // since placeholders can't render components directly
                    undefined
                  }
                />
                {/* Localized placeholder fallback via visually hidden element */}
                <span className="sr-only">
                  <TransText
                    fr="Saisissez le pays"
                    en="Enter the country"
                    ar="أدخل البلد"
                  />
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label>La Recommandation (en détail)</label>
            <textarea
              rows={8}
              value={data.recommendation}
              onChange={(e) => setData("recommendation", e.target.value)}
              className="p-2 border rounded-lg"
              placeholder="Décrivez votre recommandation ici..."
            />
            {errors.recommendation && (
              <span className="text-red-600">{errors.recommendation}</span>
            )}
          </div>

          <button type="submit" disabled={processing} className="bg-black text-white py-3 rounded-lg mt-2 flex items-center justify-center">
            {processing ? "Envoi..." : "Envoyer"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PlaidoyerPage;


