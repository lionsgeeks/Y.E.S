import React from "react";
import TransText from "@components/TransText";

const RegistrationModal = ({ open, step, setStep, onClose, error, loading, form, setForm }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-white p-6 rounded-lg w-[min(90vw,800px)] max-h-[80vh] overflow-y-auto shadow-lg">
                {step === 1 && (
                    <>
                        <h2 className="text-xl font-semibold mb-4 text-beta">
                            <TransText en="Registration" ar="تسجيل" fr="Inscription" />
                        </h2>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
                            <TransText en="Name" ar="الاسم" fr="Nom" />
                        </label>
                        <input id="name" name="name" placeholder="Entrez votre nom" value={form?.name || ''}
                               onChange={(e) => setForm && setForm((p) => ({ ...p, name: e.target.value }))}
                               className="mb-3 w-full p-2 border border-gray-300 rounded" />
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                            <TransText en="Email" ar="البريد الإلكتروني" fr="Email" />
                        </label>
                        <input id="email" name="email" placeholder="Entrez votre email" value={form?.email || ''}
                               onChange={(e) => setForm && setForm((p) => ({ ...p, email: e.target.value }))}
                               className="mb-3 w-full p-2 border border-gray-300 rounded" />
                        <div className="flex mt-4 justify-between items-center">
                            <button onClick={onClose} className=" px-4 py-2 border border-beta text-alpha rounded">
                                <TransText en="Cancel" ar="إلغاء" fr="Annuler" />
                            </button>
                            <button onClick={() => setStep(2)} disabled={loading}
                                    className="bg-beta text-white px-4 py-2 rounded  hover:bg-[#a68513] transition-colors duration-200">
                                {loading ? (<TransText en="Sending..." ar="جاري الإرسال..." fr="Envoi..." />) : (<TransText en="Next" ar="التالي" fr="Suivant" />)}
                            </button>
                        </div>
                    </>
                )}
                {step === 2 && (
                    <>
                        <h2 className="text-xl font-semibold mb-4 text-alpha">
                            <TransText en="Verification Code" ar="رمز التحقق" fr="Vérification du Code" />
                        </h2>
                        <input name="code" placeholder="Code de vérification" value={form?.code || ''}
                               onChange={(e) => setForm && setForm((p) => ({ ...p, code: e.target.value }))}
                               className="mb-4 w-full p-2 border border-gray-300 rounded" />
                        {error && <div className="text-red-500 mb-2">{error}</div>}
                        <button onClick={() => setStep(3)} disabled={loading}
                                className="bg-alpha text-white px-4 py-2 rounded w-full hover:bg-[#24447f] transition-colors duration-200">
                            {loading ? (<TransText en="Verifying..." ar="جاري التحقق..." fr="Vérification..." />) : (<TransText en="Verify" ar="تحقق" fr="Vérifier" />)}
                        </button>
                    </>
                )}
                {step === 3 && (
                    <div className="text-center">
                        <TransText en="Select a type to continue (form steps moved here)" ar="اختر نوعًا للمتابعة" fr="Sélectionnez un type pour continuer" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistrationModal;



