import React from "react";
import TransText from "@components/TransText";
import data from "../../../../../json/data.json";

const BailleurFormModal = ({ open, formData, setFormData, onSubmit, onClose, loading, indicatif }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <form className="w-[min(95vw,1100px)] bg-white/95 rounded-lg shadow-md max-h-[85vh] overflow-y-auto p-6" onSubmit={onSubmit}>
                <fieldset className="bg-gray-100 p-6 rounded-lg">
                    <legend className="text-xl font-bold text-alpha mb-4">
                        <TransText en="General Information" ar="المعلومات العامة" fr="Informations Générales" />
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Institution Name" ar="اسم المؤسسة" fr="Nom de l'institution" /> <span className="text-red-500">*</span></label>
                            <input type="text" name="nom" value={formData.nom} onChange={(e)=>setFormData({...formData, nom:e.target.value})} className="w-full p-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Institution Type" ar="نوع المؤسسة" fr="Type d'institution" /> <span className="text-red-500">*</span></label>
                            <select className="w-full p-2 border rounded-md" name="type_institution" value={formData.type_institution} onChange={(e)=>setFormData({...formData, type_institution:e.target.value})}>
                                <option value=""><TransText en="Select..." ar="اختر..." fr="Sélectionner..." /></option>
                                <option>Fondation privée</option>
                                <option>Agence de développement</option>
                                <option>Fonds d'investissement</option>
                                <option>Autre</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Country of Origin" ar="بلد المنشأ" fr="Pays d'origine" /> <span className="text-red-500">*</span></label>
                            <select onChange={(e)=>setFormData({...formData, pays_origine:Array.from(e.target.selectedOptions,(o)=>o.value)})} className="w-full p-2 border rounded-md" name="pays_origine" multiple>
                                {data.map((item) => (<option key={item.id} value={item.value}>{item.name}</option>))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <div className="text-center p-4">
                    <button type="submit" className="bg-alpha text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center" disabled={loading}>
                        {loading ? (<TransText en="Submitting..." ar="جاري الإرسال..." fr="Envoi..." />) : (<TransText en="Submit Form" ar="إرسال النموذج" fr="Soumettre le formulaire" />)}
                    </button>
                    <button type="button" onClick={onClose} className="ml-2 px-4 py-2 border border-beta text-alpha rounded">
                        <TransText en="Cancel" ar="إلغاء" fr="Annuler" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BailleurFormModal;


