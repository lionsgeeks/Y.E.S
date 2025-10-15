import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TransText from "@components/TransText";
import { useForm } from "@inertiajs/react";

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

  return (
    <>
      <Navbar />
      <div className={`flex gap-5 py-[10vh] px-[5vw] lg:flex-row flex-col`}>
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


