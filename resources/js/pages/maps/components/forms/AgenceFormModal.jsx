import React from "react";
import TransText from "@components/TransText";
import data from "../../../../../json/data.json";

const AgenceFormModal = ({ open, formData, setFormData, onSubmit, onClose, loading }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <form className="w-[min(95vw,1100px)] bg-white/95 rounded-lg shadow-md max-h-[85vh] overflow-y-auto p-6" onSubmit={onSubmit}>
                <fieldset className="bg-gray-100 p-6 rounded-lg mb-4">
                    <legend className="text-2xl font-bold text-blue-800 mb-6">
                        <TransText en="General Information" ar="المعلومات العامة" fr="Informations Générales" />
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Agency Name" ar="اسم الوكالة" fr="Nom de l'agence" /></label>
                            <input type="text" value={formData.nom} onChange={(e)=>setFormData({...formData, nom:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Organization Type" ar="نوع المنظمة" fr="Type d'organisation" /></label>
                            <select name="type_organisation" className="w-full p-3 border rounded-lg" onChange={(e)=>setFormData({...formData, type_organisation:e.target.value})}>
                                <option value=""><TransText en="Select..." ar="اختر..." fr="Sélectionner..." /></option>
                                <option>Agence ONU</option>
                                <option>Coopération bilatérale</option>
                                <option>Organisation régionale</option>
                            </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Represented Countries" ar="الدول الممثلة" fr="Pays représentés" /></label>
                            <select multiple name="pays_representes" onChange={(e)=>setFormData({...formData, pays_representes:Array.from(e.target.selectedOptions,(o)=>o.value)})} className="w-full p-2 border rounded-md">
                                {data.map((item) => (<option key={item.value} value={item.value}>{item.name}</option>))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <div className="text-center p-4">
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

export default AgenceFormModal;


