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
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Logo (PNG/JPG - max 5MB)" ar="الشعار (PNG/JPG - 5MB)" fr="Logo (PNG/JPG - max 5MB)" /></label>
                            <input type="file" accept=".png,.jpg,.jpeg" onChange={(e)=>setFormData({...formData, logo:e.target.files?.[0]||null})} className="w-full text-sm file:bg-blue-100 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-blue-800 hover:file:bg-blue-200" />
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
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Institutional Email" ar="البريد الإلكتروني المؤسسي" fr="Email institutionnel" /></label>
                            <input type="email" value={formData.email_institutionnel||''} onChange={(e)=>setFormData({...formData, email_institutionnel:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Website" ar="الموقع الإلكتروني" fr="Site web" /></label>
                            <input type="url" value={formData.site_web||''} onChange={(e)=>setFormData({...formData, site_web:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Offices in Africa" ar="المكاتب في أفريقيا" fr="Bureaux en Afrique" /></label>
                            <textarea rows="3" value={formData.bureaux_afrique||''} onChange={(e)=>setFormData({...formData, bureaux_afrique:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Youth Thematic Contact" ar="جهة اتصال الشباب" fr="Contact thématique jeunesse" /></label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <input type="text" placeholder="Nom" className="p-2 border rounded-md" value={formData?.contact_jeunesse?.nom||''} onChange={(e)=>setFormData((p)=>({...p, contact_jeunesse:{...(p.contact_jeunesse||{}), nom:e.target.value}}))} />
                                <input type="text" placeholder="Fonction" className="p-2 border rounded-md" value={formData?.contact_jeunesse?.fonction||''} onChange={(e)=>setFormData((p)=>({...p, contact_jeunesse:{...(p.contact_jeunesse||{}), fonction:e.target.value}}))} />
                                <input type="email" placeholder="Email" className="p-2 border rounded-md" value={formData?.contact_jeunesse?.email||''} onChange={(e)=>setFormData((p)=>({...p, contact_jeunesse:{...(p.contact_jeunesse||{}), email:e.target.value}}))} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Strategic Framework" ar="الإطار الاستراتيجي" fr="Cadre stratégique" /></label>
                            <input type="file" onChange={(e)=>setFormData({...formData, cadre_strategique:e.target.files?.[0]||null})} className="w-full text-sm file:bg-blue-100 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-blue-800 hover:file:bg-blue-200" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Thematic Priorities" ar="الأولويات المواضيعية" fr="Priorités thématiques" /></label>
                            <textarea rows="3" value={formData.priorites_thematiques||''} onChange={(e)=>setFormData({...formData, priorites_thematiques:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Dedicated Budget (€)" ar="الميزانية (€)" fr="Budget dédié (€)" /></label>
                            <input type="number" min="0" value={formData.budget||''} onChange={(e)=>setFormData({...formData, budget:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Program Period" ar="فترة البرنامج" fr="Période du programme" /></label>
                            <div className="flex gap-3">
                                <input type="number" placeholder="Année début" value={formData.annee_debut||''} onChange={(e)=>setFormData({...formData, annee_debut:e.target.value})} className="w-full p-3 border rounded-lg" />
                                <input type="number" placeholder="Année fin" value={formData.annee_fin||''} onChange={(e)=>setFormData({...formData, annee_fin:e.target.value})} className="w-full p-3 border rounded-lg" />
                            </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Africa Coverage" ar="التغطية في أفريقيا" fr="Couverture en Afrique" /></label>
                            <select multiple name="couverture_afrique" onChange={(e)=>setFormData({...formData, couverture_afrique:Array.from(e.target.selectedOptions,(o)=>o.value)})} className="w-full p-2 border rounded-md h-32">
                                {data.map((item)=> (<option key={item.id} value={item.value}>{item.name}</option>))}
                            </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Countries Represented" ar="الدول الممثلة" fr="Pays représentés" /></label>
                            <select multiple name="pays_representes" value={formData.pays_representes||[]} onChange={(e)=>setFormData({...formData, pays_representes:Array.from(e.target.selectedOptions,(o)=>o.value)})} className="w-full p-2 border rounded-md h-32">
                                {data.map((item)=> (<option key={item.id} value={item.value}>{item.name}</option>))}
                            </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Partner Types" ar="أنواع الشركاء" fr="Type de partenaires" /></label>
                            <select multiple value={formData.type_partenaires||[]} onChange={(e)=>setFormData({...formData, type_partenaires:Array.from(e.target.selectedOptions,(o)=>o.value)})} className="w-full p-3 border rounded-lg h-32">
                                <option value="ONG">ONG</option>
                                <option value="Entreprises privées">Entreprises privées</option>
                                <option value="Institutions gouvernementales">Institutions gouvernementales</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Collaboration Mechanisms" ar="آليات التعاون" fr="Mécanismes de collaboration" /></label>
                            <input type="text" value={formData.mecanismes_collaboration||''} onChange={(e)=>setFormData({...formData, mecanismes_collaboration:e.target.value})} className="w-full p-2 border rounded" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Flagship Programs (comma-separated)" ar="البرامج الرئيسية" fr="Programmes phares (séparés par virgule)" /></label>
                            <textarea rows="2" value={formData.programmes_phares||''} onChange={(e)=>setFormData({...formData, programmes_phares:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Methodological Tools (comma-separated)" ar="الأدوات المنهجية" fr="Outils méthodologiques (séparés par virgule)" /></label>
                            <input type="text" value={formData.outils_methodologiques||''} onChange={(e)=>setFormData({...formData, outils_methodologiques:e.target.value})} className="w-full p-2 border rounded" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Funding Opportunities (comma-separated)" ar="فرص التمويل" fr="Opportunités de financement (séparées par virgule)" /></label>
                            <textarea rows="2" value={formData.opportunites_financement||''} onChange={(e)=>setFormData({...formData, opportunites_financement:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Areas of Expertise" ar="مجالات الخبرة" fr="Domaines d'expertise" /></label>
                            <textarea rows="3" value={formData.domaines_expertise||''} onChange={(e)=>setFormData({...formData, domaines_expertise:e.target.value})} className="w-full p-3 border rounded-lg" />
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


