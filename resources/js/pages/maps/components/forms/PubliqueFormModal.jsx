import React from "react";
import TransText from "@components/TransText";
import data from "../../../../../json/data.json";

const PubliqueFormModal = ({ open, formData, setFormData, onSubmit, onClose, loading, indicatif }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <form className="w-[min(95vw,1100px)] bg-white/95 rounded-lg shadow-md max-h-[85vh] overflow-y-auto p-6" onSubmit={onSubmit}>
                <fieldset className="bg-gray-100 p-6 rounded-lg">
                    <legend className="text-2xl font-bold text-blue-800 mb-6">
                        <TransText en="General Information" ar="المعلومات العامة" fr="Informations Générales" />
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Institution Name" ar="اسم المؤسسة" fr="Nom de l'institution" /></label>
                            <input type="text" value={formData.institution_name} onChange={(e)=>setFormData({...formData, institution_name:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Institution Type" ar="نوع المؤسسة" fr="Type d'institution" /></label>
                            <select value={formData.institution_type} onChange={(e)=>setFormData({...formData, institution_type:e.target.value})} className="w-full p-3 border rounded-lg">
                                <option value=""><TransText en="Select..." ar="اختر..." fr="Sélectionner..." /></option>
                                <option>Ministère</option>
                                <option>Agence gouvernementale</option>
                                <option>Collectivité territoriale</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Country" ar="البلد" fr="Pays" /></label>
                            <select value={formData.country} onChange={(e)=>setFormData({...formData, country:e.target.value})} className="w-full p-2 border rounded-md">
                                <option value=""><TransText en="Select a country..." ar="اختر دولة..." fr="Sélectionner un pays..." /></option>
                                {data.map((item) => (<option key={item.id} value={item.value}>{item.name}</option>))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <div className="text-center p-6">
                    <button type="submit" className="bg-alpha text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center" disabled={loading}>
                        <TransText en="Submit Form" ar="إرسال النموذج" fr="Soumettre le formulaire" />
                    </button>
                    <button type="button" onClick={onClose} className="ml-2 px-4 py-2 border border-beta text-alpha rounded">
                        <TransText en="Cancel" ar="إلغاء" fr="Annuler" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PubliqueFormModal;


