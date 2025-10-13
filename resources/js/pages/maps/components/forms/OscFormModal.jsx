import React from "react";
import TransText from "@components/TransText";
import data from "../../../../../json/data.json";

const OscFormModal = ({ open, formData, setFormData, onSubmit, onClose, loading, indicatif }) => {
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
                            <label className="block text-sm font-medium text-gray-700">
                                <TransText en="Organization Name" ar="اسم المنظمة" fr="Nom de l'organisation" /> <span className="text-red-500">*</span>
                            </label>
                            <input type="text" name="name" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="w-full p-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Logo (PNG/JPG - max 5MB)</label>
                            <input name="logo" type="file" accept="image/png, image/jpeg" onChange={(e)=>setFormData({...formData, logo:e.target.files?.[0]||null})} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                <TransText en="Year of Creation" ar="سنة التأسيس" fr="Année de création" /> <span className="text-red-500">*</span>
                            </label>
                            <input type="number" value={formData.creation_year} onChange={(e)=>setFormData({...formData, creation_year:e.target.value})} min="1900" max="2025" name="creation_year" className="w-full p-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                <TransText en="Legal Status" ar="الحالة القانونية" fr="Statut juridique" /> <span className="text-red-500">*</span>
                            </label>
                            <select className="w-full p-2 border rounded-md" id="legal-status" name="legal_status" value={formData.legal_status} onChange={(e)=>setFormData({...formData, legal_status:e.target.value})}>
                                <option value=""><TransText en="Select..." ar="اختر..." fr="Sélectionner..." /></option>
                                <option>Association</option>
                                <option>Foundation</option>
                                <option>Cooperative</option>
                                <option>Autre</option>
                            </select>
                            {formData.legal_status === "Autre" && (
                                <input type="text" placeholder="Précisez" className="w-full p-2 border rounded-md mt-2" name="other_legal_status" value={formData.other_legal_status} onChange={(e)=>setFormData({...formData, other_legal_status:e.target.value})} />
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Implementation Countries" ar="دول التنفيذ" fr="Pays d'implantations" /> <span className="text-red-500">*</span></label>
                            <select onChange={(e)=>setFormData({...formData, country:Array.from(e.target.selectedOptions,(o)=>o.value)})} className="w-full  p-2 border rounded-md" name="country" multiple>
                                {data.map((item) => (<option key={item.id} value={item.value}>{item.name}</option>))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Website" ar="الموقع الإلكتروني" fr="Site web" /></label>
                            <input type="url" className="w-full p-2 border rounded-md" name="website" value={formData.website} onChange={(e)=>setFormData({...formData, website:e.target.value})} />
                        </div>
                    </div>
                </fieldset>
                <div className="text-center">
                    <button type="submit" className="bg-alpha text-white px-8 py-3 my-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center" disabled={loading}>
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

export default OscFormModal;


